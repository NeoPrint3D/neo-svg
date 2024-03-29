import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOM,
    databaseURL: import.meta.env.VITE_DB_URL,
    projectId: import.meta.env.VITE_PRJ_ID,
    storageBucket: import.meta.env.VITE_STG_BKT,
    messagingSenderId: import.meta.env.VITE_MSG_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MESG_ID,
};

//intialize firebase app

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();
const perf = getPerformance();
const storage = getStorage();

export { app, analytics, db, auth, storage, perf };
