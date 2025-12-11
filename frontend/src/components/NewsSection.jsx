import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewsSection = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('/api/news?limit=3');
      // Безопасная проверка на массив
      const newsData = response.data?.news || [];
      setNews(Array.isArray(newsData) ? newsData : []);
    } catch (error) {
      console.error('Ошибка загрузки новостей:', error);
      setNews([]); // Устанавливаем пустой массив при ошибке
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Не показываем секцию если идёт загрузка или нет новостей
  if (loading || !news || news.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-crimson-800 mb-4">
            Новости музея
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-crimson-600 to-transparent rounded-full mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {news.length >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={() => navigate('/news')}
              className="folk-button"
            >
              Все новости
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
