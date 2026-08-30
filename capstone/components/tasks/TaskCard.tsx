import { CheckCircle2, Circle, Pin, Flag } from "lucide-react";

export type TaskPriority = "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  completed: boolean;
  pinned?: boolean;
  category: string;
}

interface TaskCardProps {
  task: Task;
}

const priorityConfig: Record<
  TaskPriority,
  { label: string; className: string; dotClass: string }
> = {
  high: {
    label: "High",
    className: "bg-red-50 text-red-600",
    dotClass: "bg-red-500",
  },
  medium: {
    label: "Medium",
    className: "bg-amber-50 text-amber-600",
    dotClass: "bg-amber-400",
  },
  low: {
    label: "Low",
    className: "bg-emerald-50 text-emerald-700",
    dotClass: "bg-emerald-500",
  },
};

export default function TaskCard({ task }: TaskCardProps) {
  const p = priorityConfig[task.priority];

  return (
    <div
      className={`group bg-white rounded-2xl border border-stone-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-5 flex items-start gap-4 transition-shadow duration-150 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      {/* Completion toggle (dumb — no handler yet) */}
      <button
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
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
          {task.pinned && (
            <Pin size={12} className="text-emerald-600 flex-shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-2 mt-2">
          {/* Priority badge */}
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${p.className}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${p.dotClass}`} />
            {p.label}
          </span>
          {/* Category badge */}
          <span className="text-[11px] font-medium text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
            {task.category}
          </span>
        </div>
      </div>

      {/* Priority flag icon */}
      <Flag
        size={14}
        className={`flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${
          task.priority === "high"
            ? "text-red-500"
            : task.priority === "medium"
              ? "text-amber-500"
              : "text-emerald-500"
        }`}
      />
    </div>
  );
}
