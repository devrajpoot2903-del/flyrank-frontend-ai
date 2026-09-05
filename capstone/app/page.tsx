"use client";

import { useState, useCallback, useMemo } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import VoiceHero from "@/components/voice/VoiceHero";
import TaskBoard from "@/components/tasks/TaskBoard";
import CommandHistoryView from "@/components/tasks/CommandHistoryView";
import ArchiveView from "@/components/tasks/ArchiveView";
import SettingsView from "@/components/tasks/SettingsView";
import DailyProgress from "@/components/tasks/DailyProgress";
import RecentActivity, { type SessionLog } from "@/components/voice/RecentActivity";
import HelpModal from "@/components/layout/HelpModal";
import { useTasks } from "@/lib/hooks/useTasks";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
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

  const [voiceState,     setVoiceState]     = useState<VoiceState>("idle");
  const [lastTranscript, setLastTranscript] = useState("");
  const [isHelpOpen,     setIsHelpOpen]     = useState(false);
  const [searchQuery,    setSearchQuery]    = useState("");
  const [activeView,     setActiveView]     = useState("today");

  // Activity log — persisted to localStorage so it survives page reloads.
  // useLocalStorage is hydration-safe: returns [] on SSR, reads storage after mount.
  const [logs, setLogs] = useLocalStorage<SessionLog[]>("ecovoice_command_logs", []);

  const pushLog = useCallback((entry: Omit<SessionLog, "id" | "timestamp">) => {
    setLogs((prev) => [
      ...prev,
      { ...entry, id: crypto.randomUUID(), timestamp: new Date() },
    ]);
  }, []);

  const clearLogs = useCallback(() => setLogs([]), [setLogs]);

  const { start, stop } = useVoice({
    onStateChange:        setVoiceState,
    onTranscript:         setLastTranscript,
    onLog:                pushLog,
    onShowHelp:           () => setIsHelpOpen(true),
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

  // Filter tasks by search query (case-insensitive match on task title).
  const filteredTasks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter((t) => t.title.toLowerCase().includes(q));
  }, [tasks, searchQuery]);

  const activeTasks = filteredTasks.filter((t) => !t.completed);
  const doneTasks   = filteredTasks.filter((t) =>  t.completed);

  const columns = [
    { id: "all",    label: "All",    tasks: filteredTasks },
    { id: "active", label: "Active", tasks: activeTasks },
    { id: "done",   label: "Done",   tasks: doneTasks },
  ];

  // DailyProgress always uses unfiltered totals.
  const totalDone  = tasks.filter((t) =>  t.completed).length;
  const totalTasks = tasks.length;

  // ── Center stage: conditionally render based on activeView ────────────────────
  function renderCenterStage() {
    switch (activeView) {
      case "history":
        return <CommandHistoryView logs={logs} onClear={clearLogs} />;
      case "archive":
        return <ArchiveView />;
      case "settings":
        return <SettingsView />;
      case "today":
      case "upcoming":
      default:
        return (
          <>
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
          </>
        );
    }
  }

  return (
    <>
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      <div className="w-full max-w-[1300px] h-[85vh] min-h-[700px] max-h-[850px] bg-white rounded-[2rem] shadow-2xl flex overflow-hidden">

        {/* Left Sidebar */}
        <Sidebar
          onAddTask={addTask}
          activeView={activeView}
          setActiveView={setActiveView}
        />

        {/* Center Stage */}
        <main className="flex-1 h-full flex flex-col overflow-hidden border-r border-stone-100">
          <TopBar
            onHelp={() => setIsHelpOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            setActiveView={setActiveView}
            isListening={voiceState === "listening"}
          />
          <div className="flex-1 overflow-y-auto">
            {renderCenterStage()}
          </div>
        </main>

        {/* Right Panel */}
        <aside className="w-[340px] h-full flex flex-col gap-6 p-8 border-l border-stone-100 bg-stone-50/30 flex-shrink-0 overflow-hidden">
          <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm flex-shrink-0">
            <DailyProgress
              completed={totalDone}
              total={totalTasks}
              streak={7}
            />
          </div>
          <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm flex-1 min-h-0 flex flex-col overflow-hidden">
            <RecentActivity logs={logs} />
          </div>
        </aside>

      </div>
    </>
  );
}
