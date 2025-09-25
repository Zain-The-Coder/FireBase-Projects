
let userEmail = document.getElementById("user-email");
let userPassword = document.getElementById("user-password");
let message = document.getElementById("message");

function signUp () {
    firebase.auth().createUserWithEmailAndPassword(userEmail.value , userPassword.value)
      .then((userCredential) => {
        var user = userCredential.user;
        message.innerHTML = "Login Successfully !" ;
        message.style.color = "green" ;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        message.innerHTML = "Error Is Found !" ;
        message.style.color = "red" ;
      console.log("Error code:", errorCode);
      console.log("Error message:", errorMessage);
      });
  }


function signIn () {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  }