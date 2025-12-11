import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Создать заявку
router.post('/', async (req, res) => {
  try {
    const {
      program_id,
      name,
      email,
      phone,
      preferred_date,
      participants,
      comment
    } = req.body;

    const result = await pool.query(
      `INSERT INTO bookings 
       (program_id, name, email, phone, preferred_date, participants, comment, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
       RETURNING *`,
      [program_id, name, email, phone, preferred_date, participants, comment]
    );

    res.json({
      success: true,
      booking: result.rows[0],
      message: 'Заявка успешно отправлена!'
    });
  } catch (error) {
    console.error('Ошибка создания заявки:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

// Получить все заявки (для админки)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        b.*,
        p.title as program_title
      FROM bookings b
      LEFT JOIN programs p ON b.program_id = p.id
      ORDER BY b.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка получения заявок:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

export default router;
