import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, GoogleAuthProvider, connectAuthEmulator } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbJEqBsA1GEv5sogDRo6jo5eyNVe7dWKg",
  authDomain: "thaalo-416ba.firebaseapp.com",
  projectId: "thaalo-416ba",
  storageBucket: "thaalo-416ba.firebasestorage.app",
  messagingSenderId: "819252125387",
  appId: "1:819252125387:web:629aebe8ff97e100b0c54e",
  measurementId: "G-N6ZBDLXFK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== "undefined") {
  try {
    import("firebase/analytics").then(({ getAnalytics }) => {
      analytics = getAnalytics(app);
    }).catch((error) => {
      console.warn("Firebase Analytics not available:", error);
    });
  } catch (error) {
    console.warn("Firebase Analytics initialization failed:", error);
  }
}

// Enable Firestore offline persistence with better error handling
if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db, {
    synchronizeTabs: true
  }).then(() => {
    console.log("Firestore offline persistence enabled");
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

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Development mode - connect to emulators if needed
if (process.env.NODE_ENV === 'development' && typeof window !== "undefined") {
  // Uncomment these lines if you want to use Firebase emulators
  // connectAuthEmulator(auth, "http://localhost:9099");
  // connectFirestoreEmulator(db, "localhost", 8080);
}

export { auth, RecaptchaVerifier, db, googleProvider, analytics };
