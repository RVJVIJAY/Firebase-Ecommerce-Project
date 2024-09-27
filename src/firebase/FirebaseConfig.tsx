// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU6XoE48D0TjYeNXxmCwW-hJJJJXIRtDs",
  authDomain: "fullecommerce-93217.firebaseapp.com",
  projectId: "fullecommerce-93217",
  storageBucket: "fullecommerce-93217.appspot.com",
  messagingSenderId: "583571613185",
  appId: "1:583571613185:web:5e3b7ed808dba87dea0200"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export {auth,fireDB}