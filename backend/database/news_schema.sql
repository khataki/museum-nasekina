-- Таблица новостей
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT, -- Краткое описание для превью
  image_url VARCHAR(500),
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at DESC);

-- Триггер для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_news_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_news_updated_at ON news;
CREATE TRIGGER trigger_update_news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW
  EXECUTE FUNCTION update_news_updated_at();

-- Пример начальных данных
INSERT INTO news (title, excerpt, content, image_url) VALUES 
(
  'Открытие зимней программы мероприятий',
  'Приглашаем на колядки, мастер-классы и традиционные зимние забавы!',
  'Дорогие друзья! С радостью сообщаем об открытии зимней программы в нашем музее. В декабре и январе мы приглашаем вас на колядки, мастер-классы по традиционным ремёслам и зимние народные забавы.

В программе:
- Колядки и рождественские песнопения
- Мастер-классы по изготовлению обрядовых кукол
- Традиционные зимние игры на свежем воздухе
- Дегустация блюд крестьянской кухни

Запись по телефону или через форму на сайте.',
  NULL
),
(
  'Новая экспозиция "Текстиль наших предков"',
  'Представляем уникальную коллекцию традиционных сибирских тканей и вышивки',
  'В музее открылась новая постоянная экспозиция, посвящённая текстильным традициям сибирского крестьянства. Вы сможете увидеть подлинные образцы домотканых полотен, вышивки, кружев и традиционных костюмов XIX-XX веков.

Особый интерес представляют:
- Свадебные наряды тюменских крестьян
- Коллекция полотенец с обрядовой вышивкой
- Образцы узорного ткачества
- Инструменты для прядения и ткачества

Экспозиция доступна для посещения ежедневно.',
  NULL
);

-- Проверка
SELECT * FROM news ORDER BY published_at DESC;
