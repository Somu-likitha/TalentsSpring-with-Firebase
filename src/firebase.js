// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth";
// import {getFirestore} from "firebase/firestore";

  // Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBF_Dpd88eQAOxbbxhX17kPkBSbDIK3LDg",
    authDomain: "talentsfirebase.firebaseapp.com",
    projectId: "talentsfirebase",
    storageBucket: "talentsfirebase.appspot.com",
    messagingSenderId: "472407872540",
    appId: "1:472407872540:web:70b3856eadb29cf24fbbd9",
    measurementId: "G-53ESKZX2QP"
  };
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;

// Initialize Firebase

// const firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();
// export default firebase;
// const firebase= initializeApp(firebaseConfig);
// //const analytics = getAnalytics(app);
// export const auth=getAuth();
// export const firestore=getFirestore(firebase);
// export default firebase;
