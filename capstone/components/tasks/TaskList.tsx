import TaskCard, { type Task } from "./TaskCard";
import { ListTodo } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  emptyMessage?: string;
}

export default function TaskList({
  tasks,
  emptyMessage = "No tasks here.",
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
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
