/**
* aiCommandProcessor.js — EcoVoice AI Command Layer (Next.js / Groq)
* -------------------------------------------------------------------------
* 💡 [DEV NOTE]: API key MUST use NEXT_PUBLIC_ prefix to work in the browser.
* Model updated to gpt-oss-20b as per Groq's active replacement models.
*/

import { parseCommand } from "@/lib/services/parser/commandParser";

// ─── Config ────────────────────────────────────────────────────────────────────

// 💡 [DEV NOTE]: Agar NEXT_PUBLIC_ nahi lagaoge, toh Next.js isko browser mein undefined kar dega.
const API_KEY = process.env.NEXT_PUBLIC_AI_API_KEY;
const ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "gemma2-9b-it";

if (typeof window !== "undefined") {
  if (API_KEY && API_KEY !== "your_openrouter_api_key_here") {
    console.log(`[EcoVoice/AI] Groq key detected — AI layer active using ${MODEL}.`);
  } else {
    console.warn("[EcoVoice/AI] API key missing — fallback to rule-based parser.");
  }

}

// ─── System prompt ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are EcoVoice — a warm, intelligent, voice-first productivity assistant.

You understand English, Hindi, and Hinglish naturally.

Your job is to understand what the user wants and return a single JSON object.
Every response must include a short, warm, conversational "response" field — always in English.

════════════════════════════════════════════
INTENT TYPES
════════════════════════════════════════════

CREATE_TASK     → user wants to add, remember, schedule, or do something
DELETE_TASK     → user wants to delete, remove, or erase a task
COMPLETE_TASK   → user wants to mark a task done / finished / complete
UNCOMPLETE_TASK → user wants to revert a task to pending / incomplete
PIN_TASK        → user wants to pin, star, or mark a task as important
UNPIN_TASK      → user wants to unpin, unstar, or deprioritise a task
SET_PRIORITY    → user explicitly sets high or normal priority for a task
CHAT            → everything else: questions, greetings, conversations

════════════════════════════════════════════
JSON SCHEMAS — return EXACTLY ONE
No markdown. No backticks. Pure JSON only.
════════════════════════════════════════════

CREATE_TASK:
{ "intent": "CREATE_TASK", "task": "<clean English task label>", "priority": "normal" | "high", "response": "<warm confirmation, max 2 sentences>" }

DELETE_TASK:
{ "intent": "DELETE_TASK", "task": "<task keyword>", "response": "<warm confirmation>" }

COMPLETE_TASK:
{ "intent": "COMPLETE_TASK", "task": "<task keyword>", "response": "<warm confirmation>" }

UNCOMPLETE_TASK:
{ "intent": "UNCOMPLETE_TASK", "task": "<task keyword>", "response": "<warm confirmation>" }

PIN_TASK:
{ "intent": "PIN_TASK", "task": "<task keyword>", "response": "<warm confirmation>" }

UNPIN_TASK:
{ "intent": "UNPIN_TASK", "task": "<task keyword>", "response": "<warm confirmation>" }

SET_PRIORITY:
{ "intent": "SET_PRIORITY", "task": "<task keyword>", "priority": "normal" | "high", "response": "<warm confirmation>" }

CHAT:
{ "intent": "CHAT", "response": "<helpful, conversational reply — max 2 sentences>" }

════════════════════════════════════════════
PERSONALITY RULES (for "response" field)
════════════════════════════════════════════
- Always respond in English, even if user spoke Hindi or Hinglish.
- Maximum 2 sentences. Be concise.
- Sound warm, human, and encouraging — like a calm personal assistant.
- Never sound like documentation or a chatbot FAQ.
- Never say "I am an AI" or mention language models.
- Use contractions naturally: "I've", "you're", "let's".

════════════════════════════════════════════
HINDI / HINGLISH TRANSLATION EXAMPLES
════════════════════════════════════════════
"Kal subah DSA padhni hai"      → CREATE_TASK, task: "study DSA tomorrow morning"
"Mujhe DSA padhni hai"          → CREATE_TASK, task: "study DSA"
"Kal gym jana hai"              → CREATE_TASK, task: "go to gym tomorrow"
"Grocery leni hai"              → CREATE_TASK, task: "buy groceries"
"Ye task important hai"         → PIN_TASK, task from context
"DSA wala task delete kar do"   → DELETE_TASK, task: "DSA"
"Namaste"                       → CHAT, response: "Namaste! What would you like to work on today?"

════════════════════════════════════════════
TASK LABEL EXTRACTION RULES
════════════════════════════════════════════
Strip all filler words. Keep only the action + subject in English.
- "I need to study DSA"         → task: "study DSA"
- "remind me to call mom"       → task: "call mom"
- "Mujhe DSA padhni hai"        → task: "study DSA"
- "Kal gym jana hai"            → task: "go to gym tomorrow"

