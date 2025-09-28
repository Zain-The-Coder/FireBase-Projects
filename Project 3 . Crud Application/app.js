const { useId } = require("react");

let userEmail = document.getElementById("user-email");
let userPassword = document.getElementById("user-password");
let message = document.getElementById("message");
let noti = document.getElementById("messanger");
let taskTaker = document.getElementById("task-taker");
let div = document.getElementById("container");
let userName = document.getElementById("user-name");
let spiner = document.getElementById("loader");
let user = document.getElementById("username");
const db = firebase.firestore();

function signUp () {
    firebase.auth().createUserWithEmailAndPassword(userEmail.value, userPassword.value)
  .then((userCredential) => { 
    var user = userCredential.user;
    message.innerHTML = "Login Successfully !" ;
    message.style.color = "green" ;
    goToHome()
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    let errorMsg = String(errorMessage).slice(9) ;
    message.innerHTML = errorMsg ;
    message.style.color = "red" ;
    console.log(errorCode) ;
    console.log(errorMessage)
  });
};


function signIn () {
    firebase.auth().signInWithEmailAndPassword(userEmail.value, userPassword.value)
  .then((userCredential) => {
    var user = userCredential.user;
    localStorage.setItem("userName" , userName.value)  ;  
    message.innerHTML = "Sign In Successfully !" ;
    message.style.color = "green" ;
    console.log(user);
    goToHome() ;
})
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode) ;
    console.log(errorMessage);
    let errorMsg = String(errorMessage).slice(9) ;
    message.innerHTML = errorMsg ;
    message.style.color = "red" ;
  });
};


function goToHome () {
    window.location.href = "./home.html" ;
}

function goToIndex () {
  window.location.href = "./index.html" ;
}

function signOut () {
  goToIndex();
  localStorage.removeItem("userName");


}
function saverTask () {
db.collection("users").add({
    born: 1815  
})
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});
}
// let unorderedList = div.firstElementChild ;
// let liEl = document.createElement("li");
// unorderedList.appendChild(liEl);
// liEl.textContent = taskTaker.value;

function saverTask () {
  spiner.style.visibility = "visible" ;
  db.collection("test").get()
  .then(snapshot => {
    console.log("Firestore Connected ✅");
    spiner.style.visibility = "hidden" ;

  })
  .catch(err => {
    console.error("Firestore Error ❌", err);
  })
  .finally(() => {
    spiner.style.visibility =  "hidden"
  })
  
}

function refresh () {
  user.innerHTML = localStorage.getItem("userName");
}