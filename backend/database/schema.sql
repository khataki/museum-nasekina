-- Создание базы данных (выполнить отдельно)
-- CREATE DATABASE museum_nasekina;

-- Таблица администраторов
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица программ
CREATE TABLE IF NOT EXISTS programs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(50) NOT NULL,
    price VARCHAR(50) NOT NULL,
    max_participants INTEGER NOT NULL,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица заявок на посещение
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    program_id INTEGER REFERENCES programs(id) ON DELETE SET NULL,
    program_title VARCHAR(255) NOT NULL,
    visitor_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    visitors_count INTEGER NOT NULL,
    visit_date DATE NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    telegram_sent BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для оптимизации
CREATE INDEX idx_programs_active ON programs(is_active);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_visit_date ON bookings(visit_date);

-- Вставка тестового администратора (пароль: admin123)
-- Хеш для пароля 'admin123' с bcrypt
INSERT INTO admins (username, password_hash) 
VALUES ('admin', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa')
ON CONFLICT (username) DO NOTHING;

-- Вставка примеров программ
INSERT INTO programs (title, description, duration, price, max_participants) VALUES
('Обзорная экскурсия', 'Увлекательное путешествие по музею с рассказом о традициях и быте сибирских крестьян', '1.5 часа', '300 руб/чел', 25),
('Мастер-класс по гончарному делу', 'Научитесь создавать традиционную посуду на гончарном круге под руководством опытного мастера', '2 часа', '800 руб/чел', 10),
('Народные ремёсла', 'Познакомьтесь с традиционными сибирскими ремёслами: плетение, ткачество, резьба по дереву', '2.5 часа', '600 руб/чел', 15),
('Крестьянская кухня', 'Приготовьте традиционные блюда сибирской кухни по старинным рецептам', '3 часа', '1200 руб/чел', 12)
ON CONFLICT DO NOTHING;

-- Триггер для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

