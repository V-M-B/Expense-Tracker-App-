# Expense Tracker Backend

This is the backend service for the Expense Tracker App, built with Node.js and Express. It provides a RESTful API for managing user transactions, with rate limiting, scheduled tasks, and a serverless PostgreSQL database (NeonDB).

---

## Features
- RESTful API for transactions (add, view, delete, summary)
- Rate limiting with Upstash
- Serverless PostgreSQL (NeonDB) integration
- Scheduled cron job to keep the backend awake
- Environment-based configuration

---

## Tech Stack
- **Node.js**
- **Express.js**
- **NeonDB** (PostgreSQL serverless)
- **Upstash** (Redis for rate limiting)
- **Cron** (scheduled tasks)
- **dotenv** (environment variables)

---

## Project Structure
```
backend/
  src/
    config/         # Database, cron, and Upstash configs
    controllers/    # Route controllers
    middleware/     # Express middleware (rate limiter)
    routes/         # API route definitions
    server.js       # Entry point
  package.json      # Project metadata and scripts
  .gitignore        # Ignored files
```

---

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory with the following variables:
   ```env
   DATABASE_URL=your_neondb_connection_string
   API_URL=https://your-app-url.com/api/health # For the cron job
   PORT=3000 # Or your preferred port
   NODE_ENV=development # or production
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```

---

## API Endpoints

All endpoints are prefixed with `/api/transactions`:

| Method | Endpoint                | Description                       |
|--------|-------------------------|-----------------------------------|
| GET    | `/api/transactions/:userId`      | Get all transactions for a user   |
| POST   | `/api/transactions`     | Add a new transaction             |
| DELETE | `/api/transactions/:id` | Delete a transaction by ID         |
| GET    | `/api/transactions/summary/:userId` | Get summary (balance, income, expenses) for a user |

**Health Check:**
- `GET /api/health` — Returns `{ status: "ok" }` if the server is running.

---

## Rate Limiting
- Implemented using Upstash Redis and the `@upstash/ratelimit` package.
- Limits requests to prevent abuse (see `src/middleware/rateLimiter.js`).
- Returns HTTP 429 if the limit is exceeded.

---

## Database
- Uses [NeonDB](https://neon.tech/) (serverless PostgreSQL).
- Connection is managed via `@neondatabase/serverless`.
- Table: `transactions` with fields:
  - `id` (SERIAL, primary key)
  - `user_id` (VARCHAR)
  - `title` (VARCHAR)
  - `amount` (DECIMAL)
  - `category` (VARCHAR)
  - `created_at` (DATE, default: current date)
- Table is auto-created on server start if it does not exist.

---

## Cron Job
- Defined in `src/config/cron.js`.
- Sends a GET request to the backend every 14 minutes to keep the server awake (useful for free hosting platforms).

---

## Environment Variables
- `.env` file is required (see above for example).
- **Never commit your `.env` file.**

---

## Notes
- For full-stack setup and mobile app instructions, see the [root README](../README.md).
- API endpoints may be updated; see `src/routes/transactionsRoute.js` for the latest.

---

## License
This project is licensed under the ISC License. 