import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ImageUpload = ({ onImageUploaded, currentImage, type = 'programs' }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Превью
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Загрузка на сервер
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(`/api/upload/${type}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        onImageUploaded(response.data.imageUrl);
      }
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      alert('Не удалось загрузить изображение');
      setPreview(currentImage);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageUploaded(null);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        {preview ? (
          <div className="relative group">
            <img
              src={preview.startsWith('http') || preview.startsWith('/') ? preview : preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border-4 border-crimson-300"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-48 border-4 border-dashed border-crimson-300 rounded-lg cursor-pointer hover:border-crimson-600 transition-colors bg-cream-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-12 h-12 mb-3 text-crimson-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mb-2 text-sm text-gray-700">
                <span className="font-semibold">Нажмите для загрузки</span> или перетащите
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF до 5MB</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        )}
      </div>

      {uploading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center space-x-2 text-crimson-700"
        >
          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Загрузка...</span>
        </motion.div>
      )}
    </div>
  );
};

export default ImageUpload;
