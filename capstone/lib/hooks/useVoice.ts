"use client";

import { useEffect, useRef, useCallback } from "react";
import { parseCommand } from "@/lib/services/parser/commandParser";
import { processWithAI } from "@/lib/services/ai/aiCommandProcessor";
import { speak } from "@/lib/services/voice/speechService";
import { createSpeechRecognition } from "@/lib/services/voice/speechRecognition";
import type { Task, TaskPriority } from "@/lib/hooks/useTasks";
import type { SessionLog } from "@/components/voice/RecentActivity";

export type VoiceState = "idle" | "listening" | "processing" | "speaking" | "error";

interface UseVoiceOptions {
  onStateChange: (state: VoiceState) => void;
  onTranscript?: (text: string) => void;
  onLog: (log: Omit<SessionLog, "id" | "timestamp">) => void;
  onShowHelp: () => void;
  tasks: Task[];
  addTask: (title: string, priority?: TaskPriority) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  setPriority: (id: string, priority: TaskPriority) => void;
  togglePin: (id: string) => void;
}

function findTaskByQuery(tasks: Task[], query: string): string | null {
  if (!query) return null;
  const q = query.toLowerCase();
  const exact   = tasks.find((t) => t.title.toLowerCase() === q);
  if (exact) return exact.id;
  const partial = tasks.find((t) => t.title.toLowerCase().includes(q));
  return partial?.id ?? null;
}

