import pg from 'pg';
const { Pool } = pg;

// Для Railway используем DATABASE_URL, для локальной разработки - отдельные переменные
const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool(
  isProduction
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
      }
);

pool.on('connect', () => {
  console.log('✓ Подключено к PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Ошибка подключения к PostgreSQL:', err);
  process.exit(-1);
});

export default pool;
