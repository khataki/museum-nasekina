import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const highlights = [
    {
      title: 'Аутентичные экспонаты',
      description: 'Более 500 подлинных предметов крестьянского быта XIX-XX веков',
      icon: '🏺',
    },
    {
      title: 'Интерактивные программы',
      description: 'Мастер-классы по традиционным ремёслам и народным промыслам',
      icon: '✋',
    },
    {
      title: 'Экскурсии',
      description: 'Увлекательные рассказы о жизни сибирских крестьян',
      icon: '👥',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero секция */}
      <section className="relative bg-gradient-to-br from-crimson-800 via-crimson-700 to-deepBlue-900 text-white overflow-hidden">
        {/* Декоративный фон */}
        <div className="absolute inset-0 opacity-10">
          <div className="geometric-pattern w-full h-full"></div>
        </div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-display font-bold mb-6 text-shadow-folk"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Музей истории
              <br />
              <span className="text-gold-300">крестьянского быта</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-cream-100 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Окунитесь в мир традиций и культуры сибирского крестьянства.
              Прикоснитесь к истории наших предков.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/programs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="folk-button"
                >
                  Наши программы
                </motion.button>
              </Link>
              <Link to="/contacts">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-crimson-800 font-semibold rounded-md shadow-lg hover:bg-cream-50 transition-all duration-300 border-2 border-gold-500"
                >
                  Контакты
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Волновой разделитель */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#fef8f0"/>
          </svg>
        </div>
      </section>

      {/* Основные преимущества */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-center text-crimson-800 mb-16"
          >
            Почему стоит посетить
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="folk-card p-8 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-6xl mb-4">{item.icon}</div>
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

      {/* О музее - краткая информация */}
      <section className="py-20 geometric-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="folk-card p-12"
            >
              <h2 className="text-4xl font-display font-bold text-crimson-800 mb-6">
                История музея
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Музей истории крестьянского быта в деревне Насекина был основан с целью 
                  сохранения и популяризации традиционной культуры сибирского крестьянства. 
                  В наших стенах собрана уникальная коллекция подлинных предметов быта, 
                  орудий труда, национальной одежды и декоративно-прикладного искусства.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Каждый экспонат рассказывает свою историю о жизни, традициях и культуре 
                  наших предков. Мы проводим экскурсии, мастер-классы и культурные мероприятия, 
                  которые помогают посетителям глубже понять и прочувствовать дух того времени.
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="py-20 bg-gradient-to-r from-crimson-700 to-deepBlue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Приглашаем в гости!
            </h2>
            <p className="text-xl text-cream-100 mb-8 max-w-2xl mx-auto">
              Откройте для себя удивительный мир традиций и культуры сибирского крестьянства
            </p>
            <Link to="/programs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gold-500 text-crimson-900 text-lg font-bold rounded-md shadow-xl hover:bg-gold-400 transition-colors duration-300"
              >
                Записаться на экскурсию
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
