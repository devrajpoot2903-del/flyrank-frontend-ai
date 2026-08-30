import { CheckCircle2, Circle } from "lucide-react";
import { type Task } from "./TaskCard";

interface TaskRowProps {
  task: Task;
}

function TaskRow({ task }: TaskRowProps) {
  return (
    <div
      className={`flex items-start gap-4 py-3 ${task.completed ? "opacity-50" : ""}`}
    >
      {/* Green Dot / Gray Dot for completed */}
      <div className="mt-1.5 flex-shrink-0">
        <div className={`w-2 h-2 rounded-full ${task.completed ? "bg-stone-300" : "bg-[#4B6B4A]"}`} />
      </div>

      <div className="flex-1 flex flex-col">
        <span
          className={`text-[14px] leading-snug ${task.completed
              ? "line-through text-stone-400"
              : "text-stone-700 font-bold"
            }`}
        >
          {task.title}
        </span>
        <span className="text-[10px] text-stone-400 font-medium tracking-wide uppercase mt-1">
          {task.completed ? "COMPLETED" : "DUE AT 10:18 PM"}
        </span>
      </div>

      <button
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        className="flex-shrink-0 text-stone-300 hover:text-[#4B6B4A] transition-colors mt-0.5 ml-4"
      >
        {task.completed ? (
          <CheckCircle2 size={16} className="text-[#4B6B4A]" />
        ) : (
          <Circle size={16} />
        )}
      </button>
    </div>
  );
}

interface TaskBoardProps {
  columns: { id: string; label: string; tasks: Task[] }[];
}

export default function TaskBoard({ columns }: TaskBoardProps) {
  const activeTasks = columns.find((c) => c.id === "active")?.tasks ?? [];
  const doneTasks = columns.find((c) => c.id === "done")?.tasks ?? [];

  return (
    <div className="py-2">
      {/* ── Today section ── */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-bold text-stone-800">Today</h3>
          <span className="text-[11px] text-stone-500 font-medium">{activeTasks.length} task{activeTasks.length !== 1 ? 's' : ''}</span>
        </div>

        {activeTasks.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-[13px] text-stone-400">No tasks for today.</p>
            <p className="text-[12px] text-stone-300 mt-1">
              Use the mic to add one.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {activeTasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>

      {/* ── Completed section ── */}
      {doneTasks.length > 0 && (
        <div className="mt-8 border-t border-stone-100 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-bold text-stone-400">
              Completed
            </h3>
            <span className="text-[11px] text-stone-400 font-medium">
              {doneTasks.length} done
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {doneTasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
