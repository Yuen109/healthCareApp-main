// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4wx5oUx9JwDA_0JljMf11k5uHyGUF4_I",
  authDomain: "healthcareapp-c4aa4.firebaseapp.com",
  projectId: "healthcareapp-c4aa4",
  storageBucket: "healthcareapp-c4aa4.appspot.com",
  messagingSenderId: "811792334763",
  appId: "1:811792334763:web:92442ef3fde190f967dcee",
  measurementId: "G-0RRXJS5HVG",
  // apiKey: process.env.React_APP_FIREBASE_API_KEY,
  // authDomain: process.env.React_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.React_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.React_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.React_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.React_APP_FIREBASE_API_ID,
  // measurementId: process.env.React_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
