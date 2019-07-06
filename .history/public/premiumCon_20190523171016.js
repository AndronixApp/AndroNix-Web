document.getElementById('help').addEventListener('click', help);
document.getElementById('submit').addEventListener('click', submit);

window.onload = function () {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
  
        var user = firebase.auth().currentUser;
  
        if (user != null) {
          var email_id = user.email;
          var name = user.displayName;
          uid = user.uid;
          console.log("Signed in with" + email_id + uid);
          document.getElementById("user_mail").innerHTML = email_id;
          if (name != null) {
            document.getElementById("user_name").innerHTML = name;
          }
          else {
            document.getElementById("user_name").style.display = "none";
          }
          getFirestoreData();
  
  
        }
      }
      else {
        window.location.href = "https://andronix-techriz.firebaseapp.com/login.html";
  
      }
    });
  
  
  }


function submit(){


    var purID = document.getElementById('purchID').value;

    checkForID(purID);

}

function checkForID(id){
var isPresent;



}