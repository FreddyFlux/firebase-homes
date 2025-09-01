// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaMDOXnAsTIe3EXUaEY3P_4wVTY9nlmgQ",
  authDomain: "fire-homes-course-d4d63.firebaseapp.com",
  projectId: "fire-homes-course-d4d63",
  storageBucket: "fire-homes-course-d4d63.firebasestorage.app",
  messagingSenderId: "455044391777",
  appId: "1:455044391777:web:fdef3298884f1773541b20",
};

// Initialize Firebase (from boilerplate code)
/* const app = initializeApp(firebaseConfig); */

// Instead of boilerplate code, we use getApps() to check if an app already exists
const currentApps = getApps();
let auth: Auth;
let storage: FirebaseStorage;

if (!currentApps.length) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
} else {
  const app = currentApps[0];
  auth = getAuth(app);
  storage = getStorage(app);
}

export { auth, storage };
// import {auth, storeage} from '@firebase/client'
