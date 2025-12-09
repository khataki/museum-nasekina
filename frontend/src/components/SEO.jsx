import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Музей истории крестьянского быта',
  description = 'Музей истории крестьянского быта в д. Насекина, Тюменская область. Экспозиции, мастер-классы, программы для посетителей.',
  keywords = 'музей, крестьянский быт, Насекина, Тюменская область, народные ремёсла, традиции, экскурсии',
  image = '/og-image.jpg',
  url = 'https://museum-nasekina.ru'
}) => {
  const fullTitle = title === 'Музей истории крестьянского быта' 
    ? title 
    : `${title} | Музей истории крестьянского быта`;

  return (
    <Helmet>
      {/* Базовые метатеги */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph для соцсетей */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Музей истории крестьянского быта" />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Дополнительные метатеги */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="Russian" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Музей истории крестьянского быта" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
