import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbJEqBsA1GEv5sogDRo6jo5eyNVe7dWKg",
  authDomain: "thaalo-416ba.firebaseapp.com",
  projectId: "thaalo-416ba",
  storageBucket: "thaalo-416ba.firebasestorage.app",
  messagingSenderId: "819252125387",
  appId: "1:819252125387:web:629aebe8ff97e100b0c54e",
  measurementId: "G-N6ZBDLXFK3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  }).catch((error) => {
    console.warn("Firebase Analytics not available:", error);
  });
}

// Enable Firestore offline persistence with better error handling
if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db, {
    synchronizeTabs: true
  }).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Firestore persistence failed: multiple tabs open.');
    } else if (err.code === 'unimplemented') {
      console.warn('Firestore persistence is not available in this browser.');
    } else {
      console.error('Firestore persistence error:', err);
    }
  });
}

const googleProvider = new GoogleAuthProvider();

export { auth, RecaptchaVerifier, db, googleProvider, analytics };
