// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { defaultMethod } from "react-router-dom/dist/dom";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2XHJpa542jt8TJBolEIq2eLagX4n_JiA",
    authDomain: "email-password-auth-58269.firebaseapp.com",
    projectId: "email-password-auth-58269",
    storageBucket: "email-password-auth-58269.firebasestorage.app",
    messagingSenderId: "821725982501",
    appId: "1:821725982501:web:d281b37338ae05437134cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

