const cafeList = document.querySelector('#cafe-list');
window.onload = function () {
getFirestoreData();
document.getElementById("addCom").addEventListener("click", adder;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    var user = firebase.auth().currentUser;
  
    if(user != null){
      var email_id = user.email;
      var name = user.displayName;
      console.log("Signed in with"+ email_id);
      document.getElementById("user_mail").innerHTML = email_id;
      if(name!=null){
      document.getElementById("user_name").innerHTML = name;
      }
      else{
        document.getElementById("loggedIn").style.display = "none";
      }
    }


  } else {
    window.location.href = "https://andronix-techriz.firebaseapp.com/login.html";

  }
});

}


function adder(){

var com = document.getElementById('comSel');
var dis = document.getElementById('desSel');
var e = document.getElementById('colorSel');
   var selValue = e.options[e.selectedIndex].text ;
   uploadToFirebase(com,dis,selValue);
}

function uploadToFirebase(com,dis,color){

  console.log(com);
  console.log(dis);
  console.log(color);
  var uid= user.uid;
  console.log(uid);

  db.collection("users").doc(uid).collection("commands")
  .set({
    com: com,
    dis: dis,
    color: color
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});

}

function getFirestoreData(){

    console.log("getFirestoreData is running");
  var db = firebase.firestore();
  var uid= user.uid;
  db.collection("users").doc(uid).collection("commands")
  .get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
       renderCafe(doc);
    });
});

}

function renderCafe(doc){
    console.log("renderCafe is running");

  var li = document.createElement('li');
  var name = document.createElement('span');
  var city = document.createElement('span');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().com;
  city.textContent = doc.data().dis;

  name.style.fontFamily = "Work Sans, sans-serif";
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

function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}
