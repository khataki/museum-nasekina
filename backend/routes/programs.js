import express from 'express';
import pool from '../config/db.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Получить все активные программы
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM programs WHERE is_active = true ORDER BY created_at DESC'
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

// Получить одну программу по ID
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

// Создать программу
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { 
      title, 
      description, 
      detailed_description,
      requirements,
      duration, 
      price, 
      maxParticipants, 
      imageUrl,
      gallery 
    } = req.body;

    const result = await pool.query(
      `INSERT INTO programs (
        title, 
        description, 
        detailed_description,
        requirements,
        duration, 
        price, 
        max_participants, 
        image_url,
        gallery
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *`,
      [
        title, 
        description, 
        detailed_description || null,
        requirements || null,
        duration, 
        price, 
        maxParticipants, 
        imageUrl || null,
        JSON.stringify(gallery || [])
      ]
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

// Обновить программу
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      detailed_description,
      requirements,
      duration, 
      price, 
      maxParticipants, 
      imageUrl,
      gallery 
    } = req.body;

    const result = await pool.query(
      `UPDATE programs 
       SET 
         title = $1, 
         description = $2, 
         detailed_description = $3,
         requirements = $4,
         duration = $5, 
         price = $6, 
         max_participants = $7, 
         image_url = $8,
         gallery = $9,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $10 
       RETURNING *`,
      [
        title, 
        description, 
        detailed_description || null,
        requirements || null,
        duration, 
        price, 
        maxParticipants, 
        imageUrl || null,
        JSON.stringify(gallery || []),
        id
      ]
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

// Удалить программу (мягкое удаление)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'UPDATE programs SET is_active = false WHERE id = $1 RETURNING id',
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
