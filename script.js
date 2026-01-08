// 1. GESTIONE CURSORE (Solo dispositivi con mouse)
const dot = document.querySelector('.cursor-dot');
if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
        dot.style.display = 'block';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
    });
}

// 2. REVEAL ANIMATION
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-title').forEach(el => observer.observe(el));

// 3. LOGICA CRONOLOGIA DINAMICA
const timelineData = {
    "1914": { title: "L'Eclissi d'Europa", text: "Le potenze mondiali scivolano nel baratro dopo lo sparo di Sarajevo." },
    "1915": { title: "Il Grido del Fronte", text: "L'Italia rompe gli indugi ed entra nel conflitto il 24 Maggio." },
    "1916": { title: "L'Attrito delle Anime", text: "Verdun e la Somme: la guerra diventa un'industria del massacro." },
    "1917": { title: "Il Punto di Rottura", text: "La rivoluzione russa e l'ingresso USA cambiano gli equilibri mondiali." },
    "1918": { title: "L'Alba della Pace", text: "I giganti cadono. Vittorio Veneto sancisce la fine dell'agonia." },
    "1919": { title: "Cenere e Trattati", text: "A Versailles si ridisegna il mondo, ma restano ferite aperte." }
};

document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const year = this.getAttribute('href').replace('#', '');
        const content = document.getElementById('timeline-content');
        
        content.style.opacity = '0';
        content.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            document.getElementById('dynamic-year').innerText = year;
            document.getElementById('dynamic-title').innerText = timelineData[year].title;
            document.getElementById('dynamic-text').innerText = timelineData[year].text;
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 300);
    });
});

// 4. QUIZ (Base per prova)
function startQuiz() {
    alert("Test in fase di attivazione per Gabriele Alari.");
}
