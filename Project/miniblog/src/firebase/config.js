import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4KVQxjSrKRonkG1bS5botl96Phz3tLP8",
  authDomain: "miniblog-13228.firebaseapp.com",
  projectId: "miniblog-13228",
  storageBucket: "miniblog-13228.appspot.com",
  messagingSenderId: "712605696479",
  appId: "1:712605696479:web:389d32fc71d4df51f4046a",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
