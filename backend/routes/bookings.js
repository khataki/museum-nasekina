import express from 'express';
import pool from '../config/db.js';
import { sendBookingToTelegram } from '../services/telegram.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Создать новую заявку (публичный доступ)
router.post('/', async (req, res) => {
  try {
    const {
      programId,
      programTitle,
      name,
      phone,
      email,
      visitorsCount,
      date,
      message
    } = req.body;

    // Валидация обязательных полей
    if (!name || !phone || !visitorsCount || !date || !programTitle) {
      return res.status(400).json({
        success: false,
        message: 'Не все обязательные поля заполнены'
      });
    }

    // Сохранение в БД
    const result = await pool.query(
      `INSERT INTO bookings (
        program_id, program_title, visitor_name, phone, email,
        visitors_count, visit_date, message
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        programId || null,
        programTitle,
        name,
        phone,
        email || null,
        visitorsCount,
        date,
        message || null
      ]
    );

    const booking = result.rows[0];

    // Отправка в Telegram
    const telegramData = {
      visitorName: name,
      phone,
      email,
      visitorsCount,
      visitDate: date,
      programTitle,
      message
    };

    const telegramSent = await sendBookingToTelegram(telegramData);

    // Обновление статуса отправки в Telegram
    if (telegramSent) {
      await pool.query(
        'UPDATE bookings SET telegram_sent = true WHERE id = $1',
        [booking.id]
      );
    }

    res.status(201).json({
      success: true,
      booking: {
        id: booking.id,
        message: 'Заявка успешно отправлена!'
      }
    });

  } catch (error) {
    console.error('Ошибка создания заявки:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при отправке заявки'
    });
  }
});

// Получить все заявки (требуется авторизация)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, date } = req.query;

    let query = 'SELECT * FROM bookings';
    const params = [];
    const conditions = [];

    if (status) {
      conditions.push(`status = $${params.length + 1}`);
      params.push(status);
    }

    if (date) {
      conditions.push(`visit_date = $${params.length + 1}`);
      params.push(date);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);

    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка получения заявок:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

// Получить заявку по ID (требуется авторизация)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM bookings WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Заявка не найдена'
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка получения заявки:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

// Обновить статус заявки (требуется авторизация)
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Недопустимый статус'
      });
    }

    const result = await pool.query(
      'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Заявка не найдена'
      });
    }

    res.json({
      success: true,
      booking: result.rows[0]
    });
  } catch (error) {
    console.error('Ошибка обновления статуса:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

// Удалить заявку (требуется авторизация)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM bookings WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Заявка не найдена'
      });
    }

    res.json({
      success: true,
      message: 'Заявка удалена'
    });
  } catch (error) {
    console.error('Ошибка удаления заявки:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера'
    });
  }
});

export default router;
