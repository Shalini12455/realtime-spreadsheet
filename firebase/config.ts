import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLMjJ49hqCeevnepU5z-P7eBSgE3v1baE",
  authDomain: "realtime-spreadsheet-9180f.firebaseapp.com",
  projectId: "realtime-spreadsheet-9180f",
  storageBucket: "realtime-spreadsheet-9180f.firebasestorage.app",
  messagingSenderId: "86559305419",
  appId: "1:86559305419:web:be7d88047f68a4e534b54e",
  measurementId: "G-5M8HMMZ53E"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);