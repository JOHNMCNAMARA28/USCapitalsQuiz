const questions = [
    {
        question: "What is the capital of Alabama?",
        answers: [
            { text: "Montgomery", correct: true },
            { text: "Birmingham", correct: false },
            { text: "Mobile", correct: false },
            { text: "Huntsville", correct: false }
        ]
    },
    {
        question: "What is the capital of Alaska?",
        answers: [
            { text: "Anchorage", correct: false },
            { text: "Juneau", correct: true },
            { text: "Fairbanks", correct: false },
            { text: "Wasilla", correct: false }
        ]
    },
    // Add more questions for all states...
    {
        question: "What is the capital of Wyoming?",
        answers: [
            { text: "Cheyenne", correct: true },
            { text: "Casper", correct: false },
            { text: "Laramie", correct: false },
            { text: "Gillette", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const feedbackContainer = document.getElementById('feedback');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    feedbackContainer.innerText = '';
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = '';
    feedbackContainer.innerText = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    feedbackContainer.innerText = correct ? 'Correct' : 'Sorry, bro';
    if (correct) {
        score++;
    }
    setStatusClass(selectedButton, correct);
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = 'Restart';
        nextButton.classList.remove('hide');
        showFinalScore();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showFinalScore() {
    questionContainer.innerText = `You scored ${score} out of ${questions.length}`;
    answerButtons.innerHTML = '';
}

nextButton.addEventListener('click', () => {
    if (nextButton.innerText === 'Restart') {
        startQuiz();
    } else {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add('hide');
    }
});

startQuiz();
