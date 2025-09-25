import { initializeApp } from 'firebase/app' ;
import { getAuth , onAuthStateChanged } from 'firebase/auth' ;
import { getFirestore } from 'firebase/firestore' ;


const firebaseApp = initializeApp({
  apiKey: "AIzaSyBtRFi_2uOfq1w7LarPimRZ-WHN12fP1fQ",
  authDomain: "fir-project-1-b9b98.firebaseapp.com",
  projectId: "fir-project-1-b9b98",
  storageBucket: "fir-project-1-b9b98.firebasestorage.app",
  messagingSenderId: "377121079883",
  appId: "1:377121079883:web:511e574e9667bfc79f83ce",
  measurementId: "G-ZEGXCVT2RS"
});

const auth = getAuth(firebaseApp) ;
const db = getFirestore(firebaseApp) ; 


onAuthStateChanged(auth , user => {
    if(user !== null) {
        console.log("Logged In !");
    } else {
        console.log("No User!");
    }
});