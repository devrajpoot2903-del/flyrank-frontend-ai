"use client";

import { CheckCircle2, Circle, Trash2 } from "lucide-react";
import { type Task, type TaskPriority } from "@/lib/hooks/useTasks";

interface TaskRowProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TaskRow({ task, onToggle, onDelete }: TaskRowProps) {
  return (
    <div className={`flex items-start gap-3 py-2.5 group ${task.completed ? "opacity-50" : ""}`}>
      {/* Status dot */}
      <div className="mt-1.5 flex-shrink-0">
        <div className={`w-2 h-2 rounded-full ${task.completed ? "bg-stone-300" : "bg-[#4B6B4A]"}`} />
      </div>

      {/* Title + due */}
      <div className="flex-1 flex flex-col">
        <span
          className={`text-[13.5px] leading-snug ${
            task.completed ? "line-through text-stone-400" : "text-stone-700 font-semibold"
          }`}
        >
          {task.title}
        </span>
        <span className="text-[10px] text-stone-400 font-medium tracking-wide uppercase mt-0.5">
          {task.completed ? "COMPLETED" : `Added ${new Date(task.createdAt).toLocaleDateString()}`}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
        <button
          aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
          onClick={() => onToggle(task.id)}
          className="text-stone-300 hover:text-[#4B6B4A] transition-colors"
        >
          {task.completed ? (
            <CheckCircle2 size={15} className="text-[#4B6B4A]" />
          ) : (
            <Circle size={15} />
          )}
        </button>
        <button
          aria-label="Delete task"
          onClick={() => onDelete(task.id)}
          className="text-stone-200 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}

interface TaskBoardProps {
  columns: { id: string; label: string; tasks: Task[] }[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onSetPriority: (id: string, priority: TaskPriority) => void;
  onTogglePin: (id: string) => void;
}

export default function TaskBoard({ columns, onToggle, onDelete }: TaskBoardProps) {
  const activeTasks = columns.find((c) => c.id === "active")?.tasks ?? [];
  const doneTasks = columns.find((c) => c.id === "done")?.tasks ?? [];

  return (
    <div className="px-8 pt-3 pb-6">
      {/* Today section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-semibold text-stone-700">Today</h3>
          <span className="text-[11px] text-stone-400 font-medium">
            {activeTasks.length} task{activeTasks.length !== 1 ? "s" : ""}
          </span>
        </div>

        {activeTasks.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-[13px] text-stone-400">No tasks for today.</p>
            <p className="text-[12px] text-stone-300 mt-1">
              Click &ldquo;New Task&rdquo; or use the mic to add one.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {activeTasks.map((task) => (
              <TaskRow key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
            ))}
          </div>
        )}
      </div>

      {/* Completed section */}
      {doneTasks.length > 0 && (
        <div className="border-t border-stone-100 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-semibold text-stone-400">Completed</h3>
            <span className="text-[11px] text-stone-400 font-medium">{doneTasks.length} done</span>
          </div>
          <div className="flex flex-col">
            {doneTasks.map((task) => (
              <TaskRow key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
