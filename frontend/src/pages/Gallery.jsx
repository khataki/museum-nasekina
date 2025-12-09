import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import SEO from "../components/SEO";
const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [categories, setCategories] = useState(['Все']);
  const [activeCategory, setActiveCategory] = useState('Все');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryItems();
    fetchCategories();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await axios.get('/api/gallery');
      setGalleryItems(response.data);
    } catch (error) {
      console.error('Ошибка загрузки галереи:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/gallery/categories');
      setCategories(['Все', ...response.data]);
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
    }
  };

  const filteredItems = activeCategory === 'Все'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-2xl text-crimson-700">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-crimson-800 mb-4">
            Галерея
          </h1>
          <div className="ornament-divider max-w-md mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Фотографии наших экспозиций и мероприятий
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-crimson-700 text-white shadow-lg'
                  : 'bg-white text-crimson-700 border-2 border-crimson-300 hover:border-crimson-600'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">В этой категории пока нет изображений</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedImage(item)}
                className="folk-card cursor-pointer group overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-lg text-crimson-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg overflow-hidden max-w-4xl w-full"
              >
                <img
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  className="w-full max-h-[70vh] object-contain"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-display font-bold text-crimson-800 mb-2">
                    {selectedImage.title}
                  </h3>
                  {selectedImage.description && (
                    <p className="text-gray-700 mb-2">{selectedImage.description}</p>
                  )}
                  <p className="text-gray-600">{selectedImage.category}</p>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="mt-4 folk-button"
                  >
                    Закрыть
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;