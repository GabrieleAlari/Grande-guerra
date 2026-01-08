// 1. CURSORE PC
const dot = document.querySelector('.cursor-dot');
if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
        dot.style.display = 'block';
        dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px';
    });
}

// 2. REVEAL ANIMATION
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 3. LOGICA TIMELINE
const timelineData = {
    "1914": { title: "L'Eclissi d'Europa", text: "L'attentato di Sarajevo del 28 giugno fa crollare l'equilibrio delle potenze." },
    "1915": { title: "Il Grido del Fronte", text: "L'Italia rompe la neutralità ed entra nel conflitto il 24 Maggio." },
    "1916": { title: "L'Attrito delle Anime", text: "Verdun e la Somme: la guerra diventa un'industria del massacro." },
    "1917": { title: "Il Punto di Rottura", text: "La rivoluzione russa e l'ingresso USA cambiano gli equilibri mondiali." },
    "1918": { title: "L'Alba della Pace", text: "Vittorio Veneto sancisce la fine dell'agonia italiana." },
    "1919": { title: "Cenere e Trattati", text: "A Versailles si ridisegna il mondo, ma restano ferite aperte." }
};

function updateTimeline(year) {
    document.querySelectorAll('.time-node').forEach(node => {
        node.classList.remove('active');
        if(node.innerText === year) node.classList.add('active');
    });
    const content = document.getElementById('timeline-content');
    content.style.opacity = '0';
    setTimeout(() => {
        document.getElementById('dynamic-title').innerText = timelineData[year].title;
        document.getElementById('dynamic-text').innerText = timelineData[year].text;
        content.style.opacity = '1';
    }, 300);
}

// 4. LOGICA QUIZ FUNZIONANTE
const questions = [
    { q: "In che anno l'Italia entra in guerra?", a: ["1914", "1915", "1917"], correct: 1 },
    { q: "Chi fu assassinato a Sarajevo?", a: ["Francesco Ferdinando", "Vittorio Emanuele III", "Garibaldi"], correct: 0 },
    { q: "Dove avvenne la disfatta italiana del 1917?", a: ["Caporetto", "Vittorio Veneto", "Piave"], correct: 0 },
    { q: "Quale gas fu usato come arma chimica?", a: ["Iprite", "Ossigeno", "Elio"], correct: 0 }
];

let currentQ = 0;

function startQuiz() {
    document.getElementById('start-quiz-btn').style.display = 'none';
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQ];
    document.getElementById('question-text').innerText = q.q;
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    q.a.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'btn-main';
        btn.onclick = () => checkAnswer(i);
        grid.appendChild(btn);
    });
}

function checkAnswer(i) {
    if(i === questions[currentQ].correct) {
        alert("Corretto!");
        currentQ++;
        if(currentQ < questions.length) {
            showQuestion();
        } else {
            document.getElementById('quiz-box').innerHTML = "<h3>Test Completato!</h3><p>Ottimo lavoro, Gabriele.</p>";
        }
    } else {
        alert("Sbagliato, riprova!");
    }
}
