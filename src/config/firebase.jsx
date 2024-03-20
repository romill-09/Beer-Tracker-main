import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCnfFknA86LiA71p80NrqkDN9eY9_IIhE",
  authDomain: "beer-tracker-8c448.firebaseapp.com",
  projectId: "beer-tracker-8c448",
  storageBucket: "beer-tracker-8c448.appspot.com",
  messagingSenderId: "365273998386",
  appId: "1:365273998386:web:24f0c3af94b5d6ca32082b",
  measurementId: "G-MFW43C79QQ"
};

export async function signIn(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const db = getFirestore(app);