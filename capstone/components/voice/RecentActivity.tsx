"use client";

import { useEffect, useRef } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface SessionLog {
  id: string;
  type: "task" | "user_voice" | "ai_response";
  message: string;
  timestamp: Date;
}

interface RecentActivityProps {
  logs: SessionLog[];
}

// ─── Badge config ───────────────────────────────────────────────────────────────

const BADGE: Record<
  SessionLog["type"],
  { label: string; icon: string; pill: string; text: string }
> = {
  user_voice:  { label: "VOICE", icon: "🎤", pill: "bg-[#F1F5F1] text-[#4B6B4A]",  text: "text-stone-700" },
  ai_response: { label: "AI",    icon: "✨", pill: "bg-blue-50 text-blue-600",       text: "text-stone-600" },
  task:        { label: "TASK",  icon: "📋", pill: "bg-stone-100 text-stone-500",    text: "text-stone-600" },
};

function timeLabel(d: Date): string {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function RecentActivity({ logs }: RecentActivityProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest entry whenever logs change.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div>
      <h2 className="text-[13px] font-semibold text-stone-700 mb-3">
        Activity Log
      </h2>

      {logs.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-[12px] text-stone-400">No activity yet.</p>
          <p className="text-[12px] text-[#4B6B4A] mt-1 font-medium">
            Activate the mic and speak a command.
          </p>
        </div>
      ) : (
        <ol className="flex flex-col gap-2.5 max-h-52 overflow-y-auto pr-0.5">
          {logs.map((log) => {
            const b = BADGE[log.type];
            return (
              <li key={log.id} className="flex items-start gap-2.5">
                {/* Icon */}
                <span className="text-[13px] mt-0.5 flex-shrink-0">{b.icon}</span>

                <div className="flex-1 min-w-0">
                  {/* Type pill */}
                  <span
                    className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full mb-0.5 ${b.pill}`}
                  >
                    {b.label}
                  </span>

                  {/* Message */}
                  <p className={`text-[11.5px] leading-snug break-words ${b.text}`}>
                    {log.message}
                  </p>

                  {/* Timestamp */}
                  <p className="text-[10px] text-stone-400 mt-0.5">
                    {timeLabel(log.timestamp)}
                  </p>
                </div>
              </li>
            );
          })}
          {/* Scroll anchor */}
          <div ref={bottomRef} />
        </ol>
      )}
    </div>
  );
}
