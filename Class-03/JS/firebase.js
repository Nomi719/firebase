
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";

import {getFirestore, collection,addDoc,doc,getDocs,updateDoc, deleteDoc,setDoc, getDoc} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyUqvXk-NtITaF1ifytbyzaGqYu9CsIss",
  authDomain: "fir-project-fd16f.firebaseapp.com",
  projectId: "fir-project-fd16f",
  storageBucket: "fir-project-fd16f.appspot.com",
  messagingSenderId: "600748237837",
  appId: "1:600748237837:web:b166dd8083fcf6d4bb2144"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);



export{
    db,
    app,
    collection,
    addDoc,
    doc,
    getDocs,
    updateDoc,
    deleteDoc,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    auth,
    setDoc,
    getDoc,

    
}

