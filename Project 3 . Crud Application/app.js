let userName = document.getElementById("user-name");
let userEmail = document.getElementById("user-email");
let userPassword = document.getElementById("user-password");
let message = document.getElementById("message");
let user = document.getElementById("username");
let spiner = document.getElementById("loader");
let task = document.getElementById("task-taker");
let ulEl = document.getElementById("task-list")
const db = firebase.firestore();


function signUp () {
  localStorage.setItem("userName" , userName.value);
  localStorage.setItem("userId" , currentUser.uid)
  spiner.style.visibility = "visible" ;
  firebase.auth().createUserWithEmailAndPassword(userEmail.value, userPassword.value)
  .then((userCredential) => {
    let user = userCredential.user;
    spiner.style.visibility = "hidden" ;
    console.log("user added");
    return firebase.auth() ;
  })
  .catch((error) => {
    //let errorCode = error.code;
    let errorMessage = error.message;
    spiner.style.visibility = "hidden" ;
    let errorOccured = String(errorMessage).slice(9)
    message.innerHTML = errorOccured;
  });
}

function signIn () {
  localStorage.setItem("userName" , userName.value);
  spiner.style.visibility = "visible" ;
  firebase.auth().signInWithEmailAndPassword(userEmail.value , userPassword.value)
  .then((userCredential) => {
   let user = userCredential.user;
    console.log("yes, user found");
    spiner.style.visibility = "hidden" ;
    gotoHome() ;
    localStorage.setItem("userId" , currentUser.uid);
    return firebase.auth() ;
  })
  .catch((error) => {
    //let errorCode = error.code;
    let errorMessage = error.message;
    spiner.style.visibility = "hidden" ;
    let errorOccured = String(errorMessage).slice(9)
    message.innerHTML = errorOccured;
    });
}

function signOut () {
  spiner.style.visibility = "visible" ;
firebase.auth().signOut()
  .then(() => {
    gotoindex() ;
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    spiner.style.visibility = "hidden" ;  
    return firebase.auth() ;
}).catch((error) => {
  console.log(error);
});
}

function gotoindex () {
  window.location.href = "./index.html" ;
}
function gotoHome () {
  window.location.href = "./home.html" ;
}

let currentUser = null ;

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    currentUser = user ;
    console.log("user signed in " , user.uid) ;
    localStorage.setItem("userId" , user.uid);
  } else {
    currentUser = null ;
    console.log("No User Found !") ;
  }
});

function saverTask() {
db.collection("tasks").add({
    userName : localStorage.getItem("userName"),
    userUid : currentUser.uid ,
    userTask : task.value ,
})
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});
}
function refresh () {
  db.collection("tasks")
    .where("userUid", "==", localStorage.getItem("userId"))
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // console.log("New city: ", change.doc.data(), change.doc.id);
          addTask(change.doc);
        }
        // if (change.type === "modified") {
        //     // console.log("Modified city: ", change.doc.data());
        //     updateTodoFromDom(change.doc);
        // }
        // if (change.type === "removed") {
        //   // console.log("Removed city: ", change.doc.data());
        //   deleteFromDom(change.doc);
        // }
      });
    });
}

function addTask (parameter) {
  let addUserTask = parameter.data().userTask;
  let liEl = document.createElement("li");
  liEl.textContent = addUserTask;
  ulEl.appendChild(liEl);
}