-- Добавляем поле для галереи (массив URL фото)
ALTER TABLE programs 
ADD COLUMN gallery JSONB DEFAULT '[]'::jsonb;

-- Добавляем поле для расширенного описания
ALTER TABLE programs 
ADD COLUMN detailed_description TEXT;

-- Добавляем поле для требований/что взять с собой
ALTER TABLE programs 
ADD COLUMN requirements TEXT;

-- Проверяем структуру
\d programs
