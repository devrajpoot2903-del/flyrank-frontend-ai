# Execution Phases: EcoVoice Next.js Migration

**AI INSTRUCTION:** You MUST execute this project strictly phase-by-phase. Do NOT proceed to the next phase until the current phase is fully implemented, verified, and explicitly approved by the user.

## Phase 1: Skeleton & Layout Setup
**Goal:** Initialize the Next.js App Router structure and global layout.
- Clear out the default Next.js boilerplate in `app/page.tsx` and `app/globals.css`.
- Set up the global `app/layout.tsx` (Fonts, Metadata, basic container).
- Configure Tailwind CSS strictly based on `Design.md`.
- Ensure environment variables (`NEXT_PUBLIC_AI_API_KEY`) are configured in `.env.local` but do not implement the API yet.
- **Stop Condition:** The app compiles successfully and displays a blank/basic screen on `localhost:3000`.

## Phase 2: Static UI Porting (Dumb Components)
**Goal:** Port visual components from Vite to Next.js without hooking up global state.
- Create `components/layout/` (Sidebar, Header).
- Create `components/tasks/` (TaskBoard, TaskList, TaskCard).
- Create `components/voice/` (MicButton, VoiceHero).
- Use dummy hardcoded data to render the UI components inside `app/page.tsx`.
- **Constraint:** Do NOT implement `useTasks.js` or `localStorage` yet.
- **Stop Condition:** The UI looks identical to the original React+Vite app but contains no business logic.

## Phase 3: Core Business Logic & State (Local Storage)
**Goal:** Port task state management and basic CRUD operations.
- Port `useTasks.js` and `useLocalStorage.js` into `lib/hooks/`.
- Add `"use client";` to all hooks and `app/page.tsx`.
- Connect the dummy UI components to the real `useTasks` hook.
- Ensure hydration mismatch errors are prevented (load local storage only after mount).
- **Stop Condition:** Tasks can be manually created, completed, and deleted using the UI buttons (No voice yet). State persists on page refresh.

## Phase 4: Voice Pipeline & Local Parser
**Goal:** Re-enable the Web Speech API and the local regex fallback parser.
- Port `speechService.js` and `commandParser.js` into `lib/services/`.
- Wire up `MicButton` to trigger the speech recognition.
- Route the locally parsed intents (e.g., standard regex commands) to the `useTasks` dispatcher.
- Re-enable Text-to-Speech (TTS) feedback.
- **Constraint:** Do NOT integrate the OpenRouter API yet. Rely purely on the local fallback parser.
- **Stop Condition:** Standard CRUD voice commands work locally and update the task state. 

## Phase 5: AI Brain Integration (OpenRouter)
**Goal:** Re-enable the remote AI intent parsing for ambiguous commands.
- Port `aiCommandProcessor.js` (OpenRouter API logic targeting DeepSeek/GLM).
- Wire the fallback flow: If `commandParser.js` returns `UNKNOWN`, send the transcript to the AI processor.
- Parse the structured JSON response and dispatch it to the task engine.
- Implement graceful error handling (if API fails, notify user without crashing).
- **Stop Condition:** Complex/Hinglish voice commands correctly execute CRUD operations via the AI.

## Phase 6: FlyRank Polish & Testing
**Goal:** Finalize the Capstone requirements for deployment.
- Ensure strict WAI-ARIA compliance (focus management, ARIA labels on all new elements).
- Verify 100% keyboard navigability.
- Run a production build (`npm run build`) to catch strictly typed errors.
- **Stop Condition:** Zero build errors, 90+ Lighthouse accessibility score, ready for Vercel deployment.