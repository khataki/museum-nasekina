# Музей истории крестьянского быта - д. Насекина

Современный веб-сайт для музея с русской народной стилистикой и сибирско-уральскими орнаментами.

## 🎨 Стек технологий

### Frontend
- React 18 + Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- Axios

### Backend
- Node.js + Express
- PostgreSQL
- JWT Authentication
- Telegram Bot API

## 🚀 Быстрый старт

### Установка зависимостей
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### Настройка базы данных
```bash
createdb museum_nasekina
psql museum_nasekina < backend/database/schema.sql
```

### Настройка окружения
```bash
cd backend
cp .env.example .env
# Заполните .env файл
```

### Запуск
```bash
# Backend (терминал 1)
cd backend
npm run dev

# Frontend (терминал 2)
cd frontend
npm run dev
```

Приложение доступно на http://localhost:3000

## 📝 Учетные данные

**Админ-панель:**
- Логин: `admin`
- Пароль: `admin123`

⚠️ Измените пароль после первого входа!

## 📄 Лицензия

MIT
