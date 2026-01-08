// 1. CURSORE CUSTOM
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
window.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    outline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
});

// 2. REVEAL ON SCROLL
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 3. LOGICA PROF BARBONE
const textArea = document.getElementById('barbone-input');
window.onload = () => { textArea.value = localStorage.getItem('profBarboneMsg') || ""; };
function saveMessage() {
    localStorage.setItem('profBarboneMsg', textArea.value);
    document.getElementById('save-status').innerText = "Archiviato.";
}

// 4. QUIZ (Esempio prime domande)
const questions = [
    { q: "Chi fu ucciso a Sarajevo?", a: ["Princip", "Ferdinando", "Guglielmo"], c: 1 },
    { q: "Anno dell'intervento italiano?", a: ["1914", "1915", "1918"], c: 1 },
    { q: "Fronte della ritirata 1917?", a: ["Isonzo", "Piave", "Caporetto"], c: 2 }
    // Aggiungi le altre seguendo questo schema
];

let currentQ = 0, score = 0;
function startQuiz() { document.getElementById('start-quiz-btn').style.display='none'; showQuestion(); }
function showQuestion() {
    const q = questions[currentQ];
    document.getElementById('question-text').innerText = q.q;
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    q.a.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => { if(i===q.c) score++; currentQ++; if(currentQ < questions.length) showQuestion(); else finish(); };
        grid.appendChild(btn);
    });
}
function finish() { document.getElementById('quiz-box').innerHTML = `<h3>Report: ${score}/${questions.length}</h3>`; }

// TEMA
document.getElementById('theme-switcher').onclick = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
};
