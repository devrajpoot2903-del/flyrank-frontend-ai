# Product Requirements Document (PRD)
**Project Name:** EcoVoice - Voice-First Task Manager (Next.js Capstone Edition)
**Status:** In Development (FlyRank Capstone MVP)

## 1. Overview & Problem Statement
Traditional task management applications rely heavily on graphical user interfaces (GUIs), requiring continuous visual attention and manual input (mouse/keyboard). This creates a barrier for visually impaired users, the elderly, and professionals in hands-free contexts.

**EcoVoice** solves this by providing a completely voice-first, accessible task management experience. It uses the Web Speech API and LLMs (via OpenRouter) to understand natural language intents and perform CRUD operations on tasks autonomously, providing both visual and audio (TTS) feedback.

## 2. Target Audience
1. **Accessibility Users:** Individuals with motor or visual impairments who struggle with traditional GUIs.
2. **Power Users & Professionals:** People who want to brain-dump tasks quickly while multitasking (e.g., cooking, driving, or coding).
3. **Elderly Users:** Users who find complex app interfaces intimidating and prefer natural conversation.

## 3. Core Features (In Scope for this MVP)
- **Voice-to-Intent Parsing:** Users can speak naturally (e.g., "Delete the DSA task", "Mark grocery as important"). The AI extracts the exact intent and payload.
- **Task CRUD Operations:** Create, Read, Update (Complete/Pin/Priority), and Delete tasks using voice or accessible UI.
- **Audio-Visual Feedback:** Every voice command must be confirmed via UI changes and Text-to-Speech (TTS) readout (e.g., "Task DSA added successfully").
- **Strict Accessibility (WAI-ARIA):** The entire UI must be 100% keyboard navigable and screen-reader friendly (fulfilling FlyRank FE-05 requirements).
- **Graceful Fallback:** If the AI API fails or the command is not understood, the system must handle the error gracefully without crashing.

## 4. Non-Goals (Out of Scope for this Phase)
*DO NOT attempt to implement these features in the current codebase:*
- No Backend Database (Use `localStorage` for state persistence).
- No User Authentication (Login/Signup).
- No arbitrary Web Browsing or DOM manipulation outside the Task Manager (The browser extension phase is separate).
- No overly complex 3D graphics or heavy animations.

## 5. Success Metrics (FlyRank Capstone Alignment)
To consider this project a success and pass the "Ship It" Capstone:
1. **Meaningful AI Integration:** The AI must intelligently parse unstructured voice into structured JSON intents. It shouldn't just be a dumb text-bot.
2. **Production Ready:** Must be deployed live on Vercel without build errors.
3. **Resilience:** AI timeouts or API limits must not break the app.
4. **Performance:** Must score 90+ on Lighthouse accessibility and performance audits.