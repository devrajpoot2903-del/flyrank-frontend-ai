# UI/UX & Design Guidelines: EcoVoice

**AI INSTRUCTION:** This project follows a strict design system based on a premium, minimal, "Apple/Notion-like" aesthetic. Do NOT invent your own design language. Stick exclusively to these Tailwind CSS guidelines.

## 1. Visual Identity & Theme
- **Vibe:** Calm, serene, accessible, human-centric, and premium.
- **Strictly Avoid:** Dark cyberpunk themes, neon colors, heavy glowing effects, terminal/hacker aesthetics, and generic AI chatbot interfaces.

## 2. Color Palette (Tailwind Classes)
The app uses a soft "Cream & Sage Green" color palette.
- **Backgrounds:** Use `bg-stone-50` or `bg-[#F9F8F6]` for the main app background to give a soft, paper-like feel.
- **Cards/Surfaces:** Use `bg-white` for task cards and widgets, with very soft shadows (`shadow-sm` or `shadow-[0_2px_8px_rgba(0,0,0,0.04)]`).
- **Primary Accent (Sage Green):** Use for active states, the Mic button, and primary badges.
  - Tailwind equivalent: `bg-emerald-700` / `bg-emerald-800` or custom `#4B6B4A`.
- **Text:** 
  - Primary: `text-stone-900` or `text-slate-800`.
  - Secondary/Muted: `text-stone-500`.

## 3. Typography & Spacing
- **Font:** Clean sans-serif (Inter or system UI).
- **Border Radius:** Use rounded, friendly corners on all cards and buttons (`rounded-xl` or `rounded-2xl`). Do not use sharp edges.
- **Spacing:** Interfaces must breathe. Use ample padding (`p-6`, `p-8`) inside cards.

## 4. UI Architecture (Single Page Dashboard)
EcoVoice remains a Single Page Application (SPA) rendered inside `app/page.tsx`. 
- **Why?** To ensure the Web Speech API microphone instance does not get destroyed by route transitions. 
- **Layout Structure:**
  - **Left:** Sidebar navigation (`w-64`, secondary navigation).
  - **Center:** Main stage (Hero Mic Button, Current task views).
  - **Right:** Widgets panel (Daily Progress, Recent Activity).

## 5. Coding Constraints
- **Tailwind Only:** Use only inline Tailwind CSS classes. Do NOT create custom `.css` files unless absolutely necessary for global setups.
- **No Third-Party CSS:** Rely strictly on native Tailwind utilities.