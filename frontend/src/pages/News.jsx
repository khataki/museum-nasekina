import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const News = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("/api/news?limit=100");
      setNews(response.data.news);
    } catch (error) {
      console.error("Ошибка загрузки новостей:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
      <SEO
        title="Новости"
        description="Актуальные новости и события музея истории крестьянского быта в д. Насекина"
        url="https://museum-nasekina.ru/news"
      />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-crimson-800 mb-4">
            Новости
          </h1>
          <div className="ornament-divider max-w-md mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Все события и новости нашего музея
          </p>
        </motion.div>

        {news.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">Новости пока не добавлены</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/news/${item.id}`)}
                className="folk-card overflow-hidden group cursor-pointer"
              >
                {item.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <time className="text-sm text-gray-500 mb-2 block">
                    {formatDate(item.published_at)}
                  </time>
                  <h3 className="text-xl font-display font-bold text-crimson-800 mb-3 group-hover:text-crimson-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                    {item.excerpt || item.content}
                  </p>
                  <div className="flex items-center text-crimson-700 font-semibold group-hover:translate-x-2 transition-transform">
                    Читать далее
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
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
