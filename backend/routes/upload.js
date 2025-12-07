import express from 'express';
import { upload } from '../config/upload.js';
import { authenticateToken } from './auth.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Загрузка изображения для программы
router.post('/programs', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Файл не загружен'
      });
    }

    const imageUrl = `/uploads/programs/${req.file.filename}`;
    
    res.json({
      success: true,
      imageUrl: imageUrl,
      message: 'Изображение успешно загружено'
    });
  } catch (error) {
    console.error('Ошибка загрузки изображения:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при загрузке изображения'
    });
  }
});

// Загрузка изображения для галереи
router.post('/gallery', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Файл не загружен'
      });
    }

    const imageUrl = `/uploads/gallery/${req.file.filename}`;
    
    res.json({
      success: true,
      imageUrl: imageUrl,
      message: 'Изображение успешно загружено'
    });
  } catch (error) {
    console.error('Ошибка загрузки изображения:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при загрузке изображения'
    });
  }
});

// Удаление изображения
router.delete('/:type/:filename', authenticateToken, (req, res) => {
  try {
    const { type, filename } = req.params;
    const filePath = path.join(__dirname, '../uploads', type, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({
        success: true,
        message: 'Изображение удалено'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Файл не найден'
      });
    }
  } catch (error) {
    console.error('Ошибка удаления изображения:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при удалении изображения'
    });
  }
});

export default router;