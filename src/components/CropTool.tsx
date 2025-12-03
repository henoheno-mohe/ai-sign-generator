'use client';

import { useState, useRef, useEffect } from 'react';

interface CropToolProps {
  image: string;
  onCropComplete: (croppedImageUrl: string) => void;
  onCancel: () => void;
}

interface Point {
  x: number;
  y: number;
}

export default function CropTool({ image, onCropComplete, onCancel }: CropToolProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const [perspectivePoints, setPerspectivePoints] = useState<Point[]>([]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
      drawCanvas();
    };
    img.src = image;
  }, [image]);

  useEffect(() => {
    if (imageLoaded) {
      drawCanvas();
    }
  }, [imageLoaded, perspectivePoints]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvasサイズを画像に合わせる（最大幅800px）
    const maxWidth = 800;
    const scaleFactor = img.width > maxWidth ? maxWidth / img.width : 1;
    setScale(scaleFactor);

    canvas.width = img.width * scaleFactor;
    canvas.height = img.height * scaleFactor;

    // 画像を描画
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // 4点指定モード
    if (perspectivePoints.length > 0) {
      // 暗いオーバーレイ
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 選択領域を明るく表示
      if (perspectivePoints.length >= 3) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.moveTo(perspectivePoints[0].x, perspectivePoints[0].y);
        for (let i = 1; i < perspectivePoints.length; i++) {
          ctx.lineTo(perspectivePoints[i].x, perspectivePoints[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // ポイント間の線を描画
      if (perspectivePoints.length > 1) {
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(perspectivePoints[0].x, perspectivePoints[0].y);
        for (let i = 1; i < perspectivePoints.length; i++) {
          ctx.lineTo(perspectivePoints[i].x, perspectivePoints[i].y);
        }
        if (perspectivePoints.length === 4) {
          ctx.closePath();
        }
        ctx.stroke();
      }

      // ポイントを描画
      perspectivePoints.forEach((point, index) => {
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
        ctx.fill();
        
        // ポイント番号を表示
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((index + 1).toString(), point.x, point.y);
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // クリックで点を追加（最大4点）
    if (perspectivePoints.length < 4) {
      setPerspectivePoints([...perspectivePoints, { x, y }]);
    }
  };

  // 4点を自動的に並び替え（左上→右上→右下→左下）
  const sortPoints = (points: Point[]): Point[] => {
    if (points.length !== 4) return points;

    // 重心を計算
    const centerX = points.reduce((sum, p) => sum + p.x, 0) / 4;
    const centerY = points.reduce((sum, p) => sum + p.y, 0) / 4;

    // 各点の角度を計算（重心からの角度）
    const pointsWithAngle = points.map(p => ({
      ...p,
      angle: Math.atan2(p.y - centerY, p.x - centerX)
    }));

    // 角度でソート（-π から π）
    pointsWithAngle.sort((a, b) => a.angle - b.angle);

    // 左上から時計回りに並び替え
    // 最も上にある点を見つける
    let topIndex = 0;
    let minY = pointsWithAngle[0].y;
    for (let i = 1; i < 4; i++) {
      if (pointsWithAngle[i].y < minY) {
        minY = pointsWithAngle[i].y;
        topIndex = i;
      }
    }

    // 左上から時計回りの順番に並び替え
    const sorted: Point[] = [];
    for (let i = 0; i < 4; i++) {
      const idx = (topIndex + i) % 4;
      sorted.push({
        x: pointsWithAngle[idx].x,
        y: pointsWithAngle[idx].y
      });
    }

    // 最初の点が左上か右上かチェック（X座標で判定）
    if (sorted[0].x > sorted[1].x) {
      // 右上から始まっている場合、逆順にする
      sorted.reverse();
      // さらに最後の要素を先頭に移動
      const last = sorted.pop()!;
      sorted.unshift(last);
    }

    return sorted;
  };

  // 透視変換を実行（ピクセル単位のマッピング）
  const applyPerspectiveTransform = (): string | null => {
    if (perspectivePoints.length !== 4 || !imageRef.current) return null;

    const img = imageRef.current;
    
    // 4点を自動的に並び替え
    const orderedPoints = sortPoints(perspectivePoints);
    
    // 元画像サイズに変換
    const srcPoints = orderedPoints.map(p => ({
      x: p.x / scale,
      y: p.y / scale
    }));

    // 出力サイズを計算（上辺と下辺の平均幅、左辺と右辺の平均高さ）
    const topWidth = Math.sqrt(
      Math.pow(srcPoints[1].x - srcPoints[0].x, 2) + 
      Math.pow(srcPoints[1].y - srcPoints[0].y, 2)
    );
    const bottomWidth = Math.sqrt(
      Math.pow(srcPoints[2].x - srcPoints[3].x, 2) + 
      Math.pow(srcPoints[2].y - srcPoints[3].y, 2)
    );
    const leftHeight = Math.sqrt(
      Math.pow(srcPoints[3].x - srcPoints[0].x, 2) + 
      Math.pow(srcPoints[3].y - srcPoints[0].y, 2)
    );
    const rightHeight = Math.sqrt(
      Math.pow(srcPoints[2].x - srcPoints[1].x, 2) + 
      Math.pow(srcPoints[2].y - srcPoints[1].y, 2)
    );
    
    // 元のサイズで出力（補正はAI再生成時に実施）
    const outputWidth = Math.round((topWidth + bottomWidth) / 2);
    const outputHeight = Math.round((leftHeight + rightHeight) / 2);

    // Canvasで透視変換を実行
    const canvas = document.createElement('canvas');
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    // 一時キャンバスで元画像を描画
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = img.width;
    tempCanvas.height = img.height;
    const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
    if (!tempCtx) return null;
    tempCtx.drawImage(img, 0, 0);
    const imageData = tempCtx.getImageData(0, 0, img.width, img.height);

    // 出力画像データを作成
    const outputImageData = ctx.createImageData(outputWidth, outputHeight);

    // 逆透視変換でピクセルをマッピング
    for (let y = 0; y < outputHeight; y++) {
      for (let x = 0; x < outputWidth; x++) {
        // 正規化座標 (0-1)
        const u = x / outputWidth;
        const v = y / outputHeight;

        // バイリニア補間で元画像の座標を計算
        const srcX = 
          srcPoints[0].x * (1 - u) * (1 - v) +
          srcPoints[1].x * u * (1 - v) +
          srcPoints[2].x * u * v +
          srcPoints[3].x * (1 - u) * v;
        
        const srcY = 
          srcPoints[0].y * (1 - u) * (1 - v) +
          srcPoints[1].y * u * (1 - v) +
          srcPoints[2].y * u * v +
          srcPoints[3].y * (1 - u) * v;

        // 元画像からピクセルを取得（バイリニア補間）
        const srcXFloor = Math.floor(srcX);
        const srcYFloor = Math.floor(srcY);
        const srcXCeil = Math.min(srcXFloor + 1, img.width - 1);
        const srcYCeil = Math.min(srcYFloor + 1, img.height - 1);
        
        const xFrac = srcX - srcXFloor;
        const yFrac = srcY - srcYFloor;

        if (srcXFloor >= 0 && srcXFloor < img.width && srcYFloor >= 0 && srcYFloor < img.height) {
          // 4つの隣接ピクセルを取得
          const getPixel = (px: number, py: number) => {
            const idx = (py * img.width + px) * 4;
            return [
              imageData.data[idx],
              imageData.data[idx + 1],
              imageData.data[idx + 2],
              imageData.data[idx + 3]
            ];
          };

          const p1 = getPixel(srcXFloor, srcYFloor);
          const p2 = getPixel(srcXCeil, srcYFloor);
          const p3 = getPixel(srcXFloor, srcYCeil);
          const p4 = getPixel(srcXCeil, srcYCeil);

          // バイリニア補間
          const outputIdx = (y * outputWidth + x) * 4;
          for (let c = 0; c < 4; c++) {
            const top = p1[c] * (1 - xFrac) + p2[c] * xFrac;
            const bottom = p3[c] * (1 - xFrac) + p4[c] * xFrac;
            outputImageData.data[outputIdx + c] = top * (1 - yFrac) + bottom * yFrac;
          }
        } else {
          // 範囲外は白
          const outputIdx = (y * outputWidth + x) * 4;
          outputImageData.data[outputIdx] = 255;
          outputImageData.data[outputIdx + 1] = 255;
          outputImageData.data[outputIdx + 2] = 255;
          outputImageData.data[outputIdx + 3] = 255;
        }
      }
    }

    ctx.putImageData(outputImageData, 0, 0);
    return canvas.toDataURL('image/png', 1.0); // 最高品質で出力
  };

  const handleCrop = () => {
    if (perspectivePoints.length !== 4) {
      alert('看板の4隅を全て指定してください');
      return;
    }

    const transformedImageUrl = applyPerspectiveTransform();
    if (transformedImageUrl) {
      onCropComplete(transformedImageUrl);
    } else {
      alert('透視変換に失敗しました');
    }
  };

  const handleReset = () => {
    setPerspectivePoints([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-900">🎯 看板の4隅を指定してください</h3>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">📌 使い方</h4>
            <ol className="text-sm text-green-800 space-y-1 list-decimal list-inside">
              <li className="font-semibold">看板の<span className="text-red-600">4つの角</span>をクリック（①②③④）</li>
              <li className="text-blue-600 font-medium">✨ 順番は自由！自動的に並び替えます</li>
              <li>4点を指定すると自動的に正面図に変換されます</li>
              <li>やり直す場合は「リセット」ボタンをクリック</li>
            </ol>
          </div>

          {/* Canvas */}
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 mb-4">
            <div className="flex justify-center p-4">
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                className="cursor-crosshair max-w-full"
                style={{ display: imageLoaded ? 'block' : 'none' }}
              />
              {!imageLoaded && (
                <div className="py-20 text-gray-500">画像を読み込み中...</div>
              )}
            </div>
          </div>

          {/* ボタン */}
          <div className="flex space-x-3">
            <button
              onClick={handleReset}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              🔄 リセット
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              キャンセル
            </button>
            <button
              onClick={handleCrop}
              disabled={perspectivePoints.length !== 4}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                perspectivePoints.length === 4
                  ? 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {perspectivePoints.length < 4
                ? `🎯 4点を指定 (${perspectivePoints.length}/4)`
                : '✂️ 切り取り完了'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
