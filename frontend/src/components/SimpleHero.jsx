import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SimpleHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 px-4">
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0">
        {/* Градиент поверх фото для читаемости текста */}
        <div className="absolute inset-0 bg-gradient-to-br from-crimson-900/40 via-transparent to-ochre-900/40 z-10"></div>
        
        {/* Фото фон */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/hero-bg.jpg)',
          }}
        />
        
        {/* Запасной градиент если фото нет */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-cream-100 to-ochre-100"></div>
      </div>

      {/* Декоративные узоры (убираем на мобилке) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 z-20 pointer-events-none hidden sm:block"
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
        className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 z-20 pointer-events-none hidden sm:block"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="200" cy="200" r="150" fill="#b91c1c" opacity="0.3"/>
          <circle cx="200" cy="200" r="100" fill="#ca8a04" opacity="0.2"/>
        </svg>
      </motion.div>

      {/* Контент Hero */}
      <div className="relative z-30 container mx-auto px-4 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Glassmorphism карточка */}
          <div className="backdrop-blur-xl bg-white/50 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 border border-white/60 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-crimson-900 mb-4 md:mb-6 drop-shadow-md leading-tight">
                Музей истории<br className="hidden sm:block" />{' '}
                <span className="sm:hidden"> </span>
                крестьянского быта
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center mb-4 md:mb-8"
            >
              <div className="h-0.5 md:h-1 w-32 md:w-48 bg-gradient-to-r from-transparent via-crimson-600 to-transparent rounded-full"></div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 mb-3 md:mb-4 font-semibold"
            >
              д. Насекина, Тюменская область
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-10 leading-relaxed max-w-2xl mx-auto px-2"
            >
              Погрузитесь в атмосферу сибирской деревни XIX-XX веков. 
              Познакомьтесь с традициями, бытом и ремёслами наших предков.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
            >
              <Link to="/programs" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(185, 28, 28, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 md:px-10 py-3 md:py-4 bg-gradient-to-r from-crimson-700 to-crimson-900 text-white rounded-xl font-semibold text-base md:text-lg shadow-lg hover:shadow-2xl transition-all"
                >
                  Наши программы
                </motion.button>
              </Link>
              
              <Link to="/about" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 md:px-10 py-3 md:py-4 bg-white/60 backdrop-blur-sm text-crimson-900 rounded-xl border-2 border-crimson-700 font-semibold text-base md:text-lg hover:bg-white/80 transition-all shadow-lg"
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
