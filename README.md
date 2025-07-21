# Expense Tracker App

A cross-platform expense tracking application with a Node.js backend and a React Native (Expo) mobile frontend. Easily track your expenses, visualize spending, and manage your finances on the go.

---

## Features

- User authentication (sign up, sign in, sign out)
- Add, view, and delete transactions
- Categorize expenses
- Visualize spending with charts (planned/coming soon)
- Rate limiting and security middleware
- Responsive mobile UI

---

## Tech Stack

**Backend:**
- Node.js
- Express.js
- Upstash (for data storage)
- Cron jobs (for scheduled tasks)

**Mobile Frontend:**
- React Native (Expo)
- JavaScript (ES6+)
- Custom hooks and components

---

## Project Structure

```
Expense-Tracker-App-/
  backend/           # Node.js/Express backend
    src/
      config/        # Database, cron, and Upstash configs
      controllers/   # Route controllers
      middleware/    # Express middleware (e.g., rate limiter)
      routes/        # API route definitions
      server.js      # Entry point
  mobile/            # React Native (Expo) mobile app
    app/             # App entry and navigation
    components/      # Reusable UI components
    hooks/           # Custom React hooks
    lib/             # Utility functions
    assets/          # Images, fonts, styles
```

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (e.g., Upstash credentials) as needed.
4. Start the backend server:
   ```bash
   npm start
   ```

### Mobile App Setup
1. Navigate to the mobile folder:
   ```bash
   cd mobile
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npx expo start
   ```
4. Use the Expo Go app or an emulator to run the app on your device.

---

## API Endpoints (Sample)

- `POST /api/transactions` — Add a new transaction
- `GET /api/transactions` — Get all transactions
- `DELETE /api/transactions/:id` — Delete a transaction

> See `backend/src/routes/transactionsRoute.js` for full details.

---

## Screenshots

![App Screenshot](mobile/assets/images/screenshot-for-readme.png)

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## App

https://expo.dev/accounts/vmb/projects/mobile/builds/e0e2ab82-3707-4103-8784-45b299366da9

