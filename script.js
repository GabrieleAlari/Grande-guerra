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

// 3. LOGICA LINEA DEL TEMPO
const timelineData = {
    "1914": { title: "L'Eclissi d'Europa", text: "L'attentato di Sarajevo del 28 giugno fa crollare l'equilibrio delle potenze." },
    "1915": { title: "Il Grido del Fronte", text: "L'Italia rompe la neutralità ed entra nel conflitto il 24 Maggio." },
    "1916": { title: "L'Attrito delle Anime", text: "Verdun e la Somme: la guerra diventa un'industria del massacro tecnologico." },
    "1917": { title: "Il Punto di Rottura", text: "La rivoluzione russa e l'ingresso USA cambiano per sempre gli equilibri." },
    "1918": { title: "L'Alba della Pace", text: "I grandi imperi cadono. Vittorio Veneto sancisce la fine dell'agonia italiana." },
    "1919": { title: "Cenere e Trattati", text: "A Versailles si ridisegna la mappa del mondo, ma restano ferite aperte." }
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

// 4. QUIZ BASE
function startQuiz() { alert("Test pronto per Gabriele Alari."); }
