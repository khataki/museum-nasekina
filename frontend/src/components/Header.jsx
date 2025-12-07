import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { path: '/', label: 'Главная' },
    { path: '/programs', label: 'Программы' },
    { path: '/about', label: 'О музее' },
    { path: '/gallery', label: 'Галерея' },
    { path: '/contacts', label: 'Контакты' },
  ];

  return (
    <header className="bg-crimson-700 text-white shadow-2xl relative overflow-hidden">
      {/* Декоративный верхний орнамент */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Логотип и название */}
          <Link to="/" className="flex items-center space-x-4 group">
            <motion.div 
              className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center text-crimson-900 font-bold text-2xl shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              МН
            </motion.div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-display font-bold leading-tight">
                Музей истории<br />
                <span className="text-gold-300">крестьянского быта</span>
              </h1>
              <p className="text-cream-200 text-sm mt-1">д. Насекина, Тюменская область</p>
            </div>
          </Link>

          {/* Навигация для десктопа */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className="text-lg font-medium hover:text-gold-300 transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-300 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
            <Link to="/admin">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gold-500 text-crimson-900 font-semibold rounded-md shadow-md hover:bg-gold-400 transition-colors duration-300"
              >
                Вход
              </motion.button>
            </Link>
          </nav>

          {/* Кнопка мобильного меню */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-crimson-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-6 pt-6 border-t border-crimson-600"
          >
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block py-3 text-lg hover:text-gold-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full mt-4 px-6 py-3 bg-gold-500 text-crimson-900 font-semibold rounded-md shadow-md">
                Вход
              </button>
            </Link>
          </motion.nav>
        )}
      </div>

      {/* Декоративный нижний орнамент */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-ochre-500 to-gold-500"></div>
    </header>
  );
};

export default Header;
