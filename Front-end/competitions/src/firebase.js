import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBoHMy8AFMxWK3V825_8ZvCCBdwstDZUg",
  authDomain: "competition-480ad.firebaseapp.com",
  projectId: "competition-480ad",
  storageBucket: "competition-480ad.appspot.com",
  messagingSenderId: "508400404451",
  appId: "1:508400404451:web:2162540dc0d151f08cc2d6",
  measurementId: "G-3G9KJ1MD92",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
