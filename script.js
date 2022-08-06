// GIVEN I am taking a code quiz
 // WHEN I click the start button
 // THEN a timer starts and I am presented with a question
 // WHEN I answer a question
 // THEN I am presented with another question
 // WHEN I answer a question incorrectly
 // THEN time is subtracted from the clock
 // WHEN all questions are answered or the timer reaches 0
 // THEN the game is over
 // WHEN the game is over
 // THEN I can save my initials and my score


 //VARIABLES
 //Variables for dom elements
 var timerBox = document.querySelector('.timer-box')
 var questionBox = document.querySelector('#question-box')
 var startButton = document.querySelector('#start-button')
 var startBox = document.querySelector('.start-screen')
 var p = document.getElementById('answerRes')
 var wins = document.getElementById("correct-count")
 var losses = document.getElementById("wrong-count")
 var initialsInput = document.getElementById('initials')
 var initialBtn = document.getElementById('initial-btn')
 var gameOverBox = document.getElementById('game-over-box')
 //Variables for our Questions
 var questions = [
     {
         question: 'What is Javascript?',
         Choices: ['the index file', 'A Bible Scripture', 'A coffee Shop', 'A common language used to create webpages'],
         answer: 'A common language used to create webpages'

     },
     {
         question: 'What is CSS?',
         choices: ['Cascading StyleSheet', 'Chips Salsa and Soda', 'Cascading Hyper text', ' Criminial Secret Society'],
         answer: 'Cascading StyleSheet'

     }

 ]

    //Variables for our game
 var timeLeft = 60;
 var currentQuestion = 0;
 var correctCount = 0;
 var lossesCount = 0;


 function score() {
     wins.innerHTML = "Correct Count " + correctCount;
     losses.innerHTML = "Losses Count " + lossesCount;


 }
 //FUNCTIONS
    //Start the game
 function checkAnswer() {



 }
 //function to push wrong or right answer score 


 //Write a function to display questions


 function displayQuestion() {
     if (currentQuestion >= questions.length) {
         endGame();
     } else {
         var questionEl = document.createElement('h2')
         questionEl.innerText = questions[currentQuestion].question
         questionBox.appendChild(questionEl)


         //loop over the choices and create buttons
         questions[currentQuestion].choices.forEach(choice => {
             var choiceEl = document.createElement('button')
             choiceEl.innerHTML = choice


             // if statement checking if the answer is correct
             choiceEl.onclick = function () {
                 if (questions[currentQuestion].answer === choice) {
                     console.log('Correct')
                     p.innerHTML = "Correct Answer"
                     correctCount++;




                 }

                 else {
                     console.log('wrong answer')
                     timeLeft -= 15;
                     p.innerHTML = 'Wrong Answer'
                     lossesCount++;
                 }
                 score();
                 currentQuestion++;
                 questionEl.innerText = "";
                 questionBox.innerHTML = "";
                 if (currentQuestion < questions.length) {

                     displayQuestion()
                 }
                 else endGame()


             }
             questionBox.appendChild(choiceEl)
         })
     };

 }



 function endGame() {

     questionBox.classList.add('hide')
     gameOverBox.classList.remove('hide')

 }

    //Event Listeners
 function runClock() {
     //Check for Zero
     if (timeLeft === 0) {
         console.log('timesUp')
         clearInterval(myTimer)
         endGame()
     }
     //display the remaining time
     var timerElement = document.querySelector('#time-left')
     timerElement.innerText = timeLeft
     timeLeft--;

 }
 function startTimer() {
     //Display the timer box
     timerBox.classList.remove("hide");
     console.log('start timer')

     //set interval to start the timer
     var myTimer = setInterval(runClock, 1000);
     //Wrtie a function to start the timer
     function runClock() {
         //Check the time to see if has reached Zero
         if (timeLeft === 0 || currentQuestion >= questions.length) {
             console.log('timesUp')
             clearInterval(myTimer)
             endGame()
         }

         //display the remaining time
         var timerElement = document.querySelector('#time-left')
         timerElement.innerText = timeLeft
         timeLeft--;

     }
 }



 //Write a function to start the Quiz
 function startQuiz() {

     startBox.classList.add("hide");
     // Display questions
     displayQuestion();
     //Start Timer
     startTimer();

     score();
 }

 //function to get initials and score
 function getInitials(event ){
     event.preventDefault()
     var scores = [];
     if(localStorage.getItem('high scores')){
         scores = JSON.parse(localStorage.getItem('high scores'))
     }
     console.log(scores)
     var initials = initialsInput.value
     var userScore = {
         initials: initials, 
         score: correctCount,
     };
     console.log(userScore)
     scores.push(userScore)
     localStorage.setItem('high scores', JSON.stringify(scores) )


 }

 //Event Listener 
 startButton.addEventListener('click', startQuiz)

 initialBtn.addEventListener('click', getInitials)