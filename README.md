# Mini Time Tracker

A simple **Time Tracking** web application built with **Next.js**, **React**, **MUI**, **Express**, and **Prisma** (SQLite).

Track hours per project, view daily and total summaries, and prevent exceeding 24 hours per day.

---

## Features

- Add time entries with date, project, hours, and description.
- View all time entries grouped by date.
- Total hours per day and grand total.
- Validation: maximum 24 hours per day.
- Dark / Light mode toggle.

---

## Tech Stack

**Frontend:**

- Next.js 16
- React 19
- Material UI 7 (MUI)
- Axios for API requests
- Day.js for date handling

**Backend:**

- Node.js + Express
- Prisma ORM (SQLite for local dev)
- TypeScript

**Database:**

- SQLite (`dev.db` created automatically with Prisma)

---

## Getting Started (Local Development)

1. **Clone the repository:**

```bash
git clone <repo-url>
cd <repo-folder>
```

2. Install dependencies:

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

3. Set up environment variables:

Create .env in the backend folder (you can copy .env.example):

`DATABASE_URL="file:./dev.db"`

This uses SQLite locally. The database file will be created automatically.

Frontend requires `NEXT_PUBLIC_API_URL` (e.g. http://localhost:4000) defined in `.env.local`.

4. Run Prisma migrations (backend only):

```bash
npx prisma migrate dev --name init
```

Start the development servers:

### Backend

```bash
npm run dev
```

Backend API runs on http://localhost:4000

### Frontend

```bash
npm run dev
```

Open the app:

Go to http://localhost:3000
