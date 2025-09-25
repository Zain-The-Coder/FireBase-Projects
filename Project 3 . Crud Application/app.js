let signUp = document.getElementById('sign-up');
let signIn = document.getElementById("sign-in");
let userEmail = document.getElementById("user-email");
let userPassword = document.getElementById("user-password");
let message = document.getElementById("message");
let signOut = document.getElementById("sign-out");
let noti = document.getElementById("messanger");


signUp.addEventListener("click"  , () => {
    firebase.auth().createUserWithEmailAndPassword(userEmail.value, userPassword.value)
  .then((userCredential) => { 
    var user = userCredential.user;
    message.innerHTML = "Login Successfully !" ;
    message.style.color = "green" ;
    console.log(user);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    message.innerHTML = "Error Found !" ;
    message.style.color = "red" ;
    console.log(errorCode) ;
    console.log(errorMessage)
  });
});


signIn.addEventListener("click" , () => {
    firebase.auth().signInWithEmailAndPassword(userEmail.value, userPassword.value)
  .then((userCredential) => {
    var user = userCredential.user;
    message.innerHTML = "Sign In Successfully !" ;
    message.style.color = "green" ;
    console.log(user);
    goToHome() ;
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode) ;
    console.log(errorMessage);
    message.innerHTML = "Error Is Found !" ;
    message.style.color = "red" ;
  });
});


function goToHome () {
    window.location.href = "./home.html" ;
}

function goToIndex () {
    window.location.href = "./index.html" ;
}

signOut.addEventListener("click" , () => {
    firebase.auth().signOut().then(() => {
        noti.innerHTML = "Sign Out  SuccessFully !" ;
        goToIndex() ;

}).catch((error) => {
    noti.innerHTML = "An error Happened !" ;
});
});