export type LineLengthEstimate = {
  bboxWidthPx: number;
  bboxHeightPx: number;
  skeletonLengthPx: number;
  tubeLengthCm: number;
};

type Binary = Uint8Array; // 0 or 1

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = dataUrl;
  });
}

function toGrayscaleAndBinarize(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  threshold: number
): Binary {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  const out = new Uint8Array(w * h);
  for (let i = 0, p = 0; i < d.length; i += 4, p++) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    const a = d[i + 3];
    if (a < 16) {
      out[p] = 0;
      continue;
    }
    // perceptual luminance
    const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    // assume dark strokes on light paper; invert if necessary later
    out[p] = y < threshold ? 1 : 0;
  }
  return out;
}

function invertIfMostlyOn(binary: Binary) {
  let on = 0;
  for (let i = 0; i < binary.length; i++) on += binary[i];
  // if more than 50% pixels are "on", likely inverted background; invert
  if (on > binary.length * 0.5) {
    for (let i = 0; i < binary.length; i++) binary[i] = binary[i] ? 0 : 1;
  }
}

function computeBBox(binary: Binary, w: number, h: number) {
  let minX = w,
    minY = h,
    maxX = -1,
    maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (binary[y * w + x]) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return null;
  return { minX, minY, maxX, maxY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

// Zhang-Suen thinning (binary image: 1=foreground)
function zhangSuenThinning(binary: Binary, w: number, h: number): Binary {
  const img = new Uint8Array(binary); // copy
  const neighbors = (x: number, y: number) => {
    const p2 = img[(y - 1) * w + x];
    const p3 = img[(y - 1) * w + (x + 1)];
    const p4 = img[y * w + (x + 1)];
    const p5 = img[(y + 1) * w + (x + 1)];
    const p6 = img[(y + 1) * w + x];
    const p7 = img[(y + 1) * w + (x - 1)];
    const p8 = img[y * w + (x - 1)];
    const p9 = img[(y - 1) * w + (x - 1)];
    return [p2, p3, p4, p5, p6, p7, p8, p9] as const;
  };

  let changed = true;
  const toDelete: number[] = [];
  while (changed) {
    changed = false;
    toDelete.length = 0;
    // step 1
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = y * w + x;
        if (img[idx] !== 1) continue;
        const [p2, p3, p4, p5, p6, p7, p8, p9] = neighbors(x, y);
        const bp = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
        if (bp < 2 || bp > 6) continue;
        const ap =
          (p2 === 0 && p3 === 1 ? 1 : 0) +
          (p3 === 0 && p4 === 1 ? 1 : 0) +
          (p4 === 0 && p5 === 1 ? 1 : 0) +
          (p5 === 0 && p6 === 1 ? 1 : 0) +
          (p6 === 0 && p7 === 1 ? 1 : 0) +
          (p7 === 0 && p8 === 1 ? 1 : 0) +
          (p8 === 0 && p9 === 1 ? 1 : 0) +
          (p9 === 0 && p2 === 1 ? 1 : 0);
        if (ap !== 1) continue;
        if (p2 * p4 * p6 !== 0) continue;
        if (p4 * p6 * p8 !== 0) continue;
        toDelete.push(idx);
      }
    }
    if (toDelete.length) {
      changed = true;
      for (const idx of toDelete) img[idx] = 0;
    }

    toDelete.length = 0;
    // step 2
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = y * w + x;
        if (img[idx] !== 1) continue;
        const [p2, p3, p4, p5, p6, p7, p8, p9] = neighbors(x, y);
        const bp = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
        if (bp < 2 || bp > 6) continue;
        const ap =
          (p2 === 0 && p3 === 1 ? 1 : 0) +
          (p3 === 0 && p4 === 1 ? 1 : 0) +
          (p4 === 0 && p5 === 1 ? 1 : 0) +
          (p5 === 0 && p6 === 1 ? 1 : 0) +
          (p6 === 0 && p7 === 1 ? 1 : 0) +
          (p7 === 0 && p8 === 1 ? 1 : 0) +
          (p8 === 0 && p9 === 1 ? 1 : 0) +
          (p9 === 0 && p2 === 1 ? 1 : 0);
        if (ap !== 1) continue;
        if (p2 * p4 * p8 !== 0) continue;
        if (p2 * p6 * p8 !== 0) continue;
        toDelete.push(idx);
      }
    }
    if (toDelete.length) {
      changed = true;
      for (const idx of toDelete) img[idx] = 0;
    }
  }
  return img;
}

