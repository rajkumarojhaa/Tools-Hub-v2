import React, { useState } from 'react';

const WordCounter = () => {
  const [text, setText] = useState('');

  // Initializing metrics with default values of 0
  const [metrics, setMetrics] = useState({
    wordCount: 0,
    charCount: 0,
    charCountWithSpaces: 0,
    paragraphCount: 0
  });

  const handleChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);

    // Update metrics based on the input text
    const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;
    const charCount = inputText.replace(/\s+/g, '').length;
    const charCountWithSpaces = inputText.length;
    const paragraphCount = inputText.split(/\n+/).filter(Boolean).length;

    setMetrics({
      wordCount,
      charCount,
      charCountWithSpaces,
      paragraphCount
    });
  };

  return (
    <div className="flex flex-col items-center justify-center  p-4 bg-transparent mt-0 ">
      <h1 className="text-4xl font-bold text-center mb-2">Word Counter</h1>
      <p className="text-lg text-center mb-6">Count the number of words in a text.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/30 dark:bg-gray-800/30 p-4 border rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-xl font-semibold mb-2">Words</h2>
          <p className="text-lg">{metrics.wordCount}</p>
        </div>
        <div className="bg-white/30 dark:bg-gray-800/30 p-4 border rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-xl font-semibold mb-2">Characters</h2>
          <p className="text-lg">{metrics.charCountWithSpaces}</p>
        </div>
        <div className="bg-white/30 dark:bg-gray-800/30 p-4 border rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-xl font-semibold mb-2">Characters (No Spaces)</h2>
          <p className="text-lg">{metrics.charCount}</p>
        </div>
        <div className="bg-white/30 dark:bg-gray-800/30 p-4 border rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-xl font-semibold mb-2">Paragraphs</h2>
          <p className="text-lg">{metrics.paragraphCount}</p>
        </div>
      </div>

      <textarea
        value={text}
        onChange={handleChange}
        className="w-full max-w-4xl p-4 border rounded-lg shadow-lg backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border-white/20 dark:border-gray-700/20 text-black dark:text-white"
        placeholder="Type your text here..."
        rows="8"
      />
    </div>
  );
};

export default WordCounter;
