"use client";

import { useState } from "react";
import { Settings } from "lucide-react";

const THEMES = [
  { id: "cream",  label: "Cream Default" },
  { id: "dark",   label: "Classic Dark" },
  { id: "forest", label: "Eco Forest" },
];

export default function SettingsView() {
  const [voiceFeedback, setVoiceFeedback] = useState(true);
  const [speed,         setSpeed]         = useState(1.0);
  const [volume,        setVolume]        = useState(100);
  const [theme,         setTheme]         = useState("cream");

  return (
    <div className="px-8 pt-8 pb-10 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 bg-[#F1F5F1] rounded-xl flex items-center justify-center">
          <Settings size={18} className="text-[#4B6B4A]" />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-stone-800 leading-none">Settings</h2>
          <p className="text-[12px] text-stone-400 mt-1">
            Customize your voice assistant and interface preferences
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">

        {/* ── Section 1: Voice Feedback Toggle ───────────────────────────────── */}
        <div className="bg-stone-50 rounded-2xl border border-stone-100 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] font-semibold text-stone-800">Voice Feedback</p>
              <p className="text-[12px] text-stone-400 mt-0.5">
                Let EcoVoice speak responses after each command
              </p>
            </div>
            {/* Toggle switch */}
            <button
              role="switch"
              aria-checked={voiceFeedback}
              aria-label="Toggle voice feedback"
              onClick={() => setVoiceFeedback((p) => !p)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none flex-shrink-0 ${
                voiceFeedback ? "bg-[#4B6B4A]" : "bg-stone-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  voiceFeedback ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* ── Section 2: Speech Speed ─────────────────────────────────────────── */}
        <div className="bg-stone-50 rounded-2xl border border-stone-100 px-6 py-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[14px] font-semibold text-stone-800">Speech Speed</p>
              <p className="text-[12px] text-stone-400 mt-0.5">
                How fast EcoVoice reads back responses
              </p>
            </div>
            <span className="text-[13px] font-bold text-[#4B6B4A] tabular-nums">
              {speed.toFixed(1)}x
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-stone-400 w-8">Slow</span>
            <input
              type="range"
              min={0.5}
              max={2.0}
              step={0.1}
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              aria-label="Speech speed"
              className="flex-1 h-1.5 rounded-full appearance-none bg-stone-200 cursor-pointer accent-[#4B6B4A]"
            />
            <span className="text-[11px] text-stone-400 w-8 text-right">Fast</span>
          </div>
        </div>

        {/* ── Section 3: Speech Volume ────────────────────────────────────────── */}
        <div className="bg-stone-50 rounded-2xl border border-stone-100 px-6 py-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[14px] font-semibold text-stone-800">Speech Volume</p>
              <p className="text-[12px] text-stone-400 mt-0.5">
                Volume level for EcoVoice responses
              </p>
            </div>
            <span className="text-[13px] font-bold text-[#4B6B4A] tabular-nums">
              {volume}%
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-stone-400 w-8">0%</span>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              aria-label="Speech volume"
              className="flex-1 h-1.5 rounded-full appearance-none bg-stone-200 cursor-pointer accent-[#4B6B4A]"
            />
            <span className="text-[11px] text-stone-400 w-8 text-right">100%</span>
          </div>
        </div>

        {/* ── Section 4: App Theme ────────────────────────────────────────────── */}
        <div className="bg-stone-50 rounded-2xl border border-stone-100 px-6 py-5">
          <p className="text-[14px] font-semibold text-stone-800 mb-1">App Theme</p>
          <p className="text-[12px] text-stone-400 mb-4">
            Choose the visual style of your dashboard
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            {THEMES.map((t) => {
              const active = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`px-4 py-2 rounded-full text-[12.5px] font-medium border-2 transition-all duration-150 ${
                    active
                      ? "border-[#4B6B4A] text-[#4B6B4A] font-bold bg-[#F1F5F1]"
                      : "border-stone-200 text-stone-500 bg-white hover:border-stone-300 hover:text-stone-700"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Footer */}
      <p className="text-[11px] text-stone-300 text-center mt-10">
        EcoVoice — Capstone Project · All data stored locally in your browser.
      </p>
    </div>
  );
}
