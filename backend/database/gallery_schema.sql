-- Таблица элементов галереи
CREATE TABLE IF NOT EXISTS gallery_items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы
CREATE INDEX idx_gallery_category ON gallery_items(category);
CREATE INDEX idx_gallery_active ON gallery_items(is_active);
CREATE INDEX idx_gallery_order ON gallery_items(display_order);

-- Триггер для updated_at
CREATE TRIGGER update_gallery_items_updated_at 
BEFORE UPDATE ON gallery_items
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
