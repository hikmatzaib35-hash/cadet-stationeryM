// Firebase Configuration for Cadet Project
const firebaseConfig = {
    apiKey: "AIzaSyBtnFXbCPiJG1jPkOIZffhudoOYGch2hqQ",
    authDomain: "cadet-project-a1c89.firebaseapp.com",
    databaseURL: "https://cadet-project-a1c89-default-rtdb.firebaseio.com",
    projectId: "cadet-project-a1c89",
    storageBucket: "cadet-project-a1c89.firebasestorage.app",
    messagingSenderId: "580653457766",
    appId: "1:580653457766:web:6c0f1e928f0538f171e8a7",
    measurementId: "G-3H3RY6FVZ3"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase Connected Successfully!");
}
