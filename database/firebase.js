import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZm6SM6XRjyTmnn7GatluDs_weeF0P4qU",
  authDomain: "react-native-firebase-c8d4e.firebaseapp.com",
  projectId: "react-native-firebase-c8d4e",
  storageBucket: "react-native-firebase-c8d4e.appspot.com",
  messagingSenderId: "1091686227302",
  appId: "1:1091686227302:web:3821e90afc91a0af9b3ca7",
  measurementId: "G-QJ9QLJKWK2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default {
    firebase,
    db
}