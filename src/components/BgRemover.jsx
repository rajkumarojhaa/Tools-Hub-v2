import React, { useRef, useState } from "react";
import axios from "axios";

const BgRemover = () => {
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [removedBgImg, setRemovedBgImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // List of fallback API keys
  const API_KEYS = [
    "d7669af8f1mshe84c78539dc02d3p1cc6fdjsn4c0f9d6cdb30",
    "7ba2cdfa25msh23e9fe866328575p12d494jsn85cb70ff8ea3",
    "6131edcb4cmsh23ebb63bba81107p1b37d5jsn13862f0d1d3f"
  ];

  const handleFile = (file) => {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are supported.");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setRemovedBgImg("");
    setError("");
  };

  const removeBackground = async () => {
    if (!selectedFile) {
      setError("Please select an image file.");
      return;
    }

    setLoading(true);
    setRemovedBgImg("");
    setError("");

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("bg_blur", "0");
    formData.append("format", "PNG");

    let success = false;

    for (let i = 0; i < API_KEYS.length; i++) {
      const apiKey = API_KEYS[i];
      try {
        const response = await axios.request({
          method: "POST",
          url: "https://picsart-remove-background2.p.rapidapi.com/removebg",
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "picsart-remove-background2.p.rapidapi.com",
            Accept: "application/json",
          },
          data: formData,
        });

        const outputImageUrl = response.data?.data?.url;

        if (outputImageUrl) {
          setRemovedBgImg(outputImageUrl);
          success = true;
          break;
        } else {
          throw new Error("No image URL returned.");
        }
      } catch (err) {
        console.warn(`API Key ${i + 1} failed:`, err.response?.data || err.message);
        if (i === API_KEYS.length - 1) {
          setError("All API keys failed. Please try again later.");
        }
      }
    }

    setLoading(false);
  };

  const handleDownload = async () => {
    if (!removedBgImg) return;
    try {
      const res = await fetch(removedBgImg);
      const blob = await res.blob();

      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, "bg-removed.png");
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bg-removed.png";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Download error:", err);
      setError("Failed to download image.");
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setRemovedBgImg("");
    setPreviewUrl("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dropZoneRef.current.classList.remove("border-blue-500");
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropZoneRef.current.classList.add("border-blue-500");
  };

  const handleDragLeave = () => {
    dropZoneRef.current.classList.remove("border-blue-500");
  };

  return (
    <div className="p-4 max-w-xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Background Remover</h2>

      {/* Drop zone */}
      <div
        ref={dropZoneRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="border-2 border-dashed border-gray-400 rounded p-4 text-center mb-4 cursor-pointer hover:border-blue-500"
        onClick={() => fileInputRef.current?.click()}
      >
        <p className="text-sm text-gray-300">Tap to select or drag an image here</p>
      </div>

      {/* Choose Button */}
      <div className="text-center mb-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Choose Image
        </button>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => handleFile(e.target.files[0])}
        className="hidden"
      />

      {/* Preview */}
      {previewUrl && (
        <div className="mb-4 text-center">
          <p className="mb-2 text-gray-400">Preview:</p>
          <img
            src={previewUrl}
            alt="Preview"
            className="rounded mx-auto max-h-64 object-contain"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <button
          onClick={removeBackground}
          disabled={loading || !selectedFile}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? "Removing..." : "Remove Background"}
        </button>
        {(selectedFile || removedBgImg) && (
          <button
            onClick={handleClear}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full"
          >
            Clear
          </button>
        )}
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* Output */}
      {removedBgImg && (
        <div className="mt-6 text-center">
          <img
            src={removedBgImg}
            alt="Removed Background"
            className="rounded max-w-full h-auto mx-auto mb-4"
          />
          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default BgRemover;
