import React, { useState } from 'react';

const TextFormatter = () => {
  const [text, setText] = useState('');

  const handleUppercase = () => setText(text.toUpperCase());
  const handleLowercase = () => setText(text.toLowerCase());
  const handleCapitalizeSentences = () => setText(text.replace(/(?:^|\.\s*)([a-z])/g, (match) => match.toUpperCase()));
  const handleCapitalizeWords = () => setText(text.replace(/\b\w/g, (char) => char.toUpperCase()));
  const handleRemoveExtraSpaces = () => setText(text.replace(/\s+/g, ' ').trim());
  const handleClearAll = () => setText('');

  return (
    <div className="flex flex-col items-center justify-center bg-transparent  p-4">
      <h1 className="text-4xl font-bold mb-2">Text Formatter</h1>
      <p className="text-sm text-gray-500 mb-6">
        You can format your text according to yourself.
      </p>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full md:w-2/3 lg:w-full">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full p-2 mb-4 bg-transparent border-b-2 border-gray-300 focus:outline-none h-40 resize-none"
        />

        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between space-y-2 sm:space-y-0">
          <button
            onClick={handleUppercase}
            className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 flex-1 m-1"
          >
            Uppercase
          </button>
          <button
            onClick={handleLowercase}
            className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600 flex-1 m-1"
          >
            Lowercase
          </button>
          <button
            onClick={handleCapitalizeSentences}
            className="bg-yellow-500 text-white py-2 px-4 rounded shadow hover:bg-yellow-600 flex-1 m-1"
          >
            Capitalize Sentences
          </button>
          <button
            onClick={handleCapitalizeWords}
            className="bg-purple-500 text-white py-2 px-4 rounded shadow hover:bg-purple-600 flex-1 m-1"
          >
            Capitalize Words
          </button>
          <button
            onClick={handleRemoveExtraSpaces}
            className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600 flex-1 m-1"
          >
            Remove Extra Spaces
          </button>
          <button
            onClick={handleClearAll}
            className="bg-gray-500 text-white py-2 px-4 rounded shadow hover:bg-gray-600 flex-1 m-1"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextFormatter;
