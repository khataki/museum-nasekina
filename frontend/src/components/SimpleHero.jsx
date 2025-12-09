import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SimpleHero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновое изображение (замени на своё!) */}
      <div className="absolute inset-0 z-0">
        {/* Градиент поверх фото для читаемости текста */}
        <div className="absolute inset-0 bg-gradient-to-br from-crimson-900/40 via-transparent to-ochre-900/40 z-10"></div>
        
        {/* СЮДА ДОБАВЬ СВОЁ ФОТО! 
            Просто положи фото в /frontend/public/hero-bg.jpg 
            Или оставь градиент если фото нет */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/hero-bg.jpg)', // <-- Твоё фото здесь
            // Если фото нет - закомментируй строку выше
          }}
        />
        
        {/* Запасной градиент если фото нет */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-cream-100 to-ochre-100"></div>
      </div>

      {/* Декоративный узор в углу (легкий, ненавязчивый) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-64 h-64 z-20 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="0" cy="0" r="150" fill="#b91c1c" opacity="0.3"/>
          <circle cx="0" cy="0" r="100" fill="#ca8a04" opacity="0.2"/>
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 right-0 w-64 h-64 z-20 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="200" cy="200" r="150" fill="#b91c1c" opacity="0.3"/>
          <circle cx="200" cy="200" r="100" fill="#ca8a04" opacity="0.2"/>
        </svg>
      </motion.div>

      {/* Контент Hero */}
      <div className="relative z-30 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Glassmorphism карточка */}
          <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/50 rounded-3xl p-8 md:p-16 border border-white/60 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold text-crimson-900 mb-6 drop-shadow-md">
                Музей истории
                <br />
                крестьянского быта
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center mb-8"
            >
              <div className="h-1 w-48 bg-gradient-to-r from-transparent via-crimson-600 to-transparent rounded-full"></div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-800 mb-4 font-semibold"
            >
              д. Насекина, Тюменская область
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto"
            >
              Погрузитесь в атмосферу сибирской деревни XIX-XX веков. 
              Познакомьтесь с традициями, бытом и ремёслами наших предков.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/programs">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(185, 28, 28, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-gradient-to-r from-crimson-700 to-crimson-900 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all"
                >
                  Наши программы
                </motion.button>
              </Link>
              
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white/60 backdrop-blur-sm text-crimson-900 rounded-xl border-2 border-crimson-700 font-semibold text-lg hover:bg-white/80 transition-all shadow-lg"
                >
                  О музее
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Скролл индикатор */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-700 mb-2 font-medium">Прокрутите вниз</span>
          <svg className="w-6 h-6 text-crimson-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default SimpleHero;
