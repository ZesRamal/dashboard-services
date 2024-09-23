/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID 
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

export function signIn(email, password){
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage, errorCode)
  });
}

export function login(email, password){
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage, errorCode)
  });
}

export function logout(){
  signOut(auth).then(() => {
    console.log(getAuth());
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage, errorCode)
  });
}