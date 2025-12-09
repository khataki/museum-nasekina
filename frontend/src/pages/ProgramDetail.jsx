import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import BookingForm from '../components/BookingForm';
import SEO from "../components/SEO";

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    fetchProgram();
  }, [id]);

  const fetchProgram = async () => {
    try {
      const response = await axios.get(`/api/programs/${id}`);
      setProgram(response.data);
    } catch (error) {
      console.error('Ошибка загрузки программы:', error);
      navigate('/programs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-2xl text-crimson-700">Загрузка...</div>
      </div>
    );
  }

  if (!program) {
    return null;
  }

  const galleryImages = program.gallery || [];
  const allImages = program.image_url 
    ? [program.image_url, ...galleryImages]
    : galleryImages;

  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <SEO 
  title={program?.title}
  description={program?.description}
  image={program?.image_url}
  url={`https://museum-nasekina.ru/programs/${id}`}
  keywords={`${program?.title}, музей, мастер-класс, экскурсия, Тюмень`}
/>
      <div className="container mx-auto px-4">
        {/* Кнопка назад */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/programs')}
          className="mb-8 flex items-center text-crimson-700 hover:text-crimson-900 transition-colors"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Вернуться к программам
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основной контент */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="folk-card p-8"
            >
              {/* Заголовок */}
              <h1 className="text-4xl md:text-5xl font-display font-bold text-crimson-800 mb-6">
                {program.title}
              </h1>

              {/* Основные параметры */}
              <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b-2 border-crimson-200">
                <div className="flex items-center text-gray-700">
                  <svg className="w-6 h-6 mr-3 text-crimson-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="text-sm text-gray-500">Длительность</div>
                    <div className="font-semibold">{program.duration}</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <svg className="w-6 h-6 mr-3 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <div>
                    <div className="text-sm text-gray-500">Стоимость</div>
                    <div className="font-semibold">{program.price}</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <svg className="w-6 h-6 mr-3 text-deepBlue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div>
                    <div className="text-sm text-gray-500">Участников</div>
                    <div className="font-semibold">до {program.max_participants} чел</div>
                  </div>
                </div>
              </div>

              {/* Описание */}
              <div className="mb-8">
                <h2 className="text-2xl font-display font-bold text-crimson-800 mb-4">
                  Описание программы
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {program.detailed_description || program.description}
                </p>
              </div>

              {/* Требования */}
              {program.requirements && (
                <div className="mb-8">
                  <h2 className="text-2xl font-display font-bold text-crimson-800 mb-4">
                    Что взять с собой
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {program.requirements}
                  </p>
                </div>
              )}

              {/* Галерея */}
              {allImages.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-display font-bold text-crimson-800 mb-4">
                    Фотографии
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {allImages.map((image, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedImage(image)}
                        className="aspect-square overflow-hidden rounded-lg cursor-pointer border-4 border-crimson-200 hover:border-crimson-400 transition-colors"
                      >
                        <img
                          src={image}
                          alt={`${program.title} - фото ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Боковая панель */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="folk-card p-6"
              >
                <h3 className="text-2xl font-display font-bold text-crimson-800 mb-6">
                  Записаться
                </h3>
                <p className="text-gray-700 mb-6">
                  Заполните форму и мы свяжемся с вами для уточнения деталей
                </p>
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="folk-button w-full text-lg"
                >
                  Записаться на программу
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Модалка с формой бронирования */}
        <AnimatePresence>
          {showBookingForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBookingForm(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-cream-50 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-display font-bold text-crimson-800">
                    Запись на программу
                  </h2>
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="text-gray-500 hover:text-crimson-700 transition-colors"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <BookingForm
                  programId={program.id}
                  programTitle={program.title}
                  onSuccess={() => setShowBookingForm(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Модалка с увеличенным изображением */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            >
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                src={selectedImage}
                alt="Увеличенное фото"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-crimson-400 transition-colors"
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

export default ProgramDetail;
