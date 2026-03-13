import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwd3I_c-dSVVMLIbOrM6ZJVlw_2q5i1pM",
  authDomain: "smart-class-check-in-app.firebaseapp.com",
  projectId: "smart-class-check-in-app",
  storageBucket: "smart-class-check-in-app.firebasestorage.app",
  messagingSenderId: "778224262016",
  appId: "1:778224262016:web:2f183b7af280367b67ff65",
  measurementId: "G-XBPP4K45PG",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
