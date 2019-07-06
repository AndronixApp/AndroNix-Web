var uid;
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

var docRef = db.collection("premiumID").doc("users").where("id", "==", );

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


}