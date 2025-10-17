let userName = document.getElementById("userName");
let userTask = document.getElementById("userInput");
let button = document.getElementById("submit");
let ulEl = document.getElementById("task-ul")

button.addEventListener("click" , () => {
    let liEl = document.createElement("li");
    let usrName = document.createElement("p");
    let usrMsg = document.createElement("p");
    
    
    
    ulEl.appendChild(liEl);
    liEl.appendChild(usrName);
    liEl.appendChild(usrMsg);
    console.log(ulEl)

    usrName.textContent = "USER NAME : " + userName.value;
    usrMsg.textContent = "USER MESSAGE : " + userTask.value
    
        userMsg.textContent = userMsg.value ;

})