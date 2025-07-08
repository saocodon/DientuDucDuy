// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUdELdPKYgabjTZ1_pNrUL_-53YqSs2m8",
  authDomain: "dientuducduy-7df68.firebaseapp.com",
  projectId: "dientuducduy-7df68",
  storageBucket: "dientuducduy-7df68.firebasestorage.app",
  messagingSenderId: "533238158594",
  appId: "1:533238158594:web:7bda154ad2f4148b475e1b",
  measurementId: "G-Y6MQ13ZZ5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
