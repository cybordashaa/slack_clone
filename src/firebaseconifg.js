import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyB4KvmdFaNTJAgGVYOX20aanYX2D7Jcans",
    authDomain: "react-slack-clone-6253e.firebaseapp.com",
    projectId: "react-slack-clone-6253e",
    storageBucket: "react-slack-clone-6253e.appspot.com",
    messagingSenderId: "732540207727",
    appId: "1:732540207727:web:1a5e379723277315af839a",
    measurementId: "G-PKWZMEEDX2"
  };
  firebase.initializeApp(firebaseConfig);

  export default firebase;