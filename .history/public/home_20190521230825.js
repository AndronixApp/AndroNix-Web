// const cafeList = document.querySelector('#cafe-list');
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.

//     document.getElementById("user_div").style.display = "block";
//     document.getElementById("list_div").style.display = "block";
//     document.getElementById("login_div").style.display = "none";

//     var user = firebase.auth().currentUser;
  
//     if(user != null){

//       var email_id = user.email;
//       document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
//       var uid= user.uid;
//       console.log("Signed in successfully");
//       getFirestoreData();

//     }


//   } else {
//     // No user is signed in.

//     document.getElementById("user_div").style.display = "none";
//     document.getElementById("login_div").style.display = "block";
//     document.getElementById("list_div").style.display = "block";
//     getFirestoreData();

//   }
// });

// function login(){

//   var userEmail = document.getElementById("email_field").value;
//   var userPass = document.getElementById("password_field").value;


//   firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
//   .catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;

//     window.alert("Error : " + errorMessage);

//     // ...
//   });

// }

// function googleLogin(){

//   var provider = new firebase.auth.GoogleAuthProvider();
//   firebase.auth().signInWithRedirect(provider);

//   firebase.auth().getRedirectResult().then(function(result) {
//   if (result.credential) {
//     var token = result.credential.accessToken;
//   }
//   var user = result.user;
// }).catch(function(error) {
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   var email = error.email;
//   var credential = error.credential;
// });


// }

function getFirestoreData(){

  var db = firebase.firestore();

  db.collection("users").doc("MOv2XLJHh5i2P5k9cEkB").collection("commands")
  .get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
       renderCafe(doc);
    });
});

}

function renderCafe(doc){
  var li = document.createElement('li');
  var name = document.createElement('span');
  var city = document.createElement('span');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().com;
  city.textContent = doc.data().dis;

  li.appendChild(name);
  li.appendChild(city);
  li.style.backgroundColor = doc.data().color;
  li.onclick = function () {
    if(getOS == 'Mac OS'){
      copyToClipboard(doc.data().com,'mac');
    }
    else
    {
      copyToClipboard(doc.data().com,'win');
    }
   
  };
  

  cafeList.appendChild(li);
}

function copyToClipboard(text,id) {
  if(id=='win'){
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
  }
  else
  {
    window.prompt("Copy to clipboard: C+C, Enter", text);
  }
}

function logout(){
  firebase.auth().signOut();
}

