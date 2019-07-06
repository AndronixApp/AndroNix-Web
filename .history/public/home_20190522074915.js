const cafeList = document.querySelector('#cafe-list');
window.onload = function () {
getFirestoreData();
}
function getFirestoreData(){

    console.log("getFirestoreData is running");
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
    console.log("renderCafe is running");

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

