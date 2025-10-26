// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration - prefer Vite environment variables (set on Render / at build time)
// For Vite, environment variables must be prefixed with VITE_ (e.g. VITE_FIREBASE_API_KEY)
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyBK3O47IYwdJN59ZlKek8pNVMuSkfSAy9M",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "buybusy-ecom.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "buybusy-ecom",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "buybusy-ecom.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "440439979799",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:440439979799:web:dfa3d3202db28647cf8152",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-4XX7R0KMXV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
