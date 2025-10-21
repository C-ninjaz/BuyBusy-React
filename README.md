# BuyBusy (Vite + React)

A modern e-commerce web app built with Vite, React, Redux Toolkit, and Firebase. Features a beautiful UI, authentication, Firestore, shopping cart, order management, and dark/light mode.

## Features

- User authentication (register/login)
- Product listing, search, and filtering (Redux-powered)
- Shopping cart (Redux-powered)
- Order history
- Sidebar with modern filters (price slider, category checkboxes)
- Dark/light mode toggle (modern switch)
- Responsive, modern UI

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Firebase

- Create a Firebase project at https://console.firebase.google.com
- Enable Email/Password authentication
- Create a Firestore database
- Copy your Firebase config into `src/firebase/firebaseConfig.js`

### 3. (Optional) Seed sample products

- Download a service account JSON from Firebase Console → Project Settings → Service Accounts
- Place it next to `seedProducts.js` as `serviceAccountKey.json`
- Install firebase-admin:
  ```bash
  npm install firebase-admin
  ```
- Run:
  ```bash
  npm run seed
  ```

### 4. Start development server

```bash
npm run dev
```

## Project Structure

- `src/components/` – UI components (Navbar, Sidebar, ProductCard, SearchBar, ModeToggle)
- `src/pages/` – App pages (Home, Cart, Login, Orders, Register)
- `src/contexts/` – React context providers (Auth, Products)
- `src/store/` – Redux Toolkit store and slices
- `src/firebase/` – Firebase config
- `src/utils/` – Utility functions (filters, etc.)

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run seed` – Seed Firestore with sample products

## Environment

- Add your Firebase config to `src/firebase/firebaseConfig.js`
- Do not commit sensitive files like `serviceAccountKey.json` or `.env`

## License

MIT
