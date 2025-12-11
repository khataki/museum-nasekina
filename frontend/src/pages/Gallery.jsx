import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import SEO from '../components/SEO';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get('/api/gallery');
      const galleryData = response.data || [];
      setGallery(Array.isArray(galleryData) ? galleryData : []);
    } catch (error) {
      console.error('Ошибка загрузки галереи:', error);
      setGallery([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(gallery.map(item => item.category).filter(Boolean))];

  const filteredGallery = filter === 'all' 
    ? gallery 
    : gallery.filter(item => item.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-2xl text-crimson-700">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <SEO 
        title="Галерея"
        description="Фотогалерея музея истории крестьянского быта: экспонаты, экскурсии, мастер-классы"
        url="https://museum-nasekina.ru/gallery"
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-crimson-800 mb-4">
            Галерея
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-crimson-600 to-transparent rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Фотографии из жизни музея
          </p>
        </motion.div>

        {/* Фильтры */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  filter === cat
                    ? 'bg-crimson-700 text-white shadow-lg'
                    : 'bg-white text-crimson-700 hover:bg-crimson-50'
                }`}
              >
                {cat === 'all' ? 'Все' : cat}
              </button>
            ))}
          </div>
        )}

        {/* Галерея */}
        {!filteredGallery || filteredGallery.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Фотографии пока не добавлены</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGallery.map((item, index) => (
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
                  {item.category && (
                    <p className="text-sm text-gray-600">{item.category}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Модальное окно */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-5xl w-full"
              >
                <img
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    {selectedImage.title}
                  </h3>
                  {selectedImage.description && (
                    <p className="text-gray-300">{selectedImage.description}</p>
                  )}
                </div>
              </motion.div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-crimson-300 transition-colors"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
