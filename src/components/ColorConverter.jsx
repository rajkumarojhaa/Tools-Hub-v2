import React, { useState } from 'react';
import axios from 'axios';

const ColorConverter = () => {
  const [colorName, setColorName] = useState('');
  const [formats, setFormats] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchColor = async () => {
    setError('');
    setLoading(true);
    setFormats([]);

    try {
      const response = await axios.get(
        'https://color-converter-api-apiverve.p.rapidapi.com/v1/convertname',
        {
          params: { name: colorName },
          headers: {
            'x-rapidapi-key': '8b2433d626msha7dee48a2972e2ep1f6e58jsn3405de35e2f0',
            'x-rapidapi-host': 'color-converter-api-apiverve.p.rapidapi.com'
          }
        }
      );

      const colorData = response.data;
      console.log("Color Data:", colorData.data);

      if (colorData && colorData.data) {
        const formattedArray = Object.entries(colorData.data).map(([name, value]) => ({
          name: name.toUpperCase(),
          value: typeof value === 'object' ? JSON.stringify(value) : value
        }));
        setFormats(formattedArray);
      } else {
        setError('No valid color data found.');
      }
    } catch (err) {
      console.error('Error fetching color:', err);
      setError('Failed to fetch color info. Check API key or color name.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 text-white max-w-4xl mx-auto">
  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
    Color Name Converter
  </h2>

  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
    <input
      type="text"
      placeholder="Enter color name (e.g., red)"
      value={colorName}
      onChange={(e) => setColorName(e.target.value)}
      className="flex-1 border p-2 rounded text-black w-full sm:w-auto"
    />
    <button
      onClick={fetchColor}
      className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
    >
      {loading ? 'Loading...' : 'Convert'}
    </button>
  </div>

  {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

  {formats.length > 0 && (
    <div className="mt-6 p-4 sm:p-6 border rounded bg-white/20 backdrop-blur-md shadow-lg overflow-x-auto">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
        Converted Color Formats:
      </h3>
      <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base break-words whitespace-pre-wrap">
        {formats.map((format, index) => (
          <li key={index}>
            <strong>{format.name}:</strong> {String(format.value)}
          </li>
        ))}
      </ul>

      <div
        className="w-full h-12 mt-6 rounded border"
        style={{ backgroundColor: formats.find(f => f.name === 'HEX')?.value || '#000' }}
      />
    </div>
  )}
</div>

  );
};

export default ColorConverter;
