import React from 'react';
import { motion } from 'framer-motion';

const OrnamentDivider = ({ variant = 'default' }) => {
  const variants = {
    default: (
      <svg viewBox="0 0 800 40" className="w-full h-full">
        {/* Центральный элемент */}
        <circle cx="400" cy="20" r="6" fill="currentColor" />
        
        {/* Левая сторона */}
        <path
          d="M 200 20 Q 250 10, 300 20 T 400 20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="200" cy="20" r="4" fill="currentColor" />
        <circle cx="300" cy="20" r="4" fill="currentColor" />
        
        {/* Правая сторона */}
        <path
          d="M 400 20 Q 450 10, 500 20 T 600 20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="500" cy="20" r="4" fill="currentColor" />
        <circle cx="600" cy="20" r="4" fill="currentColor" />
      </svg>
    ),
    
    flower: (
      <svg viewBox="0 0 800 60" className="w-full h-full">
        {/* Цветочный узор */}
        {[300, 400, 500].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx={x} cy="30" r="3" fill="currentColor"/>
            {[0, 60, 120, 180, 240, 300].map((angle, j) => {
              const rad = (angle * Math.PI) / 180;
              const px = x + Math.cos(rad) * 8;
              const py = 30 + Math.sin(rad) * 8;
              return <circle key={j} cx={px} cy={py} r="2" fill="currentColor"/>;
            })}
          </g>
        ))}
        
        {/* Соединительные линии */}
        <path d="M 300 30 L 400 30 L 500 30" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      </svg>
    )
  };

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto text-crimson-700"
    >
      {variants[variant] || variants.default}
    </motion.div>
  );
};

export default OrnamentDivider;
