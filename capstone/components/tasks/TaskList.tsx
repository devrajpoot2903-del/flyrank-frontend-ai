"use client";

import TaskCard from "./TaskCard";
import { ListTodo } from "lucide-react";
import { type Task } from "@/lib/hooks/useTasks";

interface TaskListProps {
  tasks: Task[];
  emptyMessage?: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({
  tasks,
  emptyMessage = "No tasks here.",
  onToggle,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-stone-300">
        <ListTodo size={40} strokeWidth={1.5} />
        <p className="mt-3 text-[13px] text-stone-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
