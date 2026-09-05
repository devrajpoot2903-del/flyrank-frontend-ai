"use client";

import { Search, HelpCircle, Settings } from "lucide-react";

interface TopBarProps {
  onHelp?: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  setActiveView: (id: string) => void;
  isListening: boolean;
}

export default function TopBar({
  onHelp,
  searchQuery,
  onSearchChange,
  setActiveView,
  isListening,
}: TopBarProps) {
  return (
    <header className="h-20 flex items-center px-8 gap-4 flex-shrink-0 bg-[#F9F8F6]">
      <span className="text-[18px] font-bold text-stone-800 mr-2">EcoVoice</span>
      <div className="flex-1" />

      {/* Search input */}
      <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-400 text-[14px] flex-1 max-w-[280px] mr-2 focus-within:border-stone-400 focus-within:bg-white transition-colors duration-150">
        <Search size={16} className="flex-shrink-0" />
        <input
          id="task-search"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="bg-transparent outline-none w-full text-stone-700 placeholder:text-stone-400 text-[14px]"
          aria-label="Search tasks"
        />
      </label>

      <div className="flex items-center gap-6">
        {/* Mic active indicator */}
        <div className="flex items-center gap-1.5">
          <div
            className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors duration-200 ${
              isListening ? "bg-emerald-500" : "bg-stone-200"
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-full shadow-sm transition-transform duration-200 ${
                isListening ? "translate-x-3.5 bg-white" : "bg-white"
              }`}
            />
          </div>
          <span
            className={`text-[13px] font-medium transition-colors duration-200 ${
              isListening ? "text-emerald-600" : "text-stone-500"
            }`}
          >
            {isListening ? "On" : "Off"}
          </span>
        </div>

        <div className="flex items-center gap-4 text-stone-400">
          <button aria-label="Help" onClick={onHelp} className="hover:text-stone-800 transition-colors">
            <HelpCircle size={22} />
          </button>
          <button
            aria-label="Settings"
            onClick={() => setActiveView("settings")}
            className="hover:text-stone-800 transition-colors"
          >
            <Settings size={22} />
          </button>
        </div>

        <div className="w-10 h-10 rounded-full bg-[#1C352D] flex items-center justify-center text-white text-[16px] font-semibold shadow-sm cursor-pointer hover:bg-[#152a23] transition-colors">
          U
        </div>
      </div>
    </header>
  );
}
