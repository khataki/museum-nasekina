import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SEO from "../components/SEO";

const Programs = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get("/api/programs");
      setPrograms(response.data);
    } catch (error) {
      console.error("Ошибка загрузки программ:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-2xl text-crimson-700">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-12">
      {" "}
      <SEO
        title="Программы"
        description="Экскурсии, мастер-классы и программы музея крестьянского быта: гончарное дело, народные ремёсла, крестьянская кухня."
        keywords="экскурсии, мастер-классы, гончарное дело, народные ремёсла, музей Тюмень"
        url="https://museum-nasekina.ru/programs"
      />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-crimson-800 mb-4">
            Наши программы
          </h1>
          <div className="ornament-divider max-w-md mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Выберите программу и окунитесь в мир традиций сибирского
            крестьянства
          </p>
        </motion.div>

        {programs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Программы пока не добавлены</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/programs/${program.id}`)}
                className="folk-card overflow-hidden group cursor-pointer"
              >
                <div className="h-64 overflow-hidden">
                  {program.image_url ? (
                    <img
                      src={program.image_url}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-crimson-200 to-ochre-200 flex items-center justify-center">
                      <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                        {["🏺", "🎨", "🧵", "🍲"][index % 4]}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-display font-bold text-crimson-800 mb-3 group-hover:text-crimson-600 transition-colors">
                    {program.title}
                  </h3>

                  <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
                    {program.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-2 text-crimson-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {program.duration}
                    </div>

                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-2 text-gold-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                      {program.price}
                    </div>

                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-2 text-deepBlue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      до {program.max_participants} чел
                    </div>
                  </div>

                  <div className="flex items-center text-crimson-700 font-semibold group-hover:translate-x-2 transition-transform">
                    Подробнее
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;