function skeletonLengthPx(skel: Binary, w: number, h: number) {
  let length = 0;
  const sqrt2 = Math.SQRT2;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (!skel[idx]) continue;
      // count edges to avoid double counting: right, down, down-right, down-left
      if (x + 1 < w && skel[y * w + (x + 1)]) length += 1;
      if (y + 1 < h && skel[(y + 1) * w + x]) length += 1;
      if (x + 1 < w && y + 1 < h && skel[(y + 1) * w + (x + 1)]) length += sqrt2;
      if (x - 1 >= 0 && y + 1 < h && skel[(y + 1) * w + (x - 1)]) length += sqrt2;
    }
  }
  // fallback if too sparse (e.g. single pixels), approximate by count
  if (length < 1) {
    let cnt = 0;
    for (let i = 0; i < skel.length; i++) cnt += skel[i];
    length = cnt;
  }
  return length;
}

export async function estimateTubeLengthCmFromSketch({
  sketchDataUrl,
  targetWidthMm,
  fillRatio = 0.9,
  threshold = 210,
  maxDim = 1024,
}: {
  sketchDataUrl: string;
  targetWidthMm: number;
  fillRatio?: number;
  threshold?: number;
  maxDim?: number;
}): Promise<LineLengthEstimate> {
  const img = await loadImage(sketchDataUrl);
  const srcW = img.naturalWidth || img.width;
  const srcH = img.naturalHeight || img.height;
  const scale = Math.min(1, maxDim / Math.max(srcW, srcH));
  const w = Math.max(1, Math.round(srcW * scale));
  const h = Math.max(1, Math.round(srcH * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not available");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);

  const bin = toGrayscaleAndBinarize(ctx, w, h, threshold);
  invertIfMostlyOn(bin);
  const bbox = computeBBox(bin, w, h);
  if (!bbox) {
    return { bboxWidthPx: 0, bboxHeightPx: 0, skeletonLengthPx: 0, tubeLengthCm: 0 };
  }

  const skel = zhangSuenThinning(bin, w, h);
  const lenPx = skeletonLengthPx(skel, w, h);

  const widthMm = clamp(targetWidthMm, 200, 2000);
  const bboxWidthPx = Math.max(1, bbox.width);
  const mmPerPx = (widthMm * fillRatio) / bboxWidthPx;
  const tubeLengthMm = lenPx * mmPerPx;
  const tubeLengthCm = tubeLengthMm / 10;

  return {
    bboxWidthPx: bbox.width,
    bboxHeightPx: bbox.height,
    skeletonLengthPx: lenPx,
    tubeLengthCm,
  };
}

function luminanceOf(r: number, g: number, b: number) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function percentile(values: Float32Array, p: number) {
  const arr = Array.from(values);
  arr.sort((a, b) => a - b);
  const idx = clamp(Math.floor((arr.length - 1) * p), 0, arr.length - 1);
  return arr[idx];
}

function toBrightMask(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  pctl: number
): Binary {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  const Y = new Float32Array(w * h);
  for (let i = 0, p = 0; i < d.length; i += 4, p++) {
    const a = d[i + 3];
    if (a < 16) {
      Y[p] = 0;
      continue;
    }
    Y[p] = luminanceOf(d[i], d[i + 1], d[i + 2]);
  }
  const thr = percentile(Y, pctl); // e.g. 85th percentile
  const out = new Uint8Array(w * h);
  for (let p = 0; p < Y.length; p++) {
    // keep only the brightest pixels (neon/glow)
    out[p] = Y[p] >= thr ? 1 : 0;
  }
  return out;
}

/**
 * ネオン“写真”からチューブ長を推定（AI生成結果やサンプル商品写真向け）
 * - 明るい発光部分を抽出 → 細線化 → 総延長(px) → 横幅(mm)でスケール換算
 * NOTE: 写真はハローで太く見えるので、細線化して中心線化する。
 */
export async function estimateTubeLengthCmFromNeonPhoto({
  imageDataUrl,
  targetWidthMm,
  brightPercentile = 0.96, // より厳しく（発光の芯だけを拾うように）
  maxDim = 1024,
}: {
  imageDataUrl: string;
  targetWidthMm: number;
  brightPercentile?: number; // 0..1
  maxDim?: number;
}): Promise<LineLengthEstimate> {
  const img = await loadImage(imageDataUrl);
  const srcW = img.naturalWidth || img.width;
  const srcH = img.naturalHeight || img.height;
  const scale = Math.min(1, maxDim / Math.max(srcW, srcH));
  const w = Math.max(1, Math.round(srcW * scale));
  const h = Math.max(1, Math.round(srcH * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not available");
  ctx.drawImage(img, 0, 0, w, h);

  // 輝度ベースのマスク作成。パーセンタイルを上げることで、ハロー（光の漏れ）を排除し、
  // チューブの芯の部分だけを抽出して線長を測る。
  const bin = toBrightMask(ctx, w, h, clamp(brightPercentile, 0.8, 0.99));
  const bbox = computeBBox(bin, w, h);
  if (!bbox) {
    return { bboxWidthPx: 0, bboxHeightPx: 0, skeletonLengthPx: 0, tubeLengthCm: 0 };
  }

  const skel = zhangSuenThinning(bin, w, h);
  const lenPx = skeletonLengthPx(skel, w, h);

  const widthMm = clamp(targetWidthMm, 200, 2000);
  
  // アクリルパネルの幅(px)を推定。
  // AI生成画像の場合、アクリルが画像幅いっぱいに広がることが多いので、
  // 金具検出に失敗した場合は画像幅の95%程度をアクリル幅として仮定する。
  const estimatedPanelPx = estimatePanelWidthPxFromStandoffs(ctx, w, h);
  const panelWidthPx = estimatedPanelPx ?? Math.round(w * 0.95);
  
  const mmPerPx = widthMm / Math.max(1, panelWidthPx);
  const tubeLengthMm = lenPx * mmPerPx;
  
  // 補正係数: 写真から抽出した線長は、細かなノイズや二重線化で過大になりやすいため、
  // 経験的な補正（0.8倍程度）をかける。
  const tubeLengthCm = (tubeLengthMm / 10) * 0.8;

  return {
    bboxWidthPx: bbox.width,
    bboxHeightPx: bbox.height,
    skeletonLengthPx: lenPx,
    tubeLengthCm,
  };
}

function estimatePanelWidthPxFromStandoffs(ctx: CanvasRenderingContext2D, w: number, h: number): number | null {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  const getY = (x: number, y: number) => {
    const i = (y * w + x) * 4;
    return luminanceOf(d[i], d[i + 1], d[i + 2]);
  };

  const findDarkest = (x0: number, x1: number, y0: number, y1: number) => {
    let bestX = x0;
    let bestY = y0;
    let best = 1e9;
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const Y = getY(x, y);
        if (Y < best) {
          best = Y;
          bestX = x;
          bestY = y;
        }
      }
    }
    return { x: bestX, y: bestY, Y: best };
  };

  const rx = Math.floor(w * 0.35);
  const ry = Math.floor(h * 0.35);
  const tl = findDarkest(0, rx, 0, ry);
  const tr = findDarkest(w - rx, w, 0, ry);
  const bl = findDarkest(0, rx, h - ry, h);
  const br = findDarkest(w - rx, w, h - ry, h);

  // sanity: standoff candidates should be "dark enough"
  const darkEnough = (p: { Y: number }) => p.Y < 80;
  if (![tl, tr, bl, br].every(darkEnough)) return null;

  const topSpan = tr.x - tl.x;
  const bottomSpan = br.x - bl.x;
  const span = Math.round((topSpan + bottomSpan) / 2);
  if (span < w * 0.3) return null;

  // approximate: standoff centers are slightly inset from panel edges; compensate a bit
  const pad = Math.round(w * 0.01); // ~1% of width
  return span + pad * 2;
}


