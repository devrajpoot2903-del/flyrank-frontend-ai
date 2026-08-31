"use client";

import HelpModal from "@/components/layout/HelpModal";
import { useState, useCallback } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import VoiceHero from "@/components/voice/VoiceHero";
import TaskBoard from "@/components/tasks/TaskBoard";
import DailyProgress from "@/components/tasks/DailyProgress";
import RecentActivity, { type SessionLog } from "@/components/voice/RecentActivity";
import { useTasks } from "@/lib/hooks/useTasks";
import { useVoice, type VoiceState } from "@/lib/hooks/useVoice";

export default function HomePage() {
  const {
    tasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    setPriority,
    togglePin,
  } = useTasks();

  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [lastTranscript, setLastTranscript] = useState("");
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  // Session-only activity log — NOT persisted to localStorage.
  const [logs, setLogs] = useState<SessionLog[]>([]);

  const pushLog = useCallback((entry: Omit<SessionLog, "id" | "timestamp">) => {
    setLogs((prev) => [
      ...prev,
      { ...entry, id: crypto.randomUUID(), timestamp: new Date() },
    ]);
  }, []);

  const { start, stop } = useVoice({
    onStateChange: setVoiceState,
    onTranscript: setLastTranscript,
    onLog: pushLog,
    onShowHelp: () => setIsHelpOpen(true),
    tasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    setPriority,
    togglePin,
  });

  const handleToggleMic = useCallback(() => {
    if (voiceState === "idle" || voiceState === "error") {
      start();
    } else {
      stop();
    }
  }, [voiceState, start, stop]);

  const activeTasks = tasks.filter((t) => !t.completed);
  const doneTasks = tasks.filter((t) => t.completed);

  const columns = [
    { id: "all", label: "All", tasks },
    { id: "active", label: "Active", tasks: activeTasks },
    { id: "done", label: "Done", tasks: doneTasks },
  ];

  return (
    <>
      {/* Help modal — sits above everything */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      <div className="w-full max-w-[1300px] h-[85vh] min-h-[700px] max-h-[850px] bg-white rounded-[2rem] shadow-2xl flex overflow-hidden">

        {/* Left Sidebar */}
        <Sidebar onAddTask={addTask} />

        {/* Center Stage */}
        <main className="flex-1 h-full flex flex-col overflow-y-auto border-r border-stone-100">
          <TopBar onHelp={() => setIsHelpOpen(true)} />
          <div className="flex-1 overflow-y-auto">
            <VoiceHero
              voiceState={voiceState}
              onToggleMic={handleToggleMic}
              lastTranscript={lastTranscript}
            />
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
              completed={doneTasks.length}
              total={tasks.length}
              streak={7}
            />
          </div>
          <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm flex-1 min-h-0">
            <RecentActivity logs={logs} />
          </div>
        </aside>

      </div>
    </>
  );
}
