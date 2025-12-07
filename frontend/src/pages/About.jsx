import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-crimson-800 mb-6 text-center">
            О музее
          </h1>
          <div className="ornament-divider max-w-md mx-auto mb-12"></div>

          <div className="folk-card p-12 mb-12">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-display font-bold text-crimson-800 mb-4">
                История создания
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Музей истории крестьянского быта в деревне Насекина был основан энтузиастами-краеведами, 
                которые поставили перед собой задачу сохранить материальное и духовное наследие сибирского 
                крестьянства. В основу музейной коллекции легли подлинные предметы быта, орудия труда, 
                образцы декоративно-прикладного искусства, собранные в деревнях Тюменской области.
              </p>

              <h2 className="text-3xl font-display font-bold text-crimson-800 mb-4 mt-10">
                Наша миссия
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Мы стремимся сохранить и передать будущим поколениям уникальную культуру сибирского 
                крестьянства, показать богатство традиций, мастерство и трудолюбие наших предков. 
                Через экспозиции, образовательные программы и мастер-классы мы помогаем посетителям 
                понять, как жили, работали и творили люди прошлых эпох.
              </p>

              <h2 className="text-3xl font-display font-bold text-crimson-800 mb-4 mt-10">
                Коллекция
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                В фондах музея хранится более 500 экспонатов:
              </p>
              <ul className="list-none space-y-2 mb-6">
                <li className="flex items-start text-gray-700">
                  <span className="text-crimson-600 mr-2">•</span>
                  Предметы домашнего обихода и утварь
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-crimson-600 mr-2">•</span>
                  Орудия труда и сельскохозяйственный инвентарь
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-crimson-600 mr-2">•</span>
                  Традиционная одежда и текстиль
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-crimson-600 mr-2">•</span>
                  Изделия народных промыслов и ремёсел
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-crimson-600 mr-2">•</span>
                  Документы и фотографии
                </li>
              </ul>

              <h2 className="text-3xl font-display font-bold text-crimson-800 mb-4 mt-10">
                Наши достижения
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                За годы работы музей стал важным культурным центром региона. Мы проводим научные 
                конференции, организуем выставки, принимаем участие в региональных и всероссийских 
                программах по сохранению культурного наследия. Наши образовательные программы 
                популярны среди школьников и студентов.
              </p>
            </div>
          </div>

          {/* Режим работы */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="folk-card p-8"
          >
            <h2 className="text-3xl font-display font-bold text-crimson-800 mb-6">
              Режим работы
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Будни</h3>
                <p className="text-gray-700">10:00 - 18:00</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Выходные</h3>
                <p className="text-gray-700">11:00 - 19:00</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Выходной день</h3>
                <p className="text-gray-700">Понедельник</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
