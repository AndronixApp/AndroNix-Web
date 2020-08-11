import 'regenerator-runtime/runtime'
import showToast from '../modules/showToast'
import "toastify-js/src/toastify.css"
import isAllowed from '../modules/checkPrem'


let isAddLayoutVisible = false;
let isFilterLayoutVisible = false;
let db = firebase.firestore();
let uid = "";

//dom elements
let addLayout = document.getElementById("command_add_layout");
let filterLayout = document.getElementById("command_filter_layout");
let addFab = document.getElementById("fab_add");
let filterFab = document.getElementById("fab_filter");
let addFabIcon = document.getElementById("fab_add_icon");
let dropdown = document.getElementById("command_add_dropdown");
let commandDisplayList = document.getElementById("command_list");

document.getElementById("red").addEventListener("click", function () {
    fetchCommands("#EE0F0F");
});
document.getElementById("orange").addEventListener("click", function () {
    fetchCommands("#FF8B25");
});
document.getElementById("purple").addEventListener("click", function () {
    fetchCommands("#740CEB");
});
document.getElementById("black").addEventListener("click", function () {
    fetchCommands("#1E1E1E");
});
document.getElementById("green").addEventListener("click", function () {
    fetchCommands("#2DEE0F");
});
document.getElementById("blue").addEventListener("click", function () {
    fetchCommands("#299AD4");
});
document.getElementById("removeQuery").addEventListener("click", function () {
    showToast("Filter removed!", true);
    fetchCommands("");
});

addFab.addEventListener("click", function () {
    if (isAddLayoutVisible) {
        closeAddLayout();
    } else {
        openAddLayout();
        closeFilterLayout();
    }
});

filterFab.addEventListener("click", function () {
    if (isFilterLayoutVisible) {
        closeFilterLayout();
    } else {
        openFilterLayout();
        closeAddLayout();
    }
});

function closeAddLayout() {
    addLayout.style.display = "none";
    isAddLayoutVisible = false;
    addFabIcon.classList.add("closed");
    addFabIcon.classList.remove("opened");
}

function openAddLayout() {
    document.getElementById("command_field").value = "";
    document.getElementById("desp_field").value = "";
    addLayout.style.display = "block";
    isAddLayoutVisible = true;
    addFabIcon.classList.add("opened");
    addFabIcon.classList.remove("closed");
}

function openFilterLayout() {
    filterLayout.style.display = "block";
    isFilterLayoutVisible = true;
}

function closeFilterLayout() {
    filterLayout.style.display = "none";
    isFilterLayoutVisible = false;
}

function checkForPrem(email) {
    isAllowed(email).then(r => {
        console.log("Command access verified!")
    }).catch(e => {
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

window.onload = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            let user = firebase.auth().currentUser;
            if (user != null) {
                checkForPrem(user.email)
                uid = user.uid;
                document.getElementById("welcome_text").innerHTML = user.email;
                fetchCommands("");
            }
        } else {
            window.location.href = "../index.html";
        }
    });
};

/* Command Uploader */

document
    .getElementById("add_command_submit_button")
    .addEventListener("click", function () {
        let com = document.getElementById("command_field").value;
        let dis = document.getElementById("desp_field").value;
        let color = dropdown.options[dropdown.selectedIndex].value;

        let dataToUpload = {com, dis, color};
        closeAddLayout();
        addCommandToDatabase(dataToUpload);
    });

function addCommandToDatabase(commandObj) {
    db.collection("users")
        .doc(uid)
        .collection("commands")
        .add(commandObj)
        .then(function (docRef) {
            showToast("Added the command!", true);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
            showToast("Failed to add the command!", false);
        });
}

/* Commmand Fetch */
function fetchCommands(queryColor) {
    closeFilterLayout();
    let ref = "";
    if (queryColor === "") {
        ref = db.collection("users").doc(uid).collection("commands").orderBy("com");
    } else {
        ref = db
            .collection("users")
            .doc(uid)
            .collection("commands")
            .orderBy("com")
            .where("color", "==", queryColor);
    }

    ref.onSnapshot(function (querySnapshot) {
        commandDisplayList.innerHTML = "";

        if (querySnapshot.size === 0) {
            document.getElementById("empty_animation").style.display = "block";
        } else {
            if (queryColor !== "") {
                showToast(getColorName(queryColor) + " filter active!", true);
            }
            document.getElementById("empty_animation").style.display = "none";
        }

        querySnapshot.forEach(function (doc) {
            displayCommands(doc);
        });
    });
}

document.getElementById("logout").addEventListener("click", function () {
    firebase
        .auth()
        .signOut()
        .then(function () {
            window.location.href = "../index.html";
        })
        .catch(function (error) {
            alert.window("Error " + error);
        });
});

function displayCommands(doc) {
    let li = document.createElement("li");
    let command = document.createElement("span");
    let desp = document.createElement("span");
    let cross = document.createElement("div");

    li.classList.add("commandListItem");
    command.classList.add("commandListItemSpan");
    desp.classList.add("commandListItemSpan");
    cross.classList.add("commandListItemDiv");

    li.setAttribute("data-id", doc.id);
    command.textContent = doc.data().com;
    desp.textContent = doc.data().dis;
    cross.textContent = "x";
    command.style.fontWeight = 600;
    command.style.fontFamily = "Work Sans, sans-serif";
    desp.style.fontFamily = "Work Sans, sans-serif";
    desp.style.padding = 5;
    cross.style.borderRadius = 15;
    li.appendChild(command);
    li.appendChild(desp);
    li.appendChild(cross);
    li.style.backgroundColor = doc.data().color;

    // deleting data
    cross.addEventListener("click", (e) => {

        li.classList.add('animate__animated', 'animate__fadeOutRightBig');
        li.addEventListener('animationend', () => {
            li.classList.remove('animate__animated', 'animate__fadeOutRightBig');
            e.stopPropagation();
            let id = e.target.parentElement.getAttribute("data-id");
            db.collection("users")
                .doc(uid)
                .collection("commands")
                .doc(id)
                .delete()
                .then(function () {
                    showToast("Command deleled!", true);
                    // let li = commandDisplayList.querySelector("[data-id=" + id + "]");
                    // commandDisplayList.removeChild(li);
                })
                .catch(function (error) {
                    console.error("Error removing document: ", error);
                    showToast("Failed to delete the command!", false);
                });
        });

    });

    li.onclick = function () {
        li.classList.add('animate__animated', 'animate__pulse');
        li.addEventListener('animationend', () => {
            li.classList.remove('animate__animated', 'animate__pulse');
        });
        copyToClipboard(doc.data().com);
        showToast("Command Copied!", true);
    };

    commandDisplayList.appendChild(li);
}

function copyToClipboard(text) {
    let input = document.createElement("input");
    input.setAttribute("value", text);
    document.body.appendChild(input);
    input.select();
    let result = document.execCommand("copy");
    document.body.removeChild(input);
    return result;
}

function getColorName(colorHex) {
    switch (colorHex) {
        case "#FF8B25":
            return "Orange";
        case "#299AD4":
            return "Blue";
        case "#740CEB":
            return "Purple";
        case "#2DEE0F":
            return "Green";
        case "#EE0F0F":
            return "Red";
        case "#1E1E1E":
            return "Black";
    }
}
