"use client";

import { useEffect } from "react";
import { X, Plus, Trash2, CheckSquare, Pin, CircleAlert, MessageCircle } from "lucide-react";

export default function HelpModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
      onClick={onClose} // Clicking backdrop closes modal
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-stone-100">
          <div>
            <h2 className="text-xl font-bold text-stone-800">Voice Commands</h2>
            <p className="text-sm text-stone-500 mt-1">Speak naturally — EcoVoice understands you</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-50 transition-colors"
            aria-label="Close help"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-8">

          <CommandSection icon={<Plus size={18} className="text-indigo-500" />} title="Create Task">
            <CommandBadge text='"I need to study DSA"' />
            <CommandBadge text='"Remind me to call mom"' />
            <CommandBadge text='"Buy groceries tomorrow"' />
            <CommandBadge text='"Schedule gym session"' />
          </CommandSection>

          <CommandSection icon={<Trash2 size={18} className="text-stone-400" />} title="Delete Task">
            <CommandBadge text='"Delete study DSA"' />
            <CommandBadge text='"Remove buy groceries"' />
            <CommandBadge text='"Erase call mom"' />
          </CommandSection>

          <CommandSection icon={<CheckSquare size={18} className="text-emerald-500" />} title="Complete Task">
            <CommandBadge text='"Complete study DSA"' />
            <CommandBadge text='"Mark call mom as done"' />
            <CommandBadge text='"Finish buy groceries"' />
          </CommandSection>

          <CommandSection icon={<Pin size={18} className="text-rose-500" />} title="Pin Task">
            <CommandBadge text='"Pin study DSA"' />
            <CommandBadge text='"Star buy groceries"' />
            <CommandBadge text='"Mark call mom important"' />
          </CommandSection>

          <CommandSection icon={<CircleAlert size={18} className="text-red-500" />} title="Set Priority">
            <CommandBadge text='"Mark study DSA high priority"' />
            <CommandBadge text='"Make call mom urgent"' />
            <CommandBadge text='"Set groceries to normal priority"' />
          </CommandSection>

          <CommandSection icon={<MessageCircle size={18} className="text-purple-400" />} title="Chat Mode">
            <CommandBadge text='"What can you do?"' />
            <CommandBadge text='"How do priorities work?"' />
            <CommandBadge text='"Namaste" / "Hello"' />
          </CommandSection>

          <div className="text-center text-xs text-stone-400 mt-2">
            Tip: Say "help" anytime to open this panel
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable micro-components for the modal
function CommandSection({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-semibold text-stone-800">{title}</h3>
      </div>
      <div className="flex flex-col gap-2 pl-7">
        {children}
      </div>
    </div>
  );
}

function CommandBadge({ text }: { text: string }) {
  return (
    <div className="px-3 py-2 bg-stone-50 rounded-lg text-[13px] text-stone-600 font-mono">
      {text}
    </div>
  );
}