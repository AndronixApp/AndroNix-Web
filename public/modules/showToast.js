import Toastify from 'toastify-js'

export default function showToast(message, isSuccess, duration) {
    let color = "";
    let dur = 2000;
    if (isSuccess) color = "#4BB543";
    else color = "#EE0F0F";
    if (duration)
        dur = duration

    Toastify({
        text: message,
        duration: dur,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: color,
        stopOnFocus: false,
    }).showToast();
}