import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyD8pskYC6C15scDYccFXFEAsezr8EgBIDU",
  authDomain: "movieapp-3ac6a.firebaseapp.com",
  projectId: "movieapp-3ac6a",
  storageBucket: "movieapp-3ac6a.appspot.com",
  messagingSenderId: "599362815198",
  appId: "1:599362815198:web:a4579766cdd8fb7a26ee4f",
  measurementId: "G-QH1NV39WCF"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {app, auth}