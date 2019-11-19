window.addEventListener('DOMContentLoaded', (event) => {
    let start = document.getElementById("start");
    // let hScore = document.getElementById("hScore");
    let time = document.getElementById("time");
    let quest = document.getElementById("question");
    let answers = document.getElementById("answers");


    start.addEventListener("click", startQuiz);

    function startQuiz(){
        start.style.display = "none";
        console.log("hello");
        setTime();
        displayQuestion();
        displayAnswers();
    }
    

    function displayQuestion(){
        quest.textContent = questions[0].title;
    }

    function displayAnswers(){
        for(let i = 0; i < 4 ; i++){
            console.log(i);
            let li = document.createElement("li");
            console.log(li);
            li.textContent = questions[0].choices[i];
            answers.append(li);
        }
    }

    // 15 seconds per question
    let countdown = 10;

    function setTime(){
        let timer = setInterval( function (){
          
          countdown--;
      
          time.textContent = countdown;
      
          if(countdown < 1){
            clearInterval(timer);
            time.textContent  = "";
            console.log("NEXT");
          }
      
        }, 1000)
      }

});