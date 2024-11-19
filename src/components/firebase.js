

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyB5qORiNMnNNroUPAL33c0kP2K0iD1uhco",
  authDomain: "fire-simple-auth.firebaseapp.com",
  projectId: "fire-simple-auth",
  storageBucket: "fire-simple-auth.firebasestorage.app",
  messagingSenderId: "535167177595",
  appId: "1:535167177595:web:1f21f6dfaf499940afa3de",
  measurementId: "G-10ECQ4ML2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
