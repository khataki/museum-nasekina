import express from 'express';
import pool from '../config/db.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Получить все опубликованные новости (публичный эндпоинт)
router.get('/', async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    
    const result = await pool.query(
      `SELECT id, title, excerpt, content, image_url, published_at, created_at 
       FROM news 
       WHERE is_published = true 
       ORDER BY published_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    // Получаем общее количество новостей
    const countResult = await pool.query(
      'SELECT COUNT(*) FROM news WHERE is_published = true'
    );

    res.json({
      news: result.rows,
      total: parseInt(countResult.rows[0].count),
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error('Ошибка получения новостей:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

// Получить одну новость по ID (публичный эндпоинт)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT * FROM news 
       WHERE id = $1 AND is_published = true`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Новость не найдена'
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка получения новости:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

// Получить все новости для админки (с неопубликованными)
router.get('/admin/all', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM news ORDER BY created_at DESC'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка получения новостей:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

// Создать новость
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, excerpt, content, imageUrl, isPublished } = req.body;

    const result = await pool.query(
      `INSERT INTO news (title, excerpt, content, image_url, is_published) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [title, excerpt, content, imageUrl, isPublished !== false]
    );

    res.status(201).json({
      success: true,
      news: result.rows[0]
    });
  } catch (error) {
    console.error('Ошибка создания новости:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

// Обновить новость
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, imageUrl, isPublished } = req.body;

    const result = await pool.query(
      `UPDATE news 
       SET title = $1, excerpt = $2, content = $3, image_url = $4, is_published = $5 
       WHERE id = $6 
       RETURNING *`,
      [title, excerpt, content, imageUrl, isPublished, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Новость не найдена'
      });
    }

    res.json({
      success: true,
      news: result.rows[0]
    });
  } catch (error) {
    console.error('Ошибка обновления новости:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

// Удалить новость
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM news WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Новость не найдена'
      });
    }

    res.json({
      success: true,
      message: 'Новость удалена'
    });
  } catch (error) {
    console.error('Ошибка удаления новости:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

export default router;
