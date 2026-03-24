# Express API

A REST API built with Express, TypeScript, and PostgreSQL for managing todos.

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) v14+

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example below into a `.env` file at the project root:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo
DB_USER=postgres
DB_PASSWORD=
```

Adjust the values to match your local PostgreSQL credentials.

### 3. Create the database

```bash
psql -U postgres -c "CREATE DATABASE todo;"
```

### 4. Run migrations

```bash
npm run db:migrate
```

This creates the `todos` table.

## Running the API

### Development (with hot reload)

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

The server starts on `http://localhost:3000` (or the `PORT` value in `.env`).

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/todos` | List all todos |
| `POST` | `/api/todos` | Create a todo |
| `GET` | `/api/todos/:id` | Get a todo by ID |
| `PUT` | `/api/todos/:id` | Update a todo |
| `DELETE` | `/api/todos/:id` | Delete a todo |

### Example requests

**Create a todo**
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries"}'
```

**List all todos**
```bash
curl http://localhost:3000/api/todos
```

**Update a todo**
```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "completed": true}'
```

**Delete a todo**
```bash
curl -X DELETE http://localhost:3000/api/todos/1
```
