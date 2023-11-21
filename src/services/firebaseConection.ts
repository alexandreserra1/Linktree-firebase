import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {

  apiKey: "AIzaSyB2YNVROzEP_AjV8o4Q8r5EgX6W6QPO42o",

  authDomain: "devlinkale-a529e.firebaseapp.com",

  projectId: "devlinkale-a529e",

  storageBucket: "devlinkale-a529e.appspot.com",

  messagingSenderId: "718151769629",

  appId: "1:718151769629:web:a382866f9b9267b45830f4"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
