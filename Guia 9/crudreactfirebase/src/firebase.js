import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAIH98_udGBm1_VI0DWxW7k8qNcQKBr6JY",
    authDomain: "crudreactfirebase-36079.firebaseapp.com",
    databaseURL: "https://crudreactfirebase-36079.firebaseio.com",
    projectId: "crudreactfirebase-36079",
    storageBucket: "crudreactfirebase-36079.appspot.com",
    messagingSenderId: "25207278825",
    appId: "1:25207278825:web:e307c198c39c6bce023478",
    measurementId: "G-F6W8CRBHLX"
};

const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();