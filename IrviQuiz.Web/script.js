let questions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let questionCount = 5;
let selectedLanguage = 'en';

const startScreen = document.getElementById("start-screen");
const quizBox = document.getElementById("quiz-box");
const endScreen = document.getElementById("end-screen");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("final-score");
const nextBtn = document.getElementById("next-btn");

function startQuiz() {
    const countInput = document.getElementById("question-count");
    const languageSelect = document.getElementById("language-select");
    questionCount = Math.max(5, Math.min(20, parseInt(countInput.value) || 5));
    selectedLanguage = languageSelect.value || 'en';

    startScreen.style.display = "none";
    quizBox.style.display = "block";
    score = 0;
    scoreEl.innerText = "Acertos: 0";
    loadQuestion();
}

function restartQuiz() {
    endScreen.style.display = "none";
    questions = [];
    currentIndex = 0;
    startScreen.style.display = "block";
}

async function loadQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    timerEl.innerText = `Tempo: ${timeLeft}`;

    if (questions.length === 0) {
        questionEl.innerText = "Carregando pergunta...";
        try {
            const res = await fetch(`/api/quiz/generate?amount=${questionCount}&lang=${selectedLanguage}`);
            questions = await res.json();
            currentIndex = 0;
        } catch (err) {
            questionEl.innerText = "Erro ao carregar perguntas.";
            return;
        }
    }

    if (currentIndex >= questions.length) {
        quizBox.style.display = "none";
        endScreen.style.display = "block";
        finalScoreEl.innerText = `Você acertou ${score} de ${questions.length} perguntas.`;
        return;
    }

    const q = questions[currentIndex];
    questionEl.innerText = decodeHTML(q.question);
    answersEl.innerHTML = "";

q.answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.innerText = decodeHTML(ans);
    btn.setAttribute("data-answer", ans); // Salva o valor real para comparação

    btn.onclick = () => {
        clearInterval(timer);
        Array.from(answersEl.children).forEach(b => {
            const realValue = b.getAttribute("data-answer");
            if (realValue === q.correctAnswer) {
                b.classList.add("correct");
            } else {
                b.classList.add("wrong");
            }
            b.disabled = true;
        });
        if (ans === q.correctAnswer) {
            score++;
            scoreEl.innerText = `Acertos: ${score}`;
        }
    };
    answersEl.appendChild(btn);
});



    startTimer();
    currentIndex++;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Tempo: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            Array.from(answersEl.children).forEach(b => b.disabled = true);
        }
    }, 1000);
}
