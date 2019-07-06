var uid;
var directcheckPrefs();
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.

    var user = firebase.auth().currentUser;
    uid = user.uid;
    if (user != null) {
      console.log(checkForPremium());
      var db = firebase.firestore();

      //Prem check
      var docRef = db.collection("users").doc("properties").collection(uid).doc("isPrem");
      docRef.get().then(function (doc) {
        if (doc.exists) {
          console.log("Prem gotcha", doc.data());
          isPrem = doc.data().isprem;
          console.log(isPrem);
          var email_id = user.email;
          console.log("Premium passed");
          document.getElementById("loggedIn").style.display = "block";
          console.log("Signed in successfully");

          //Pref check
          var docRef = db.collection("premiumID").doc("premPrefs").collection(uid).doc("Prefs");
          docRef.get().then(function (doc) {
            if (doc.exists) {
              console.log("Prem Prefs exist", doc.data());
              console.log("Prem Prefs ", doc.data().prefs);
              if (doc.data().prefs == true) {
               console.log("Redirecting to home");
                window.location.href = "https://andronix-techriz.firebaseapp.com/home.html";
              }
              else{
                console.log("Prem Prefs are false");
                console.log("Redirecting to check");
                window.location.href = "https://andronix-techriz.firebaseapp.com/premiumCon.html";
              }
            } else {
             console.log("Prefs do not exist")
            }
          }).catch(function (error) {
            console.log("Error getting document:", error);
          });

        }
        else {
          console.log("No such document!");
          isPrem = false;
        }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
      // }
      // else {
      //   // window.location.href = "https://andronix-techriz.firebaseapp.com/nonpremium.html";
      // }
    }


  } else {
    // No user is signed in.

  }
});

window.onload = function () {
  document.getElementById("emailLogin").addEventListener("click", login);
  document.getElementById("googleLogin").addEventListener("click", google);
  document.getElementById("githubLogin").addEventListener("click", github);

}


function checkPrefs() {
  var isTrue;

  var docRef = db.collection("premiumID").doc("premPrefs").collection(uid);

  docRef.get().then(function (doc) {
    if (doc.exists) {
      console.log("Prem Prefs exist", doc.data());
      if (doc.data().perfs == true)
        isTrue == true;
    } else {
      console.log("Prem Prefs are false");
      isTrue == false;
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });

  return isTrue;

}

function checkForPremium() {

  var isPrem;

  var db = firebase.firestore();
  // db.collection("users").doc("properties").set({
  var docRef = db.collection("users").doc("properties").collection(uid).doc("isPrem");
  docRef.get().then(function (doc) {
    if (doc.exists) {
      console.log("Prem gotcha", doc.data());
      isPrem = doc.data().isprem;
      console.log(isPrem);

    }
    else {
      console.log("No such document!");
      isPrem = false;
    }
  })

}

function login() {

  window.alert("Working hrerre email")
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("pass_field").value;

  console.log(userEmail);
  console.log(userPass);
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error : " + errorMessage);
    });
}

function google() {

  window.alert("Working hrerre google")
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().getRedirectResult().then(function (result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    window.alert(message);
    // ...
  });
}

function github() {
  window.alert("Working hrerre github");
  var provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().getRedirectResult().then(function (result) {
    if (result.credential) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    window.alert(message);
    // ...
  });

}