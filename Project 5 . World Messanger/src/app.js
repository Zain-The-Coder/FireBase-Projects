let userMessage = document.getElementById("userInput");
let button = document.getElementById("submit");
let msgSection = document.getElementById("msg-sec");
let ulEl = document.getElementById("ulEl");
let printer = document.getElementById("printer");
const db = firebase.firestore();


button.addEventListener("click" , () => {
    if(!userMessage.value) {
        printer.innerHTML = "Input Field Is Empty !" ;
        printer.style.fontWeight = "bold" ;
        printer.style.fontFamily = "poppins";
        printer.style.color = "red" ;
        return ;
    }
    db.collection("messages").add({
        UserName : localStorage.getItem("userName"),
        UserMessage : userMessage.value ,
        UserUid : localStorage.getItem("userUid"),
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        printer.innerHTML = "Message Is Added !";
        printer.style.color = "green" ;
        printer.style.fontFamily = "poppins";
        userMessage.value = "";
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });    
});



  function refresh () {
    db.collection("messages").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            addInDom(change.doc);
          }
//           if (change.type === "modified") {
//           }
          if (change.type === "removed") {
            deleteFromDom(change.doc);
            }
      });
      });
  }

let deleteId = "" ;
function addInDom (docRef) {
    let userTaskEntered = docRef.data();
    let taskList = document.createElement("li");
    let userMessageSec = document.createElement("p");
    let userNameSec = document.createElement("p");
    let deleteButton = document.createElement("button");

    
    userMessageSec.textContent = userTaskEntered.UserMessage;
    userNameSec.textContent = userTaskEntered.UserName;
    deleteButton.setAttribute("onClick" , "deleteData(this)");
    deleteButton.setAttribute("id" , docRef.id)
    deleteButton.textContent = "🗑️ Delete Message" ;
    deleteButton.style.color = 'red';
    deleteButton.style.width = "150px" ;
    deleteButton.style.height = "40px";
    deleteButton.style.backgroundColor = "transparent";
    deleteId += docRef.id;
    
    taskList.appendChild(userNameSec);
    taskList.appendChild(userMessageSec);
    taskList.appendChild(deleteButton);

    if(userTaskEntered.UserUid !== localStorage.getItem("userUid")) {
        deleteButton.style.display = "none" ;
    }


    ulEl.appendChild(taskList);

}

function deleteData (deleteButton) {
    let idOfUser = deleteButton.id ;
    db.collection("messages").doc(idOfUser)
    .delete()
    .then(() => {{
    console.log("Document successfully deleted!");
        }
}).catch((error) => {
    console.error("Error removing document: ", error);
});
}

function deleteFromDom (unreadableObject) {
    let removed = document.getElementById(unreadableObject.id);
    let unorderedList = removed.parentElement.parentElement;
    unorderedList.removeChild(removed.parentElement)

}