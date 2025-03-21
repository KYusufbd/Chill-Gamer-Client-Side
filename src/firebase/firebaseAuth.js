import "dotenv";
import { getAuth } from "firebase/auth";

const fbconfig = import.meta.env;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: fbconfig.VITE_apiKey,
  authDomain: fbconfig.VITE_authDomain,
  projectId: fbconfig.VITE_projectId,
  storageBucket: fbconfig.VITE_storageBucket,
  messagingSenderId: fbconfig.VITE_messagingSenderId,
  appId: fbconfig.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
