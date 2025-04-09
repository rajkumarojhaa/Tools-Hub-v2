import React, { useState } from "react";
import axios from "axios";

const TextToImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setImageUrl("");
    setError("");

    const encodedParams = new URLSearchParams();
    encodedParams.set("prompt", prompt);
    encodedParams.set("width", "1024");
    encodedParams.set("height", "1024");
    encodedParams.set("seed", "918440");
    encodedParams.set("model", "flux");

    try {
      const response = await axios.request({
        method: "POST",
        url: "https://ai-text-to-image-generator-flux-free-api.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/fluximagegenerate/generateimage.php",
        headers: {
          "x-rapidapi-key": "8b2433d626msha7dee48a2972e2ep1f6e58jsn3405de35e2f0",
          "x-rapidapi-host": "ai-text-to-image-generator-flux-free-api.p.rapidapi.com",
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "image/jpeg",
        },
        data: encodedParams,
        responseType: "blob", // 👈 Get raw image
      });

      const blob = new Blob([response.data], { type: "image/jpeg" });
      const blobUrl = URL.createObjectURL(blob);
      setImageUrl(blobUrl);
    } catch (err) {
      console.error("Image generation error:", err);
      setError("Failed to generate image. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "generated-image.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Text to Image Generator</h2>

      <input
        type="text"
        placeholder="Enter a prompt like 'Iron Man and Spider Man'"
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
          setError("");
          setImageUrl("");
        }}
        className="mb-4 w-full bg-white text-black p-2 rounded"
      />

      <button
        onClick={generateImage}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {imageUrl && (
        <div className="mt-6 text-center">
          <img
            src={imageUrl}
            alt="Generated"
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

export default TextToImageGenerator;
