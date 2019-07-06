const cafeList = document.querySelector('#cafe-list');
var uid; var io = false; var no = 0;var comNum=0;
giveNumberOfCom();
document.getElementById('adder').addEventListener('click', adder);
//Adding listeners for the query buttons
document.getElementById('red').addEventListener('click', red);
document.getElementById('orange').addEventListener('click', orange);
document.getElementById('purple').addEventListener('click', purple);
document.getElementById('black').addEventListener('click', black);
document.getElementById('green').addEventListener('click', green);
document.getElementById('blue').addEventListener('click', blue);
document.getElementById('gray').addEventListener('click', gray);
document.getElementById('refresher').addEventListener('click', refreshe);
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
      // window.location.href = "https://andronix-techriz.firebaseapp.com/login.html";

    }
  });


}

$(document).ready(function () {

  $('#visibler').click(function () {
    $('#visibler').fadeOut(100);
    $('#desSel').fadeIn(1000);
    $('#comSel').fadeIn(1000);
    $('#adder').fadeIn(1000);
    $('#colorSel').fadeIn(1000);

  });

});



function giveNumberOfCom(){

  console.log("giveNumberOfCom is running");
  var db = firebase.firestore();
  var user = firebase.auth().currentUser;

  db.collection("users").doc(uid).collection("commandsNumber")
    .onSnapshot(function (querySnapshot) {
      querySnapshot.docChanges().forEach(function (change) {

        if (change.type === 'modified') {
          // name.textContent = doc.data().com;
          comNum = change.doc.data().num;
         console.log(comNum)
        }
      });
    });
}


function refreshe() {
  window.location.href = "https://andronix-techriz.firebaseapp.com/home.html";

}
function gray() {
  loadQuery("gray");
}
function red() {
  loadQuery("red");
}
function blue() {
  loadQuery("blue");
}
function purple() {
  loadQuery("purple");
}
function orange() {
  loadQuery("blue");
}
function black() {
  loadQuery("black");
}
function green() {
  loadQuery("green");
}

function loadQuery(ol) {
  var op;
  var db = firebase.firestore();

  if (ol == "red") {
    op = "#EE0F0F";
    cafeList.innerHTML = "";
  }
  if (ol == "orange") {
    op = "#FF8B25";
    cafeList.innerHTML = "";
  }
  if (ol == "black") {
    op = "#1E1E1E";
    cafeList.innerHTML = "";
  }
  if (ol == "green") {
    op = "#2DEE0F";
    cafeList.innerHTML = "";
  }
  if (ol == "purple") {
    op = "#740CEB";
    cafeList.innerHTML = "";
  }
  if (ol == "blue") {
    op = "#299AD4";
    cafeList.innerHTML = "";
  }
  if (ol == "gray") {
    op="omit"
    cafeList.innerHTML = "";
    getFirestoreData();
  }

  console.log("Ol (received) is " + ol);
  console.log("Op (made) is " + op);

  if(ol != "omit"){
  no=0;
  db.collection("users").doc(uid).collection("commands").where("color", "==", op)
    .get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc);
        ++no;
        renderCafe(doc);
      });

      isEmpty('query');
    });
  }

}
function adder() {
  console.log('Clicked');
  var com = document.getElementById('comSel').value;
  var dis = document.getElementById('desSel').value;
  var e = document.getElementById('colorSel');
  var selValue = e.options[e.selectedIndex].value;
  $(document).ready(function () {
    $('#visibler').fadeIn(1000);
    $('#adder').fadeOut(100);
    $('#desSel').fadeOut(100);
    $('#comSel').fadeOut(100);
    $('#colorSel').fadeOut(100);
  });
  uploadToFirebase(com, dis, selValue);
}

function uploadToFirebase(com, dis, color) {

  console.log(com);
  console.log(dis);
  console.log(color);
  console.log(uid);

  var db = firebase.firestore();

  db.collection("users").doc(uid).collection("commands").add({
    com: com,
    dis: dis,
    color: color
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      updateComNumber();
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });

}
function updateComNumber(){

  var numberRef = db.collection('number').doc('');

// Atomically increment the population of the city by 50.
washingtonRef.update({
    population: firebase.firestore.FieldValue.increment(50)
});
}



function getFirestoreData() {
  console.log("getFirestoreData is running");
  var db = firebase.firestore();
  var user = firebase.auth().currentUser;

  db.collection("users").doc(uid).collection("commands").orderBy("com")
    .onSnapshot(function (querySnapshot) {
      querySnapshot.docChanges().forEach(function (change) {

        if (change.type === 'added') {
          renderCafe(change.doc);
          console.log("These are all " + change.doc);
          ++no;
         
        }
        else if (change.type == 'removed') {
          let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
          cafeList.removeChild(li);
          --no;
        }
      });

      isEmpty('normal');
    });


}


function isEmpty(key) {
 
 if(key == 'normal'){
  if (no == 0) {
    $('#cafe-list').fadeOut(1000);
    $('#querer').fadeOut(1000);
    $('#ani').fadeIn(100);
    $('#list_div').fadeOut(1000);
  }
  else {
    $('#querer').fadeIn(100);
    $('#ani').fadeOut(100);
    $('#cafe-list').fadeIn(100);
    $('#list_div').fadeIn(100);
  }
}
else if(key == 'query'){
  if (no == 0) {
    $('#cafe-list').fadeOut(1000);
    $('#ani').fadeIn(100);
    $('#list_div').fadeOut(1000);
  }
  else {
    $('#ani').fadeOut(100);
    $('#cafe-list').fadeIn(100);
    $('#list_div').fadeIn(100);
  }

}

}


function renderCafe(doc) {
  console.log("renderCafe is running");

  var li = document.createElement('li');
  var name = document.createElement('span');
  var city = document.createElement('span');
  let cross = document.createElement('div');



  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().com;
  city.textContent = doc.data().dis;
  cross.textContent = 'x';
  name.style.fontWeight = 700;
  name.style.fontFamily = "Work Sans, sans-serif";
  city.style.fontFamily = "Work Sans, sans-serif";
  city.style.padding = 5;
  cross.style.borderRadius = 15;
  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);
  li.style.backgroundColor = doc.data().color;

  // deleting data
  var db = firebase.firestore();
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection("users").doc(uid).collection("commands").doc(id).delete();
    // window.alert("Hey, don't forget to refresh the page after deleting data!")
  });


  li.onclick = function () {
    if (getOS == 'Mac OS') {
      copyToClipboard(doc.data().com, 'mac');
    }
    else {
      copyToClipboard(doc.data().com, 'win');
    }

  };
  cafeList.appendChild(li);
}

function copyToClipboard(text, id) {
  if (id == 'win') {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
  }
  else {
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