export function useVoice({
  onStateChange,
  onTranscript,
  onLog,
  onShowHelp,
  tasks,
  addTask,
  deleteTask,
  toggleTaskCompletion,
  setPriority,
  togglePin,
}: UseVoiceOptions) {
  const srRef = useRef<ReturnType<typeof createSpeechRecognition> | null>(null);

  // Live snapshot of tasks
  const tasksRef = useRef<Task[]>(tasks);
  useEffect(() => { tasksRef.current = tasks; }, [tasks]);

  // Stable dispatcher refs
  const addTaskRef          = useRef(addTask);
  const deleteTaskRef       = useRef(deleteTask);
  const toggleCompletionRef = useRef(toggleTaskCompletion);
  const setPriorityRef      = useRef(setPriority);
  const togglePinRef        = useRef(togglePin);
  const onStateChangeRef    = useRef(onStateChange);
  const onLogRef            = useRef(onLog);
  const onShowHelpRef       = useRef(onShowHelp);

  useEffect(() => { addTaskRef.current = addTask; },                    [addTask]);
  useEffect(() => { deleteTaskRef.current = deleteTask; },              [deleteTask]);
  useEffect(() => { toggleCompletionRef.current = toggleTaskCompletion; }, [toggleTaskCompletion]);
  useEffect(() => { setPriorityRef.current = setPriority; },            [setPriority]);
  useEffect(() => { togglePinRef.current = togglePin; },                [togglePin]);
  useEffect(() => { onStateChangeRef.current = onStateChange; },        [onStateChange]);
  useEffect(() => { onLogRef.current = onLog; },                        [onLog]);
  useEffect(() => { onShowHelpRef.current = onShowHelp; },              [onShowHelp]);

  /**
   * Dispatch a resolved command object and return the TTS confirmation text.
   */
  const dispatchCommand = useCallback(
    (result: Record<string, unknown>): string => {
      let ttsText = "";

      switch (result.type) {
        case "CREATE_TASK": {
          const priority: TaskPriority = result.priority === "high" ? "high" : "medium";
          addTaskRef.current(result.task as string, priority);
          ttsText = (result.response as string) || `Task "${result.task}" added.`;
          onLogRef.current({ type: "task", message: `Added: ${result.task}` });
          break;
        }
        case "DELETE_TASK": {
          const id = findTaskByQuery(tasksRef.current, result.query as string);
          if (id) {
            deleteTaskRef.current(id);
            ttsText = (result.response as string) || "Task deleted.";
            onLogRef.current({ type: "task", message: `Deleted: ${result.query}` });
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
            ttsText = (result.response as string) || "Task marked complete.";
            onLogRef.current({ type: "task", message: `Completed: ${result.query}` });
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
            ttsText = (result.response as string) || "Task moved back to pending.";
            onLogRef.current({ type: "task", message: `Pending: ${result.query}` });
          } else {
            ttsText = `I couldn't find that task.`;
          }
          break;
        }
        case "SET_PRIORITY": {
          const id = findTaskByQuery(tasksRef.current, result.query as string);
          if (id) {
            const p: TaskPriority = result.priority === "high" ? "high" : "medium";
            setPriorityRef.current(id, p);
            ttsText = (result.response as string) || "Priority updated.";
            onLogRef.current({ type: "task", message: `Priority set: ${result.query}` });
          } else {
            ttsText = `I couldn't find a task matching "${result.query}".`;
          }
          break;
        }
        case "PIN_TASK": {
          const id = findTaskByQuery(tasksRef.current, result.query as string);
          if (id) {
            togglePinRef.current(id);
            ttsText = (result.response as string) || "Task pinned.";
            onLogRef.current({ type: "task", message: `Pinned: ${result.query}` });
          } else {
            ttsText = `I couldn't find that task.`;
          }
          break;
        }
        case "UNPIN_TASK": {
          const id = findTaskByQuery(tasksRef.current, result.query as string);
          if (id) {
            togglePinRef.current(id);
            ttsText = (result.response as string) || "Task unpinned.";
            onLogRef.current({ type: "task", message: `Unpinned: ${result.query}` });
          } else {
            ttsText = `I couldn't find that task.`;
          }
          break;
        }
        case "SHOW_HELP": {
          onShowHelpRef.current();
          ttsText = "Here are some things you can ask me.";
          break;
        }
        case "CHAT": {
          ttsText = (result.response as string) || "I'm here to help!";
          onLogRef.current({ type: "ai_response", message: ttsText });
          break;
        }
        case "AI_UNAVAILABLE": {
          ttsText = (result.response as string) || "AI is currently unavailable.";
          onLogRef.current({ type: "ai_response", message: ttsText });
          const fallback = result.fallback as Record<string, unknown> | undefined;
          if (fallback && fallback.type !== "UNKNOWN") dispatchCommand(fallback);
          break;
        }
        default:
          ttsText = "I didn't understand that. Please try again.";
          break;
      }

      return ttsText;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /**
   * Main pipeline:
   *   1. Log transcript.
   *   2. Local regex parser (fast path).
   *   3. If UNKNOWN → AI fallback (async).
   *   4. Log AI response.
   *   5. Dispatch → TTS → restart mic.
   */
  const handleTranscript = useCallback(
    async (text: string) => {
      onTranscript?.(text);

      // Log what the user said
      onLogRef.current({ type: "user_voice", message: text });

      // ── Fast path: local regex ──────────────────────────────────────────────
      const localResult = parseCommand(text) as Record<string, unknown>;

      if (localResult.type !== "UNKNOWN") {
        const ttsText = dispatchCommand(localResult);
        if (ttsText) {
          // Log AI/system response for non-task intents
          if (localResult.type === "SHOW_HELP" || localResult.type === "CHAT") {
            onLogRef.current({ type: "ai_response", message: ttsText });
          }
          srRef.current?.enterSpeaking?.();
          speak(ttsText, {
            onEnd: () => srRef.current?.startAfterDelay?.(750),
          });
        }
        return;
      }

      // ── AI fallback ─────────────────────────────────────────────────────────
      onStateChangeRef.current("processing");

      try {
        const aiResult = await processWithAI(text) as Record<string, unknown>;

        // Log the AI confirmation text before dispatching
        const aiResponse = aiResult.response as string | undefined;
        if (aiResponse) {
          onLogRef.current({ type: "ai_response", message: aiResponse });
        }

        const ttsText = dispatchCommand(aiResult);
        if (ttsText) {
          srRef.current?.enterSpeaking?.();
          speak(ttsText, {
            onEnd: () => srRef.current?.startAfterDelay?.(750),
          });
        } else {
          srRef.current?.startAfterDelay?.(400);
        }
      } catch (err) {
        console.error("[Voice] AI fallback error:", err);
        const errMsg = "Sorry, I couldn't process that.";
        onLogRef.current({ type: "ai_response", message: errMsg });
        srRef.current?.enterSpeaking?.();
        speak(errMsg, {
          onEnd: () => {
            onStateChangeRef.current("idle");
            srRef.current?.stop();
          },
        });
      }
    },
    [dispatchCommand, onTranscript]
  );

  // Build SR instance once on mount
  useEffect(() => {
    srRef.current = createSpeechRecognition({
      onStateChange: (s: string) => onStateChangeRef.current(s as VoiceState),
      onResult:      (text: string) => { void handleTranscript(text); },
      onError:       (code: string) => console.error("[Voice] Error:", code),
    });
    return () => { srRef.current?.stop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback(() => srRef.current?.start(), []);
  const stop  = useCallback(() => srRef.current?.stop(),  []);

  return { start, stop };
}
