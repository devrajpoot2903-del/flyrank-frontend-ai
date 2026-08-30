"use client";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import VoiceHero from "@/components/voice/VoiceHero";
import TaskBoard from "@/components/tasks/TaskBoard";
import DailyProgress from "@/components/tasks/DailyProgress";
import RecentActivity from "@/components/voice/RecentActivity";
import { useTasks } from "@/lib/hooks/useTasks";

export default function HomePage() {
  const {
    tasks,
    activity,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    setPriority,
    togglePin,
  } = useTasks();

  const activeTasks = tasks.filter((t) => !t.completed);
  const doneTasks = tasks.filter((t) => t.completed);
  const completedCount = doneTasks.length;

  const columns = [
    { id: "all", label: "All", tasks },
    { id: "active", label: "Active", tasks: activeTasks },
    { id: "done", label: "Done", tasks: doneTasks },
  ];

  return (
    <div className="w-full max-w-[1300px] h-[85vh] min-h-[700px] max-h-[850px] bg-white rounded-[2rem] shadow-2xl flex overflow-hidden">

      {/* Left Sidebar */}
      <Sidebar onAddTask={addTask} />

      {/* Center Stage */}
      <main className="flex-1 h-full flex flex-col overflow-y-auto border-r border-stone-100">
        <TopBar />
        <div className="flex-1 overflow-y-auto">
          <VoiceHero />
          <TaskBoard
            columns={columns}
            onToggle={toggleTaskCompletion}
            onDelete={deleteTask}
            onSetPriority={setPriority}
            onTogglePin={togglePin}
          />
        </div>
      </main>

      {/* Right Panel */}
      <aside className="w-[340px] h-full flex flex-col gap-6 p-8 border-l border-stone-100 bg-stone-50/30 flex-shrink-0 overflow-y-auto">
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
          <DailyProgress
            completed={completedCount}
            total={tasks.length}
            streak={7}
          />
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
          <RecentActivity events={activity} />
        </div>
      </aside>

    </div>
  );
}
