# Task Manager — Backend API

A RESTful backend API for the Task Manager application, built with Node.js, Express, and SQL Server.

---

## Tech Stack

| Layer         | Technology              |
|---------------|-------------------------|
| Runtime       | Node.js                 |
| Framework     | Express.js              |
| Database      | Microsoft SQL Server    |
| Auth          | JWT (JSON Web Tokens)   |
| Password Hash | bcryptjs                |
| Deployment    | Render / Railway / Azure|

---

## Project Structure

```
task-manager-backend/
├── config/
│   └── db.js           # SQL Server connection & table init
├── middleware/
│   └── auth.js         # JWT authentication middleware
├── routes/
│   ├── auth.js         # Register, Login, Me
│   └── tasks.js        # CRUD for tasks
├── .env.example        # Environment variable template
├── package.json
└── server.js           # Entry point
```

---

## API Endpoints

### Auth
| Method | Endpoint              | Description         | Auth Required |
|--------|-----------------------|---------------------|---------------|
| POST   | `/api/auth/register`  | Register new user   | No            |
| POST   | `/api/auth/login`     | Login user          | No            |
| GET    | `/api/auth/me`        | Get current user    | Yes           |

### Tasks
| Method | Endpoint              | Description         | Auth Required |
|--------|-----------------------|---------------------|---------------|
| GET    | `/api/tasks`          | Get all tasks       | Yes           |
| GET    | `/api/tasks/:id`      | Get single task     | Yes           |
| POST   | `/api/tasks`          | Create task         | Yes           |
| PUT    | `/api/tasks/:id`      | Update task         | Yes           |
| DELETE | `/api/tasks/:id`      | Delete task         | Yes           |

**Query filters for GET /api/tasks:**
- `?status=pending|in-progress|completed`
- `?priority=low|medium|high`
- `?search=keyword`

---

## Setup Instructions

### 1. Clone and install

```bash
git clone <your-repo-url>
cd task-manager-backend
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your database credentials and JWT secret.

### 3. Set up your SQL Server database

Create a new database called `taskmanager` (or any name you set in `.env`).  
The app will **automatically create** the `users` and `tasks` tables on first run.

### 4. Run the server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

---

## Example Requests

### Register
```json
POST /api/auth/register
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword123"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "jane@example.com",
  "password": "securepassword123"
}
```

### Create Task (with Bearer token)
```json
POST /api/tasks
Authorization: Bearer <your_token>

{
  "title": "Complete assignment",
  "description": "Finish the backend project",
  "priority": "high",
  "due_date": "2025-05-10"
}
```

---

## Live URL

> [https://your-deployed-app-url.com](https://your-deployed-app-url.com)  
> *(Update this after deployment)*

---

## Deployment

Recommended free platforms:
- **[Render](https://render.com)** — connect GitHub, set env vars, deploy
- **[Railway](https://railway.app)** — supports Node.js + SQL Server
- **[Azure App Service](https://azure.microsoft.com)** — pairs perfectly with Azure SQL
