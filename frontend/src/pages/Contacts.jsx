import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import YandexMap from '../components/YandexMap';

const Contacts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-white py-12">
      <SEO 
        title="Контакты"
        description="Контактная информация музея истории крестьянского быта в д. Насекина: адрес, телефон, режим работы"
        url="https://museum-nasekina.ru/contacts"
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-crimson-800 mb-4">
            Контакты
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-crimson-600 to-transparent rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Свяжитесь с нами или посетите музей
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Контактная информация */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Адрес */}
            <div className="glass-card p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-crimson-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-crimson-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-display font-bold text-crimson-800 mb-2">Адрес</h3>
                  <p className="text-gray-700 leading-relaxed">
                    д. Насекина<br />
                    Тюменская область<br />
                    Россия
                  </p>
                </div>
              </div>
            </div>

            {/* Телефон */}
            <div className="glass-card p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-display font-bold text-crimson-800 mb-2">Телефон</h3>
                  <a href="tel:+7XXXXXXXXXX" className="text-gray-700 hover:text-crimson-700 transition-colors">
                    +7 (XXX) XXX-XX-XX
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="glass-card p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-deepBlue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-deepBlue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-display font-bold text-crimson-800 mb-2">Email</h3>
                  <a href="mailto:info@museum72tyasekina.ru" className="text-gray-700 hover:text-crimson-700 transition-colors">
                    info@museum72tyasekina.ru
                  </a>
                </div>
              </div>
            </div>

            {/* Режим работы */}
            <div className="glass-card p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-crimson-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-crimson-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-display font-bold text-crimson-800 mb-2">Режим работы</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Вторник - Воскресенье: 10:00 - 18:00<br />
                    Понедельник: выходной<br />
                    <span className="text-sm text-gray-500">Посещение по предварительной записи</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Как добраться */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="glass-card p-8 mb-8">
              <h3 className="text-2xl font-display font-bold text-crimson-800 mb-4">
                Как добраться
              </h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-crimson-700 mb-2">🚗 На автомобиле из Тюмени</h4>
                  <p className="leading-relaxed">
                    Двигайтесь по трассе Р404 в сторону Ялуторовска около 45 минут. 
                    Поворот на деревню Насекина будет справа. Расстояние: ~60 км.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-crimson-700 mb-2">🚌 На общественном транспорте</h4>
                  <p className="leading-relaxed">
                    Автобус №XXX от автовокзала Тюмени до остановки "Насекина". 
                    Время в пути: ~1 час 15 минут.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-crimson-700 mb-2">🅿️ Парковка</h4>
                  <p className="leading-relaxed">
                    Бесплатная парковка для посетителей рядом со зданием музея.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Карта */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-crimson-800 mb-8 text-center">
            Мы на карте
          </h2>
          <YandexMap />
        </div>

        {/* Призыв к действию */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card p-12">
            <h3 className="text-3xl font-display font-bold text-crimson-800 mb-4">
              Готовы посетить музей?
            </h3>
            <p className="text-xl text-gray-700 mb-8">
              Забронируйте экскурсию или мастер-класс прямо сейчас
            </p>
            <a href="/programs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-crimson-700 to-crimson-900 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all"
              >
                Выбрать программу
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contacts;
