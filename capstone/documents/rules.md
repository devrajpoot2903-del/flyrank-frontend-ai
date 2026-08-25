# AI Coding Rules & Boundaries (EcoVoice Capstone)

## 1. The 6-File Boundary (Absolute Limit)
The 6 foundation files (`PRD.md`, `Architecture.md`, `rules.md`, `phases.md`, `Design.md`, `Memory.md`) are your absolute boundaries. 
- You MUST read and adhere to them before executing any prompt.
- Do NOT deviate from the scope, tech stack, or architecture defined in these files under any circumstances.

## 2. Output Format (Zero Yapping)
- Provide **ONLY** the requested code edits or file creations.
- **NO THEORY:** Do not explain why you made a change unless explicitly asked.
- **NO FILLER:** Do not use conversational filler, apologies, or pleasantries (e.g., "Here is the code...", "I understand...", "Let's fix this...").
- Output the raw code ready for implementation.

## 3. Strict Scope Adherence (No Extra Code)
- Write **ONLY** the code required for the current specific phase or prompt.
- Do NOT anticipate future phases.
- Do NOT add unsolicited functionality, extra buttons, or "nice-to-have" features. 

## 4. No Self-Testing or Debugging Loops
- Do NOT enter infinite self-testing, auto-fixing, or autonomous debugging loops.
- If a terminal error occurs, provide the exact fix for that specific error and **STOP**. Wait for human verification before proceeding.

## 5. Business Logic Preservation
- The core logic for intent parsing (`commandParser.js`), state management (`useTasks.js`), and voice operations (`speechService.js`) already exists. 
- **DO NOT** rewrite or "optimize" the underlying business logic. Your job is strictly syntax translation to Next.js.

## 6. Tech Stack Restrictions
- **Styling:** Use ONLY Tailwind CSS.
- **UI Components:** Do NOT install external UI libraries (MUI, Chakra, etc.). Use native HTML/Tailwind or existing Shadcn components.
- **Database:** Do NOT add MongoDB, Prisma, or Supabase. The app relies strictly on `localStorage`.

## 7. Next.js Strict Conventions
- **Hydration:** `localStorage` reads MUST happen inside a `useEffect` to prevent hydration mismatches.
- **Client Components:** Any component using standard DOM APIs (`window`, `localStorage`, `SpeechRecognition`) MUST have `"use client";` at the very top.
- **API Keys:** Never hardcode API keys. Always use `process.env.NEXT_PUBLIC_AI_API_KEY`.

## 8. Code Quality
- **TypeScript/JSDoc:** Do NOT use `any`.
- **No Placeholders:** Provide the complete, working file. Do not output `// ... existing code ...` unless explicitly instructed.