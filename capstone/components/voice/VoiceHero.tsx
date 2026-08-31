"use client";

import MicButton from "./MicButton";
import type { VoiceState } from "@/lib/hooks/useVoice";

interface VoiceHeroProps {
  voiceState: VoiceState;
  onToggleMic: () => void;
  lastTranscript?: string;
}

export default function VoiceHero({ voiceState, onToggleMic, lastTranscript }: VoiceHeroProps) {
  return (
    <div className="flex flex-col items-center pt-8 pb-4">
      {/* Mic button — absolute hero element */}
      <MicButton voiceState={voiceState} onToggle={onToggleMic} />

      {/* Heading */}
      <h2 className="mt-5 text-[26px] font-semibold tracking-tight text-stone-900 text-center leading-snug">
        How can I help you today?
      </h2>
      <p className="mt-2 text-[14px] text-stone-400 text-center">
        {lastTranscript ? `"${lastTranscript}"` : "Press the mic button to start"}
      </p>
    </div>
  );
}
