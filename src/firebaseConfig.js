import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyBTG7XmYWej4-2mnWfR3khPzYmzgZSfGcU",
    authDomain: "mediaproject-6948e.firebaseapp.com",
    databaseURL: "https://mediaproject-6948e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mediaproject-6948e",
    storageBucket: "mediaproject-6948e.appspot.com",
    messagingSenderId: "496105133886",
    appId: "1:496105133886:web:f184292d9106c7e02dbe6f",
    measurementId: "G-6C18BY772K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;