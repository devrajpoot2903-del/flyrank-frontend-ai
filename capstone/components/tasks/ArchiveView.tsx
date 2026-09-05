import { Archive } from "lucide-react";

export default function ArchiveView() {
  return (
    <div className="px-8 pt-8 pb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[#F1F5F1] rounded-lg flex items-center justify-center">
          <Archive size={16} className="text-[#4B6B4A]" />
        </div>
        <div>
          <h2 className="text-[17px] font-bold text-stone-800 leading-none">Archive</h2>
          <p className="text-[12px] text-stone-400 mt-0.5">Long-term storage for old tasks</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-20 text-stone-300">
        <Archive size={40} strokeWidth={1.5} />
        <p className="mt-3 text-[13px] text-stone-400">Archive is empty.</p>
        <p className="mt-1 text-[12px] text-stone-300">
          Say &ldquo;archive all tasks&rdquo; to move completed tasks here.
        </p>
      </div>
    </div>
  );
}
