window.addEventListener('DOMContentLoaded', (event) => {
    let container = document.getElementById("container");
    let start = document.getElementById("start");
    let hScore = document.getElementById("hScore");
    let time = document.getElementById("time");
    let quest = document.getElementById("question");
    let answers = document.getElementById("answers");
    let endCard = document.getElementById("endCard");
    let form = document.getElementById("scoreForm");
    let nameBox = document.getElementById("name");
    let scoreList = document.getElementById("scoreList");
    let taunt = document.getElementById("taunt");
    let timeBox = document.getElementById("timeBox");
    let nameLabel = document.getElementById("nameLabel");


    let currentQ = 0;
    let countdown = 15;
    let score = 0;
    let name = "";

    let timer;
    let scoreBoard = [];
    let generated = false;

    if(localStorage.getItem("scoreboard")){
        scoreBoard = JSON.parse(localStorage.getItem("scoreboard"));
    }else{
        localStorage.setItem("scoreboard", JSON.stringify(scoreBoard))
    }

    start.addEventListener("click", startQuiz);
    hScore.addEventListener("click",populateSB)
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        name = nameBox.value.trim();
        nameBox.value = "";
        writeScore();
        form.style.display = "none";
    })


    function writeScore() {
        scoreList.innerHTML = "";
        scoreBoard.push({
            name: name, score: score
        });
        localStorage.setItem("scoreboard", JSON.stringify(scoreBoard));
        populateSB();
    }

    function populateSB() {
        scoreBoard = JSON.parse(localStorage.getItem("scoreboard"));
        
        scoreBoard.sort((a,b) => (a.score < b.score) ? 1 : -1);
        
        for(let i = 0; i < 10; i++){
            let li = document.createElement("li");
            let span1 = document.createElement("span");
            let span2 = document.createElement("span");

            li.textContent = (i+1) + ". "
            li.appendChild(span1);
            li.appendChild(span2);
            
            span1.innerHTML = scoreBoard[i].name;
            span2.innerHTML = scoreBoard[i].score;

            li.setAttribute("index", i);

            scoreList.appendChild(li);
            generated = true;
        }
        
        scoreList.style.display = "block";
        hScore.style.display = "none";
    }


    //disappear "view highscores" on start?
    function startQuiz() {
        start.style.display = "none";
        taunt.innerHTML = "";
        hScore.style.display = "none";
        timeBox.style.display = "block";
        scoreList.style.display = "none";

        setTime();
        displayQuestion();
        displayAnswers();
    }

    function setTime() {

        time.textContent = countdown;

        clearInterval(timer);

        timer = setInterval(function () {

            countdown--;

            time.textContent = countdown;

            if (countdown < 1) {
                
                clearInterval(timer);

                if (currentQ < 4) {
                    nextQ();
                    countdown = 15;
                } else {
                    endQuiz();
                }
            }


        }, 1000)
    }

    function nextQ() {
        currentQ++;
        displayQuestion();
        displayAnswers();
        setTime();
    }

    function displayQuestion() {
        quest.textContent = questions[currentQ].title;
    }


    function displayAnswers() {
        answers.innerHTML = "";
        for (let i = 0; i < 4; i++) {
            let li = document.createElement("li");
            li.textContent = (i + 1) + ". " + questions[currentQ].choices[i];
            li.setAttribute("index", i);

            li.addEventListener("click", gradeAnswer);

            answers.append(li);
        }
    }

    function gradeAnswer() {
        let broken = this.textContent.split(" ");

        if (broken[1] == questions[currentQ].answer) {
            score += countdown;
            countdown = 15;
        } else{
            countdown = 10;
        }

        if (currentQ < 4) {
            nextQ();
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        quest.innerHTML = "";
        answers.innerHTML = "";
        timeBox.style.display = "none";
        countdown = 0;
        endCard.textContent = "This is your score: " + score;
        nameLabel.textContent = "Please enter your name:"
        form.style.display = "block";
    }

});