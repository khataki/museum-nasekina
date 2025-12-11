import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onImageUploaded, currentImage, label = "Загрузить изображение" }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Предпросмотр
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Загрузка
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.url) {
        onImageUploaded(response.data.url);
      }
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      alert('Ошибка загрузки изображения');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-gray-700 font-semibold">{label}</span>
        <div className="mt-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-crimson-50 file:text-crimson-700
              hover:file:bg-crimson-100
              cursor-pointer"
          />
        </div>
      </label>

      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <div className="text-white">Загрузка...</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
