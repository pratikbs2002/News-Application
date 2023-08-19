import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_xd8oOAqAQLVsxIzy0tb9lAxbettWXUA",
  authDomain: "news-app-1e813.firebaseapp.com",
  databaseURL:
    "https://news-app-1e813-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "news-app-1e813",
  storageBucket: "news-app-1e813.appspot.com",
  messagingSenderId: "739505056494",
  appId: "1:739505056494:web:dbc3e966616c599473a1ff",
  measurementId: "G-35M2YNZGY7",
};

export default firebaseConfig;

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
