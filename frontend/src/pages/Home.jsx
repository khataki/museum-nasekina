import React from "react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NewsSection from "../components/NewsSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Главная"
        description="Музей истории крестьянского быта в д. Насекина. Познакомьтесь с традициями, бытом и ремёслами сибирских крестьян XIX-XX веков."
        url="https://museum-nasekina.ru"
      />
      {/* Hero секция */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-crimson-100 via-cream-50 to-ochre-100 overflow-hidden">
        <div className="geometric-pattern"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-crimson-900 mb-6">
              Музей истории
              <br />
              крестьянского быта
            </h1>
            <div className="ornament-divider max-w-md mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
              д. Насекина, Тюменская область
            </p>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Погрузитесь в атмосферу сибирской деревни XIX-XX веков.
              Познакомьтесь с традициями, бытом и ремёслами наших предков.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/programs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="folk-button text-lg px-8 py-4"
                >
                  Наши программы
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-crimson-700 px-8 py-4 rounded-md border-2 border-crimson-700 hover:bg-crimson-50 transition-colors font-semibold text-lg"
                >
                  О музее
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <svg
            className="w-8 h-8 text-crimson-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* Основные направления */}
      <section className="py-20 bg-white">
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
            <div className="ornament-divider max-w-md mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏛️",
                title: "Экспозиции",
                description:
                  "Подлинные предметы быта, инструменты и утварь сибирских крестьян",
              },
              {
                icon: "🎨",
                title: "Мастер-классы",
                description:
                  "Освойте традиционные ремёсла под руководством опытных мастеров",
              },
              {
                icon: "🍲",
                title: "Крестьянская кухня",
                description:
                  "Попробуйте блюда, приготовленные по старинным рецептам",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="folk-card p-8 text-center group hover:shadow-2xl transition-shadow"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
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
      <section className="py-20 bg-cream-50">
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
              <div className="ornament-divider mb-8"></div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Музей истории крестьянского быта в деревне Насекина был основан
                для сохранения и популяризации культурного наследия сибирского
                крестьянства.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Здесь собраны уникальные экспонаты, отражающие быт, традиции и
                ремёсла крестьян Тюменской области XIX-XX веков.
              </p>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="folk-button"
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
              <div className="folk-card p-4">
                <div className="aspect-video bg-gradient-to-br from-crimson-200 to-ochre-200 rounded-lg flex items-center justify-center">
                  <span className="text-6xl">🏡</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="py-20 bg-crimson-700 text-white">
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
                className="bg-white text-crimson-700 px-8 py-4 rounded-md hover:bg-cream-50 transition-colors font-semibold text-lg"
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
