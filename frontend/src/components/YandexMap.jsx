import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const YandexMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Загружаем Яндекс.Карты API
    if (!window.ymaps) {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU';
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      window.ymaps.ready(() => {
        if (mapRef.current && !mapRef.current.children.length) {
          const map = new window.ymaps.Map(mapRef.current, {
            center: [56.8519, 70.2897], // Координаты Тюменской области (примерные)
            zoom: 10,
            controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
          });

          // Добавляем метку музея
          const placemark = new window.ymaps.Placemark(
            [56.8519, 70.2897],
            {
              balloonContentHeader: 'Музей истории крестьянского быта',
              balloonContentBody: 'д. Насекина, Тюменская область',
              balloonContentFooter: 'Телефон: +7 (XXX) XXX-XX-XX',
              hintContent: 'Кликните для подробностей'
            },
            {
              preset: 'islands#redDotIcon',
              iconColor: '#b91c1c'
            }
          );

          map.geoObjects.add(placemark);

          // Автоматически открываем балун при загрузке
          placemark.balloon.open();
        }
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
    >
      <div ref={mapRef} className="w-full h-full" />
    </motion.div>
  );
};

export default YandexMap;
