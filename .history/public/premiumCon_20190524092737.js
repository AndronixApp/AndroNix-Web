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


function submit() {


    var purID = document.getElementById('purchID').value;
    checkForID(purID);

}

function checkForID(id) {


    var db = firebase.firestore();

    // db.collection("premiumID")
    // .onSnapshot(function(doc) {
    //     console.log("Current data: ", doc.data());
    // });

    db.collection("premiumID").where("id", "==", id)
        .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                    console.log("Now proceeding to the UID verification");
                    if (doc.data().uid == uid) {
                        updatePref
                        console.log("Woooah! Verification complete. Redirecting now");
                    }
                    else {
                        console.log("Oops! Verification failed. Contact us now!");
                    }
               
                // renderCafe(doc);
            });
        }) .catch(function(error) {
            console.log("ouch! Verification has failed!");
            console.log("Error getting documents: ", error);
        });





    // var db = firebase.firestore();
    // console.log(uid + ' ' + id);

    // var docRef = db.collection("premiumID").where("id", "==", id);
    //       docRef.get().then(function (doc) {
    //         if (doc.exists) {
    //             onsole.log("Prem docs exist")
    //           }
    //          else {
    //          console.log("Prem docs do not exist")
    //         }
    //       }).catch(function (error) {
    //         console.log("Error getting document:", error);
    //       });

}

function updatePref() {

    var db = firebase.firestore();

    db.collection("premiumID").doc("premPrefs").collection(uid).set({
        pref: true,
    })
        .then(function () {
            console.log("Pref Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}