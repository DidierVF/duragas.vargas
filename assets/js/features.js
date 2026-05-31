/* ── Hero Carousel ───────────────────────────────────────────── */
(function () {
    const slides = document.querySelectorAll('.hero-slide');
    const dots   = document.querySelectorAll('.hero-dot');
    let current  = 0;
    let timer;

    function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    }

    function autoPlay() {
    timer = setInterval(() => goTo(current + 1), 5000);
    }

    dots.forEach(d => {
    d.addEventListener('click', () => {
        clearInterval(timer);
        goTo(+d.dataset.idx);
        autoPlay();
    });
    });

    autoPlay();
})();

/* ── Mobile nav ──────────────────────────────────────────────── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    });
});

/* ── Active nav link on scroll ───────────────────────────────── */
const sections    = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 80;
    sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + sec.id);
        });
    }
    });
}, { passive: true });

/* ── Scroll-to-top ───────────────────────────────────────────── */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 400);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Horizontal card-row scroll ─────────────────────────────── */
function scrollRow(id, dir) {
    const el = document.getElementById(id);
    el.scrollBy({ left: dir * 280, behavior: 'smooth' });
}

/* ── Contact form ────────────────────────────────────────────── */
function handleForm(e) {
    e.preventDefault();
    const success = document.getElementById('formSuccess');
    success.style.display = 'block';
    e.target.reset();
    setTimeout(() => { success.style.display = 'none'; }, 5000);
}

/* ── Intersection Observer – fade-up animations ─────────────── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(en => {
    if (en.isIntersecting) {
        en.target.classList.add('visible');
        observer.unobserve(en.target);
    }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));