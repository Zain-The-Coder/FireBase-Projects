let userEmail = document.getElementById("user-email");
let userPassword = document.getElementById("user-password");
let userName = document.getElementById("user-name");
let msg = document.getElementById("message")
let signUp = document.getElementById("signup-button");

signUp.addEventListener("click" , (event) => {
    event.preventDefault();
    if(!userEmail.value || !userPassword.value || !userName.value) {
        msg.innerHTML = "Please Fill Above Requirements !" ;
        msg.style.fontWeight = "bold" ;
        msg.style.color = "red" ;
        return ;
    }   

    firebase.auth().createUserWithEmailAndPassword(userEmail.value, userPassword.value)
    .then((userCredential) => {
    let user = userCredential.user;
    console.log(user , "user Added");
    msg.innerHTML = " User Added Successfully ! " ;
    msg.style.color = "green";
    msg.style.fontWeight = "bold" ;
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    msg.innerHTML = errorMessage.slice(9) ;
    msg.style.fontWeight = "bold" ;
    msg.style.color = "red" ;
  });
})