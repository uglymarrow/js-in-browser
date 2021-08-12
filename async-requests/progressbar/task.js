let formData = new FormData(document.forms.form);
let progress = document.getElementById("progress");
let send_button = document.getElementById("send");

send_button.addEventListener("click", function (event) {
  event.preventDefault();

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://netology-slow-rest.herokuapp.com/upload.php");

  xhr.upload.onprogress = upload_event => {
    progress.value = (upload_event.loaded / upload_event.total);
    alert( 'Загружено на сервер ' + upload_event.loaded + ' байт из ' + upload_event.total );
  }

  xhr.send(formData)
})
