// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAAM-4xoC6rRl2eD-eKHTUZ30fgAT3ny1A',
  authDomain: 'dientuducduy-37592.firebaseapp.com',
  projectId: 'dientuducduy-37592',
  storageBucket: 'dientuducduy-37592.firebasestorage.app',
  messagingSenderId: '828800381113',
  appId: '1:828800381113:web:cc96b1e0c5f36d1a6b2b68',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
