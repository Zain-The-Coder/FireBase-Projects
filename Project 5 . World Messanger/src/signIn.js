let userEmail = document.getElementById("user-email");
let userPassword = document.getElementById("user-password");
let userName = document.getElementById("user-name");
let login = document.getElementById("login-button");
let msg = document.getElementById("message");
let loader = document.getElementById("loader");




login.addEventListener("click" , (event) => {
     msg.innerHTML = "" ;
    loader.style.visibility = "visible" ;
    event.preventDefault();
    if(!userEmail.value || !userPassword.value || !userName.value) {
      msg.innerHTML = "Please Fill Above Requirements !" ;
      msg.style.fontWeight = "bold" ;
      msg.style.color = "red" ;
      loader.style.visibility = "hidden" ;
      return ;
    }   
    firebase.auth().signInWithEmailAndPassword(userEmail.value, userPassword.value)
    .then((userCredential) => {
      loader.style.visibility = "hidden" ;
    let user = userCredential.user;
    msg.innerHTML = "Login Successfully !" ;
    msg.style.color = "green" ;
    msg.style.fontWeight = "bold" ;
    localStorage.setItem("userName" , userName.value);
    localStorage.setItem("userUid" , user.uid)
    gotoIndex() ;

  })
  .catch((error) => {
    var errorCode = error.code;
    loader.style.visibility = "hidden" ;
    var errorMessage = error.message;
    msg.innerHTML = errorMessage.slice(9) ;
    msg.style.fontWeight = "bold" ;
    msg.style.color = "red" ;    
  });
});


function gotoIndex () {
  window.location.href = "./home.html" ;
}