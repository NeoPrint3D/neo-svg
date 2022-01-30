import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_API_KEY,
//     authDomain: import.meta.env.VITE_AUTH_DOM,
//     databaseURL: import.meta.env.VITE_DB_URL,
//     projectId: import.meta.env.VITE_PRJ_ID,
//     storageBucket: import.meta.env.VITE_STG_BKT,
//     messagingSenderId: import.meta.env.VITE_MSG_ID,
//     appId: import.meta.env.VITE_APP_ID,
//     measurementId: import.meta.env.VITE_MESG_ID,
// };
const firebaseConfig = {
    apiKey: "AIzaSyDDePXHbBtbNCMRnL3MxrmmZshmbIdJRJ8",
    authDomain: "neo-svg.firebaseapp.com",
    projectId: "neo-svg",
    storageBucket: "neo-svg.appspot.com",
    messagingSenderId: "132237395516",
    appId: "1:132237395516:web:8a8ff8f287effbc244a539",
    measurementId: "G-QXHBZZTQWX"
};
//intialize firebase app

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();
const perf = getPerformance();
const storage = getStorage();

async function generateData() {
    const chance = new Chance();
    console.log("generated data");

    for (let i = 0; i < 1000; i++) {
        //grab a random picture from picsum

        const image =
            "https://picsum.photos/200/300?random=" +
            Math.floor(Math.random() * 1000);
        const id = ID(24);
        await setDoc(doc(db, "posts", id), {
            title: chance.sentence({ words: 2 }),
            id: id,
            description: chance.sentence({ words: 10 }),
            file: image,
            created: chance.timestamp(),
            likes: Math.floor(Math.random() * 1000),
            views: Math.floor(Math.random() * 5000),
            downloads: Math.floor(Math.random() * 1000),
            tags: [],
            comments: [],
            user: {
                uid: chance.guid(),
                name: chance.name(),
                profilePic: chance.avatar(),
            },
        });
    }
}




export { app, analytics, db, auth, storage, perf };
