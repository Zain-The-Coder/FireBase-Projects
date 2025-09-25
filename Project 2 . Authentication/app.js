let userEmail = document.getElementById("user-email");
let userPassword = document.getElementById("user-password");
let errorDetector = document.getElementById("errorfounder")

function signUp () {
    firebase.auth().createUserWithEmailAndPassword(userEmail.value, userPassword.value)
    .then((userCredential) => {
    var user = userCredential.user;
    errorDetector.innerHTML = "Login Successfully" ;
    errorDetector.style.color = "green" ;
    errorDetector.style.fontWeight = "bold" ;
    errorDetector.style.fontFamily = "serif"; 
    console.log(userCredential);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    errorDetector.innerHTML = "Error Is Found" ;
    errorDetector.style.fontWeight = "bold" ;
    errorDetector.style.fontFamily = "serif" ;
    errorDetector.style.color = "red";
  });
}

