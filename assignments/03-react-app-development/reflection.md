# Project Reflection — Smart Task Manager

## Project Goal

The goal was to build a complete, production-quality task management application using React, developed incrementally across five phases. The project served as a practical exploration of modern React patterns, component architecture, and AI-assisted development workflows.

---

## Why AI Was Used

AI assistance was used deliberately as a learning and productivity tool — not as a replacement for engineering judgment. The intent was to understand how AI pair programming affects the development process: where it accelerates work, where it requires correction, and how to write prompts that produce reliable, maintainable output.

---

## What AI Did Well

**Component scaffolding** was the clearest strength. Generating a full set of well-structured React components with consistent naming, BEM-style CSS classes, and a coherent design system would have taken significantly longer manually. The AI produced a usable foundation quickly.

**CSS design tokens and layout** were handled well. The generated stylesheet used CSS custom properties from the start, which made subsequent changes straightforward. Responsive breakpoints were included without being asked.

**React patterns** were generally correct. The AI consistently used immutable state updates (`map`, `filter`, spread), derived values over duplicated state, and appropriately avoided `useEffect` for cases that did not need it.

**Incremental extension** worked reliably. Because prompts were scoped to one feature at a time, the AI rarely introduced regressions in features that were already working.

---

## Where Manual Review Was Necessary

**Every phase required manual testing.** AI-generated code does not self-verify. Each feature had to be exercised in the browser to confirm it worked correctly and matched the intended behaviour.

**Prompt specificity determined output quality.** Vague prompts produced code that was technically functional but architecturally inconsistent. When prompts specified patterns explicitly (for example, "use derived state, not a separate filtered array in state"), the output matched expectations. When prompts were underspecified, the AI made assumptions that occasionally required correction.

**State architecture decisions required human judgment.** Deciding where to keep state, what to derive, and what to pass as props are architectural concerns that the AI could implement correctly when told the answer, but did not always reason about independently.

**Accessibility details needed verification.** ARIA attributes and label associations were present but not always complete. These were reviewed and improved during development.

---

## Problems Encountered

**Hardcoded values in early phases.** The statistics cards were initially generated with hardcoded zeroes. This was intentional staging, but it required a dedicated phase to wire them up dynamically. The connection between the statistics and the task state was not obvious to the AI without an explicit prompt.

**Filter active state was initially hardcoded.** The first version of `FilterSection` hardcoded the "All" button as always active. This needed to be corrected by explicitly instructing the AI to use a prop-controlled active state.

**LocalStorage initialisation pattern.** The first instinct for LocalStorage might have been to use `useEffect` to hydrate state on mount, which causes an extra render. Using the lazy `useState` initialiser pattern (`useState(loadTasks)`) required a specific prompt to produce the correct implementation.

---

## How Prompts Improved During Development

Early prompts were more general: "build a task manager with these features." Later prompts became far more specific about patterns, boundaries, and quality expectations. Key improvements included:

- Specifying which state patterns to use and which to avoid
- Explicitly listing what should NOT be implemented, reducing scope creep
- Including a quality gate section at the end of each prompt to set verification expectations
- Scoping each prompt to a single phase rather than combining multiple features

By Phase 5, prompts included explicit rules about immutability, derived state, file restrictions, and code quality that produced clean, minimal output on the first attempt.

---

## Lessons Learned

- **AI works best as an implementation partner, not a decision-maker.** Architectural decisions — component boundaries, state placement, data flow — should be made by the developer and communicated clearly in the prompt.
- **Incremental development reduces risk.** Implementing one feature at a time, verifying it, and then moving on prevented AI changes from breaking working functionality.
- **Prompts are specifications.** Writing a good prompt requires the same thinking as writing a good technical specification. The more precise the input, the more reliable the output.
- **Manual testing is non-negotiable.** AI-generated code requires the same verification as hand-written code. Assuming correctness without testing is a process failure regardless of who wrote the code.

---

## Best Practices Learned

- Use derived values rather than duplicating state (visible tasks, statistics counters)
- Initialise state from external sources using the lazy `useState` initialiser to avoid extra renders
- Keep side effects (LocalStorage writes) in a single, clearly scoped `useEffect`
- Scope each `useEffect` tightly and document its dependency array
- Use `useRef` for DOM interactions like focus rather than `useEffect` with side effects
- Apply immutable array patterns consistently — `map`, `filter`, and spread operator
- Build accessible forms with proper `htmlFor` / `id` pairing and ARIA labels

---

## Future Improvements

If this project were to continue, the next steps would be:

- **Task editing** — Inline editing with controlled inputs
- **Sorting** — By priority, creation date, or status
- **Due dates** — With overdue visual indicators
- **Multiple lists** — Organising tasks into separate collections
- **Testing** — Unit tests for `taskHelpers.js` and integration tests for CRUD flows
- **Backend integration** — Replacing LocalStorage with a REST API and user authentication

---

## Personal Takeaways

This project demonstrated that AI-assisted development can meaningfully accelerate front-end work when the developer maintains control of the architecture and reviews every output critically. The AI was a capable implementation partner for well-defined tasks, but it required clear direction and consistent verification.

The most valuable skill developed was not React itself, but the ability to write precise, structured prompts that produce reliable and maintainable code. That skill transfers directly to writing good technical specifications, code reviews, and engineering documentation — which are core professional competencies regardless of the tools used.
