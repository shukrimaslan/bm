import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAFuvzd-72WvP0A-q_3eBrUPvCNWoWaYf8",
  authDomain: "bm-vocab-app.firebaseapp.com",
  projectId: "bm-vocab-app",
  storageBucket: "bm-vocab-app.firebasestorage.app",
  messagingSenderId: "954424022104",
  appId: "1:954424022104:web:4ec9bb65cb22239c9d262d",
  measurementId: "G-QJ3JYBB7RH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
