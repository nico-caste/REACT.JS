import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYlGI1IXUVoIDbeWoA2oCWdyfQDBCU5Es",
  authDomain: "proyecto-react-coder-69527.firebaseapp.com",
  projectId: "proyecto-react-coder-69527",
  storageBucket: "proyecto-react-coder-69527.firebasestorage.app",
  messagingSenderId: "998130211939",
  appId: "1:998130211939:web:ba5af589aaa75b58cbac56",
  measurementId: "G-T5F7E6KBE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);