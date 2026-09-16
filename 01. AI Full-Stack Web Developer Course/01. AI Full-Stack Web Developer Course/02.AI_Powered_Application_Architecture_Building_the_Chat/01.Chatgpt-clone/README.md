# ChatGPT Clone

A full-stack AI chat application built with React (frontend) and Node.js/Express (backend), powered by Google Gemini AI. The app lets users have real-time conversations with an AI assistant, with chat history stored in a MySQL database.

---

## Project Structure

```
01.Chatgpt-clone/
├── backend/          # Node.js + Express API server
│   ├── db/           # Database connection config
│   ├── sql/          # SQL schema files
│   ├── src/
│   │   ├── api/
│   │   │   ├── chat/         # Chat routes, controller, service
│   │   │   └── main.routes.js
│   │   └── middleware/       # Error handler middleware
│   ├── server.js     # Entry point
│   ├── .env          # Environment variables (not committed)
│   └── package.json
│
└── frontend/         # React + Vite client
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar/
    │   │   ├── ChatHeader/
    │   │   ├── MessageList/
    │   │   └── ChatInput/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## Tech Stack

### Backend
- **Node.js** + **Express 5** — REST API server
- **MySQL2** — Database (connection pool)
- **Google Gemini AI** (`@google/genai`) — AI response generation
- **CORS** + **dotenv** — Cross-origin support and environment config
- **Nodemon** — Dev auto-restart

### Frontend
- **React 19** + **Vite 8** — UI framework and build tool
- **Axios** — HTTP requests to the backend
- **react-markdown** + **react-syntax-highlighter** — Render AI markdown responses with code highlighting
- **lucide-react** — Icons

---

## Getting Started

### Prerequisites
- Node.js v18+
- MySQL database running locally

---

### Backend Setup

1. Go into the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (copy from `.env.example` if available):
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

4. Create the database table using the SQL schema:
   ```bash
   # Run the schema in your MySQL client
   mysql -u your_user -p your_database < sql/schema.sql
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The backend runs on **http://localhost:3000**

---

### Frontend Setup

1. Go into the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend runs on **http://localhost:5173**

---

## API Endpoints

| Method | Endpoint                  | Description                        |
|--------|---------------------------|------------------------------------|
| GET    | `/api/chat/conversation`  | Fetch all past conversations       |
| POST   | `/api/chat/conversation`  | Send a message and get AI response |

### POST `/api/chat/conversation` — Request Body
```json
{
  "question": "What is React?"
}
```

### POST Response
```json
{
  "success": true,
  "data": {
    "userConversation": { "id": 1, "role": "user", "content": "What is React?" },
    "assistantConversation": { "id": 2, "role": "assistant", "content": "React is..." }
  }
}
```

---

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS conversations (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    role        ENUM('user', 'assistant') NOT NULL,
    content     TEXT NOT NULL,
    token_count INT UNSIGNED NOT NULL DEFAULT 0,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Features

- Real-time chat with Google Gemini AI
- Chat history persisted in MySQL
- Markdown rendering with syntax highlighting for code blocks
- Optimistic UI updates (messages appear immediately while the AI responds)
- Error messages displayed in chat if the request fails
- CORS configured for local development

---

## Scripts

### Backend
| Command       | Description              |
|---------------|--------------------------|
| `npm run dev` | Start with nodemon (dev) |

### Frontend
| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start Vite dev server    |
| `npm run build` | Build for production     |
| `npm run lint`  | Run ESLint               |
| `npm run preview` | Preview production build |
