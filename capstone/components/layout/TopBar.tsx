import { Search, HelpCircle, Settings } from "lucide-react";

export default function TopBar() {
  return (
    <header className="h-20 flex items-center px-8 gap-4 flex-shrink-0 bg-[#F9F8F6]">
      <span className="text-[18px] font-bold text-stone-800 mr-2">EcoVoice</span>
      <div className="flex-1" />

      <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-400 text-[14px] hover:bg-stone-100 transition-colors duration-150 flex-1 max-w-[280px] mr-2">
        <Search size={16} />
        Search tasks...
      </button>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-8 h-4.5 rounded-full bg-stone-200 flex items-center px-0.5">
            <div className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
          </div>
          <span className="text-[13px] text-stone-500 font-medium">Off</span>
        </div>

        <div className="flex items-center gap-4 text-stone-400">
          <button className="hover:text-stone-800 transition-colors"><HelpCircle size={22} /></button>
          <button className="hover:text-stone-800 transition-colors"><Settings size={22} /></button>
        </div>

        <div className="w-10 h-10 rounded-full bg-[#1C352D] flex items-center justify-center text-white text-[16px] font-semibold shadow-sm cursor-pointer hover:bg-[#152a23] transition-colors">
          U
        </div>
      </div>
    </header>
  );
}