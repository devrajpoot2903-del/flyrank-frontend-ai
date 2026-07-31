# AI Development Prompts — Smart Task Manager

This document describes the AI-assisted development process for the Smart Task Manager application. Development was carried out in five incremental phases. Each phase had a defined objective, a prompt strategy, an AI contribution, and a developer review step.

---

## Phase 1 — Foundation UI

### Objective
Establish the complete application shell with a professional responsive layout before any logic was implemented.

### Prompt Strategy
Prompts specified the required component list, layout structure, and visual requirements in detail. The AI was instructed to implement a design system using CSS custom properties, produce semantic HTML, and follow responsive design practices. Placeholder values were acceptable at this stage.

### AI Contribution
- Generated the full component tree: `AppHeader`, `StatisticsSection`, `StatCard`, `TaskInputSection`, `SearchSection`, `FilterSection`, `TaskListSection`, `TaskCard`, and `EmptyState`
- Implemented a CSS design system with consistent spacing, colour tokens, shadows, and border-radius values
- Produced responsive breakpoints for tablet and mobile viewports
- Applied BEM-style class naming throughout

### Developer Review
- Verified component structure matched the intended architecture
- Confirmed CSS tokens were consistent and reusable
- Tested responsive layout at multiple viewport sizes
- Confirmed no logic was incorrectly pre-implemented

### Final Result
A complete, pixel-polished application shell with no business logic. All components were present and rendering correctly.

---

## Phase 2 — CRUD Operations

### Objective
Implement task creation, deletion, completion toggling, and undo-complete functionality using React state.

### Prompt Strategy
Prompts were explicit about keeping all state in `TaskManagerPage` and passing handlers as props. The AI was instructed to use immutable state update patterns, avoid prop drilling beyond one level, and implement a task factory utility in a separate `utils/` file.

### AI Contribution
- Implemented `createTask` in `taskHelpers.js` using `crypto.randomUUID()` and ISO date strings
- Wired `useState` in `TaskManagerPage` with `handleAddTask`, `handleToggleComplete`, and `handleDeleteTask`
- Connected `TaskInputSection` with a controlled form, client-side validation, and a disabled submit button
- Rendered tasks dynamically in `TaskListSection` and `TaskCard` with the correct props

### Developer Review
- Manually tested all four CRUD operations
- Confirmed immutable update patterns (`map`, `filter`, spread) were used correctly
- Verified that task IDs were unique and that no state mutation occurred
- Checked that empty task submission was correctly prevented

### Final Result
All CRUD operations working correctly. Tasks created, toggled, and deleted without side effects.

---

## Phase 3 — Search, Filter, and Priority Badges

### Objective
Connect the existing search input and filter buttons to live derived state, and improve the visual presentation of priority badges.

### Prompt Strategy
Prompts specified that search and filter should use derived state rather than a separate filtered array in state. The AI was instructed to combine search and filter logic in a single `filter()` pass. Prompts also required that the empty state component show different messages depending on whether a search or filter was active.

### AI Contribution
- Added `searchQuery` and `activeFilter` state to `TaskManagerPage`
- Computed `visibleTasks` as a single derived filter combining both conditions
- Updated `SearchSection` and `FilterSection` to accept controlled props
- Added `hasActiveSearch` prop to `TaskListSection` for contextual empty state messaging
- Updated `EmptyState` to accept `message` and `hint` props with sensible defaults
- Added border accents to priority badge CSS for improved visual distinction

### Developer Review
- Tested search with uppercase, lowercase, and partial input
- Confirmed that filtering and searching combined correctly
- Verified that the original `tasks` array was never mutated
- Confirmed the active filter button highlight was applied correctly
- Checked that the empty state message changed depending on context

### Final Result
Live search and filtering working together. Priority badges clearly differentiated by colour and border.

---

## Phase 4 — Dashboard Statistics

### Objective
Replace hardcoded zeroes on the statistics cards with dynamic values derived from the full task list.

### Prompt Strategy
Prompts specified that statistics should always reflect the complete task collection, never the filtered or searched subset. The AI was instructed to derive all three values (`total`, `completed`, `pending`) inside `StatisticsSection` and to receive `tasks` as a prop from `TaskManagerPage`.

### AI Contribution
- Updated `StatisticsSection` to accept a `tasks` prop
- Derived `total`, `completed`, and `pending` inline using `.length` and `.filter()`
- Updated `TaskManagerPage` to pass the unfiltered `tasks` array to `StatisticsSection`

### Developer Review
- Confirmed that the stats updated on task creation, deletion, and completion toggle
- Confirmed that active search and filter had no effect on the displayed numbers
- Verified no duplicate state was introduced

### Final Result
Dashboard counters fully dynamic and always accurate, independent of UI filter state.

---

## Phase 5 — LocalStorage and Production Polish

### Objective
Persist tasks across browser sessions and improve the overall user experience with small but meaningful quality-of-life improvements.

### Prompt Strategy
Prompts required LocalStorage hydration using the `useState` lazy initialiser pattern to avoid unnecessary renders on mount. A single `useEffect` was specified for writing. Prompts also covered auto-focus behaviour, and the requirement to verify existing polish (trim, disabled button, Enter key) was already in place.

### AI Contribution
- Extracted `loadTasks()` as a module-level function with try/catch for safe JSON parsing
- Initialised state with `useState(loadTasks)` to read from LocalStorage only once
- Added a single `useEffect` to sync tasks to LocalStorage whenever the array changes
- Added `useRef` to `TaskInputSection` to auto-focus the input field after successful task submission

### Developer Review
- Tested persistence by adding tasks and refreshing the browser
- Verified corrupt or missing LocalStorage data fell back to an empty array without throwing
- Confirmed auto-focus restored cursor to the task name field correctly
- Ran `npm run build` and confirmed zero errors and zero ESLint warnings

### Final Result
Tasks persist across page refreshes. Input auto-focuses after task creation. Build passes cleanly with no warnings.
