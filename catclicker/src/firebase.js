// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {getStorage} from  "firebase/storage"  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBiyyc60oSuaiYHzPcJRmYh6n--DpCsL1k",
    authDomain: "catclicker-f782e.firebaseapp.com",
    projectId: "catclicker-f782e",
    storageBucket: "catclicker-f782e.appspot.com",
    messagingSenderId: "619955303542",
    appId: "1:619955303542:web:c7f9d267d05ec4e516db57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();


export { db, storage };