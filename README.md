# Pulse - Modern React Workspace & Dev Dashboard

A modern, responsive React 18 single-page application built with **Vite** and styled with CSS custom properties (design tokens) supporting dynamic dark and light mode themes.

---

## 🚀 Features

- **⚡ Modern React 18 Architecture**: Built with Vite 5 for fast HMR (Hot Module Replacement) and optimized production bundles.
- **🌓 Dynamic Dark & Light Themes**: Auto-saves user preference to `localStorage`.
- **✅ Interactive Task & Milestone Tracker**:
  - Filter tasks by status (All, Active, Completed).
  - Priority badges (Low, Medium, High).
  - Category tags (Development, Design, Bugfix, DevOps).
  - Strike-through completion states.
  - Persistent state in browser storage.
- **⏱️ Focus Pomodoro Timer**:
  - Configurable intervals (25 min Focus, 5 min Short Break, 15 min Long Break).
  - Conic gradient progress visualization ring.
  - Session counters and auto-scratchpad logging.
- **📝 Quick Scratchpad / Notes**:
  - Quick note creation with timestamping.
  - One-click copy-to-clipboard functionality with feedback indicators.
- **🔍 Tech Stack & Runtime Inspector**:
  - Live session duration tracking.
  - Client-side storage usage calculator.
  - Architecture and dependency specs.

---

## 🛠️ Getting Started

### Development Server
The development server is already running in the background:
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### Production Build
To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 📁 Directory Structure
```
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── TaskTracker.jsx
        ├── FocusTimer.jsx
        ├── QuickNotes.jsx
        └── TechStackInspector.jsx
```
