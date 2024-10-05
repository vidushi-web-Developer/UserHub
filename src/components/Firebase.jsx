
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"




const firebaseConfig = {
  apiKey: "AIzaSyCvxGUJwOmUkpeKAT6n0Zu-95wwO7wfPDg",
  authDomain: "log9-4f6a1.firebaseapp.com",
  projectId: "log9-4f6a1",
  storageBucket: "log9-4f6a1.appspot.com",
  messagingSenderId: "627279407471",
  appId: "1:627279407471:web:8f7c16f8e1a1b8febf209a"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
