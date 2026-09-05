# EcoVoice Capstone Case Study: Voice-First Task Management

## 1. The Problem
Traditional task management applications heavily rely on continuous visual attention and manual graphical user interface (GUI) input. This creates a significant barrier for visually impaired users, the elderly, and professionals operating in hands-free contexts. The goal was to build a resilient, accessible productivity tool that works entirely through natural language.

## 2. My Approach
I engineered EcoVoice as a Next.js (App Router) Single Page Application (SPA). I utilized the native browser Web Speech API for voice capture and Text-to-Speech (TTS) feedback. To process natural language, I built a hybrid intent parser: a local regex-based fast-path for standard CRUD commands, and a fallback to a fast LLM (Groq API using `gpt-oss-20b`) to extract structured JSON intents from ambiguous, conversational, or Hinglish inputs.

## 3. AI Workflow & Tooling
I used AntiGravity IDE with Claude/Gemini models for rapid component scaffolding and "vibe-coding". 
- **Prompting Strategy:** To prevent the AI from hallucinating or breaking existing business logic, I established strict boundaries using 6 core markdown files (`PRD.md`, `Architecture.md`, `rules.md`, `phases.md`, `Design.md`). I forced the AI agent to read these files before executing any UI porting or logic migration.
- **Specific Example:** When building the `HelpModal`, I explicitly prompted the AI to enforce `z-[100]` for layering, implement WAI-ARIA `Escape` key listeners, and ensure the local parser bypassed the LLM API when the user said "help" to save tokens.

## 4. The Hard Parts & Bug Fixes
Building a voice-first SPA in Next.js introduced several complex state and architectural challenges:

*   **The "Stale State Closure" Bug:** 
    *   *Issue:* The `useVoice` hook's speech recognition event listeners were capturing a stale reference to the `tasks` array. When a user added a task via voice, it overwrote existing tasks and failed to persist to `localStorage` across page reloads.
    *   *Fix:* I refactored the `useTasks` hook to strictly use functional state updates (`setTasks(prev => [...prev, newTask])`) and wrapped dispatcher functions in `useCallback` to ensure stable references across the voice pipeline.
*   **Next.js Hydration & Vercel Deployment:** 
    *   *Issue:* Accessing `localStorage` and `window.SpeechRecognition` directly caused severe SSR hydration mismatch errors.
    *   *Fix:* I implemented a mounted-state `useEffect` pattern to delay `localStorage` reads until the client-side render and strictly isolated interactivity to `"use client"` components.
*   **Model Deprecation & API Resilience:** 
    *   *Issue:* Mid-development, the initial Groq models (`llama3-8b-8192` and OpenRouter free tiers) were decommissioned, throwing HTTP 404/400 errors in production. 
    *   *Fix:* I updated the fetch payload to the exact active slugs (`gpt-oss-20b`), securely passed `NEXT_PUBLIC_AI_API_KEY` via Vercel environment variables, and implemented a resilient local regex fallback parser so the UI never crashes during an API outage.

## 5. Verification Loops
To ensure the LLM consistently returned the correct schema, I built a strict `mapToCommand` adapter and an `extractJSON` cleaner function to strip accidental markdown formatting. I verified the pipeline continuously by observing the `[EcoVoice/AI]` logs in the browser console, confirming that the AI correctly translated localized inputs like *"Kal subah DSA padhni hai"* into a structured `CREATE_TASK` intent.