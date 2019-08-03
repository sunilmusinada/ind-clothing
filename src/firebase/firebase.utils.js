import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDqoJfCacOYV50QSjKDpdV69oBy9DGOJII",
  authDomain: "ind-clothing-db.firebaseapp.com",
  databaseURL: "https://ind-clothing-db.firebaseio.com",
  projectId: "ind-clothing-db",
  storageBucket: "",
  messagingSenderId: "507846293820",
  appId: "1:507846293820:web:95da1d5a43c67caf"
};
firebase.initializeApp(config);

export const createuserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInwithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
