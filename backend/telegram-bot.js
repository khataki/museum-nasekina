import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // Твой chat ID

if (!TELEGRAM_BOT_TOKEN) {
  console.error('⚠️ TELEGRAM_BOT_TOKEN не найден в .env');
  process.exit(1);
}

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Команда /start - получить свой chat_id
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `Привет! 🏛️\n\nТвой Chat ID: \`${chatId}\`\n\nДобавь этот ID в .env файл как TELEGRAM_CHAT_ID`,
    { parse_mode: 'Markdown' }
  );
});

// Функция отправки уведомления о новой заявке
export const sendBookingNotification = async (booking) => {
  if (!TELEGRAM_CHAT_ID) {
    console.warn('TELEGRAM_CHAT_ID не установлен, уведомление не отправлено');
    return;
  }

  const message = `
🎉 *Новая заявка!*

👤 *Имя:* ${booking.name}
📧 *Email:* ${booking.email}
📱 *Телефон:* ${booking.phone}
🎨 *Программа:* ${booking.program_title}
📅 *Дата:* ${new Date(booking.preferred_date).toLocaleDateString('ru-RU')}
👥 *Участников:* ${booking.participants}

💬 *Комментарий:*
${booking.comment || 'Нет'}

_ID заявки: ${booking.id}_
  `.trim();

  try {
    await bot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' });
    console.log('✅ Telegram уведомление отправлено');
  } catch (error) {
    console.error('❌ Ошибка отправки в Telegram:', error);
  }
};

console.log('🤖 Telegram бот запущен!');
console.log('📱 Отправь /start боту чтобы получить свой Chat ID');

export default bot;
