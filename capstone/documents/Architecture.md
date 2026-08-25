# System Architecture: EcoVoice (Next.js Capstone Edition)

This document defines the architectural blueprint for migrating EcoVoice from a React+Vite SPA to a Next.js App Router application. AI agents must strictly adhere to this structure.

## 1. Tech Stack
- **Framework:** Next.js (App Router)
- **UI Library:** React, Tailwind CSS
- **State Management:** React Hooks (`useState`, `useReducer`), LocalStorage (Persistence)
- **Voice Capabilities:** Native Browser Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)
- **AI Integration:** OpenRouter API (Targeting GLM-5.2 or DeepSeek for structured JSON intent parsing)

## 2. Directory & File Structure Mapping
The old `Ecovoice v1` structure is ported to the Next.js directory as follows:

- `app/layout.tsx`: Root server component (Global layout & fonts).
- `app/page.tsx`: Main application entry (Replaces App.jsx, MUST be a Client Component).
- `app/playground/`: FE-05 assignment components.
- `components/layout/`: Sidebar, Header, TopBar.
- `components/tasks/`: TaskCard, TaskList, TaskBoard.
- `components/voice/`: MicButton, VoiceHero, TranscriptPanel.
- `lib/hooks/`: Replaces old hooks (useTasks, useLocalStorage).
- `lib/services/ai/`: openRouter.js, aiCommandProcessor.js.
- `lib/services/voice/`: speechRecognition.js, speechService.js.
- `lib/services/parser/`: commandParser.js.

## 3. Application & Data Flow
EcoVoice operates on a uni-directional voice-to-action pipeline:
1. **Input Layer:** `MicButton` triggers `speechService.js` (Web Speech API).
2. **Transcript Processing:** Raw text is sent to `commandParser.js`.
3. **Intent Detection:**
   - *Fast Path:* Local regex extraction for standard CRUD.
   - *AI Path:* Ambiguous intents are sent to `aiCommandProcessor.js` (OpenRouter API) for JSON formatting.
4. **Action Dispatcher:** Structured intent is dispatched to `useTasks.js`.
5. **State & Persistence:** React state updates; `useLocalStorage.js` persists data.
6. **Feedback Loop:** UI re-renders, and TTS confirms the action.

## 4. Strict Next.js Client vs. Server Rules
- **`"use client";` Directive:** MUST be placed at the top of `app/page.tsx`, all components inside `components/voice/` and `components/tasks/`, and all custom hooks.
- **Server Components:** Structural wrappers like `app/layout.tsx` must remain default Server Components. Do not run Web Speech API or LocalStorage on the server.
- **Environment Variables:** OpenRouter API keys must be accessed via `process.env.NEXT_PUBLIC_AI_API_KEY`.

## 5. Error Handling & Resilience
- If the OpenRouter API fails or times out, the app must gracefully revert to the local regex parser. Never crash the UI.
- If the browser does not support Web Speech API, degrade gracefully to a text input fallback.