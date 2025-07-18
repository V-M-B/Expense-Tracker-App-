# Expense Tracker Mobile App

A cross-platform mobile app for tracking expenses, built with React Native (Expo) and Clerk authentication. Connects to a Node.js/Express backend for transaction management.

---

## Features
- User authentication (sign up, sign in, sign out) via Clerk
- Add, view, and delete transactions
- View balance, income, and expenses summary
- Modern, themed UI with custom styles
- Responsive and works on Android, iOS, and web (Expo)

---

## Tech Stack
- **React Native** (Expo)
- **Expo Router** (file-based navigation)
- **Clerk** (authentication)
- **Custom Hooks** (e.g., `useTransactions`)
- **REST API** (connects to backend)

---

## Folder Structure
```
mobile/
  app/             # App entry, navigation, and screens
    (auth)/        # Authentication screens (sign-in, sign-up)
    (root)/        # Main app screens (dashboard, etc.)
    constants/     # App-wide constants (colors, etc.)
  components/      # Reusable UI components
  hooks/           # Custom React hooks (e.g., useTransactions)
  assets/          # Images, fonts, styles
  lib/             # Utility functions
  package.json     # Project metadata and scripts
  app.json         # Expo app configuration
```

---

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation
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

## Authentication
- Uses [Clerk](https://clerk.com/) for secure user authentication.
- Sign up and sign in screens are in `app/(auth)/`.
- Session management and sign out handled via Clerk hooks and components.

---

## Main Screens & Hooks
- **Dashboard:** View your balance, income, expenses, and transaction list.
- **Add Transaction:** Add new income or expense entries.
- **useTransactions Hook:** Fetches transactions and summary from the backend, and handles deletion.

---

## Theming & Styles
- Custom color themes defined in `app/constants/colors.js`.
- Styles for screens in `assets/styles/`.
- Uses a modern, clean UI with support for light/dark modes.

---

## Assets
- App logo and illustrations in `assets/images/`.
- Custom fonts in `assets/fonts/`.
- Example screenshot:

  ![App Screenshot](assets/images/screenshot-for-readme.png)

---

## TypeScript
- TypeScript is supported and configured via `tsconfig.json`.

---

## Environment & .gitignore
- `.env` files are supported for environment variables (see `.gitignore`).
- Do not commit sensitive keys or credentials.

---

## Backend API
- The app connects to the backend REST API (see `/backend` folder and root README for details).
- Update the API URL in `hooks/useTransactions.js` as needed for your environment.

---

## Learn More
- For full-stack setup and backend details, see the [root README](../README.md).
- For Expo documentation, visit [https://docs.expo.dev/](https://docs.expo.dev/)

---

## License
This project is licensed under the MIT License.
