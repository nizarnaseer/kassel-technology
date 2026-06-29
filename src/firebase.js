import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let db = null;
let isFirebaseEnabled = false;

// Check if critical Firebase configuration parameters are present
if (firebaseConfig.projectId && firebaseConfig.apiKey) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    isFirebaseEnabled = true;
    console.log('Firebase Firestore successfully initialized.');
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
  }
} else {
  console.warn(
    'Firebase environment variables (VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_API_KEY) are missing. ' +
    'The application will fall back to using browser LocalStorage.'
  );
}

export { db, isFirebaseEnabled };
