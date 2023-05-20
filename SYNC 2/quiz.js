// Define the quiz questions
const quizQuestions = [
  {
      question: "What is the capital of India?",
      options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
      correctAnswer: 1
  },
  {
      question: "Which of the following is not a primitive data type in Java?",
      options: ["int", "string", "float", "boolean"],
      correctAnswer: 1
  },
  {
    question: "Which of the following is not a primitive data type in Java?",
    options: ["int", "string", "float", "boolean"],
    correctAnswer: 1
},
{
    question: "What is the output of the following code?\nint x = 5;\nSystem.out.println(x++);",
    options: ["5", "6", "Compilation error", "Runtime error"],
    correctAnswer: 0
},
{
    question: "Which keyword is used to create an object in Java?",
    options: ["new", "class", "this", "void"],
    correctAnswer: 0
},
{
    question: "What is the result of 9 % 2 in Java?",
    options: ["0", "1", "2", "4"],
    correctAnswer: 1
},
{
    question: "Which of the following is a type of loop in Java?",
    options: ["if", "for", "switch", "try"],
    correctAnswer: 1
},
{
    question: "What is the default value of an uninitialized int variable in Java?",
    options: ["0", "1", "null", "undefined"],
    correctAnswer: 0
},
{
    question: "What is the purpose of the 'final' keyword in Java?",
    options: ["To declare a constant", "To define a class", "To create an array", "To handle exceptions"],
    correctAnswer: 0
},
{
    question: "Which of the following is an example of a checked exception in Java?",
    options: ["ArithmeticException", "NullPointerException", "ArrayIndexOutOfBoundsException", "IOException"],
    correctAnswer: 3
},
{
    question: "What is the output of the following code?\nString s1 = 'Hello';\nString s2 = 'World';\nSystem.out.println(s1 + s2);",
    options: ["Hello", "World", "HelloWorld", "Compilation error"],
    correctAnswer: 2
}
];

let currentQuestion = 0;
let score = 0;
let quizStarted = false;
let timer;

// Function to display the current question
function displayQuestion() {
  const questionElement = document.getElementById("question");
  const optionElements = document.querySelectorAll("#options li span");

  const currentQuestionObj = quizQuestions[currentQuestion];
  questionElement.textContent = currentQuestionObj.question;

  optionElements.forEach((optionElement, index) => {
      optionElement.textContent = currentQuestionObj.options[index];
  });
}

// Function to start the quiz
function startQuiz() {
  const nextButton = document.getElementById("next-btn");
  const submitButton = document.getElementById("submit-btn");

  nextButton.addEventListener("click", nextQuestion);
  submitButton.addEventListener("click", submitQuiz);

  displayQuestion();
  startTimer();

  quizStarted = true;
}

// Function to handle the next question
function nextQuestion() {
  const selectedOption = document.querySelector("input[name='option']:checked");

  if (!selectedOption) {
      alert("Please select an option");
      return;
  }

  const answer = parseInt(selectedOption.value);

  if (answer === quizQuestions[currentQuestion].correctAnswer) {
      score++;
  }

  selectedOption.checked = false;
  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
      displayQuestion();
      resetTimer();
  } else {
      endQuiz();
  }
}

// Function to submit the quiz and show the result
function submitQuiz() {
  if (!quizStarted) {
      alert("Please start the quiz first");
      return;
  }

  endQuiz();
}

// Function to end the quiz and show the result
function endQuiz() {
  clearInterval(timer);

  const questionContainer = document.getElementById("question-container");
  const controls = document.getElementById("controls");
  const resultContainer = document.getElementById("result-container");
  const scoreElement = document.getElementById("score");
  const passFailElement = document.getElementById("pass-fail");
  const answersContainer = document.getElementById("answers-container");


  questionContainer.style.display = "none";
  controls.style.display = "none";
  resultContainer.style.display = "block";

  const percentage = (score / quizQuestions.length) * 100;

  scoreElement.textContent = `Your score: ${score} / ${quizQuestions.length}`;
  passFailElement.textContent = percentage >= 40 ? "Pass" : "Fail";
  passFailElement.classList.add(percentage >= 40 ? "pass" : "fail");

  answersContainer.innerHTML = "";

  quizQuestions.forEach((question, index) => {
    const answerElement = document.createElement("p");
    answerElement.textContent = `Question ${index + 1}: Correct answer is option ${question.correctAnswer + 1}`;
    answersContainer.appendChild(answerElement);
  });
}

// Timer functionality
let timeRemaining = 15;

function startTimer() {
  const timerElement = document.createElement("p");
  timerElement.id = "timer";
  document.getElementById("quiz-container").appendChild(timerElement);

  timer = setInterval(() => {
      timerElement.textContent = `Time remaining: ${timeRemaining} seconds`;

      if (timeRemaining === 0) {
          clearInterval(timer);
          nextQuestion();
      }

      timeRemaining--;
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeRemaining = 15;
  startTimer();
}

// Start the quiz when the page is loaded
window.addEventListener("load", startQuiz);

