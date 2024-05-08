import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBF_Dpd88eQAOxbbxhX17kPkBSbDIK3LDg",
      authDomain: "talentsfirebase.firebaseapp.com",
      projectId: "talentsfirebase",
      storageBucket: "talentsfirebase.appspot.com",
      messagingSenderId: "472407872540",
      appId: "1:472407872540:web:70b3856eadb29cf24fbbd9",
      measurementId: "G-53ESKZX2QP"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadFile = async (file) => {
  const storageRef = ref(storage, `files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};