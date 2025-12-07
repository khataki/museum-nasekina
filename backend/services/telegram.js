import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/**
 * Отправляет сообщение в Telegram
 * @param {Object} bookingData - Данные заявки
 * @returns {Promise<boolean>} - Успешность отправки
 */
export const sendBookingToTelegram = async (bookingData) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('⚠️  Telegram credentials не настроены');
    return false;
  }

  const {
    visitorName,
    phone,
    email,
    visitorsCount,
    visitDate,
    programTitle,
    message
  } = bookingData;

  const telegramMessage = `
🎫 <b>Новая заявка на посещение</b>

📋 <b>Программа:</b> ${programTitle}

👤 <b>Имя:</b> ${visitorName}
📞 <b>Телефон:</b> ${phone}
${email ? `📧 <b>Email:</b> ${email}` : ''}

👥 <b>Количество человек:</b> ${visitorsCount}
📅 <b>Дата посещения:</b> ${new Date(visitDate).toLocaleDateString('ru-RU')}

${message ? `💬 <b>Комментарий:</b>\n${message}` : ''}

⏰ <b>Время заявки:</b> ${new Date().toLocaleString('ru-RU')}
  `.trim();

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: telegramMessage,
      parse_mode: 'HTML'
    });

    if (response.data.ok) {
      console.log('✓ Сообщение отправлено в Telegram');
      return true;
    } else {
      console.error('✗ Ошибка отправки в Telegram:', response.data);
      return false;
    }
  } catch (error) {
    console.error('✗ Ошибка при отправке в Telegram:', error.message);
    return false;
  }
};

export default {
  sendBookingToTelegram
};
