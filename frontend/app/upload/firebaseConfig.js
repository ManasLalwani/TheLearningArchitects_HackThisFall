// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDuZokVMQViReOroYk0HcRJ2PVr1p0HvDA",
//   authDomain: "legal-docs-sih.firebaseapp.com",
//   projectId: "legal-docs-sih",
//   storageBucket: "legal-docs-sih.appspot.com",
//   messagingSenderId: "209627941254",
//   appId: "1:209627941254:web:765a1ad92448826f944407",
//   measurementId: "G-3NLSSZ18FB"
// };
const firebaseConfig = {
  apiKey: "AIzaSyBk9SH6XOW_Ok_wtov9gcAIn2PXLWsX55E",
  authDomain: "legalwise-ai.firebaseapp.com",
  projectId: "legalwise-ai",
  storageBucket: "legalwise-ai.appspot.com",
  messagingSenderId: "301048132308",
  appId: "1:301048132308:web:a48ac26c1fb0fa0f244141",
  measurementId: "G-66QXWTLHT3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage, app as default };