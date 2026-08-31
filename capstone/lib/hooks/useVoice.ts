"use client";

import { useEffect, useRef, useCallback } from "react";
import { parseCommand } from "@/lib/services/parser/commandParser";
import { speak } from "@/lib/services/voice/speechService";
import {
  createSpeechRecognition,
} from "@/lib/services/voice/speechRecognition";
import type { Task, TaskPriority } from "@/lib/hooks/useTasks";

export type VoiceState = "idle" | "listening" | "processing" | "speaking" | "error";

interface UseVoiceOptions {
  onStateChange: (state: VoiceState) => void;
  onTranscript?: (text: string) => void;
  // Pass the stable dispatcher functions from useTasks.
  // These are wrapped in useCallback so they never change identity.
  tasks: Task[];
  addTask: (title: string, priority?: TaskPriority) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  setPriority: (id: string, priority: TaskPriority) => void;
  togglePin: (id: string) => void;
}

// Fuzzy task lookup — never reads from a closure-captured stale array.
// Always called with the ref.current snapshot.
function findTaskByQuery(
  tasks: Task[],
  query: string
): string | null {
  if (!query) return null;
  const q = query.toLowerCase();
  const exact = tasks.find((t) => t.title.toLowerCase() === q);
  if (exact) return exact.id;
  const partial = tasks.find((t) => t.title.toLowerCase().includes(q));
  return partial?.id ?? null;
}

export function useVoice({
  onStateChange,
  onTranscript,
  tasks,
  addTask,
  deleteTask,
  toggleTaskCompletion,
  setPriority,
  togglePin,
}: UseVoiceOptions) {
  const srRef = useRef<ReturnType<typeof createSpeechRecognition> | null>(null);

  // Keep a ref to the latest tasks array so the SR callback never
  // captures a stale closure — it reads tasksRef.current at call time.
  const tasksRef = useRef<Task[]>(tasks);
  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

  // Stable refs to dispatchers so handleTranscript never needs to be
  // recreated when task list changes.
  const addTaskRef              = useRef(addTask);
  const deleteTaskRef           = useRef(deleteTask);
  const toggleCompletionRef     = useRef(toggleTaskCompletion);
  const setPriorityRef          = useRef(setPriority);
  const togglePinRef            = useRef(togglePin);

  useEffect(() => { addTaskRef.current = addTask; },              [addTask]);
  useEffect(() => { deleteTaskRef.current = deleteTask; },         [deleteTask]);
  useEffect(() => { toggleCompletionRef.current = toggleTaskCompletion; }, [toggleTaskCompletion]);
  useEffect(() => { setPriorityRef.current = setPriority; },       [setPriority]);
  useEffect(() => { togglePinRef.current = togglePin; },           [togglePin]);

  // handleTranscript is stable — only reads through refs, never re-created.
  const handleTranscript = useCallback((text: string) => {
    onTranscript?.(text);
    const result = parseCommand(text);
    console.log("[Voice] Parsed command:", result);

    let ttsText = "";

    switch (result.type) {
      case "CREATE_TASK": {
        const priority: TaskPriority =
          result.priority === "high" ? "high" : "medium";
        addTaskRef.current(result.task as string, priority);
        ttsText = `Task "${result.task}" added.`;
        break;
      }
      case "DELETE_TASK": {
        const id = findTaskByQuery(tasksRef.current, result.query as string);
        if (id) {
          deleteTaskRef.current(id);
          ttsText = `Task deleted.`;
        } else {
          ttsText = `I couldn't find a task matching "${result.query}".`;
        }
        break;
      }
      case "COMPLETE_TASK": {
        const id = findTaskByQuery(tasksRef.current, result.query as string);
        if (id) {
          const task = tasksRef.current.find((t) => t.id === id);
          if (task && !task.completed) toggleCompletionRef.current(id);
          ttsText = `Task marked complete.`;
        } else {
          ttsText = `I couldn't find a task matching "${result.query}".`;
        }
        break;
      }
      case "UNCOMPLETE_TASK": {
        const id = findTaskByQuery(tasksRef.current, result.query as string);
        if (id) {
          const task = tasksRef.current.find((t) => t.id === id);
          if (task && task.completed) toggleCompletionRef.current(id);
          ttsText = `Task moved back to pending.`;
        } else {
          ttsText = `I couldn't find that task.`;
        }
        break;
      }
      case "SET_PRIORITY": {
        const id = findTaskByQuery(tasksRef.current, result.query as string);
        if (id) {
          const p: TaskPriority =
            result.priority === "high" ? "high" : "medium";
          setPriorityRef.current(id, p);
          ttsText = `Priority updated.`;
        } else {
          ttsText = `I couldn't find a task matching "${result.query}".`;
        }
        break;
      }
      case "PIN_TASK": {
        const id = findTaskByQuery(tasksRef.current, result.query as string);
        if (id) {
          togglePinRef.current(id);
          ttsText = `Task pinned.`;
        } else {
          ttsText = `I couldn't find that task.`;
        }
        break;
      }
      case "UNPIN_TASK": {
        const id = findTaskByQuery(tasksRef.current, result.query as string);
        if (id) {
          togglePinRef.current(id);
          ttsText = `Task unpinned.`;
        } else {
          ttsText = `I couldn't find that task.`;
        }
        break;
      }
      default: {
        ttsText = "I didn't understand that. Please try again.";
        break;
      }
    }

    if (ttsText) {
      srRef.current?.enterSpeaking?.();
      speak(ttsText, {
        onEnd: () => {
          srRef.current?.startAfterDelay?.(750);
        },
      });
    }
  // onTranscript is intentionally omitted — it is a render-time callback
  // that doesn't affect the dispatch logic.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Build SR instance once on client mount.
  useEffect(() => {
    srRef.current = createSpeechRecognition({
      onStateChange: (s: string) => {
        onStateChange(s as VoiceState);
      },
      onResult: (text: string) => {
        handleTranscript(text);
      },
      onError: (code: string) => {
        console.error("[Voice] Recognition error:", code);
      },
    });
    return () => {
      srRef.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback(() => srRef.current?.start(), []);
  const stop  = useCallback(() => srRef.current?.stop(),  []);

  return { start, stop };
}
