import 'regenerator-runtime/runtime'
import showToast from '../modules/showToast'
import isAllowed from '../modules/checkPrem'
import "toastify-js/src/toastify.css"

function show() {
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
}

function hide() {
    document.getElementById("spinner-front").classList.remove("show");
    document.getElementById("spinner-back").classList.remove("show");
}

let uid;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        show()
        let user = firebase.auth().currentUser;
        uid = user.uid;
        //checking the entitlement

        isAllowed(user.email).then(r => {
            hide()
            showToast("Premium account verified, redirecting...", true)
            window.location.href = "../home.html";
        }).catch(e => {
            hide()
            console.log({premiumVerification: e})
            showToast("Oops! We couldn't verify your Premium account.", false, 5000)
            setTimeout(() => {
                showToast("Logging you out in 3 seconds...", false, 3000)
            }, 2000)

            setTimeout(() => {
                firebase
                    .auth()
                    .signOut()
                    .then(function () {
                        location.reload();
                    })
                    .catch(function (error) {
                        showToast("Something went wrong!", false)
                    });

            }, 6000);

        })


    }
});

window.onload = function () {
    document.getElementById("sign-in").addEventListener("click", login);
    document.getElementById("google").addEventListener("click", google);
};

function login() {

    show();
    let userEmail = document.getElementById("email_field").value;
    let userPass = document.getElementById("pass_field").value;

    console.log(userEmail);

    console.log(userPass);
    firebase
        .auth()
        .signInWithEmailAndPassword(userEmail, userPass)
        .catch(function (error) {
            hide();
            let errorCode = error.code;
            let errorMessage = error.message;
            showToast(`Error: ${errorMessage}`)
        });
}

function google() {

    show();
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    firebase
        .auth()
        .getRedirectResult()
        .then(function (result) {
            if (result.credential) {
                show();
            }
            //////Checking here ============================================================
        })
        .catch(function (error) {
            let errorMessage = error.message;
            hide();
            showToast(`Error: ${errorMessage}`)
            // ...
        });
}
