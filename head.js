const questions = [
    {
        question: "Question 1: Which study method do you prefer?",
        options: [
            { text: "Watching videos", type: "visual" },
            { text: "Reading textbooks", type: "reading" },
            { text: "Listening to lectures", type: "auditory" },
            { text: "Participating in group discussions", type: "kinesthetic" }
        ]
    },
    {
        question: "Question 2: How do you best remember information?",
        options: [
            { text: "Using diagrams and charts", type: "visual" },
            { text: "Taking detailed notes", type: "reading" },
            { text: "Listening to audio recordings", type: "auditory" },
            { text: "Teaching the material to others", type: "kinesthetic" }
        ]
    },
    {
        question: "Question 3: What type of reading materials do you prefer?",
        options: [
            { text: "Articles", type: "visual" },
            { text: "Textbooks", type: "reading" },
            { text: "Audio books", type: "auditory" },
            { text: "Interactive online content", type: "kinesthetic" }
        ]
    },
    {
        question: "Question 4: What helps you concentrate the most?",
        options: [
            { text: "Visual aids like slideshows", type: "visual" },
            { text: "Written instructions or lists", type: "reading" },
            { text: "Verbal explanations or discussions", type: "auditory" },
            { text: "Hands-on activities or experiments", type: "kinesthetic" }
        ]
    },
    {
        question: "Question 5: Which activity do you enjoy the most?",
        options: [
            { text: "Watching educational videos", type: "visual" },
            { text: "Reading books or articles", type: "reading" },
            { text: "Listening to podcasts or audiobooks", type: "auditory" },
            { text: "Engaging in physical activities or sports", type: "kinesthetic" }
        ]
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const resultElement = document.getElementById('result');

function showQuestion(question) {
    questionElement.textContent = question.question;
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.addEventListener('click', () => {
            userAnswers[currentQuestionIndex] = option.type;
            nextQuestion();
        });
        optionsContainer.appendChild(button);
    });
}

function nextQuestion() {
    if (!userAnswers[currentQuestionIndex]) {
        alert("Please select an option before proceeding.");
        return;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResult();
        nextButton.style.display = 'none';
        restartButton.style.display = 'block';
    }
}

function showResult() {
    const typeCounts = {};
    userAnswers.forEach(answer => {
        typeCounts[answer] = (typeCounts[answer] || 0) + 1;
    });
    const maxType = Object.keys(typeCounts).reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b);
    const percentage = Math.round((typeCounts[maxType] / questions.length) * 100);
    resultElement.textContent = `You are ${percentage}% ${maxType} learner.`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    showQuestion(questions[currentQuestionIndex]);
    resultElement.textContent = '';
    restartButton.style.display = 'none';
    nextButton.style.display = 'block';
}

showQuestion(questions[currentQuestionIndex]);
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);
