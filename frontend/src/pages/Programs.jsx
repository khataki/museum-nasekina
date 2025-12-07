import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import BookingForm from '../components/BookingForm';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get('/api/programs');
      setPrograms(response.data);
    } catch (error) {
      console.error('Ошибка загрузки программ:', error);
      // Моковые данные для демонстрации
      setPrograms([
        {
          id: 1,
          title: 'Обзорная экскурсия',
          description: 'Увлекательное путешествие по музею с рассказом о традициях и быте сибирских крестьян',
          duration: '1.5 часа',
          price: '300 руб/чел',
          max_participants: 25,
        },
        {
          id: 2,
          title: 'Мастер-класс по гончарному делу',
          description: 'Научитесь создавать традиционную посуду на гончарном круге под руководством опытного мастера',
          duration: '2 часа',
          price: '800 руб/чел',
          max_participants: 10,
        },
        {
          id: 3,
          title: 'Народные ремёсла',
          description: 'Познакомьтесь с традиционными сибирскими ремёслами: плетение, ткачество, резьба по дереву',
          duration: '2.5 часа',
          price: '600 руб/чел',
          max_participants: 15,
        },
        {
          id: 4,
          title: 'Крестьянская кухня',
          description: 'Приготовьте традиционные блюда сибирской кухни по старинным рецептам',
          duration: '3 часа',
          price: '1200 руб/чел',
          max_participants: 12,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (program) => {
    setSelectedProgram(program);
    window.scrollTo({
      top: document.getElementById('booking-form').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-crimson-700">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-crimson-800 mb-4">
            Наши программы
          </h1>
          <div className="ornament-divider max-w-md mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Выберите программу и окунитесь в мир традиций сибирского крестьянства
          </p>
        </motion.div>

        {/* Список программ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="folk-card overflow-hidden group"
            >
              {/* Изображение программы */}
              <div className="h-64 bg-gradient-to-br from-crimson-200 to-ochre-200 flex items-center justify-center overflow-hidden">
                <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                  {['🏺', '🎨', '🧵', '🍲'][index % 4]}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-display font-bold text-crimson-800 mb-3">
                  {program.title}
                </h3>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {program.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-crimson-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {program.duration}
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    {program.price}
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-deepBlue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    до {program.max_participants} чел
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBooking(program)}
                  className="folk-button w-full"
                >
                  Записаться
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Форма записи */}
        <div id="booking-form" className="max-w-3xl mx-auto">
          <BookingForm
            programId={selectedProgram?.id}
            programTitle={selectedProgram?.title}
          />
        </div>
      </div>
    </div>
  );
};

export default Programs;
