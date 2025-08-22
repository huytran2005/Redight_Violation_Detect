// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxQno2HnOmfTfCXM37zGv7ODVvfakVdR0",
  authDomain: "violation-8e5f4.firebaseapp.com",
  projectId: "violation-8e5f4",
  storageBucket: "violation-8e5f4.appspot.com", 
  messagingSenderId: "1023214977408",
  appId: "1:1023214977408:web:7e22fb336ffa2f67fa8165",
  measurementId: "G-08GYH6MY6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
