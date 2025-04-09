// src/components/AnimatedText.js
import React, { useState, useEffect } from 'react';

const phrases = [
  { text: 'converter', color: 'text-gradient-1' },
  { text: 'Tester', color: 'text-gradient-2' },
  { text: 'Generator', color: 'text-gradient-3' },
  { text: 'Counter', color: 'text-gradient-4' }
];

const AnimatedText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % phrases.length);
    }, 1500); // Adjust timing as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-4xl font-bold mb-6 text-center">
      <span className="text-gray-800 dark:text-white">Collection of </span>
      <span className={`font-bold ${phrases[index].color} animate-gradient`}>{phrases[index].text}</span>
    </h1>
  );
};

export default AnimatedText;
