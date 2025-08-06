// src/firebase.js
import { initializeApp } from 'firebase/app'
// import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.VITE_FIREBASE_APP_ID
//   };

const firebaseConfig = {
  apiKey: "AIzaSyC5OAnGSDBq8INKK_1Hr_H_UBx8Rz42EpI",
  authDomain: "daily-tracker-9d4a8.firebaseapp.com",
  projectId: "daily-tracker-9d4a8",
  storageBucket: "daily-tracker-9d4a8.firebasestorage.app",
  messagingSenderId: "34297115212",
  appId: "1:34297115212:web:b344e07fc6cd1f6fbafae9"
};


// Initialize everything
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
// const auth = getAuth(firebaseApp);

// Set persistence to local (default)

// setPersistence(auth, browserSessionPersistence)
//   .then(() => {
//     console.log("Persistence set to session");
//   })
//   .catch((error) => {
//     console.error("Error setting persistence:", error);
//   });


export { db }
