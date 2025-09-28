
let userEmail = document.getElementById("user-email");
let userPassword = document.getElementById("user-password");
let message = document.getElementById("message");
let noti = document.getElementById("messanger");
let taskTaker = document.getElementById("task-taker");
let div = document.getElementById("container");
let userName = document.getElementById("user-name");
let spiner = document.getElementById("loader");
let user = document.getElementById("username");
let ul = document.getElementById("task-list")
const db = firebase.firestore();

function signUp () {
  spiner.style.visibility = "visible" ;
    firebase.auth().createUserWithEmailAndPassword(userEmail.value, userPassword.value)
  .then((userCredential) => { 
    var user = userCredential.user;
    spiner.style.visibility = "hidden" ;
    message.innerHTML = "Login Successfully !" ;
    message.style.color = "green" ;
    goToHome()
  })
  .catch((error) => {
    spiner.style.visibility = "hidden" ;
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
    spiner.style.visibility = "visible" ;
    firebase.auth().signInWithEmailAndPassword(userEmail.value, userPassword.value)
  .then((userCredential) => {
    spiner.style.visibility = "hidden" ;
    var user = userCredential.user;
    localStorage.setItem("userName" , userName.value)  ;  
    message.innerHTML = "Sign In Successfully !" ;
    message.style.color = "green" ;
    console.log(user);
    goToHome() ;
})
  .catch((error) => {
    spiner.style.visibility = "hidden" ;
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

function saverTask() {
  spiner.style.visibility = "visible" ;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection("tasks").add({
        UserName : localStorage.getItem("userName") ,
        Task: taskTaker.value,
        Uid: user.uid
      })
      .then((docRef) => {
        console.log("Task saved:", docRef.id);
  let unorderedList = div.firstElementChild ;
  let liEl = document.createElement("li");
  unorderedList.appendChild(liEl);
  liEl.textContent = taskTaker.value;
        spiner.style.visibility = "hidden" ;

      })
      .catch((err) => {
        console.error("Error:", err);
        spiner.style.visibility = "hidden" ;

      });
    }
  });
}



function refresh () {
  firebase.auth().onAuthStateChanged ((user) => {
    if(user) {
        user.innerHTML = localStorage.getItem("userName");
        db.collection("tasks").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        console.log(doc.id , doc.data());
        ul.textContent = doc.data()
      });
  });
    }
  })
}