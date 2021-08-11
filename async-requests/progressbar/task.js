let xhr = new XMLHttpRequest();
xhr.open("POST", "https://netology-slow-rest.herokuapp.com/upload.php");
let formData = new FormData(document.forms.form);
let send_button = document.getElementById("send");
send_button.onclick = event => {
    event.preventDefault();
    xhr.send(formData);
}

let progress = document.getElementById("progress");

xhr.onreadystatechange = () => {
    switch (xhr.readyState) {
        case 1: 
          progress.value = 0.25;
          break;
        case 2: 
          progress.value = 0.5;
          break;
        case 3:
          progress.value = 0.75; 
          break;
        case 4:
          progress.value = 1;
          break;
    }
}