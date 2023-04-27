//Make questions and answers in an array
var Questions = [
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
        answer: "Decrement"  
    }
]


//Variables for score and question index
let score = 0;
let questionIndex = 0;


//Variables for HTL elements
var startButton = document.getElementById("start-btn");
var quizQuestions = document.getElementById("quiz-questions");
var resultsContainer = document.getElementById("results");
var submitInitialsForm = document.getElementById("submit-initials");

//Start timer with setInterval().  Count down from 1 minute.  Subtract 10 seconds when question is wrong.

let timeLeft = 60;
let timerInterval;

function startTimer() {
    timerInterval = setInterval (() => {
        timeLeft--;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        
        }
    }, 1000);
}

//Put up the questions, and start timer

function startQuiz() {
    document.getElementById("start-btn").style.display = "hidden";
    document.getElementById("quiz-questions").style.display = "block";
    startTimer();
    displayQuestion(0);
}


function displayQuestion(index)  {
    var quizQuestions = document.getElementById("quiz-questions");
    quizQuestions.textContent="";

    var question = Questions[index];
    var questionTitle = document.createElement("h3");
    questionTitle.textContent = question.question;
    quizQuestions.appendChild(questionTitle);

    for (var i = 0; i < question.choices.length; i++) {
        var choice = question.choices[i];
        var button = document.createElement("button");
        button.textContent = choice;
        button.setAttribute("data-answer", choice);
        button.onclick = function() {
          var userAnswer = this.getAttribute("data-answer");
          if (userAnswer === question.answer) {
            score++;
          } else {
            timeLeft -=10;
          }
          index++;
          if (index < Questions.length) {
            displayQuestion(index);
          } else {
            endGame();
          }
        }
        questionContainer.appendChild(button);
      }
    }




startButton.addEventListener("click", startQuiz);

