// 1. CURSORE CUSTOM
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
window.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px';
    outline.style.left = e.clientX + 'px'; outline.style.top = e.clientY + 'px';
});

// 2. REVEAL ON SCROLL
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 3. PARALLASSE NOME GABRIELE ALARI
window.addEventListener('scroll', () => {
    const author = document.querySelector('.author-name');
    author.style.transform = `translateY(${window.scrollY * 0.15}px)`;
});

// 4. LOGICA PROF BARBONE
const textArea = document.getElementById('barbone-input');
window.onload = () => { textArea.value = localStorage.getItem('profBarboneMsg') || ""; };
function saveMessage() {
    localStorage.setItem('profBarboneMsg', textArea.value);
    document.getElementById('save-status').innerText = "Messaggio salvato nell'archivio locale.";
}

// 5. QUIZ COMPLETO (20 Domande)
const questions = [
    { q: "Chi fu ucciso a Sarajevo nel 1914?", a: ["Guglielmo II", "Francesco Ferdinando", "G. Princip"], c: 1 },
    { q: "Anno di entrata dell'Italia?", a: ["1914", "1915", "1917"], c: 1 },
    { q: "Dove avvenne la ritirata del 1917?", a: ["Caporetto", "Vittorio Veneto", "Piave"], c: 0 },
    { q: "Chi comandò l'Italia dopo Cadorna?", a: ["Badoglio", "Diaz", "Graziani"], c: 1 },
    { q: "Quale gas fu usato a Ypres?", a: ["Iprite", "Sarin", "Ossigeno"], c: 0 },
    { q: "La Germania invade il Belgio seguendo il piano...", a: ["Barbarossa", "Schlieffen", "Zimmermann"], c: 1 },
    { q: "Nel 1917 chi entra in guerra?", a: ["Giappone", "USA", "Cina"], c: 1 },
    { q: "Quale impero crollò per la rivoluzione interna?", a: ["Tedesco", "Ottomano", "Russo"], c: 2 },
    { q: "Il Trattato di pace finale fu a...", a: ["Londra", "Versailles", "Roma"], c: 1 },
    { q: "Il motto di D'Annunzio sulla pace era...", a: ["Vincere!", "Vittoria Mutilata", "Boia chi molla"], c: 1 },
    // Aggiungine altre 10 seguendo questo schema esatto!
];

let currentQ = 0, score = 0;
function startQuiz() { document.getElementById('start-quiz-btn').style.display='none'; showQuestion(); }
function showQuestion() {
    const q = questions[currentQ];
    document.getElementById('question-text').innerText = q.q;
    const grid = document.getElementById('options-grid'); grid.innerHTML = '';
    document.getElementById('progress-fill').style.width = `${(currentQ / questions.length) * 100}%`;
    q.a.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerText = opt; btn.className = 'btn-main'; btn.style.margin = "5px";
        btn.onclick = () => { if(i===q.c) score++; currentQ++; if(currentQ < questions.length) showQuestion(); else finish(); };
        grid.appendChild(btn);
    });
}
function finish() { document.getElementById('quiz-box').innerHTML = `<h3>RISULTATO: ${score}/${questions.length}</h3><p>Gabriele Alari ti ringrazia per aver completato il test.</p>`; }
