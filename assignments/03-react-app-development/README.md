# Smart Task Manager

A responsive task management application built with React and Vite. This project was developed as part of the FlyRank Frontend AI assignment series, with AI assistance used throughout the development process under human supervision.

---

## Features

- **Task Creation** — Add tasks with a title and priority level (Low, Medium, High)
- **Task Deletion** — Remove individual tasks permanently
- **Complete / Undo** — Mark tasks as complete or restore them to pending
- **Live Search** — Filter tasks by title in real time as you type
- **Task Filtering** — View All, Pending, or Completed tasks independently
- **Combined Search + Filter** — Search and filter work together simultaneously
- **Priority Badges** — Visual colour-coded badges for each priority level
- **Dynamic Dashboard** — Statistics cards always reflect the full task list, unaffected by active search or filter
- **LocalStorage Persistence** — Tasks are saved to the browser and survive page refresh
- **Production Polish** — Disabled button on empty input, input auto-focus after task creation, keyboard Enter support, trimmed whitespace handling, and accessible form labels

---

## Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | UI component framework |
| Vite 8 | Build tool and development server |
| Vanilla CSS | Styling with custom design tokens |
| Browser LocalStorage | Client-side persistence |
| ESLint | Code quality and linting |

No external UI libraries or CSS frameworks were used.

---

## AI Development Workflow

This project was developed using an AI pair programming approach across five incremental phases:

1. **Foundation UI** — Professional layout, statistics cards, search and filter shells, empty state, and responsive design
2. **CRUD Operations** — Task creation, deletion, completion toggle, and priority selection with React state
3. **Search, Filter & Priority** — Live search, filter button logic, combined search + filter, and enhanced priority badges
4. **Dashboard Statistics** — Dynamic counters derived from the source tasks array, unaffected by UI filters
5. **LocalStorage & Polish** — Persistence via lazy state initialisation, auto-focus, disabled button state, and whitespace trimming

Each phase was reviewed, tested, and validated manually before proceeding to the next.

---

## Project Structure

```
src/
├── components/
│   ├── AppHeader.jsx           # Application header
│   ├── EmptyState.jsx          # Empty state with contextual messaging
│   ├── FilterSection.jsx       # Filter buttons (All / Pending / Completed)
│   ├── SearchSection.jsx       # Live search input
│   ├── StatCard.jsx            # Individual statistic card
│   ├── StatisticsSection.jsx   # Dashboard statistics row
│   ├── TaskCard.jsx            # Single task item with actions
│   ├── TaskInputSection.jsx    # Task creation form
│   └── TaskListSection.jsx     # Task list container
├── pages/
│   └── TaskManagerPage.jsx     # Root page — state management hub
├── styles/
│   └── task-manager.css        # Application styles and design tokens
├── utils/
│   └── taskHelpers.js          # Task factory and constants
├── App.jsx
└── main.jsx
```

---

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/flyrank-frontend-ai.git

# Navigate to the project directory
cd flyrank-frontend-ai/assignments/03-react-app-development

# Install dependencies
npm install
```

---

## How to Run

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview

# Run ESLint
npm run lint
```

The development server runs at `http://localhost:5173` by default.

---

## Screenshots

> _Screenshots to be added after deployment._

| View | Screenshot |
|---|---|
| Dashboard Overview | `screenshots/dashboard.png` |
| Task Creation | `screenshots/task-creation.png` |
| Search in Action | `screenshots/search.png` |
| Filter Active | `screenshots/filter.png` |
| Mobile Layout | `screenshots/mobile.png` |

---

## Future Improvements

- Task editing (inline or modal)
- Due date support with overdue indicators
- Sorting by priority, date, or status
- Drag-and-drop reordering
- Multiple task lists or categories
- Data export (JSON or CSV)
- Dark mode toggle
- Unit and integration tests

---

## Learning Outcomes

- Structuring a multi-component React application with a clear state hierarchy
- Implementing derived state to avoid redundant data and unnecessary re-renders
- Using React hooks (`useState`, `useEffect`, `useRef`) purposefully and correctly
- Managing LocalStorage with safe initialisation and error handling
- Designing accessible forms with proper labels, ARIA attributes, and keyboard support
- Working effectively with an AI pair programmer while maintaining code ownership and quality

---

## Author

**Devraj**
FlyRank Frontend AI — Assignment 03

---

## License

This project is for educational purposes as part of the FlyRank Frontend AI programme.
