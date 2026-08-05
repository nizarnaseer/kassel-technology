export const isFirebaseEnabled = !!(
  import.meta.env.VITE_FIREBASE_PROJECT_ID && 
  import.meta.env.VITE_FIREBASE_API_KEY
);
