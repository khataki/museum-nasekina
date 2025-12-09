import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const ParallaxHero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const hillsY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const treesY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const houseY = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);
  
  const [ornamentVisible, setOrnamentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrnamentVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-gradient-to-b from-sky-200 to-amber-50">
      {/* Параллакс слои */}
      <motion.div 
        style={{ y: skyY }}
        className="absolute inset-0 z-0"
      >
        <img src="/parallax/sky.svg" alt="" className="w-full h-full object-cover" />
      </motion.div>

      <motion.div 
        style={{ y: hillsY }}
        className="absolute inset-0 z-10"
      >
        <img src="/parallax/hills.svg" alt="" className="w-full h-full object-contain object-bottom" />
      </motion.div>

      <motion.div 
        style={{ y: treesY }}
        className="absolute inset-0 z-20"
      >
        <img src="/parallax/trees.svg" alt="" className="w-full h-full object-contain object-bottom" />
      </motion.div>

      <motion.div 
        style={{ y: houseY }}
        className="absolute inset-0 z-30"
      >
        <img src="/parallax/house.svg" alt="" className="w-full h-full object-contain object-bottom" />
      </motion.div>

      {/* Анимированные орнаменты по углам */}
      {ornamentVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
            className="absolute top-10 left-10 z-40"
          >
            <img src="/ornaments/pattern1.svg" alt="" className="w-32 h-32" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-10 right-10 z-40 transform scale-x-[-1]"
          >
            <img src="/ornaments/pattern1.svg" alt="" className="w-32 h-32" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-40"
          >
            <img src="/ornaments/pattern2.svg" alt="" className="w-64 h-24" />
          </motion.div>
        </>
      )}

      {/* Контент Hero */}
      <div className="relative z-40 h-full flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            {/* Glassmorphism карточка */}
            <div className="max-w-3xl mx-auto backdrop-blur-md bg-white/30 rounded-2xl p-8 md:p-12 border border-white/50 shadow-2xl">
              <h1 className="text-5xl md:text-7xl font-display font-bold text-crimson-900 mb-6 drop-shadow-lg">
                Музей истории
                <br />
                крестьянского быта
              </h1>
              
              <div className="flex justify-center mb-6">
                <div className="h-1 w-32 bg-gradient-to-r from-crimson-600 via-gold-500 to-crimson-600 rounded-full"></div>
              </div>
              
              <p className="text-xl md:text-2xl text-gray-800 mb-4 font-medium">
                д. Насекина, Тюменская область
              </p>
              
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Погрузитесь в атмосферу сибирской деревни XIX-XX веков
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/programs">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-crimson-700 to-crimson-900 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Наши программы
                  </motion.button>
                </Link>
                
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/50 backdrop-blur-sm text-crimson-900 rounded-lg border-2 border-crimson-700 font-semibold text-lg hover:bg-white/70 transition-all"
                  >
                    О музее
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Скролл индикатор */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
      >
        <svg className="w-8 h-8 text-crimson-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default ParallaxHero;
