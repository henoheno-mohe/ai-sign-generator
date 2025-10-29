'use client';

import { useState, useRef } from 'react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string, file?: File) => void;
  onReferenceImageUpload?: (imageUrl: string, file?: File) => void;
}

export default function ImageUpload({ onImageUpload, onReferenceImageUpload }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const referenceFileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // ファイル形式のチェック
    if (!file.type.startsWith('image/')) {
      alert('画像ファイルを選択してください。');
      return;
    }

    // ファイルサイズのチェック（5MB以下）
    if (file.size > 5 * 1024 * 1024) {
      alert('ファイルサイズは5MB以下にしてください。');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setUploadedImage(imageUrl);
      onImageUpload(imageUrl, file);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleReferenceFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('画像ファイルを選択してください。');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('ファイルサイズは5MB以下にしてください。');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setReferenceImage(imageUrl);
      if (onReferenceImageUpload) {
        onReferenceImageUpload(imageUrl, file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReferenceFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleReferenceFile(e.target.files[0]);
    }
  };

  const handleReferenceClick = () => {
    referenceFileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        建屋の写真をアップロード
      </h2>
      
      {!uploadedImage ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                写真をドラッグ&ドロップ
              </p>
              <p className="text-gray-500">または</p>
              <button className="text-blue-600 hover:text-blue-500 font-medium">
                ファイルを選択
              </button>
            </div>
            <p className="text-sm text-gray-500">
              PNG, JPG, JPEG形式、5MB以下
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={uploadedImage}
              alt="アップロードされた画像"
              className="w-full max-h-96 object-contain rounded-lg bg-gray-50"
            />
            <button
              onClick={() => {
                setUploadedImage(null);
                onImageUpload('', undefined);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-green-600 font-medium">
            ✓ 画像がアップロードされました
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />

      {/* 参考画像アップロード（オプション） */}
      {uploadedImage && onReferenceImageUpload && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            参考画像（オプション）
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            こんな看板にしたい！という参考画像をアップロードすると、そのスタイルを再現します。
          </p>
          
          {!referenceImage ? (
            <div
              className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-blue-400 bg-blue-50/30"
              onClick={handleReferenceClick}
            >
              <div className="space-y-3">
                <div className="mx-auto w-10 h-10 text-blue-500">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium text-gray-900">
                    参考画像をアップロード
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    クリックして画像を選択
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative">
                <img
                  src={referenceImage}
                  alt="参考画像"
                  className="w-full max-h-64 object-contain rounded-lg bg-gray-50 border-2 border-blue-200"
                />
                <button
                  onClick={() => {
                    setReferenceImage(null);
                    if (onReferenceImageUpload) {
                      onReferenceImageUpload('', undefined);
                    }
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-blue-600 font-medium">
                ✓ 参考画像が設定されました（この画像のスタイルを再現します）
              </p>
            </div>
          )}

          <input
            ref={referenceFileInputRef}
            type="file"
            accept="image/*"
            onChange={handleReferenceFileInput}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
