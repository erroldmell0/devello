# Devello

A real-time collaborative coding interview platform that enables 1-on-1 pair programming sessions with integrated video calling, live chat, and a shared code editor.

## Features

- **Video Calling** — HD video conferencing powered by Stream Video SDK
- **Live Chat** — Real-time messaging within sessions via Stream Chat
- **Code Editor** — Monaco-based editor supporting JavaScript, Python, and Java
- **Code Execution** — Run code remotely using Judge0 CE API with test case validation
- **Coding Problems** — Built-in problem set with descriptions, examples, and expected outputs
- **Session Management** — Create, join, and end coding sessions
- **Authentication** — Secure sign-in/sign-up via Clerk

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React, Vite, TailwindCSS, DaisyUI |
| Backend | Node.js, Express.js, MongoDB, Mongoose |
| Auth | Clerk |
| Real-time | Stream Video SDK, Stream Chat |
| Code Execution | Judge0 CE API |
| Other | React Query, Inngest, Monaco Editor |

## Getting Started

### Prerequisites

- Node.js >= 20
- MongoDB database
- [Clerk](https://clerk.com) account
- [Stream](https://getstream.io) account (Video & Chat)

### Environment Variables

**Backend** (`backend/.env`):

```env
PORT=3000
DB_URL=your_mongodb_connection_string
NODE_ENV=development
CLIENT_URL=http://localhost:5173
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

**Frontend** (`frontend/.env`):

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3000/api
VITE_STREAM_API_KEY=your_stream_api_key
VITE_JUDGE0_API=https://ce.judge0.com
```

### Installation

```bash
# Clone the repo
git clone https://github.com/erroldmell0/devello.git
cd devello

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running Locally

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:3000`.

## Project Structure

```
devello/
├── backend/
│   └── src/
│       ├── controllers/    # Route handlers
│       ├── lib/            # DB, Stream, env config
│       ├── middleware/      # Auth middleware
│       ├── models/         # Mongoose schemas
│       ├── routes/         # Express routes
│       └── server.js       # Entry point
└── frontend/
    └── src/
        ├── api/            # Axios API calls
        ├── components/     # React components
        ├── data/           # Coding problems
        ├── hooks/          # Custom hooks
        ├── lib/            # Utilities & configs
        └── pages/          # Page components
```
