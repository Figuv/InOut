import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMy-EyPokrAwF43SwNADob3IL5K8YihO4",
  authDomain: "inout-380323.firebaseapp.com",
  projectId: "inout-380323",
  storageBucket: "inout-380323.appspot.com",
  messagingSenderId: "680402082128",
  appId: "1:680402082128:web:4bb7f818ab144181827455",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;