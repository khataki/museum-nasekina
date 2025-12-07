import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/auth/login', credentials);
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Неверное имя пользователя или пароль');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-crimson-800 to-deepBlue-900 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Панель администратора
          </h1>
          <p className="text-cream-200">Музей истории крестьянского быта</p>
        </div>

        <div className="folk-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-100 border-2 border-red-500 rounded-md text-red-800 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Имя пользователя
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={credentials.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-crimson-300 rounded-md focus:border-crimson-600 focus:ring-2 focus:ring-crimson-200 transition-all"
                placeholder="admin"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-crimson-300 rounded-md focus:border-crimson-600 focus:ring-2 focus:ring-crimson-200 transition-all"
                placeholder="••••••••"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className={`folk-button w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;