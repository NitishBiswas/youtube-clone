import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDFkRdZ3v1QxTXVnF_HaRRtgIQTBPYYHUs",
    authDomain: "clone-368519.firebaseapp.com",
    projectId: "youtube-clone-368519",
    storageBucket: "youtube-clone-368519.appspot.com",
    messagingSenderId: "24812313932",
    appId: "1:24812313932:web:d23e9f3e10d97c34e643e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);