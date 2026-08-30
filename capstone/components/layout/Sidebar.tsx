"use client";

import { usePathname } from "next/navigation";
import { CalendarDays, CalendarClock, History, Archive, Settings, Leaf, Plus } from "lucide-react";
import { type TaskPriority } from "@/lib/hooks/useTasks";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  onAddTask: (title: string, priority?: TaskPriority) => void;
}

const mainNav: NavItem[] = [
  { id: "today", label: "Today", icon: <CalendarDays size={18} /> },
  { id: "upcoming", label: "Upcoming", icon: <CalendarClock size={18} /> },
  { id: "history", label: "History", icon: <History size={18} /> },
];

const bottomNav: NavItem[] = [
  { id: "archive", label: "Archive", icon: <Archive size={18} /> },
  { id: "settings", label: "Settings", icon: <Settings size={18} /> },
];

export default function Sidebar({ onAddTask }: SidebarProps) {
  const pathname = usePathname();
  const activeId = pathname === "/" ? "today" : "today";

  function handleNewTask() {
    const title = window.prompt("New task title:");
    if (title && title.trim()) {
      onAddTask(title.trim());
    }
  }

  return (
    <aside
      className="h-full flex flex-col flex-shrink-0 bg-[#FCFBF9] border-r border-stone-200"
      style={{ width: '280px', padding: '32px 24px' }}
    >
      <div className="flex items-center" style={{ gap: '12px', marginBottom: '40px', padding: '0 8px' }}>
        <div className="w-8 h-8 bg-[#4B6B4A] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
          <Leaf size={16} className="text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-[17px] font-bold text-stone-800 leading-none">EcoVoice</span>
          <span className="text-[12px] text-stone-500 mt-1">Your Voice, Organized</span>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <button
          aria-label="Add new task"
          onClick={handleNewTask}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#4B6B4A] text-white text-[14px] font-semibold hover:bg-[#3d5a3c] transition-colors duration-150 shadow-sm"
          style={{ padding: '12px 16px' }}
        >
          <Plus size={18} />
          New Task
        </button>
      </div>

      <nav className="flex-1">
        <ul className="flex flex-col" style={{ gap: '8px' }}>
          {mainNav.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  aria-label={item.label}
                  className={`w-full flex items-center gap-3 rounded-xl text-[14px] font-medium transition-colors duration-150 text-left ${isActive
                      ? "bg-[#F1F5F1] text-[#4B6B4A] font-semibold"
                      : "text-stone-500 hover:bg-stone-50 hover:text-stone-700"
                    }`}
                  style={{ padding: '10px 16px' }}
                >
                  <span className={isActive ? "text-[#4B6B4A]" : "text-stone-400"}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-stone-200 mt-auto" style={{ paddingTop: '24px' }}>
        <ul className="flex flex-col" style={{ gap: '8px' }}>
          {bottomNav.map((item) => (
            <li key={item.id}>
              <button
                aria-label={item.label}
                className="w-full flex items-center gap-3 rounded-xl text-[14px] font-medium text-stone-500 hover:bg-stone-50 hover:text-stone-700 transition-colors duration-150 text-left"
                style={{ padding: '10px 16px' }}
              >
                <span className="text-stone-400">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}