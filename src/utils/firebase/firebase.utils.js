//create an app instance based on a config object
import { initializeApp } from "firebase/app";
import {
  getAuth,
  // signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUWvWfdFApX0mK8m5eloUbXcD1s8FPjwA",
  authDomain: "crwn-store-db-10266.firebaseapp.com",
  projectId: "crwn-store-db-10266",
  storageBucket: "crwn-store-db-10266.appspot.com",
  messagingSenderId: "333060701668",
  appId: "1:333060701668:web:704b8c0f8302fa48bfdbf1",
};

const firebaseApp = initializeApp(firebaseConfig);

// google authentication
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const SignInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log("!@# userDocRef", userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log("!@# userSnapshot", userSnapshot);
  
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("erro createing user =>", error);
    }
  }

  return userDocRef;
};
