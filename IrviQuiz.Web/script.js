let questions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;
let questionCount = 5;
let selectedLanguage = 'en';
let translations = {};

const startScreen = document.getElementById("start-screen");
const quizBox = document.getElementById("quiz-box");
const endScreen = document.getElementById("end-screen");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("final-score");
const nextBtn = document.getElementById("next-btn");

window.addEventListener("DOMContentLoaded", async () => {
    const savedLang = localStorage.getItem("irviquiz-lang") || "en";
    selectedLanguage = savedLang;
    document.getElementById("language-select").value = savedLang;

    startScreen.style.display = "none";
    await loadLang(savedLang);
    startScreen.style.display = "block";

    bindUIEvents(); // <- aqui é a chamada correta
});


async function loadLang(lang) {
    try {
        const res = await fetch(`lang/${lang}.json`);
        translations = await res.json();

        document.querySelector("h1").textContent = translations.general.title;
        document.querySelector("p.subtitle").textContent = translations.general.subtitle;
        document.querySelector("label[for=question-count]").textContent = translations.general.amount_label;
        document.querySelector("label[for=language-select]").textContent = translations.general.language_label;
        document.getElementById("next-btn").textContent = translations.general.next_button;
        document.getElementById("reload").textContent = translations.general.start_button;
        document.getElementById("restart-btn").textContent = translations.general.restart_button;
    } catch (err) {
        console.error("Erro ao carregar idioma:", err);
    }
}


function startQuiz() {
    const countInput = document.getElementById("question-count");
    const languageSelect = document.getElementById("language-select");
    questionCount = Math.max(5, Math.min(20, parseInt(countInput.value) || 5));
    selectedLanguage = languageSelect.value || 'en';
    localStorage.setItem("irviquiz-lang", selectedLanguage);

    startScreen.style.display = "none";
    quizBox.style.display = "block";
    score = 0;
    scoreEl.innerText = `${translations.general.correct_answers || "Correct"}: 0`;
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
    timeLeft = 20;
    timerEl.innerText = `${translations.general.time_left || "Time"}: ${timeLeft}`;

    if (questions.length === 0) {
        questionEl.innerText = translations.messages.loading_questions || "Loading questions...";
        try {
            const res = await fetch(`/api/quiz/generate?amount=${questionCount}&lang=${selectedLanguage}`);
            questions = await res.json();
            currentIndex = 0;
        } catch (err) {
            questionEl.innerText = translations.messages.error_loading || "Error loading questions.";
            return;
        }
    }

    if (currentIndex >= questions.length) {
        quizBox.style.display = "none";
        endScreen.style.display = "block";
        finalScoreEl.innerText = `${translations.general.final_score_prefix || "You got"} ${score} ${translations.general.final_score_suffix || "questions right."}`;
        return;
    }

    const q = questions[currentIndex];
    questionEl.innerText = decodeHTML(q.question);
    answersEl.innerHTML = "";

    q.answers.forEach(ans => {
        const btn = document.createElement("button");
        btn.innerText = decodeHTML(ans);
        btn.setAttribute("data-answer", ans);

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
                scoreEl.innerText = `${translations.general.correct_answers || "Correct"}: ${score}`;
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
        timerEl.innerText = `${translations.general.time_left || "Time"}: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            Array.from(answersEl.children).forEach(b => b.disabled = true);
        }
    }, 1000);
}

function decodeHTML(text) {
    try {
        const html = decodeURIComponent(text);
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    catch {
        return text;
    }
}
function bindUIEvents() {
    document.getElementById("reload").addEventListener("click", startQuiz);
    document.getElementById("next-btn").addEventListener("click", loadQuestion);
    document.getElementById("restart-btn").addEventListener("click", restartQuiz);
}
document.getElementById("language-select").addEventListener("change", async (e) => {
    const selectedLang = e.target.value;
    if (selectedLang === selectedLanguage) return; // 👈 evita reloads desnecessários
    localStorage.setItem("irviquiz-lang", selectedLang);
    selectedLanguage = selectedLang;
    await loadLang(selectedLang);
});