════════════════════════════════════════════
RESPONSE EXAMPLES (model your tone on these)
════════════════════════════════════════════
CREATE_TASK → "Got it, I've added that to your list."
DELETE_TASK → "Sure, I've removed that task for you."
COMPLETE_TASK → "Great work! I've marked that as done."
UNCOMPLETE_TASK → "No problem, I've moved it back to pending."
PIN_TASK → "Done. That's now pinned at the top of your list."
UNPIN_TASK → "Got it, I've unpinned that task."
SET_PRIORITY (high) → "Noted. I've marked that as high priority."
SET_PRIORITY (normal) → "Done, priority has been set back to normal."
CHAT (hello) → "Hey! Just speak naturally and I'll take care of your tasks."
CHAT (what can you do) → "I can create, complete, delete, pin, and prioritise your tasks using natural voice commands."`;

// ─── Session memory (last 10 turn pairs) ───────────────────────────────────────

const MAX_HISTORY = 10;
const _sessionHistory = [];

export function getSessionHistory() {
  return [..._sessionHistory];
}

export function clearSessionHistory() {
  _sessionHistory.length = 0;
}

// 💡 [DEV NOTE]: Pushes recent voice commands and AI responses to memory for context
function pushHistory(userText, modelJSON) {
  _sessionHistory.push(
    { role: "user", content: userText },
    { role: "assistant", content: JSON.stringify(modelJSON) },
  );
  while (_sessionHistory.length > MAX_HISTORY * 2) {
    _sessionHistory.splice(0, 2);
  }
}

// 💡 [DEV NOTE]: Prepares the message array with system prompt, history, and new input
function buildMessages(userText) {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    ..._sessionHistory,
    { role: "user", content: userText },
  ];
}

// ─── JSON extractor ────────────────────────────────────────────────────────────

// 💡 [DEV NOTE]: Strips markdown code blocks if the AI accidentally wraps the JSON
function extractJSON(raw) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    const stripped = raw.replace(/```(?:json)?/gi, "").trim();
    const start = stripped.indexOf("{");
    const end = stripped.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    try {
      return JSON.parse(stripped.slice(start, end + 1));
    } catch {
      return null;
    }
  }
}

// ─── Missing target helper ────────────────────────────────────────────────────

const MISSING_TARGET_PROMPTS = {
  DELETE_TASK: "Which task would you like me to delete?",
  COMPLETE_TASK: "Which task should I mark as complete?",
  UNCOMPLETE_TASK: "Which task would you like to move back to pending?",
  PIN_TASK: "Which task would you like to pin?",
  UNPIN_TASK: "Which task should I unpin?",
  SET_PRIORITY: "Which task should I update the priority for?",
};

function missingTarget(intent) {
  return {
    type: "MISSING_TASK_TARGET",
    intent,
    prompt: MISSING_TARGET_PROMPTS[intent] ?? "Which task did you mean?",
  };
}

// ─── JSON → internal command object ───────────────────────────────────────────

function mapToCommand(json) {
  if (!json || !json.intent) return { type: "UNKNOWN" };

  const response = typeof json.response === "string" && json.response.trim()
    ? json.response.trim()
    : "";

  switch (json.intent) {
    case "CREATE_TASK":
      return {
        type: "CREATE_TASK",
        task: json.task ?? "",
        priority: json.priority === "high" ? "high" : "normal",
        response,
      };

    case "DELETE_TASK": {
      const query = (json.task ?? "").trim();
      if (!query) return missingTarget("DELETE_TASK");
      return { type: "DELETE_TASK", query, response };
    }

    case "COMPLETE_TASK": {
      const query = (json.task ?? "").trim();
      if (!query) return missingTarget("COMPLETE_TASK");
      return { type: "COMPLETE_TASK", query, response };
    }

    case "UNCOMPLETE_TASK": {
      const query = (json.task ?? "").trim();
      if (!query) return missingTarget("UNCOMPLETE_TASK");
      return { type: "UNCOMPLETE_TASK", query, response };
    }

    case "PIN_TASK": {
      const query = (json.task ?? "").trim();
      if (!query) return missingTarget("PIN_TASK");
      return { type: "PIN_TASK", query, response };
    }

    case "UNPIN_TASK": {
      const query = (json.task ?? "").trim();
      if (!query) return missingTarget("UNPIN_TASK");
      return { type: "UNPIN_TASK", query, response };
    }

    case "SET_PRIORITY": {
      const query = (json.task ?? "").trim();
      if (!query) return missingTarget("SET_PRIORITY");
      return {
        type: "SET_PRIORITY",
        query,
        priority: json.priority === "high" ? "high" : "normal",
        response,
      };
    }

    case "CHAT":
      return { type: "CHAT", response };

    default:
      return { type: "UNKNOWN" };
  }
}

// ─── Failure tracking ──────────────────────────────────────────────────────────

export function isAIAvailable() {
  return !!(API_KEY && API_KEY !== "your_openrouter_api_key_here");
}

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * Process raw transcript through Groq.
 * Falls back to local parser when the key is missing or the API fails.
 */
export const processWithAI = async (transcript) => {
  if (!API_KEY) {
    console.warn("[EcoVoice/AI] No API key found. Falling back to local parser.");
    return { type: "UNKNOWN" };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: buildMessages(transcript),
        temperature: 0.1,
        max_tokens: 150,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No content received from Groq.");
    }

    const cleanedJson = extractJSON(content);

    if (!cleanedJson) {
      console.error("[EcoVoice/AI] Failed to extract valid JSON:", content);
      return { type: "UNKNOWN" };
    }

    // 💡 [DEV NOTE]: Maps raw API JSON into your app's strict command format
    const finalCommand = mapToCommand(cleanedJson);

    // 💡 [DEV NOTE]: Pushes to memory so AI can understand follow-up commands
    pushHistory(transcript, cleanedJson);

    return finalCommand;

  } catch (error) {
    console.error("[EcoVoice/AI] API Error:", error.message);
    return { type: "UNKNOWN" };
  }
};