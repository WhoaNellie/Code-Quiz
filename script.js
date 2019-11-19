window.addEventListener('DOMContentLoaded', (event) => {
    let start = document.getElementById("start");
    // let hScore = document.getElementById("hScore");
    let time = document.getElementById("time");
    let quest = document.getElementById("question");
    let answers = document.getElementById("answers");

    let currentQ = 0;

    start.addEventListener("click", startQuiz);

    function startQuiz(){
        start.style.display = "none";
        console.log("hello");
        setTime();
        displayQuestion();
        displayAnswers();
    }
    
    let countdown = 15;

    function setTime(){
        let timer = setInterval(function (){
          
          countdown--;
      
          time.textContent = countdown;
      
          if(countdown < 1){
            clearInterval(timer);
            time.textContent  = "";
            console.log("NEXT");
            currentQ++;
          }
      
        }, 1000)
    }

    function displayQuestion(){
        quest.textContent = questions[currentQ].title;
    }

     
    function displayAnswers(){
        answers.innerHTML = "";
        for(let i = 0; i < 4 ; i++){
            console.log(i);
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
        }

        currentQ++;
        countdown = 15;
        displayQuestion();
        displayAnswers();
        console.log(currentQ);
    }

});