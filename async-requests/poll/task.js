let xhr = new XMLHttpRequest();
xhr.open('GET',"https://netology-slow-rest.herokuapp.com/poll.php");
xhr.send();

let poll__title = document.getElementById("poll__title");
let poll__answers = document.getElementById("poll__answers");

xhr.onreadystatechange = () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        let vote_id = response.id;
        response = response.data;
        poll__title.innerText = response.title;
        response.answers.forEach((answer, i) => {
            let answer_button = document.createElement("button");
            answer_button.class = "poll__answer";
            answer_button.innerText = answer;
            answer_button.onclick = (event) => {
                event.preventDefault();
                alert("Спасибо, ваш голос засчитан!");
                choice(vote_id, i, poll__answers);
            }
            poll__answers.appendChild(answer_button);
        });
    }
}

function choice (vote_id, i, poll__answers) {
    let xhr_post = new XMLHttpRequest();
    xhr_post.open( 'POST', 'https://netology-slow-rest.herokuapp.com/poll.php' );
    xhr_post.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
    xhr_post.send( `vote=${vote_id}&answer=${i}`);

    xhr_post.onreadystatechange = () => {
        if (xhr_post.readyState === xhr_post.DONE && xhr_post.status === 200) {
        let response = JSON.parse(xhr_post.responseText);
        poll__answers.innerText = "";   
        response.stat.forEach(stat_answer => {
            poll__answers.insertAdjacentHTML("beforeend", `<p>${stat_answer.answer} : ${stat_answer.votes}  </p>`)
        })
        }
    }
}


