// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx5tUzhKqBS9A3Q4TNClHs1HGU4Mxmwks",
  authDomain: "react-student-crud-8b14e.firebaseapp.com",
  projectId: "react-student-crud-8b14e",
  storageBucket: "react-student-crud-8b14e.appspot.com",
  messagingSenderId: "881923775069",
  appId: "1:881923775069:web:38828a58306a9546590bb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app

const db = getFirestore()
export { db }