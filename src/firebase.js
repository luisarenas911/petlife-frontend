import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyAvbNN5IoZ2Y9TIS1WdGYqYGcMEKnLRPgI",
    authDomain: "unichar-29b2d.firebaseapp.com",
    projectId: "unichar-29b2d",
    storageBucket: "unichar-29b2d.appspot.com",
    messagingSenderId: "978977258341",
    appId: "1:978977258341:web:40bdf410ea8101b2e83f8c",
  })
  .auth();
