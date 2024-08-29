
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1OuOs-QxPoJ77BRuYrUHB32rM2PJhZzI",
  authDomain: "ai-flashcard-65f98.firebaseapp.com",
  projectId: "ai-flashcard-65f98",
  storageBucket: "ai-flashcard-65f98.appspot.com",
  messagingSenderId: "430651770516",
  appId: "1:430651770516:web:7142ace06c69d85ef41681",
  measurementId: "G-R3S5D0CGMM"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db,auth}
