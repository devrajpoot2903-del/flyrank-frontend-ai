import MicButton from "./MicButton";

export default function VoiceHero() {
  return (
    <div className="flex flex-col items-center pt-8 pb-4">
      {/* Mic button — absolute hero element */}
      <MicButton />

      {/* Heading */}
      <h2 className="mt-5 text-[26px] font-semibold tracking-tight text-stone-900 text-center leading-snug">
        How can I help you today?
      </h2>
      <p className="mt-2 text-[14px] text-stone-400 text-center">
        Press the mic button to start
      </p>
    </div>
  );
}
