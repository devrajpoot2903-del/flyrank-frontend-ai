# EcoVoice — FlyRank Frontend AI Engineering

## Repository Structure

```
flyrank-frontend-ai/
├── flyrank-capstone/
│   └── Eco-voice-/
│       ├── Ecovoice v1/   ← Archived React + Vite prototype (DO NOT MODIFY)
│       └── capstone/      ← Official Next.js architecture (Week 3+)
├── assignments/
├── docs/
└── ...
```

---

## Ecovoice v1 (Archived Prototype)

Located at `flyrank-capstone/Eco-voice-/Ecovoice v1/`.

This is the completed React + Vite prototype built during the early weeks of the FlyRank internship. It includes:

- Voice-first task management
- Web Speech API integration
- Gemini 2.5 Flash AI integration
- Task CRUD via voice commands

**Status:** Stable prototype — archived for reference. Do not modify.

---

## capstone (Official Architecture)

Located at `flyrank-capstone/Eco-voice-/capstone/`.

This is the official project used from **Week 3 onward** for all FlyRank assignments.

### Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **React 19**
- **Server Components** by default

### Routes

| Route        | Description                              |
|--------------|------------------------------------------|
| `/`          | Home — quick navigation overview         |
| `/dashboard` | Dashboard — activity overview            |
| `/tasks`     | Tasks — create and manage tasks          |
| `/history`   | History — past tasks and activity log    |
| `/settings`  | Settings — app configuration             |
| `/health`    | Health — live API status display         |

### API

| Endpoint        | Method | Description              |
|-----------------|--------|--------------------------|
| `/api/health`   | GET    | Returns project status   |

### Running Locally

```bash
cd flyrank-capstone/Eco-voice-/capstone
npm install
npm run dev
```

---

## Future Work

All future FlyRank assignments will continue inside the `capstone/` folder.

The `Ecovoice v1/` folder remains as an archived reference and must not be modified.

---

## Author

Dev Rajpoot  
Computer Science Engineering Student — Bhopal, India  
FlyRank Front-End AI Engineering Internship
