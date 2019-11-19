window.addEventListener('DOMContentLoaded', (event) => {
    let start = document.getElementById("start");
    let hScore = document.getElementById("hScore");
    let time = document.getElementById("time");


    start.addEventListener("click", startQuiz);

    function startQuiz(){
        start.style.display = "none";
        console.log("hello");
    }

    let countdown = 10;

    function setTime(){
        let timer = setInterval( function (){
          
          countdown--;
      
          time.textContent = countdown;
      
          if(countdown < 1){
            clearInterval(timer);
            timeBox.textContent  = "";
            console.log("YA DONE");
          }
      
        }, 1000)
      }

});