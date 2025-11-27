# Notes-Todos — Combined Notes & Todos App

A polished, front‑end only Notes & Todos web application built with React and Tailwind CSS.  
Purpose-built for quick local productivity: create, organize, and manage notes and todos with a clean, responsive UI. All data is stored in the browser (LocalStorage) — no backend required.

---

## Quick overview
Notes-Todos is a single-page React app that combines a notes manager and a todo tracker. It focuses on local-first UX, fast interactions, and cross‑device compatibility for reading and writing small personal data sets.

---

## Features

Core
- Fast CRUD: create, view, edit, and delete notes and todos.
- Local persistence: all items saved to LocalStorage for offline usage.
- Responsive UI with Tailwind CSS (mobile → desktop).

Notes (what you can do)
- Rich note cards with title and content preview.
- Pin notes for quick access.
- Soft delete to Recycle Bin, restore or permanently delete.
- Search notes with debounced input for better performance.
- Folder views: All, Pinned, Recycle Bin.

Todos (what you can do)
- Create tasks with title, optional description and due/created timestamps.
- Mark todos as completed (stores completion timestamp).
- Pin/Unpin tasks.
- Soft delete / restore / permanently delete.
- Filter and search todos across folders.
- Toggle completed state directly from task cards.

Date handling
- Centralized date utility to normalize multiple input formats.
- Formats include short date (e.g., "16 Oct 2025") and full date/time.
- Best practice: items store timestamps as ISO strings (new Date().toISOString()) for cross-browser consistency.

UX & polish
- Smooth animations, hidden scrollbar option for cleaner design.
- Sidebar for folder navigation and quick actions.
- Debounced search for lower CPU usage on large lists.

---

## Tech stack
- React (functional components + hooks)
- Tailwind CSS
- Vite / Create React App compatible
- React Icons
- LocalStorage for persistence
- Vanilla JS utilities for date parsing/formatting

---

## Project structure (high level)
- src/
  - Components/
    - Notes/ (NoteApp, NoteList, NoteCard, NoteForm, ...)
    - Todos/ (TodosApp, TodoList, TodoCard, TodoForm, ...)
    - Common/ (FormateDate.js, shared helpers)
  - main.jsx — application entry
  - index.css — Tailwind + global styles

---

## Getting started (local)
1. Clone the repo:
   git clone <repo-url>
2. Install:
   npm install
3. Run dev server:
   npm run dev
4. Open the URL shown by the dev server (usually http://localhost:5173 or http://localhost:3000).

Build & deploy:
- npm run build
- Deploy the produced `dist`/`build` folder to static hosts: Netlify, Vercel, GitHub Pages, etc.

---

## Usage notes & recommendations
- Data is local: clearing browser/site storage will delete items.
- For reliable date parsing across devices, ensure timestamps are ISO strings.
- If you see "Invalid date" on some mobile browsers, update to the latest browser or ensure timestamps are ISO formatted.
- The UI is designed for client-only use; no authentication or syncing is included.

---

## Contributing
- Fork → branch → PR.
- Keep PRs small and focused.
- Document changes and add minimal tests where applicable.

---

## License
MIT

---

## Author / Credits
Built by the project author (see GitHub profile).  
Icons: React Icons. Styling: Tailwind CSS.


**Live link**
- Live: [https://owndocs03.vercel.app](https://owndocs03.vercel.app)


**Gaurav Kumar**
- Portfolio: [https://gauravkumar03.vercel.app](https://gauravkumar03.vercel.app)
- GitHub: [Your GitHub Profile](https://github.com/eclipse-dev3)
