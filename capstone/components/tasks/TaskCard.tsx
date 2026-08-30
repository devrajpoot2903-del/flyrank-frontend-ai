"use client";

// Re-export Task type from hook so existing imports still work.
export type { Task, TaskPriority } from "@/lib/hooks/useTasks";

import { CheckCircle2, Circle, Pin, Trash2 } from "lucide-react";
import { type Task, type TaskPriority } from "@/lib/hooks/useTasks";

const priorityConfig: Record<
  TaskPriority,
  { label: string; className: string; dotClass: string }
> = {
  high: { label: "High", className: "bg-red-50 text-red-600", dotClass: "bg-red-500" },
  medium: { label: "Medium", className: "bg-amber-50 text-amber-600", dotClass: "bg-amber-400" },
  low: { label: "Low", className: "bg-emerald-50 text-emerald-700", dotClass: "bg-emerald-500" },
};

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const p = priorityConfig[task.priority];

  return (
    <div
      className={`group bg-white rounded-2xl border border-stone-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-5 flex items-start gap-4 transition-shadow duration-150 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      {/* Completion toggle */}
      <button
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        onClick={() => onToggle(task.id)}
        className="mt-0.5 flex-shrink-0 text-stone-300 hover:text-emerald-600 transition-colors duration-150"
      >
        {task.completed ? (
          <CheckCircle2 size={20} className="text-emerald-600" />
        ) : (
          <Circle size={20} />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p
            className={`text-[14px] font-semibold text-stone-800 leading-snug ${
              task.completed ? "line-through text-stone-400" : ""
            }`}
          >
            {task.title}
          </p>
          {task.pinned && <Pin size={12} className="text-emerald-600 flex-shrink-0" />}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${p.className}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${p.dotClass}`} />
            {p.label}
          </span>
        </div>
      </div>

      {/* Delete button (visible on hover) */}
      <button
        aria-label="Delete task"
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 mt-0.5 text-stone-200 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-150"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
