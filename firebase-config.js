// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdhh9aoT-pgtW7ZqiIjEpPb9pw8xdGTCI",
  authDomain: "hostel-portal-f74e2.firebaseapp.com",
  projectId: "hostel-portal-f74e2",
  storageBucket: "hostel-portal-f74e2.firebasestorage.app",
  messagingSenderId: "834609049326",
  appId: "1:834609049326:web:740e899131a2bd11954dff",
  measurementId: "G-5ENL3C3MHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);