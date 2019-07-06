
window.setTimeout(function(){

    console.log("Moving");
    // Move to a new location or you can do something else
    if(!check){
        console.log('mobile not detected')
    window.location.href = "https://andronix-techriz.firebaseapp.com/login.html";
    }
    else{
        console.log('mobile detected')
        window.location.href = "https://andronix.tech/mobile";
    }

}, 5000);