
import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyCN5Dutffuh3w4X8xqJ3I37kDNnS6bPOK4",
    authDomain: "instagram-clone-reactapp1.firebaseapp.com",
    databaseURL: "https://instagram-clone-reactapp1.firebaseio.com",
    projectId: "instagram-clone-reactapp1",
    storageBucket: "instagram-clone-reactapp1.appspot.com",
    messagingSenderId: "944717592204",
    appId: "1:944717592204:web:0cafab40b14910c2cf2da9",
    measurementId: "G-CTMXN7CPJD"
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export{ db,auth,storage };
