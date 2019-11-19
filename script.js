window.addEventListener('DOMContentLoaded', (event) => {
    let container = document.getElementById("container");
    let start = document.getElementById("start");
    let hScore = document.getElementById("hScore");
    let time = document.getElementById("time");
    let quest = document.getElementById("question");
    let answers = document.getElementById("answers");
    let endCard = document.getElementById("endCard");

    let currentQ = 0;
    let countdown = 15;
    let score = 0;

    start.addEventListener("click", startQuiz);

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
      
        //   time doesn't return if it reaches 0
          if(countdown < 1 && currentQ < 4){
            clearInterval(timer);
            time.textContent  = "";
            console.log("NEXT");
            nextQ();
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
            countdown -= 5;
        }

        if(currentQ < 4){
            nextQ();
            console.log(currentQ);
        }else{
            endQuiz();
        }
    }

    // trying to add an element broke everything for some reason
    function endQuiz(){
        quest.innerHTML = "";
        answers.innerHTML = "";
        countdown = "";
        endCard.textContent = "This is your score: " + score;
        console.log(score);
    }

});