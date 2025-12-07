import express from 'express';
import pool from '../config/db.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Получить все активные программы (публичный доступ)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM programs WHERE is_active = true ORDER BY id ASC'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка получения программ:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

// Получить программу по ID (публичный доступ)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM programs WHERE id = $1 AND is_active = true',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Программа не найдена'
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка получения программы:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

// Создать новую программу (требуется авторизация)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, duration, price, maxParticipants, imageUrl } = req.body;

    if (!title || !description || !duration || !price || !maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Не все обязательные поля заполнены'
      });
    }

    const result = await pool.query(
      `INSERT INTO programs (title, description, duration, price, max_participants, image_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, duration, price, maxParticipants, imageUrl || null]
    );

    res.status(201).json({
      success: true,
      program: result.rows[0]
    });
  } catch (error) {
    console.error('Ошибка создания программы:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

// Обновить программу (требуется авторизация)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, price, maxParticipants, imageUrl, isActive } = req.body;

    const result = await pool.query(
      `UPDATE programs 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           duration = COALESCE($3, duration),
           price = COALESCE($4, price),
           max_participants = COALESCE($5, max_participants),
           image_url = COALESCE($6, image_url),
           is_active = COALESCE($7, is_active)
       WHERE id = $8
       RETURNING *`,
      [title, description, duration, price, maxParticipants, imageUrl, isActive, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Программа не найдена'
      });
    }

    res.json({
      success: true,
      program: result.rows[0]
    });
  } catch (error) {
    console.error('Ошибка обновления программы:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

// Удалить программу (требуется авторизация)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Мягкое удаление - помечаем как неактивную
    const result = await pool.query(
      'UPDATE programs SET is_active = false WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Программа не найдена'
      });
    }

    res.json({
      success: true,
      message: 'Программа удалена'
    });
  } catch (error) {
    console.error('Ошибка удаления программы:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

export default router;
