import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy, FaCheck } from 'react-icons/fa';

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      digits: '0123456789',
      symbols: '!@#$%^&*()'
    };

    let availableChars = '';
    if (uppercase) availableChars += charset.uppercase;
    if (lowercase) availableChars += charset.lowercase;
    if (digits) availableChars += charset.digits;
    if (symbols) availableChars += charset.symbols;

    if (availableChars.length === 0) {
      setPassword('Please select at least one character type.');
      return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      password += availableChars[randomIndex];
    }
    setPassword(password);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
  };

  return (
    <div className="p-8 flex flex-col items-center  bg-transparent">
      <h1 className="text-4xl font-bold mb-2">Generate a Password</h1>
      <p className="text-lg mb-6">Generate a random password with different options.</p>

      <div className="bg-black bg-opacity-20 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="length">
            Password Length
          </label>
          <input
            id="length"
            type="number"
            min="1"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="border border-gray-300 bg-white bg-opacity-30 backdrop-blur-sm p-2 w-full rounded"
          />
        </div>

        <div className="space-y-2 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={() => setUppercase(!uppercase)}
              className="mr-2"
            />
            Uppercase letters
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={() => setLowercase(!lowercase)}
              className="mr-2"
            />
            Lowercase letters
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={digits}
              onChange={() => setDigits(!digits)}
              className="mr-2"
            />
            Digits
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={symbols}
              onChange={() => setSymbols(!symbols)}
              className="mr-2"
            />
            Symbols
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={true} // Avoid similar characters not implemented
              readOnly
              className="mr-2"
            />
            Avoid similar characters (e.g., 1 and l, 0 and O)
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Generate
        </button>

        {password && (
          <div className="mt-4">
            <input
              type="text"
              value={password}
              readOnly
              className="border border-gray-300 bg-white bg-opacity-30 backdrop-blur-sm p-2 w-full rounded"
            />
            <CopyToClipboard text={password}>
              <button 
                onClick={handleCopy}
                className="flex items-center mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                {copied ? <FaCheck className="mr-2" /> : <FaCopy className="mr-2" />}
                {copied ? 'Password Copied' : 'Copy'}
              </button>
            </CopyToClipboard>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;
