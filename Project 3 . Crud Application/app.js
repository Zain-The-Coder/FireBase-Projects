  let userName = document.getElementById("user-name");
  let userEmail = document.getElementById("user-email");
  let userPassword = document.getElementById("user-password");
  let message = document.getElementById("message");
  let user = document.getElementById("username");
  let spiner = document.getElementById("loader");
  let task = document.getElementById("task-taker");
  let ulEl = document.getElementById("task-list");
  let msg = document.getElementById("msg");
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
    msg.innerHTML = "Task Is Adding....." ;
    msg.style.color = "pink" ;
  db.collection("tasks").add({
      userName : localStorage.getItem("userName"),
      userUid : localStorage.getItem("userId"),
      userTask : task.value ,
  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      task.value = "" ;
      msg.innerHTML = "Task Is Added" ;
      msg.style.color = "green" ;
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
      msg.innerHTML = "Error Found" ;
      msg.style.color = "red" ;      
  });
  }
  function refresh () {
    let x = localStorage.getItem("userName");
    user.innerHTML = x ;
    db.collection("tasks")
      .where("userUid", "==", localStorage.getItem("userId"))
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            addTask(change.doc);
          }
          if (change.type === "modified") {
              editer(change.doc.id);
          }
          if (change.type === "removed") {
            removeDom(change.doc.id);
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
    let docId = parameter.id ;

    let container = document.createElement("div");
    container.style.margin = "auto" ;
    ulEl.appendChild(container);
    container.setAttribute("id" , docId);

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
    deleteButton.setAttribute("id" , docId);
    deleteButton.setAttribute("onClick" , "deleter(this)");


    let editButton = document.createElement("button");
    editButton.textContent = "Edit Task" ;
    editButton.style.backgroundColor = "blue" ;
    editButton.style.color = "white" ;
    editButton.style.fontWeight = "bold" ;
    editButton.style.width = "120px";
    editButton.style.borderRadius = "2px" ;
    editButton.style.fontFamily = "poppins";
    editButton.setAttribute("onClick" , "editer(this)");
    editButton.setAttribute("id" , docId);

    let completedButton = document.createElement("button");
    completedButton.textContent = "Completed" ;
    completedButton.style.backgroundColor = "green" ;
    completedButton.style.color = "white" ;
    completedButton.style.fontWeight = "bold" ;
    completedButton.style.width = "120px";
    completedButton.style.borderRadius = "2px" ;
    completedButton.style.fontFamily = "poppins";

    diver.appendChild(deleteButton)
    diver.appendChild(editButton)
    diver.appendChild(completedButton);
}

function removeDom (docId) {
  let removed = document.getElementById(docId);
  if(removed) {
    ulEl.removeChild(removed);
  }
}

  function deleter (button) {
    let id = button.id;
    db.collection("tasks").doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }
let taskButton = document.getElementById("main-button") ;
let editTaskId;

  function editer (button) {
      msg.innerHTML = "Task Is Updating" ;
      msg.style.color = "pink" ;
    editTaskId = button.id;
      let text = button.previousSibling.previousSibling.textContent;
      task.value = text ;
      taskButton.innerHTML = "Update Task" ;
      taskButton.setAttribute("onClick" , "editTask(this)");      
    }
    function editTask (button) {
      console.log(editTaskId)
      db.collection("tasks")
        .doc(editTaskId)
        .update({
            userTask : task.value,
          })
          .then(() => {
              msg.innerHTML = "Task Updated Successfully" ;
              msg.style.color = "green" ;
         taskButton.innerText = "Save Task" ;
         taskButton.setAttribute("onClick" , "saverTask()");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
      msg.innerHTML = "Error Found !" ;
      msg.style.color = "red" ;
   });
}

function editFromDom () {
  
}