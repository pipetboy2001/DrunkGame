// Firebase.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  // tu configuración de Firebase
  apiKey: "AIzaSyC7tCwBbJ6yx4qyJPO3rCAtETZ6-2l-qmo",
    authDomain: "vinculum-aa1ba.firebaseapp.com",
    projectId: "vinculum-aa1ba",
    storageBucket: "vinculum-aa1ba.appspot.com",
    messagingSenderId: "809341169716",
    appId: "1:809341169716:web:7b7bcf0c5718ca1c145a61"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { firebase, db };