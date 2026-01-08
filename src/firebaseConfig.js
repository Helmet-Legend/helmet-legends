import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_WpWkAd3i7SClnFIJbaUnTaOLfIqsexg",
  authDomain: "helmet-legends.firebaseapp.com",
  projectId: "helmet-legends",
  storageBucket: "helmet-legends.firebasestorage.app",
  messagingSenderId: "781630833056",
  appId: "1:781630833056:web:e6528361a6808d1c0ee4c5",
  measurementId: "G-P8CSPB0M9D",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
