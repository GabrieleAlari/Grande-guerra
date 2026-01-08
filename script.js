// 1. CURSORE E PARALLASSE TITOLO
const dot = document.querySelector('.cursor-dot');
document.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px';
    const title = document.querySelector('.glitch');
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;
    if(title) title.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

// 2. REVEAL TITOLI E SEZIONI
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal, .reveal-title').forEach(el => observer.observe(el));

// 3. MOTORE CRONOLOGIA DINAMICA
const timelineData = {
    "1914": { title: "L'assassinio della Belle Époque", text: "L'attentato di Sarajevo del 28 giugno fa crollare l'equilibrio europeo." },
    "1915": { title: "L'Intervento Italiano", text: "L'Italia entra in guerra il 24 Maggio contro l'Austria-Ungheria." },
    "1916": { title: "L'Inferno di Verdun", text: "Battaglie di logoramento senza precedenti sul fronte francese." },
    "1917": { title: "La Svolta Mondiale", text: "Gli Stati Uniti entrano in guerra, la Russia si ritira. Caporetto." },
    "1918": { title: "La Fine dei Giganti", text: "Vittorio Veneto sancisce la vittoria italiana. Armistizio a novembre." },
    "1919": { title: "Le Macerie di Versailles", text: "I trattati di pace ridisegnano i confini del mondo moderno." }
};

document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const year = this.getAttribute('href').replace('#', '');
        const content = document.getElementById('timeline-content');
        content.classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('dynamic-year').innerText = year;
            document.getElementById('dynamic-title').innerText = timelineData[year].title;
            document.getElementById('dynamic-text').innerHTML = timelineData[year].text;
            content.classList.remove('fade-out');
        }, 500);
    });
});

// 4. QUIZ (Estratto)
let score = 0;
function startQuiz() {
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '<button class="btn-main" onclick="location.reload()">Sviluppo Quiz in corso... Ricarica</button>';
}

function saveMessage() {
    alert("Messaggio salvato nell'archivio di Gabriele Alari.");
}
