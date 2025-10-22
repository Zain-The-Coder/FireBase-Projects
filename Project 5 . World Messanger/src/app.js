let userMessage = document.getElementById("userInput");
let button = document.getElementById("submit");
let msgSection = document.getElementById("msg-sec");
let ulEl = document.getElementById("ulEl");
let printer = document.getElementById("printer");
const db = firebase.firestore();


button.addEventListener("click" , () => {
            addInDom()

    // if(!userMessage.value) {
    //     printer.innerHTML = "Input Field Is Empty !" ;
    //     printer.style.fontWeight = "bold" ;
    //     printer.style.fontFamily = "poppins";
    //     printer.style.color = "red" ;
    // }
    // db.collection("messages").add({
    //     UserName : localStorage.getItem("userName"),
    //     UserMessage : userMessage.value ,
    // })
    // .then((docRef) => {
    //     addInDom()
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch((error) => {
    //     console.error("Error adding document: ", error);
    // });    
});



function addInDom () {
    let taskList = document.createElement("li");
    let userMessageSec = document.createElement("p");
    let msgSpan = document.createElement("span")
    let nameSpan = document.createElement("span")
    let userNameSec = document.createElement("p");
    let deleteButton = document.createElement("button");

    msgSpan.textContent = "USER MESSAGE : " ;
    nameSpan.textContent = "USER NAME : " ;

    userNameSec.appendChild(nameSpan);
    userMessageSec.appendChild(msgSpan);

    userMessageSec.textContent = userMessage.value;
    userNameSec.textContent = localStorage.getItem("userName");
    deleteButton.textContent = "🗑️" ;
    deleteButton.style.width = "80px" ;

    taskList.appendChild(userNameSec);
    taskList.appendChild(userMessageSec);
    taskList.appendChild(deleteButton);

    ulEl.appendChild(taskList);

    console.log(userNameSec)
    console.log(userMessageSec);
    console.log(deleteButton)


    deleteButton.addEventListener("click" , () {

    })


}



