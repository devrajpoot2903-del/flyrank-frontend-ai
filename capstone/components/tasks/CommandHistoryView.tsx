"use client";

import { Terminal, CheckCircle2, HelpCircle } from "lucide-react";
import type { SessionLog } from "@/components/voice/RecentActivity";

interface CommandHistoryViewProps {
  logs: SessionLog[];
  onClear: () => void;
}

function StatusBadge({ type }: { type: SessionLog["type"] }) {
  if (type === "user_voice") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 flex-shrink-0">
        <CheckCircle2 size={10} />
        VOICE
      </span>
    );
  }
  if (type === "ai_response") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 flex-shrink-0">
        <CheckCircle2 size={10} />
        AI
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 flex-shrink-0">
      <HelpCircle size={10} />
      TASK
    </span>
  );
}

function timeLabel(d: Date | string): string {
  const date = d instanceof Date ? d : new Date(d);
  return date instanceof Date && !isNaN(date.getTime())
    ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";
}

export default function CommandHistoryView({ logs, onClear }: CommandHistoryViewProps) {
  // Show most-recent first
  const reversed = [...logs].reverse();

  return (
    <div className="px-8 pt-8 pb-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#F1F5F1] rounded-lg flex items-center justify-center">
            <Terminal size={16} className="text-[#4B6B4A]" />
          </div>
          <div>
            <h2 className="text-[17px] font-bold text-stone-800 leading-none">Command History</h2>
            <p className="text-[12px] text-stone-400 mt-0.5">
              {logs.length} event{logs.length !== 1 ? "s" : ""} this session
            </p>
          </div>
        </div>

        {logs.length > 0 && (
          <button
            onClick={onClear}
            className="text-[12px] font-semibold text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors duration-150"
          >
            Clear History
          </button>
        )}
      </div>

      {/* Log list */}
      {reversed.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-stone-300">
          <Terminal size={40} strokeWidth={1.5} />
          <p className="mt-3 text-[13px] text-stone-400">No commands yet.</p>
          <p className="mt-1 text-[12px] text-stone-300">
            Activate the mic and speak a command to see the log here.
          </p>
        </div>
      ) : (
        <ol className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-0 pr-0.5">
          {reversed.map((log, i) => (
            <li
              key={log.id ?? i}
              className="flex items-start gap-3 bg-stone-50 rounded-xl px-4 py-3 border border-stone-100 group"
            >
              {/* Index number */}
              <span className="text-[11px] text-stone-300 font-mono mt-0.5 w-5 flex-shrink-0 text-right">
                {reversed.length - i}
              </span>

              {/* Message */}
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] text-stone-700 leading-snug break-words">
                  {log.message}
                </p>
                <p className="text-[10px] text-stone-400 mt-0.5">{timeLabel(log.timestamp)}</p>
              </div>

              {/* Status badge */}
              <StatusBadge type={log.type} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
