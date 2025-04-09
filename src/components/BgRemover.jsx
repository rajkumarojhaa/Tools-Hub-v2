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

  const handleFile = (file) => {
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
    formData.append("file", selectedFile);

    try {
      const response = await axios.request({
        method: "POST",
        url: "https://remove-background18.p.rapidapi.com/public/remove-background",
        headers: {
          "x-rapidapi-key": "8b2433d626msha7dee48a2972e2ep1f6e58jsn3405de35e2f0",
          "x-rapidapi-host": "remove-background18.p.rapidapi.com",
          accept: "application/json",
        },
        data: formData,
      });

      const outputImageUrl = response.data?.url;
      if (outputImageUrl) {
        setRemovedBgImg(outputImageUrl);
      } else {
        setError("Background removed, but image URL not found in response.");
      }
    } catch (err) {
      console.error("Axios Error:", err.response?.data || err.message);
      setError("Failed to remove background. Please try a different image.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const res = await fetch(removedBgImg);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "bg-removed.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
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
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFile(file);
    } else {
      setError("Only image files are supported.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropZoneRef.current.classList.add("border-blue-500");
  };

  const handleDragLeave = () => {
    dropZoneRef.current.classList.remove("border-blue-500");
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Background Remover</h2>

      {/* Drop zone */}
      <div
        ref={dropZoneRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="border-2 border-dashed border-gray-400 rounded p-4 text-center mb-4 hover:border-blue-500 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current.click()}
      >
        <p className="text-gray-300">Drag and drop an image here, or click to select</p>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) handleFile(file);
        }}
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

      {/* Action buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={removeBackground}
          disabled={loading || !selectedFile}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
              Removing...
            </span>
          ) : (
            "Remove Background"
          )}
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
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Output */}
      {removedBgImg && (
        <div className="mt-6 text-center">
          <img
            src={removedBgImg}
            alt="Background Removed"
            className="rounded max-w-full h-auto mx-auto mb-4"
          />
          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded inline-block"
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default BgRemover;
