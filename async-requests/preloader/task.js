let xhr = new XMLHttpRequest();
xhr.open("GET", 'https://netology-slow-rest.herokuapp.com');
xhr.send();

let loader = document.getElementById("loader");
let items = document.getElementById("items");
let storage = window.localStorage;

xhr.onreadystatechange = () => {
    if (xhr.status == 200 && xhr.readyState == xhr.DONE) {
      storage.clear();
      items.innerText = '';
      loader.classList.remove("loader_active");
      let data = JSON.parse(xhr.responseText);
      data = data.response.Valute;
      for (key in data) {
        storage.setItem(key, data[key].Value);
        items.insertAdjacentHTML("beforeend",
        `<div class="item">
           <div class="item__code">
             ${data[key].CharCode}
           </div>
           <div class="item__value">
             ${data[key].Value}
           </div>
           <div class="item__currency">
            руб.
           </div>
         </div>`
        )
      }
    }
}

if (storage.length) {
  loader.classList.remove("loader_active");
  console.log(storage);
  for (var i = 0; i < storage.length; i++) {
    items.insertAdjacentHTML("beforeend",
      `<div class="item">
         <div class="item__code">
           ${storage.key(i)}
         </div>
         <div class="item__value">
           ${storage.getItem(storage.key(i))}
         </div>
         <div class="item__currency">
          руб.
         </div>
       </div>`
      )
}
}