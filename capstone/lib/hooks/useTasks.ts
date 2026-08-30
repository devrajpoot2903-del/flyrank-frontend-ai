"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type TaskPriority = "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  pinned: boolean;
  createdAt: string;
}

export interface ActivityEvent {
  id: string;
  icon: string;
  text: string;
  time: string;
  type: "create" | "complete" | "delete" | "update";
}

function nowISO() {
  return new Date().toISOString();
}

function timeLabel() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("ecovoice_tasks", []);
  const [activity, setActivity] = useLocalStorage<ActivityEvent[]>("ecovoice_activity", []);

  const pushActivity = useCallback(
    (event: Omit<ActivityEvent, "id" | "time">) => {
      const entry: ActivityEvent = {
        ...event,
        id: crypto.randomUUID(),
        time: timeLabel(),
      };
      setActivity((prev) => [entry, ...prev].slice(0, 20));
    },
    [setActivity]
  );

  const addTask = useCallback(
    (title: string, priority: TaskPriority = "medium") => {
      const task: Task = {
        id: crypto.randomUUID(),
        title: title.trim(),
        completed: false,
        priority,
        pinned: false,
        createdAt: nowISO(),
      };
      setTasks((prev) => [task, ...prev]);
      pushActivity({ icon: "➕", text: `Task "${task.title}" added.`, type: "create" });
    },
    [setTasks, pushActivity]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => {
        const task = prev.find((t) => t.id === id);
        if (task) {
          pushActivity({ icon: "🗑️", text: `Deleted task "${task.title}".`, type: "delete" });
        }
        return prev.filter((t) => t.id !== id);
      });
    },
    [setTasks, pushActivity]
  );

  const toggleTaskCompletion = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t;
          const updated = { ...t, completed: !t.completed };
          pushActivity({
            icon: updated.completed ? "✅" : "↩️",
            text: updated.completed
              ? `Marked "${updated.title}" as complete.`
              : `Unmarked "${updated.title}".`,
            type: "complete",
          });
          return updated;
        })
      );
    },
    [setTasks, pushActivity]
  );

  const setPriority = useCallback(
    (id: string, priority: TaskPriority) => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t;
          const updated = { ...t, priority };
          pushActivity({
            icon: "✏️",
            text: `Updated priority of "${updated.title}" to ${priority}.`,
            type: "update",
          });
          return updated;
        })
      );
    },
    [setTasks, pushActivity]
  );

  const togglePin = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, pinned: !t.pinned } : t))
      );
    },
    [setTasks]
  );

  return { tasks, activity, addTask, deleteTask, toggleTaskCompletion, setPriority, togglePin };
}
