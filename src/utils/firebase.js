// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2k5K9TJKvtgEFdVuOmQcAqImhiqLfsBE",
  authDomain: "netflixgpt-8529d.firebaseapp.com",
  projectId: "netflixgpt-8529d",
  storageBucket: "netflixgpt-8529d.firebasestorage.app",
  messagingSenderId: "28641456211",
  appId: "1:28641456211:web:1fc35c0ba830f887a9d6a6",
  measurementId: "G-WWFR9QSBWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth();