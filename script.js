// 1. CURSORE E ANIMAZIONI REVEAL
const dot = document.querySelector('.cursor-dot');
if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
        dot.style.display = 'block';
        dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px';
    });
}
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 2. LOGICA TIMELINE
const timelineData = {
    "1914": { title: "L'Eclissi d'Europa", text: "L'attentato di Sarajevo del 28 giugno fa crollare l'equilibrio delle potenze." },
    "1915": { title: "Il Grido del Fronte", text: "L'Italia rompe la neutralità ed entra nel conflitto il 24 Maggio." },
    "1916": { title: "L'Attrito delle Anime", text: "Verdun e la Somme: la guerra diventa un'industria del massacro." },
    "1917": { title: "Il Punto di Rottura", text: "La rivoluzione russa e l'ingresso USA cambiano gli equilibri mondiali." },
    "1918": { title: "L'Alba della Pace", text: "Vittorio Veneto sancisce la fine dell'agonia italiana." },
    "1919": { title: "Cenere e Trattati", text: "A Versailles si ridisegna il mondo, ma restano ferite aperte." }
};

function updateTimeline(year, element) {
    document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
    element.classList.add('active');
    const content = document.getElementById('timeline-content');
    content.style.opacity = '0';
    setTimeout(() => {
        document.getElementById('dynamic-title').innerText = timelineData[year].title;
        document.getElementById('dynamic-text').innerText = timelineData[year].text;
        content.style.opacity = '1';
    }, 300);
}

// 3. LOGICA QUIZ (RIPRISTINATA)
const questions = [
    { q: "In che anno l'Italia entra in guerra?", a: ["1914", "1915", "1917"], correct: 1 },
    { q: "Chi fu assassinato a Sarajevo?", a: ["Francesco Ferdinando", "Zar Nicola", "Garibaldi"], correct: 0 },
    { q: "Quale gas fu usato per la prima volta?", a: ["Iprite", "Ossigeno", "Metano"], correct: 0 }
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
        btn.style.margin = '10px';
        btn.onclick = () => checkAnswer(i);
        grid.appendChild(btn);
    });
}

function checkAnswer(i) {
    if(i === questions[currentQ].correct) {
        alert("Corretto!");
        currentQ++;
        if(currentQ < questions.length) showQuestion();
        else document.getElementById('quiz-box').innerHTML = "<h3 style='color:var(--accent)'>TEST COMPLETATO!</h3><p>Gabriele, hai dimostrato ottima conoscenza storica.</p>";
    } else {
        alert("Risposta sbagliata, riprova!");
    }
}
