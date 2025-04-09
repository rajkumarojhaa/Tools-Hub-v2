import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { saveAs } from 'file-saver';
import { FaTrash, FaDownload } from 'react-icons/fa';
import { MdImage } from 'react-icons/md';

const ImageConverter = () => {
  const [image, setImage] = useState(null);
  const [convertedBlob, setConvertedBlob] = useState(null);
  const [fileType, setFileType] = useState('jpg');
  const [fileName, setFileName] = useState('');
  const [originalType, setOriginalType] = useState('');


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name.split('.')[0]);
      setOriginalType(file.type.split('/')[1].toUpperCase());
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = async () => {
    if (!image) return;

    const file = dataURLtoFile(image, fileName);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
      fileType: fileType,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      setConvertedBlob(compressedFile);
    } catch (error) {
      console.error('Error converting image:', error);
    }
  };

  const handleDownload = () => {
    if (convertedBlob) {
      const convertedFileName = `${fileName}.${fileType}`;
      saveAs(convertedBlob, convertedFileName);
    }
  };

  const handleClear = () => {
    setImage(null);
    setConvertedBlob(null);
    setFileType('jpg');
    setFileName('');
    setOriginalType('');
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div className=" flex flex-col items-center justify-center bg-transparent">
      <h1 className="text-4xl font-bold text-white mb-2">Image Converter</h1>
      <p className="text-lg text-gray-300 mb-8">Convert your image to different formats.</p>

      {!image && (
        <div
          className="w-80 h-80 bg-white/10 backdrop-blur-lg rounded-lg flex flex-col items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
          onClick={() => document.getElementById('image-input').click()}
        >
          <MdImage className="text-6xl mb-4" />
          <p className="text-center">Convert your image to different formats.</p>
          <input
            id="image-input"
            type="file"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      )}

      {image && (
        <div className="w-96 p-6 bg-white/10 backdrop-blur-lg rounded-lg flex flex-col items-center text-white shadow-lg">
          <div className="flex w-full justify-between items-center mb-4">
            <div className="flex items-center">
              <img src={image} alt="Uploaded" className="w-20 h-20 object-cover rounded-lg mr-4" />
              <div>
                <p className="font-semibold">{fileName}</p>
                <p className="text-sm text-gray-300">Size: {(image.length / 1024).toFixed(2)} KB</p>
                <p className="text-sm text-gray-300">Original: {originalType}</p>
              </div>
            </div>
            <button
              onClick={handleClear}
              className="bg-red-500 p-2 rounded-full hover:bg-red-600 transition-all"
            >
              <FaTrash />
            </button>
          </div>

          <div className="w-full flex justify-between items-center mb-4">
            <label className="text-gray-300">Convert to:</label>
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="p-2 bg-gray-800 text-white rounded-lg"
            >
              <option value="jpg">JPG</option>
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="ico">ICO</option>
              <option value="webp">WEBP</option>
              <option value="gif">GIF</option>
              <option value="svg">SVG</option>
            </select>
          </div>

          <button
            onClick={handleConvert}
            className="w-full bg-blue-500 p-3 rounded-lg mb-4 hover:bg-blue-600 transition-all"
            disabled={!image}
          >
            Convert
          </button>

          {convertedBlob && (
            <button
              onClick={handleDownload}
              className="w-full bg-green-500 p-3 rounded-lg hover:bg-green-600 transition-all"
            >
              <FaDownload className="inline mr-2" /> Download Converted Image
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
