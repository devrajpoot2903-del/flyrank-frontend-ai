"use client";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import VoiceHero from "@/components/voice/VoiceHero";
import TaskBoard from "@/components/tasks/TaskBoard";
import DailyProgress from "@/components/tasks/DailyProgress";
import RecentActivity from "@/components/voice/RecentActivity";
import { type Task } from "@/components/tasks/TaskCard";

// ─── Hardcoded dummy data (Phase 2 — no localStorage / useTasks yet) ───────

const DUMMY_TASKS_ALL: Task[] = [
  {
    id: "1",
    title: "Complete DSA assignment",
    priority: "high",
    completed: false,
    pinned: true,
    category: "Study",
  },
  {
    id: "2",
    title: "Buy groceries from market",
    priority: "medium",
    completed: false,
    category: "Personal",
  },
  {
    id: "3",
    title: "Call John at 3 PM",
    priority: "high",
    completed: true,
    category: "Work",
  },
  {
    id: "4",
    title: "Review pull request #42",
    priority: "medium",
    completed: false,
    category: "Work",
  },
  {
    id: "5",
    title: "Morning run 5km",
    priority: "low",
    completed: true,
    category: "Health",
  },
  {
    id: "6",
    title: "Read chapter 3 of Clean Code",
    priority: "low",
    completed: false,
    category: "Study",
  },
];

const DUMMY_COLUMNS = [
  { id: "all", label: "All", tasks: DUMMY_TASKS_ALL },
  {
    id: "active",
    label: "Active",
    tasks: DUMMY_TASKS_ALL.filter((t) => !t.completed),
  },
  {
    id: "done",
    label: "Done",
    tasks: DUMMY_TASKS_ALL.filter((t) => t.completed),
  },
];

const DUMMY_ACTIVITY = [
  {
    id: "a1",
    icon: "✅",
    text: 'Marked "Call John at 3 PM" as complete',
    time: "2 minutes ago",
    type: "complete" as const,
  },
  {
    id: "a2",
    icon: "➕",
    text: 'Created task "Review pull request #42"',
    time: "18 minutes ago",
    type: "create" as const,
  },
  {
    id: "a3",
    icon: "✅",
    text: 'Marked "Morning run 5km" as complete',
    time: "1 hour ago",
    type: "complete" as const,
  },
  {
    id: "a4",
    icon: "🗑️",
    text: 'Deleted task "Old project cleanup"',
    time: "3 hours ago",
    type: "delete" as const,
  },
  {
    id: "a5",
    icon: "✏️",
    text: 'Updated priority of "DSA assignment" to High',
    time: "Yesterday",
    type: "update" as const,
  },
];

const COMPLETED_COUNT = DUMMY_TASKS_ALL.filter((t) => t.completed).length;

// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    /*
     * Floating white card — wide, tall, and centered on the dark navy body.
     * w-[95vw] max-w-[1400px] ensures it never bleeds to edges.
     * min-h-[85vh] gives it proper dashboard presence.
     * rounded-3xl + overflow-hidden clips all children cleanly.
     */
    <div className="w-full max-w-[1300px] h-[85vh] min-h-[700px] bg-white rounded-[2rem] shadow-2xl flex overflow-hidden">
      {/*
       * ── Three-column shell ──
       * [Sidebar w-60] | [Center flex-1] | [Right panel w-72]
       */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Left: Sidebar ── */}
        <Sidebar />

        {/* ── Center + Right: share TopBar across them ── */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#F9F8F6] rounded-2xl">
          {/* TopBar spans center + right */}
          <TopBar />

          {/* Content row: center stage + right panel */}
          <div className="flex flex-1 overflow-auto">
            {/* ── Center Stage ── */}
            <main className="flex-1 overflow-y-auto px-12 py-8">
              {/* Mic is the absolute hero — centred with generous vertical space */}
              <VoiceHero />

              {/* Task sections sit below the mic without a card wrapper */}
              <TaskBoard columns={DUMMY_COLUMNS} />
            </main>

            {/* ── Right Panel (w-72) ── */}
            <aside className="w-72 flex-shrink-0 overflow-y-auto p-6 flex flex-col gap-6">
              {/* Daily Progress card */}
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm">
                <DailyProgress
                  completed={COMPLETED_COUNT}
                  total={DUMMY_TASKS_ALL.length}
                  streak={7}
                />
              </div>

              {/* Recent Activity card */}
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm">
                <RecentActivity events={DUMMY_ACTIVITY} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
