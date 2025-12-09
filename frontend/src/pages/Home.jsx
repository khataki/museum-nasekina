import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import NewsSection from '../components/NewsSection';
import ParallaxHero from '../components/ParallaxHero';

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Главная"
        description="Музей истории крестьянского быта в д. Насекина. Познакомьтесь с традициями, бытом и ремёслами сибирских крестьян XIX-XX веков."
        url="https://museum-nasekina.ru"
      />

      {/* Hero с параллаксом */}
      <ParallaxHero />

      {/* Основные направления */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-crimson-800 mb-4">
              Что вас ждёт
            </h2>
            <div className="h-1 w-32 bg-gradient-gold mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏛️',
                title: 'Экспозиции',
                description: 'Подлинные предметы быта, инструменты и утварь сибирских крестьян',
              },
              {
                icon: '🎨',
                title: 'Мастер-классы',
                description: 'Освойте традиционные ремёсла под руководством опытных мастеров',
              },
              {
                icon: '🍲',
                title: 'Крестьянская кухня',
                description: 'Попробуйте блюда, приготовленные по старинным рецептам',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass-card-hover p-8 text-center"
              >
                <div className="text-6xl mb-4">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-display font-bold text-crimson-800 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Новости */}
      <NewsSection />

      {/* О музее */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-crimson-800 mb-6">
                История музея
              </h2>
              <div className="h-1 w-24 bg-gradient-gold mb-8 rounded-full"></div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Музей истории крестьянского быта в деревне Насекина был основан для сохранения 
                и популяризации культурного наследия сибирского крестьянства.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Здесь собраны уникальные экспонаты, отражающие быт, традиции и ремёсла 
                крестьян Тюменской области XIX-XX веков.
              </p>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 gradient-crimson text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Узнать больше
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-card p-4 shadow-ornament">
                <div className="aspect-video bg-gradient-to-br from-crimson-200 to-ochre-200 rounded-lg flex items-center justify-center">
                  <span className="text-6xl">🏡</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="py-20 gradient-crimson text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Запланируйте визит
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Выберите программу и забронируйте удобное время для посещения
            </p>
            <Link to="/programs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-crimson-700 rounded-lg hover:bg-cream-50 transition-colors font-semibold text-lg shadow-lg"
              >
                Смотреть программы
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
