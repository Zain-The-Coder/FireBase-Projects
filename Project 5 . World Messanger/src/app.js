let userName = document.getElementById("userName");
let userTask = document.getElementById("userInput");
let button = document.getElementById("submit");
let ulEl = document.getElementById("task-ul");
let messanger = document.getElementById("messanger");
const db = firebase.firestore();

function message () {
  if(!userName.value || !userTask.value) {
        messanger.innerHTML = "Please Fill The Above Requirements !" ;
        messanger.style.color = "red" ;
        messanger.style.marginBottom = "-25px" ;
        return ;
    }
db.collection("messages").add({
    Username : userName.value ,
    UserMessage : userTask.value , 
})
.then((docRef) => {
    console.log("User Message Added ! ", docRef.id);
    
    let liEl = document.createElement("li");
    let usrName = document.createElement("p");
    let usrMsg = document.createElement("p");
    let heading = document.createElement("span");
    let nameEl = document.createElement("span");
    
    ulEl.appendChild(liEl);
    liEl.setAttribute("id" , "listItem");
    liEl.appendChild(usrName);
    liEl.appendChild(usrMsg);
    console.log(ulEl)
    usrName.style.color = "wheat";
    usrName.style.fontWeight = "bold" ;
     heading.classList.add("headEl");
     nameEl.classList.add("nameEl"); 

    
    heading.textContent = "User Message : " ;
    nameEl.textContent = "User Name : ";
    usrName.appendChild(nameEl);
    usrMsg.appendChild(heading);
    usrMsg.appendChild(document.createTextNode(userTask.value));
    usrName.appendChild(document.createTextNode(userName.value))
    console.log(usrMsg)
    usrMsg.style.marginTop = "4px";
    usrMsg.style.fontFamily = "poppins";
})
.catch((error) => {
    console.error("Error adding document: ", error);
});
}
