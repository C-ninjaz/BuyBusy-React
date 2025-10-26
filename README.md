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

## Deploying to Render (Static Site)

This project can be deployed to Render as a Static Site. Render will build the app using `npm run build` and serve the `dist` folder.

Steps:

1. Sign in to https://dashboard.render.com and create a new Static Site.
2. Connect your GitHub/GitLab repo and select the repository.
3. Set the build command to:

```bash
npm install && npm run build
```

and the publish directory to:

```
dist
```

4. Add Vite environment variables for Firebase (Render → Environment → Static Site -> Environment):

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

5. (Optional) Add the provided `render.yaml` to the repo to define the service configuration. Render will pick it up automatically if you enable "Auto-Deploy".

6. Deploy and verify the site. If you need server-side functions (e.g., seeding via firebase-admin), use a separate Private Service on Render and protect the service account key.

## License

MIT
