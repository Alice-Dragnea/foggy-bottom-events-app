// constants/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (use the one you pasted)
const firebaseConfig = {
  apiKey: "AIzaSyCgTxhyvmYk4C4rpPeb0iXt5PUGP7MGuFs",
  authDomain: "hci-project-a3750.firebaseapp.com",
  projectId: "hci-project-a3750",
  storageBucket: "hci-project-a3750.firebasestorage.app",
  messagingSenderId: "124152289740",
  appId: "1:124152289740:web:b3f63ec717fb0cd9b6a569",
  measurementId: "G-JQZEJB6WVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore DB
export const db = getFirestore(app);

// Auth (using anonymous login for prototypes)
export const auth = getAuth(app);

// Optional: Sign in anonymously right away
signInAnonymously(auth).catch((err) => console.log("Anon auth error:", err));
