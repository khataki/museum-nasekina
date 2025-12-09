import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import NewsSection from '../components/NewsSection';
import SimpleHero from '../components/SimpleHero';
import OrnamentDivider from '../components/OrnamentDivider';

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Главная"
        description="Музей истории крестьянского быта в д. Насекина. Познакомьтесь с традициями, бытом и ремёслами сибирских крестьян XIX-XX веков."
        url="https://museum-nasekina.ru"
      />

      {/* Hero секция */}
      <SimpleHero />

      {/* Орнамент-разделитель */}
      <div className="py-12 bg-white">
        <OrnamentDivider variant="default" />
      </div>

      {/* Основные направления */}
      <section className="py-20 bg-gradient-to-br from-cream-50 via-white to-ochre-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-crimson-800 mb-6">
              Что вас ждёт
            </h2>
            <OrnamentDivider variant="flower" />
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
                className="glass-card-hover p-8 text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-6xl mb-6"
                >
                  {item.icon}
                </motion.div>
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

      {/* Орнамент-разделитель */}
      <div className="py-12 bg-white">
        <OrnamentDivider variant="default" />
      </div>

      {/* Новости */}
      <NewsSection />

      {/* Орнамент-разделитель */}
      <div className="py-12 bg-gradient-to-br from-cream-50 to-white">
        <OrnamentDivider variant="flower" />
      </div>

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
              <OrnamentDivider variant="default" />
              <p className="text-lg text-gray-700 leading-relaxed mb-6 mt-8">
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
                  className="px-8 py-4 bg-gradient-to-r from-crimson-700 to-crimson-900 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
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
              <div className="glass-card p-6 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-crimson-200 to-ochre-200 rounded-xl flex items-center justify-center">
                  {/* СЮДА МОЖЕШЬ ДОБАВИТЬ ФОТО МУЗЕЯ */}
                  <span className="text-8xl">🏡</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="py-20 bg-gradient-to-br from-crimson-800 to-crimson-900 text-white relative overflow-hidden">
        {/* Декоративные круги */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold-500 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500 rounded-full opacity-10 translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Запланируйте визит
            </h2>
            <div className="flex justify-center mb-8">
              <div className="h-1 w-48 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"></div>
            </div>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Выберите программу и забронируйте удобное время для посещения
            </p>
            <Link to="/programs">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-crimson-700 rounded-xl hover:bg-cream-50 transition-colors font-semibold text-lg shadow-2xl"
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
