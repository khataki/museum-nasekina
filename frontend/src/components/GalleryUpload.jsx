import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const GalleryUpload = ({ images = [], onImagesChange }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const newImages = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.post('/api/upload/programs', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.success) {
          newImages.push(response.data.imageUrl);
        }
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        alert(`Не удалось загрузить ${file.name}`);
      }
    }

    onImagesChange([...images, ...newImages]);
    setUploading(false);
  };

  const handleRemove = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700 mb-2">
        Галерея фотографий (можно загрузить несколько)
      </div>

      {/* Превью загруженных изображений */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          <AnimatePresence>
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-square"
              >
                <img
                  src={image}
                  alt={`Фото ${index + 1}`}
                  className="w-full h-full object-cover rounded border-2 border-crimson-300"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Кнопка загрузки */}
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-crimson-300 rounded-lg cursor-pointer hover:border-crimson-600 transition-colors bg-cream-50">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 mb-2 text-crimson-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm text-gray-700">
            {uploading ? 'Загрузка...' : 'Нажмите для загрузки фото'}
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF до 5MB</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>

      {uploading && (
        <div className="flex items-center justify-center text-crimson-700">
          <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Загрузка изображений...
        </div>
      )}
    </div>
  );
};

export default GalleryUpload;
