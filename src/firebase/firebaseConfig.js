// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK3O47IYwdJN59ZlKek8pNVMuSkfSAy9M",
  authDomain: "buybusy-ecom.firebaseapp.com",
  projectId: "buybusy-ecom",
  storageBucket: "buybusy-ecom.firebasestorage.app",
  messagingSenderId: "440439979799",
  appId: "1:440439979799:web:dfa3d3202db28647cf8152",
  measurementId: "G-4XX7R0KMXV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
