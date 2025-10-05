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
  spiner.style.visibility = "visible" ;
  firebase.auth().createUserWithEmailAndPassword(userEmail.value, userPassword.value)
  .then((userCredential) => {
    let user = userCredential.user;
    spiner.style.visibility = "hidden" ;
    console.log("user added");
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
    localStorage.setItem("userId" , user.uid);
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
    userUid : localStorage.getItem("userId"),
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
          addTask(change.doc);
        }
        // if (change.type === "modified") {
        //     // console.log("Modified city: ", change.doc.data());
        //     updateTodoFromDom(change.doc);
        // }
        if (change.type === "removed") {
          deleter(change.doc);
        }
      });
    });
}

function addTask (parameter) {
  let heading = document.createElement("h2");
  heading.textContent = "Remaining Task" ;
  let addUserTask = parameter.data().userTask;
  let liEl = document.createElement("li");
  liEl.textContent = addUserTask;

  let container = document.createElement("div");
  container.style.margin = "auto" ;
  ulEl.appendChild(container);

  let diver = document.createElement("div");
  container.appendChild(heading);
  container.appendChild(diver);
  diver.appendChild(liEl);
    diver.style.border = "3px solid black";
    diver.style.width = "70%"
    diver.style.margin = "12px 0px";
    diver.style.padding = "10px";
    diver.style.listStyleType = "none";
    diver.style.borderRadius = "10px";
    diver.style.height = "60px";

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Task" ;
  deleteButton.style.backgroundColor = "red" ;
  deleteButton.style.color = "white" ;
  deleteButton.style.fontWeight = "bold" ;
  deleteButton.style.width = "120px";
  deleteButton.style.borderRadius = "2px" ;
  deleteButton.style.fontFamily = "poppins" ;
  deleteButton.setAttribute("onClick" , "deleter(this)")

  let editButton = document.createElement("button");
  editButton.textContent = "Edit Task" ;
  editButton.style.backgroundColor = "blue" ;
  editButton.style.color = "white" ;
  editButton.style.fontWeight = "bold" ;
  editButton.style.width = "120px";
  editButton.style.borderRadius = "2px" ;
  editButton.style.fontFamily = "poppins"

  let completedButton = document.createElement("button");
  completedButton.textContent = "Completed" ;
  completedButton.style.backgroundColor = "green" ;
  completedButton.style.color = "white" ;
  completedButton.style.fontWeight = "bold" ;
  completedButton.style.width = "120px";
  completedButton.style.borderRadius = "2px" ;
  completedButton.style.fontFamily = "poppins";

  let buttonDiv = document.createElement("div");
  diver.appendChild()

  diver.appendChild(deleteButton)
  diver.appendChild(editButton)
  diver.appendChild(completedButton);
}


function deleter () {

  db.collection("tasks").doc("ulEl")
  .delete()
  .then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});
  // let removalDiv = deleter.parentNode.parentNode ;
  // let parent = removalDiv.parentNode;
  // parent.removeChild(removalDiv);
  // deleter.id = user.
  // console.log(deleter)

}