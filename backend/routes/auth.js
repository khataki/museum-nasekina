import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const router = express.Router();

// Middleware для проверки JWT токена
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Требуется авторизация' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: 'Невалидный токен' 
      });
    }
    req.user = user;
    next();
  });
};

// Создание админа (временный endpoint для тестирования)
router.post('/create-admin', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Укажите username и password'
      });
    }

    // Хешируем пароль
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Проверяем что админ не существует
    const existing = await pool.query(
      'SELECT * FROM admins WHERE username = $1',
      [username]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Админ уже существует'
      });
    }

    // Создаём админа
    await pool.query(
      'INSERT INTO admins (username, password_hash) VALUES ($1, $2)',
      [username, password_hash]
    );

    res.json({
      success: true,
      message: 'Админ создан',
      hash: password_hash // для отладки
    });
  } catch (error) {
    console.error('Ошибка создания админа:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера: ' + error.message
    });
  }
});

// Логин
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('Login attempt:', { username, password: password ? '***' : 'missing' });

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Укажите логин и пароль'
      });
    }

    const result = await pool.query(
      'SELECT * FROM admins WHERE username = $1',
      [username]
    );

    console.log('DB result:', result.rows.length > 0 ? 'User found' : 'User not found');

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Неверный логин или пароль'
      });
    }

    const admin = result.rows[0];
    console.log('Comparing passwords...');
    
    const validPassword = await bcrypt.compare(password, admin.password_hash);
    console.log('Password valid:', validPassword);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Неверный логин или пароль'
      });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username
      }
    });
  } catch (error) {
    console.error('Ошибка логина:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера: ' + error.message
    });
  }
});

// Проверка токена
router.get('/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

export default router;
