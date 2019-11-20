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

    let currentQ = 0;
    let countdown = 15;
    let score = 0;
    let name = "";

    start.addEventListener("click", startQuiz);
    hScore.addEventListener("click", writeScore);
    form.addEventListener("submit", function(event){
        event.preventDefault();
        name = nameBox.value.trim();
        writeScore();
    })

    function startQuiz(){
        start.style.display = "none";
        console.log("hello");
        setTime();
        displayQuestion();
        displayAnswers();
    }
    
// timer starts delayed for some reason? find fix other than starting at 16
    function setTime(){
        let timer = setInterval(function (){
          
          countdown--;
      
          time.textContent = countdown;
      
          if(countdown < 1 && currentQ < 4){
            clearInterval(timer);
            time.textContent  = "";
            console.log("NEXT");
            nextQ();
            countdown = 15;
          }else if(countdown < 1 && currentQ >= 4){
            clearInterval(timer);
            endQuiz();
          }
      
        }, 1000)
    }

    function nextQ(){
        currentQ++;
        displayQuestion();
        displayAnswers();
        setTime();
    }

    function displayQuestion(){
        quest.textContent = questions[currentQ].title;
    }

     
    function displayAnswers(){
        answers.innerHTML = "";
        for(let i = 0; i < 4 ; i++){
            let li = document.createElement("li");
            li.textContent = questions[currentQ].choices[i];
            li.setAttribute("index", i);

            li.addEventListener("click", gradeAnswer);

            answers.append(li);
        }
    }

    function gradeAnswer(ind){
        console.log("click");

        if(this.textContent == questions[currentQ].answer){
            console.log("hoo-ray");
            score += countdown;
            countdown = 15;
        }else{
            // allows score to be negative if last question is wrong, fix this
            countdown -= 5;
        }

        if(currentQ < 4){
            nextQ();
            console.log(currentQ);
        }else{
            endQuiz();
        }
    }

    function endQuiz(){
        quest.innerHTML = "";
        answers.innerHTML = "";
        countdown = "";
        endCard.textContent = "This is your score: " + score;
        form.style.display = "block";
    }

    function writeScore(){
        localStorage.setItem("name", name);
        localStorage.setItem("score", score);
        console.log(name);
        console.log(score);
    }

});