import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "job-tracker-f73b4.firebaseapp.com",
  projectId: "job-tracker-f73b4",
  storageBucket: "job-tracker-f73b4.firebasestorage.app",
  messagingSenderId: "1005053283709",
  appId: "1:1005053283709:web:ddfb873e3f932366a55014",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get service instances
const db = getFirestore(app);

export { app, db };
