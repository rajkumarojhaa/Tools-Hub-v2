// src/components/Home.js
import React from 'react';
import AnimatedText from '../components/AnimatedText';
import ToolCard from './ToolCard';
import { FaFileAlt } from 'react-icons/fa';
import { FaImage } from "react-icons/fa";
import { GiPaintBrush } from "react-icons/gi"; // for background remover
import { BsQrCode } from "react-icons/bs";
import { FaEnvelopeOpenText } from "react-icons/fa"; // for temp mail generator
import { GiPaperClip } from "react-icons/gi"; // for text editor
import { FcEditImage } from "react-icons/fc"
import { BsMailbox } from "react-icons/bs";

const Home = () => {
  return (
    <div>
      <AnimatedText />
      <p className="text-center mx-auto mt-3 px-5 text-lg text-slate-400">
        Here is a collection of online free tools I have frequently used.
      </p>
      <div className="grid grid-cols-1 sm:gap-8 gap-5 w-full">
        <ToolCard 
          title="Converter" 
          tools={[
            { name: "Image Converter", path: "/image-converter", icon: <FcEditImage  className="text-4xl text-green-500 mr-4" /> }, 
            { name: "Color Converter", path: "/color-converter", icon: "🎨" },
            { name: "Background Remover", path: "/background-remover", icon: <GiPaintBrush className="text-4xl text-yellow-500 mr-4" /> } // updated icon for background remover
          ]} 
        />
        <ToolCard 
          title="Text Editor" 
          tools={[
            { name: "Word Counter", path: "/word-counter", icon: <GiPaperClip className="text-4xl text-blue-500 mr-4" /> }, // updated icon for text editor
            { name: "Text Formatter", path: "/text-formatter", icon: <GiPaperClip className="text-4xl text-blue-500 mr-4" /> }, // same icon for text editor tools
            { name: "Text To Image", path: "/texttoimage-generator", icon: <FaFileAlt className="text-4xl text-blue-500 mr-4" /> }, // keeping file icon for Text To Image
          ]} 
        />
        <ToolCard 
          title="Generator" 
          tools={[
            { name: "Qrcode Generator", path: "/qrcode-generator", icon: <BsQrCode className="text-4xl text-blue-500 mr-4"/> }, // keeping QR code icon
            { name: "Tempmail Generator", path: "/tempmail-generator", icon: <BsMailbox  className="text-4xl text-blue-500 mr-4"/> }, // updated icon for temp mail generator
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
