// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js"
import * as DATABASE from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAI1XLBj8BItmqq0AxMS0fw9C9aAFbwHZY",
    authDomain: "assignment3cs410x.firebaseapp.com",
    projectId: "assignment3cs410x",
    storageBucket: "assignment3cs410x.appspot.com",
    messagingSenderId: "700980610001",
    appId: "1:700980610001:web:c2d2f24aa327433c64d6f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Set Database Global Object
window.DATABASE = DATABASE;
/*
DATABASE.set(DATABASE.ref(DATABASE.getDatabase(), 'users/' + "YO"), {
    username: "name",
    email: "email",
    profile_picture : "imageUrl"
});*/