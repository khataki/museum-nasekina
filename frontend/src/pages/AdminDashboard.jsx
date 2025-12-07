import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
    maxParticipants: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }
    
    fetchPrograms();
  }, [navigate]);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get('/api/programs');
      setPrograms(response.data);
    } catch (error) {
      console.error('Ошибка загрузки программ:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleEdit = (program) => {
    setCurrentProgram(program);
    setFormData({
      title: program.title,
      description: program.description,
      duration: program.duration,
      price: program.price,
      maxParticipants: program.max_participants,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту программу?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/programs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPrograms();
    } catch (error) {
      console.error('Ошибка удаления:', error);
      alert('Не удалось удалить программу');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (currentProgram) {
        await axios.put(`/api/programs/${currentProgram.id}`, formData, config);
      } else {
        await axios.post('/api/programs', formData, config);
      }
      
      setCurrentProgram(null);
      setFormData({
        title: '',
        description: '',
        duration: '',
        price: '',
        maxParticipants: '',
      });
      fetchPrograms();
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Не удалось сохранить программу');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setCurrentProgram(null);
    setFormData({
      title: '',
      description: '',
      duration: '',
      price: '',
      maxParticipants: '',
    });
  };

  return (
    <div className="min-h-screen bg-cream-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-display font-bold text-crimson-800">
            Панель управления
          </h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-crimson-700 text-white rounded-md hover:bg-crimson-800 transition-colors"
          >
            Выйти
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="folk-card p-6 sticky top-8"
            >
              <h2 className="text-2xl font-display font-bold text-crimson-800 mb-6">
                {currentProgram ? 'Редактировать программу' : 'Новая программа'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-crimson-300 rounded-md focus:border-crimson-600 focus:ring-2 focus:ring-crimson-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Описание *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-crimson-300 rounded-md focus:border-crimson-600 focus:ring-2 focus:ring-crimson-200 resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Длительность *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    required
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="2 часа"
                    className="w-full px-4 py-2 border-2 border-crimson-300 rounded-md focus:border-crimson-600 focus:ring-2 focus:ring-crimson-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена *
                  </label>
                  <input
                    type="text"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="500 руб/чел"
                    className="w-full px-4 py-2 border-2 border-crimson-300 rounded-md focus:border-crimson-600 focus:ring-2 focus:ring-crimson-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Макс. участников *
                  </label>
                  <input
                    type="number"
                    name="maxParticipants"
                    required
                    min="1"
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-crimson-300 rounded-md focus:border-crimson-600 focus:ring-2 focus:ring-crimson-200"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-crimson-700 text-white rounded-md hover:bg-crimson-800 transition-colors font-semibold"
                  >
                    {currentProgram ? 'Обновить' : 'Добавить'}
                  </button>
                  {currentProgram && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Отмена
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-display font-bold text-crimson-800 mb-6">
                Список программ
              </h2>

              <div className="space-y-4">
                {programs.map((program) => (
                  <div
                    key={program.id}
                    className="folk-card p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-display font-bold text-crimson-800">
                        {program.title}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(program)}
                          className="px-4 py-2 bg-gold-500 text-crimson-900 rounded-md hover:bg-gold-400 transition-colors text-sm font-semibold"
                        >
                          Редактировать
                        </button>
                        <button
                          onClick={() => handleDelete(program.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-semibold"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{program.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>⏱️ {program.duration}</span>
                      <span>💰 {program.price}</span>
                      <span>👥 до {program.max_participants} чел</span>
                    </div>
                  </div>
                ))}

                {programs.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">Программы еще не добавлены</p>
                    <p className="mt-2">Используйте форму слева для добавления первой программы</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;