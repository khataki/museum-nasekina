import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SimpleHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновое изображение с fallback градиентом */}
      <div className="absolute inset-0 z-0">
        {/* Попытка загрузить фото */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(./hero-bg.jpg)`,
          }}
        />
        
        {/* Fallback градиент (показывается если фото нет или не загрузилось) */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-100"></div>
        
        {/* Тёмный оверлей для читаемости текста */}
        <div className="absolute inset-0 bg-gradient-to-br from-crimson-900/30 via-transparent to-ochre-900/30"></div>
      </div>

      {/* Декоративные элементы (скрыты на мобилке) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden hidden lg:block">
        {/* Левый верхний угол */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
          animate={{ opacity: 0.1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-32 -left-32 w-96 h-96"
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <circle cx="200" cy="200" r="180" fill="#b91c1c" />
            <circle cx="200" cy="200" r="120" fill="#ca8a04" opacity="0.6"/>
            <circle cx="200" cy="200" r="60" fill="#b91c1c" opacity="0.4"/>
          </svg>
        </motion.div>

        {/* Правый нижний угол */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
          animate={{ opacity: 0.1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="absolute -bottom-32 -right-32 w-96 h-96"
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <circle cx="200" cy="200" r="180" fill="#ca8a04" />
            <circle cx="200" cy="200" r="120" fill="#b91c1c" opacity="0.6"/>
            <circle cx="200" cy="200" r="60" fill="#ca8a04" opacity="0.4"/>
          </svg>
        </motion.div>
      </div>

      {/* Контент */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          {/* Glassmorphism карточка */}
          <div className="backdrop-blur-2xl bg-white/60 rounded-3xl p-8 sm:p-10 md:p-14 lg:p-20 border border-white/70 shadow-2xl">
            {/* Заголовок */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-crimson-900 mb-6 leading-[1.1] tracking-tight">
                Музей истории
                <br />
                крестьянского быта
              </h1>
            </motion.div>
            
            {/* Декоративная линия */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="flex justify-center mb-8"
            >
              <div className="h-1 w-40 md:w-56 bg-gradient-to-r from-transparent via-crimson-600 to-transparent rounded-full shadow-sm"></div>
            </motion.div>
            
            {/* Подзаголовок */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl text-crimson-800 mb-6 font-semibold tracking-wide"
            >
              д. Насекина, Тюменская область
            </motion.p>
            
            {/* Описание */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto font-medium"
            >
              Погрузитесь в атмосферу сибирской деревни XIX–XX веков. 
              Познакомьтесь с традициями, бытом и ремёслами наших предков.
            </motion.p>
            
            {/* Кнопки */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-stretch sm:items-center"
            >
              <Link to="/programs" className="group">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-crimson-700 to-crimson-900 text-white rounded-2xl font-bold text-base md:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:from-crimson-800 hover:to-crimson-950"
                >
                  Наши программы
                </motion.button>
              </Link>
              
              <Link to="/about" className="group">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white/70 backdrop-blur-sm text-crimson-900 rounded-2xl border-2 border-crimson-700 font-bold text-base md:text-lg hover:bg-white/90 hover:border-crimson-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  О музее
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SimpleHero;
