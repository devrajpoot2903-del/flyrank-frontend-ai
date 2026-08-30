"use client";

import { Mic } from "lucide-react";
import { useState } from "react";

export default function MicButton() {
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center">
        {isListening && (
          <>
            <span className="absolute w-36 h-36 rounded-full bg-[#4B6B4A] opacity-10 animate-ping" />
            <span className="absolute w-44 h-44 rounded-full bg-[#4B6B4A] opacity-15 animate-ping [animation-delay:200ms]" />
          </>
        )}
        <button
          onClick={() => setIsListening((p) => !p)}
          aria-label={isListening ? "Stop listening" : "Start voice command"}
          aria-pressed={isListening}
          className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(75,107,74,0.3)] transition-all duration-200 focus-visible:outline-none cursor-pointer ${isListening
              ? "bg-[#4B6B4A] scale-110 shadow-lg"
              : "bg-[#4B6B4A] hover:bg-[#3d5a3c] hover:scale-105"
            }`}
        >
          <Mic size={44} className="text-white" />
        </button>
      </div>
    </div>
  );
}