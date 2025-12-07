import express from 'express';
import pool from '../config/db.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Получить все элементы галереи (публичный доступ)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = 'SELECT * FROM gallery_items WHERE is_active = true';
    const params = [];
    
    if (category && category !== 'Все') {
      query += ' AND category = $1';
      params.push(category);
    }
    
    query += ' ORDER BY display_order ASC, created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка получения галереи:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

// Получить все категории
router.get('/categories', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT category FROM gallery_items WHERE is_active = true ORDER BY category'
    );
    res.json(result.rows.map(row => row.category));
  } catch (error) {
    console.error('Ошибка получения категорий:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

// Создать элемент галереи (требуется авторизация)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, category, imageUrl, displayOrder } = req.body;

    if (!title || !category || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Не все обязательные поля заполнены'
      });
    }

    const result = await pool.query(
      `INSERT INTO gallery_items (title, description, category, image_url, display_order)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description || null, category, imageUrl, displayOrder || 0]
    );

    res.status(201).json({
      success: true,
      item: result.rows[0]
    });
  } catch (error) {
    console.error('Ошибка создания элемента галереи:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

// Обновить элемент галереи (требуется авторизация)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, imageUrl, displayOrder, isActive } = req.body;

    const result = await pool.query(
      `UPDATE gallery_items 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           category = COALESCE($3, category),
           image_url = COALESCE($4, image_url),
           display_order = COALESCE($5, display_order),
           is_active = COALESCE($6, is_active)
       WHERE id = $7
       RETURNING *`,
      [title, description, category, imageUrl, displayOrder, isActive, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Элемент не найден'
      });
    }

    res.json({
      success: true,
      item: result.rows[0]
    });
  } catch (error) {
    console.error('Ошибка обновления элемента:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

// Удалить элемент галереи (требуется авторизация)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Мягкое удаление
    const result = await pool.query(
      'UPDATE gallery_items SET is_active = false WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Элемент не найден'
      });
    }

    res.json({
      success: true,
      message: 'Элемент удален'
    });
  } catch (error) {
    console.error('Ошибка удаления элемента:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

export default router;