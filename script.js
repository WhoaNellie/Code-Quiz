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
    
    let countdown = 15;

    function setTime(){
        let timer = setInterval(function (){
          
          countdown--;
      
          time.textContent = countdown;
      
          if(countdown < 1){
            clearInterval(timer);
            time.textContent  = "";
            console.log("NEXT");
          }
      
        }, 1000)
    }

    function displayQuestion(){
        quest.textContent = questions[0].title;
    }

     
    function displayAnswers(){
        for(let i = 0; i < 4 ; i++){
            console.log(i);
            let li = document.createElement("li");
            li.textContent = questions[0].choices[i];
            li.setAttribute("index", i);

            //pass gradeAnwer the index of the clicked on item somehow or find a way to get it in the function
            li.addEventListener("click", gradeAnswer);

            answers.append(li);
        }
    }

    function gradeAnswer(ind){
        console.log("click");
        // console.log(ind);

        // // this returns thethe li
        // console.log(this);

        // console.log(this.textContent);

        if(this.textContent == questions[0].answer){
            console.log("hoo-ray");
        }
    }

});