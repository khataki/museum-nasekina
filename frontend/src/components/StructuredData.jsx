import React from 'react';
import { Helmet } from 'react-helmet-async';

const StructuredData = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Museum",
    "name": "Музей истории крестьянского быта",
    "description": "Музей истории крестьянского быта в д. Насекина, Тюменская область",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "д. Насекина",
      "addressRegion": "Тюменская область",
      "addressCountry": "RU"
    },
    "telephone": "+7 (XXX) XXX-XX-XX",
    "email": "info@museum72tyasekina.ru",
    "url": "https://museum-nasekina.ru",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "18:00"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
