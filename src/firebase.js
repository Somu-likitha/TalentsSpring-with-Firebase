import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

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
export const storage = firebase.storage();

export default firebase;


