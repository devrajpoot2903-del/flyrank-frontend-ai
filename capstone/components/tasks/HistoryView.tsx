import { History } from "lucide-react";
import { type Task } from "@/lib/hooks/useTasks";

interface HistoryViewProps {
  tasks: Task[];
}

export default function HistoryView({ tasks }: HistoryViewProps) {
  const done = [...tasks].filter((t) => t.completed).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="px-8 pt-8 pb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[#F1F5F1] rounded-lg flex items-center justify-center">
          <History size={16} className="text-[#4B6B4A]" />
        </div>
        <div>
          <h2 className="text-[17px] font-bold text-stone-800 leading-none">History</h2>
          <p className="text-[12px] text-stone-400 mt-0.5">All completed tasks</p>
        </div>
      </div>

      {done.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-stone-300">
          <History size={40} strokeWidth={1.5} />
          <p className="mt-3 text-[13px] text-stone-400">No completed tasks yet.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {done.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 bg-stone-50 rounded-xl px-4 py-3 border border-stone-100"
            >
              <span className="text-emerald-500 text-[16px]">✓</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-stone-500 line-through truncate">{task.title}</p>
              </div>
              <span className="text-[10px] text-stone-400 flex-shrink-0">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
