'use client';

import { useState, useRef, useEffect } from 'react';

interface CropToolProps {
  image: string;
  onCropComplete: (croppedImageUrl: string) => void;
  onCancel: () => void;
}

interface CropArea {
  startX: number;
  startY: number;
  width: number;
  height: number;
}

export default function CropTool({ image, onCropComplete, onCancel }: CropToolProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [cropArea, setCropArea] = useState<CropArea | null>(null);
  const [tempArea, setTempArea] = useState<CropArea | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scale, setScale] = useState(1);

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
  }, [cropArea, tempArea, imageLoaded]);

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

    // 選択範囲を描画
    const area = tempArea || cropArea;
    if (area) {
      // 暗いオーバーレイ
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 選択範囲をクリア（明るく表示）
      ctx.clearRect(area.startX, area.startY, area.width, area.height);
      ctx.drawImage(
        img,
        area.startX / scaleFactor,
        area.startY / scaleFactor,
        area.width / scaleFactor,
        area.height / scaleFactor,
        area.startX,
        area.startY,
        area.width,
        area.height
      );

      // 選択範囲の枠線
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.strokeRect(area.startX, area.startY, area.width, area.height);

      // コーナーハンドル
      ctx.fillStyle = '#3b82f6';
      const handleSize = 10;
      ctx.fillRect(area.startX - handleSize / 2, area.startY - handleSize / 2, handleSize, handleSize);
      ctx.fillRect(area.startX + area.width - handleSize / 2, area.startY - handleSize / 2, handleSize, handleSize);
      ctx.fillRect(area.startX - handleSize / 2, area.startY + area.height - handleSize / 2, handleSize, handleSize);
      ctx.fillRect(area.startX + area.width - handleSize / 2, area.startY + area.height - handleSize / 2, handleSize, handleSize);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setTempArea({
      startX: x,
      startY: y,
      width: 0,
      height: 0,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !tempArea) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTempArea({
      startX: Math.min(tempArea.startX, x),
      startY: Math.min(tempArea.startY, y),
      width: Math.abs(x - tempArea.startX),
      height: Math.abs(y - tempArea.startY),
    });
  };

  const handleMouseUp = () => {
    if (tempArea && tempArea.width > 10 && tempArea.height > 10) {
      setCropArea(tempArea);
    }
    setIsDrawing(false);
    setTempArea(null);
  };

  const handleCrop = () => {
    if (!cropArea || !imageRef.current) return;

    const img = imageRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 元画像のサイズで切り取り
    const actualX = cropArea.startX / scale;
    const actualY = cropArea.startY / scale;
    const actualWidth = cropArea.width / scale;
    const actualHeight = cropArea.height / scale;

    canvas.width = actualWidth;
    canvas.height = actualHeight;

    ctx.drawImage(
      img,
      actualX,
      actualY,
      actualWidth,
      actualHeight,
      0,
      0,
      actualWidth,
      actualHeight
    );

    const croppedImageUrl = canvas.toDataURL('image/png');
    onCropComplete(croppedImageUrl);
  };

  const handleReset = () => {
    setCropArea(null);
    setTempArea(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-900">✂️ 看板を選択してください</h3>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">📌 使い方</h4>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>画像上でマウスをドラッグして、看板の範囲を選択してください</li>
              <li>選択範囲は青い枠で表示されます</li>
              <li>選択をやり直す場合は「リセット」ボタンをクリック</li>
              <li>範囲が決まったら「切り取り完了」ボタンをクリック</li>
            </ol>
          </div>

          {/* Canvas */}
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 mb-4">
            <div className="flex justify-center p-4">
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
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
              disabled={!cropArea}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                cropArea
                  ? 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              ✂️ 切り取り完了
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

