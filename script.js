// DOM Element
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("procress");

// Quize questions
const quizQuestions = [
  {
    question: "តើព្រះរាជាណាចក្រកម្ពុជាមានផ្ទៃដីសរុបចំនួនប៉ុន្មាន?",
    answers: [
      { text: " ១៧១,០០០ គីឡូម៉ែត្រការ៉េ", correct: false },
      { text: " ១៨១,០៣៥ គីឡូម៉ែត្រការ៉េ", correct: true },
      { text: " ១៩១,០៣៥ គីឡូម៉ែត្រការ៉េ", correct: false },
      { text: " ២០១,០០០ គីឡូម៉ែត្រការ៉េ​", correct: false },
    ],
  },
  {
    question:
      "តើប្រាសាទអង្គរវត្តត្រូវបានកសាងឡើងក្នុងរជ្ជកាលព្រះមហាក្សត្រអង្គណា?",
    answers: [
      { text: "ព្រះបាទជ័យវរ្ម័នទី៧", correct: false },
      { text: "ព្រះបាទសូរ្យវរ្ម័នទី២", correct: true },
      { text: "ព្រះបាទយសោវរ្ម័នទី១", correct: false },
      { text: "ព្រះបាទឥន្ទ្រវរ្ម័នទី១", correct: false },
    ],
  },
  {
    question: "តើខេត្តណាខ្លះដែលស្ថិតនៅជាប់នឹងបឹងទន្លេសាប?",
    answers: [
      { text: "កំពត កែប កោះកុង ព្រះសីហនុ", correct: false },
      { text: "សៀមរាប កំពង់ចាម បាត់ដំបង កណ្ដាល", correct: false },
      { text: "ក្រចេះ ស្ទឹងត្រែង ព្រះវិហារ សៀមរាប", correct: false },
      { text: "កំពង់ធំ សៀមរាប បាត់ដំបង ពោធិ៍សាត់ កំពង់ឆ្នាំង", correct: true },
    ],
  },
  {
    question: "តើផ្កាតំណាងជាតិរបស់ប្រទេសកម្ពុជាមានឈ្មោះអ្វី?",
    answers: [
      { text: "ផ្កាឈូក", correct: false },
      { text: "ផ្កាម្លិះ", correct: false },
      { text: "ផ្ការំដួល", correct: true },
      { text: "ផ្កាចំប៉ី", correct: false },
    ],
  },
  {
    question: "តើប្រទេសកម្ពុជាចូលជាសមាជិកអាស៊ាន (ASEAN) នៅឆ្នាំណា?",
    answers: [
      { text: "១៩៩៧", correct: false },
      { text: "១៩៩៨", correct: false },
      { text: "១៩៩៩", correct: true },
      { text: "២០០០", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestinIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listener

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestinIndex = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // Enable answer clicking
  answersDisabled = false;
  // Get current question
  const currentQuestion = quizQuestions[currentQuestinIndex];
  currentQuestionSpan.textContent = currentQuestinIndex + 1;

  // Update progress bar
  const progressPercent = (currentQuestinIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  // Clear previous answers
  answersContainer.innerHTML = "";

  // Create answer buttons dynamically
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // Store correct value using dataset
    button.dataset.correct = answer.correct;

    // Add click event
    button.addEventListener("click", selectAnswer);

    // Add button to container
    answersContainer.appendChild(button);
  });
}

// ==============================
// ✅ HANDLE ANSWER CLICK
// ==============================

function selectAnswer(event) {
  // Prevent multiple clicks
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Show correct & incorrect answers
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  // Update score if correct
  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  // Move to next question after delay
  setTimeout(() => {
    currentQuestinIndex++;

    // check if there are more questions or if this quiz is over
    if (currentQuestinIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}
// ==============================
// 🏁 SHOW RESULT SCREEN
// ==============================
function showResults() {
  // Switch screen
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  // Display final score
  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  // Show message based on performance
  if (percentage === 100) {
    resultMessage.textContent = "អស្ចារ្យណាស់! អ្នកពិតជាពូកែខ្លាំងមែន";
  } else if (percentage >= 80) {
    resultMessage.textContent = "ធ្វើបានល្អណាស់! អ្នកពិតជាយល់ដឹងច្បាស់មែន";
  } else if (percentage >= 60) {
    resultMessage.textContent = "ប្រឹងប្រែងបានល្អ! បន្តរៀនសូត្របន្ថែមទៀតណា";
  } else if (percentage >= 40) {
    resultMessage.textContent =
      "ធ្វើបានល្អ! សាកល្បងម្ដងទៀតដើម្បីឱ្យកាន់តែប្រសើរ";
  } else {
    resultMessage.textContent =
      "បន្តសិក្សាស្រាវជ្រាវទៀត! អ្នកនឹងធ្វើបានល្អជាងនេះនៅពេលក្រោយ";
  }
}

// ==============================
// 🔄 RESTART QUIZ
// ==============================
function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
