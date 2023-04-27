//Make questions and answers in an array
var questions = [
    {
        question: "In javascript, what is the operator that decreases a value of a numeric variable by 1?",
        choices: ["Increment", "Decrement", "Excrement", "Deviant"],
        answer: "Decrement"
    },
    {
        question: "What is the method you would use to prevent event bubbling?",
        choices: ["event.stopPropagation()", "event.stopProcreation()", "event.preventPropagation()", "event.preventDefault()"],
        answer: "event.stopPropagation()"  
    },
    {
        question: "In CSS, which selector is the # symbol used to identify?",
        choices: ["Div", "Body", "ID", "Class"],
        answer: "ID"  
    },
    {
        question: "In the Box Model of CSS, which of the following are the layers of elements moving from inside to outside?",
        choices: ["Content-Padding-Border-Margin", "Content-Border-Padding-Margin", "Padding-Content-Border-Margin", "Margin-Border-Padding-Content"],
        answer: "Content-Padding-Border-Margin"  
    },
    {
        question: "Which of the following should NOT be included in the <head> element of HTML?",
        choices: ["Title of the webpage", "Link to style.css", "Link to script.js", "Meta information such as character set"],
        answer: "Link to script.js"  
    }
]





function startQuiz() {
    var geneMessage = document.querySelector("h1");
    var welcomeText = document.querySelector("h2");
    var welcomeText2 = document.querySelector("h3");
    var button = document.querySelector("#start-btn");
    var body = document.querySelector("body");

    geneMessage.style.display = "none"
    welcomeText.style.display = "none";
    welcomeText2.style.display = "none";
    button.style.display = "none";

    var timerEl = document.createElement("div");
    timerEl.id = "timer";
    body.appendChild(timerEl);
        
    var timeLeft = 60; 
    var timerId = setInterval(function() {
    timeLeft--;
    timerEl.textContent = "Time left: " + timeLeft + " seconds";
    if (timeLeft <= 0) {
        clearInterval(timerId);
        timerEl.textContent = "Time's Up! Game Over!";
        var quizEl = document.getElementById("quiz");
        quizEl.style.display = "none";

        var gameOverMsg = document.createElement("h2");
        gameOverMsg.textContent = "Game Over!";
        body.appendChild(gameOverMsg);

        var initials = prompt ("Please enter your initials to save for all time:");
        var score = 0;
        
        localStorage.setItem("initials", initials);
        localStorage.setItem("score", score);

        var scoreMsg = document.createElement("p")
        scoreMsg.classList.add("results")
        scoreMsg.textContent = "Your final score is 0";
        body.appendChild(scoreMsg);
        

        }
  }, 1000);

var currentQuestion = 0;
  var questionEl = document.createElement("h2");
  var quizEl = document.createElement("div");

  quizEl.id = "quiz";
  quizEl.appendChild(questionEl);
  body.appendChild(quizEl);

  function displayQuestion() {
    var question = questions[currentQuestion];
    questionEl.textContent = question.question;

    var choicesEl = document.createElement("div");
    choicesEl.textContent = ""; // Clear previous answer choices
    quizEl.appendChild(choicesEl);
    
  
    question.choices.forEach(function(answer) {
      var answerBtn = document.createElement("button");
      answerBtn.textContent = answer;
      answerBtn.classList.add("answer-btn");
      answerBtn.onclick = function() {
        // Check if answer is correct and handle accordingly
        if (answer === question.answer) {
          // Answer is correct
          var correctMsg = document.createElement("p");
          correctMsg.textContent = "Correct!";
          choicesEl.appendChild(correctMsg);
  
          // Move on to the next question
          currentQuestion++;
          if (currentQuestion < questions.length) {
            displayQuestion();
          } else {
            // Quiz is over
            clearInterval(timerId);
            quizEl.style.display = "none";
            var gameOverMsg = document.createElement("h2");
            gameOverMsg.textContent = "Congratulations! You completed the quiz!";
            body.appendChild(gameOverMsg);

          
            
            if (currentQuestion === questions.length) {
                // Quiz is over
                clearInterval(timerId);
                quizEl.style.display = "none";
                var gameOverMsg = document.createElement("h2");
                gameOverMsg.textContent = "";
                body.appendChild(gameOverMsg);
            
                var scoreMsg = document.createElement("p")
                scoreMsg.classList.add("results")
                scoreMsg.textContent = "Your final score is 5, and you had " + timeLeft + " seconds left!";
                body.appendChild(scoreMsg);

                var initials = prompt("Please enter your initials to save for all time:");
                var score = timeLeft;
            
                // Store initials and score in local storage
                localStorage.setItem("initials", initials);
                localStorage.setItem("score", score);
              }
          }
        } else {
          // Answer is incorrect
          timeLeft -= 10; // Take off 10 seconds from the timer
          if (timeLeft < 0) {
            timeLeft = 0;
          }
          timerEl.textContent = "Time left: " + timeLeft + " seconds";
        }
      };
      choicesEl.appendChild(answerBtn);
    });
  }
  displayQuestion();
}

var startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", startQuiz);
