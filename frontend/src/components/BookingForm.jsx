import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const BookingForm = ({ programId, programTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    visitorsCount: 1,
    date: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('/api/bookings', {
        ...formData,
        programId,
        programTitle,
      });

      if (response.data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          visitorsCount: 1,
          date: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="folk-card p-8"
    >
      <h3 className="text-3xl font-display font-bold text-crimson-800 mb-6">
        Записаться на программу
      </h3>
      
      {programTitle && (
        <p className="text-lg text-gray-700 mb-6">
          Программа: <span className="font-semibold text-crimson-700">{programTitle}</span>
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Имя */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Ваше имя *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-crimson-300 rounded-md focus:border-crimson-600 focus:ring-2 focus:ring-crimson-200 transition-all"
            placeholder="Иван Иванов"
          />
        </div>

        {/* Телефон */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Телефон *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-crimson-300 rounded-md focus:border-crimson-600 focus:ring-2 focus:ring-crimson-200 transition-all"
            placeholder="+7 (XXX) XXX-XX-XX"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-crimson-300 rounded-md focus:border-crimson-600 focus:ring-2 focus:ring-crimson-200 transition-all"
            placeholder="example@mail.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Количество посетителей */}
          <div>
            <label htmlFor="visitorsCount" className="block text-sm font-medium text-gray-700 mb-2">
              Количество человек *
            </label>
            <input
              type="number"
              id="visitorsCount"
              name="visitorsCount"
              required
              min="1"
              max="50"
              value={formData.visitorsCount}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-crimson-300 rounded-md focus:border-crimson-600 focus:ring-2 focus:ring-crimson-200 transition-all"
            />
          </div>

          {/* Дата посещения */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Желаемая дата *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border-2 border-crimson-300 rounded-md focus:border-crimson-600 focus:ring-2 focus:ring-crimson-200 transition-all"
            />
          </div>
        </div>

        {/* Сообщение */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Комментарий
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-crimson-300 rounded-md focus:border-crimson-600 focus:ring-2 focus:ring-crimson-200 transition-all resize-none"
            placeholder="Дополнительная информация или пожелания..."
          ></textarea>
        </div>

        {/* Статус отправки */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-100 border-2 border-green-500 rounded-md text-green-800"
          >
            ✓ Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-100 border-2 border-red-500 rounded-md text-red-800"
          >
            ✗ Произошла ошибка. Попробуйте позже или позвоните нам.
          </motion.div>
        )}

        {/* Кнопка отправки */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className={`folk-button w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
        </motion.button>

        <p className="text-sm text-gray-600 text-center">
          * - обязательные поля
        </p>
      </form>
    </motion.div>
  );
};

export default BookingForm;
