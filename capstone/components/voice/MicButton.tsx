"use client";

import { Mic, MicOff, Loader2 } from "lucide-react";
import type { VoiceState } from "@/lib/hooks/useVoice";

interface MicButtonProps {
  voiceState: VoiceState;
  onToggle: () => void;
}

export default function MicButton({ voiceState, onToggle }: MicButtonProps) {
  const isListening  = voiceState === "listening";
  const isProcessing = voiceState === "processing";
  const isSpeaking   = voiceState === "speaking";
  const isActive     = isListening || isProcessing || isSpeaking;

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center">
        {/* Ripple rings — only while listening */}
        {isListening && (
          <>
            <span className="absolute w-36 h-36 rounded-full bg-[#4B6B4A] opacity-10 animate-ping" />
            <span className="absolute w-44 h-44 rounded-full bg-[#4B6B4A] opacity-[0.07] animate-ping [animation-delay:200ms]" />
          </>
        )}

        <button
          onClick={onToggle}
          aria-label={isListening ? "Stop listening" : "Start voice command"}
          aria-pressed={isActive}
          disabled={isProcessing || isSpeaking}
          className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(75,107,74,0.3)] transition-all duration-200 focus-visible:outline-none cursor-pointer disabled:cursor-not-allowed ${
            isListening
              ? "bg-[#4B6B4A] scale-110 shadow-lg"
              : isProcessing || isSpeaking
              ? "bg-[#6b8f6a] scale-105 opacity-80"
              : "bg-[#4B6B4A] hover:bg-[#3d5a3c] hover:scale-105"
          }`}
        >
          {isProcessing ? (
            <Loader2 size={44} className="text-white animate-spin" />
          ) : isSpeaking ? (
            <MicOff size={44} className="text-white opacity-60" />
          ) : (
            <Mic size={44} className="text-white" />
          )}
        </button>
      </div>

      {/* Status label */}
      <p className="mt-3 text-[12px] font-medium text-stone-400 h-4">
        {isListening  && "Listening…"}
        {isProcessing && "Processing…"}
        {isSpeaking   && "Speaking…"}
      </p>
    </div>
  );
}
