// Quiz questions variable
var quizQuestions = [
  {
      question: 'Inside which HTML element do we put the JavaScript?',
      answers: ['<script>', '<javascript>', '<js>', '<scripting>'],
      correct: '<script>'
  },
  {
      question: 'How to write an IF statement in JavaScript?',
      answers: ['if i == 5 then', 'if i = 5 then', 'if i = 5', 'if (i == 5)'],
      correct: 'if (i == 5)' 
  },
  {
      question: 'How does a FOR loop start?',
      answers:['for (i = 0; <5)', 'for i = 1 to 5', 'for (i <= 5; i++)', 'for (i = 0; i<= 5; i++)'],
      correct: 'for (i = 0; i<= 5; i++)'
  },
  {
    question:'How do you round the number 7.25, to the nearest integer?',
    answers:['Math.rnd (7.25)', 'round(7.25)', 'rnd(7.25)', 'Math.round(7.25)'],
    correct: 'Math.round(7.25)'
  },
  {
    question:'Which event occurs when the user clicks on an HTML element?',
    answers:['onmouseclick', 'onclick', 'onmouseover', 'oncharge'],
    correct: 'onclick'
  },

];
// Variables for score and question list
var score = 0;
var questionList = 0;


// Variables for game components
var timer = document.querySelector('#timer');
var startQuiz = document.querySelector('#startQuiz');
var questions = document.querySelector('#questions');
var container = document.querySelector('#container');

// Quiz time(10 seconds off for every wrong answer):
var quizTime = 101;
// time interval
var interval = 0;
//  penalty time
var wrong = 10;
//  new element
var ulCreate = document.createElement('ul');

// timer button
startQuiz.addEventListener('click', function () {
  
  if (interval === 0) {
      interval = setInterval(function () {
          quizTime--;
          timer.textContent = 'Time: ' + quizTime;

          if (quizTime <= 0) {
              clearInterval(interval);
              finish();
              timer.textContent = 'Time!';
          }
      }, 1000);
  }
  render(questionList);
});


function render(questionList) {
  
  questions.innerHTML = '';
  ulCreate.innerHTML = '';
 
  for (var i = 0; i < quizQuestions.length; i++) {
     
      var userQuestion = quizQuestions[questionList].question;
      var userChoices = quizQuestions[questionList].answers;
      questions.textContent = userQuestion;
  }
  
  userChoices.forEach(function (newItem) {
    var listItem = document.createElement('li');
    listItem.textContent = newItem;
    questions.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener('click', (compare));
  })
}
// answer comparison
function compare(game) {
  var option = game.target;


  if (option.matches('li')) {
  
      var newDiv = document.createElement('div');
      newDiv.setAttribute('id', 'newDiv');
     
      if (option.textContent == quizQuestions[questionList].correct) {
          score++;
          newDiv.textContent = 'Correct! The answer is:  ' + quizQuestions[questionList].correct;
      
      } else {
          
          quizTime = quizTime - wrong;
          newDiv.textContent = 'Incorrect! The correct answer is:  ' + quizQuestions[questionList].correct;
      }

  }
  // Question Index 
  questionList++;

  if (questionList >= quizQuestions.length) {
      
      finish();
      newDiv.textContent = 'Game Over!' + '' + ' You answered ' + score + '/' + quizQuestions.length + ' Correct!';
  } else {
      render(questionList);
  }
  questions.appendChild(newDiv);

}

function finish() {
  questions.innerHTML = '';
  timer.innerHTML = '';

  
  var newH1 = document.createElement('h1');
  newH1.setAttribute('id', 'newH1');
  newH1.textContent = 'Finish!'

  questions.appendChild(newH1);

 
  var newP = document.createElement('p');
  newP.setAttribute('id', 'newP');

  questions.appendChild(newP);

  
  if (quizTime >= 0) {
      var timeLeft = quizTime;
      var newP2 = document.createElement('p');
      clearInterval(interval);
      newP.textContent = 'Your score is:  ' + timeLeft;

      questions.appendChild(newP2);
  }

  
  var newLabel = document.createElement('label');
  newLabel.setAttribute('id', 'newLabel');
  newLabel.textContent = 'Enter your name: ';

  questions.appendChild(newLabel);

  
  var createInput = document.createElement('input');
  createInput.setAttribute('type', 'text');
  createInput.setAttribute('id', 'name');
  createInput.textContent = '';

  questions.appendChild(createInput);

  
  var createEnter = document.createElement('button');
  createEnter.setAttribute('type', 'enter');
  createEnter.setAttribute('id', 'enter' );
  createEnter.textContent = 'enter';

  questions.appendChild(createEnter);

  
  createEnter.addEventListener('click', function () {
      var name = createInput.value;

      if (name === null) {

          console.log('Please enter a value!');

      } else {
          var yourScore = {
              name: name,
              score: timeLeft
          }
          console.log(yourScore);
          var scores = localStorage.getItem('scores');
          if (scores === null) {
              scores = [];
          } else {
              scores = JSON.parse(scores);
          }
          scores.push(yourScore);
          var scoreNew = JSON.stringify(scores);
          localStorage.setItem('scores', scoreNew);
         
          window.location.replace('./highScore.html');
      }
  });

}
