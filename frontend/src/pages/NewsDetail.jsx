import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import SEO from "../components/SEO";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, [id]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`/api/news/${id}`);
      setNewsItem(response.data);
    } catch (error) {
      console.error('Ошибка загрузки новости:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-2xl text-crimson-700">Загрузка...</div>
      </div>
    );
  }

  if (!newsItem) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <SEO 
  title={newsItem?.title}
  description={newsItem?.excerpt || newsItem?.content?.substring(0, 160)}
  image={newsItem?.image_url}
  url={`https://museum-nasekina.ru/news/${id}`}
/>
      <div className="container mx-auto px-4">
        {/* Кнопка назад */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-crimson-700 hover:text-crimson-900 transition-colors"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад
        </motion.button>

        <div className="max-w-4xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="folk-card p-8 md:p-12"
          >
            {/* Заголовок */}
            <header className="mb-8">
              <time className="text-gray-500 mb-4 block">
                {formatDate(newsItem.published_at)}
              </time>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-crimson-800 mb-6">
                {newsItem.title}
              </h1>
              {newsItem.excerpt && (
                <p className="text-xl text-gray-700 leading-relaxed">
                  {newsItem.excerpt}
                </p>
              )}
            </header>

            {/* Изображение */}
            {newsItem.image_url && (
              <div className="mb-8 -mx-8 md:-mx-12">
                <img
                  src={newsItem.image_url}
                  alt={newsItem.title}
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              </div>
            )}

            {/* Контент */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                {newsItem.content}
              </div>
            </div>

            {/* Разделитель */}
            <div className="ornament-divider my-12"></div>

            {/* Футер */}
            <footer className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="folk-button"
              >
                Вернуться на главную
              </motion.button>
            </footer>
          </motion.article>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
