import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QrcodeGenerator = () => {
  const [inputType, setInputType] = useState('text');
  const [inputValue, setInputValue] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = () => {
    if (inputValue) {
      setQrCodeValue(inputValue);
      setIsCopied(false); // Reset the copied state when a new QR code is generated
    }
  };

  const handleClear = () => {
    setInputValue('');
    setQrCodeValue('');
    setIsCopied(false); // Reset the copied state when the input is cleared
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(qrCodeValue);
    setIsCopied(true); // Show the "copied" message
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-transparent">
      <h1 className="text-4xl font-bold mb-2">Generate a QR Code</h1>
      <p className="text-lg text-gray-300 mb-8">
        Generate a QR code for your URL, text, or any other link.
      </p>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <div className="flex justify-center mb-4">
          <button onClick={() => setInputType('text')} className="flex items-center">
            <i className="icon-text" /> Text
          </button>
        </div>

        <input
          type="text"
          placeholder="Enter your Text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 mb-4 bg-transparent border-b-2 border-gray-300 focus:outline-none"
        />

        <div className="flex justify-between">
          <button
            onClick={handleGenerate}
            className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
          >
            Generate
          </button>
          <button
            onClick={handleClear}
            className="bg-gray-500 text-white py-2 px-4 rounded shadow hover:bg-gray-600"
          >
            Clear
          </button>
        </div>

        {qrCodeValue && (
          <div className="mt-8 flex flex-col items-center">
            <QRCodeCanvas value={qrCodeValue} size={200} />
            <div className="flex mt-4">
              <button
                onClick={handleCopy}
                className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600 mr-2"
              >
                Copy
              </button>
              <a
                href={`data:image/png;base64,${btoa(qrCodeValue)}`}
                download="qrcode.png"
                className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600"
              >
                Download
              </a>
            </div>
            {isCopied && (
              <p className="mt-2 text-green-500">QR Code copied to clipboard!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QrcodeGenerator;
