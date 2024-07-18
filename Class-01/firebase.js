

// Import the functions you need from the SDKs you need
import { initializeApp} from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js'

import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js';

// TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBt5ye4SW7wZwz0zfiLMRMHJee1sek_eMY",
    authDomain: "my-first-project-a9c51.firebaseapp.com",
    projectId: "my-first-project-a9c51",
    storageBucket: "my-first-project-a9c51.appspot.com",
    messagingSenderId: "831968362724",
    appId: "1:831968362724:web:1bc2f72be0b194733b6cf1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

  export{
    app,
    db,
    collection,
    addDoc,
    getDocs,

  }