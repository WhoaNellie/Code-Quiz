window.addEventListener('DOMContentLoaded', (event) => {
    let start = document.getElementById("start");
    let hScore = document.getElementById("hScore");
    let time = document.getElementById("time");


    start.addEventListener("click", startQuiz);

    function startQuiz(){
        start.style.display = "none";
        console.log("hello");
        setTime();
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