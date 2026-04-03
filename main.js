/**
 * Bhavesh Naik — Portfolio JavaScript
 * Author: Bhavesh Naik
 * Description: All interactive behaviour for the portfolio website.
 * Sections:
 *   01. Starfield Canvas
 *   02. Theme Toggle (Dark / Light)
 *   03. Hamburger / Mobile Navigation
 *   04. Active Nav Link (IntersectionObserver)
 *   05. Navbar Scroll Effect
 *   06. Typed.js Initialization
 *   07. AOS (Animate on Scroll) Initialization
 *   08. Skill Progress Bars
 *   09. Contact Form Validation
 *   10. Scroll-to-Top Button
 */

/* ─── 01. Starfield Canvas ───────────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [], W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    init();
  }

  function init() {
    stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        o: Math.random(),
        s: Math.random() * 0.3 + 0.1,
        d: Math.random() > 0.5 ? 1 : -1
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.o += s.s * s.d * 0.006;
      if (s.o > 1 || s.o < 0.05) s.d *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + s.o.toFixed(2) + ')';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
})();


/* ─── 02. Theme Toggle (Dark / Light) ───────────────────────────────────── */
(function () {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  // Read saved preference, default to dark
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    if (next === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('portfolio-theme', next);
  });
})();


/* ─── 03. Hamburger / Mobile Navigation ─────────────────────────────────── */
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  if (!hamburger || !mobileNav) return;

  function toggleMenu(force) {
    const isOpen = force !== undefined ? force : !hamburger.classList.contains('open');
    hamburger.classList.toggle('open', isOpen);
    mobileNav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleMenu());

  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(false);
  });
})();


/* ─── 04. Active Nav Link (IntersectionObserver) ─────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(section => observer.observe(section));
})();


/* ─── 05. Navbar Scroll Effect ───────────────────────────────────────────── */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(5,5,16,0.97)';
    } else {
      navbar.style.background = '';
    }
  }, { passive: true });
})();


/* ─── 06. Typed.js Initialization ───────────────────────────────────────── */
(function () {
  // Typed.js is loaded via CDN. Retry on load if needed.
  function initTyped() {
    if (typeof Typed === 'undefined') return;
    const el = document.getElementById('typed-output');
    if (!el) return;
    new Typed('#typed-output', {
      strings: [
        'Machine Learning Engineer',
        'AI Systems Developer',
        'Data Scientist',
        'NLP Specialist',
        'RAG & LLM Builder'
      ],
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 2000,
      loop: true,
      cursorChar: '|'
    });
  }

  // Try immediately, then after window load (CDN might not have loaded yet)
  initTyped();
  window.addEventListener('load', initTyped);
})();


/* ─── 07. AOS (Animate on Scroll) Initialization ─────────────────────────── */
(function () {
  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 700,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic'
      });
    }
  });
})();


/* ─── 08. Skill Progress Bars ────────────────────────────────────────────── */
(function () {
  const fills = document.querySelectorAll('.progress-fill[data-width]');
  if (!fills.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        // Small delay for stagger effect
        const delay = parseInt(fill.dataset.delay || '0', 10);
        setTimeout(() => {
          fill.style.width = fill.dataset.width;
        }, delay);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => observer.observe(fill));
})();


/* ─── 09. Contact Form Validation ────────────────────────────────────────── */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const msgInput = document.getElementById('form-message');
  const submitBtn = document.getElementById('form-submit');

  // Helper: show/hide error
  function setError(input, errorEl, msg) {
    if (msg) {
      input.classList.add('error');
      errorEl.textContent = msg;
      errorEl.classList.add('visible');
    } else {
      input.classList.remove('error');
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Clear error on input
  [nameInput, emailInput, msgInput].forEach(el => {
    if (!el) return;
    el.addEventListener('input', () => {
      el.classList.remove('error');
      const errEl = el.parentElement.querySelector('.field-error');
      if (errEl) errEl.classList.remove('visible');
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    // Validate name
    const nameErr = form.querySelector('#name-error');
    if (!nameInput.value.trim()) {
      setError(nameInput, nameErr, 'Name is required.');
      valid = false;
    } else {
      setError(nameInput, nameErr, '');
    }

    // Validate email
    const emailErr = form.querySelector('#email-error');
    if (!emailInput.value.trim()) {
      setError(emailInput, emailErr, 'Email is required.');
      valid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      setError(emailInput, emailErr, 'Please enter a valid email address.');
      valid = false;
    } else {
      setError(emailInput, emailErr, '');
    }

    // Validate message
    const msgErr = form.querySelector('#message-error');
    if (!msgInput.value.trim()) {
      setError(msgInput, msgErr, 'Message is required.');
      valid = false;
    } else if (msgInput.value.trim().length < 20) {
      setError(msgInput, msgErr, 'Message must be at least 20 characters.');
      valid = false;
    } else {
      setError(msgInput, msgErr, '');
    }

    if (!valid) return;

    // Simulate sending (no backend)
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message →';
      showToast('✓  Message sent! I\'ll get back to you soon.');
    }, 1200);
  });
})();


/* ─── 10. Scroll-to-Top Button ───────────────────────────────────────────── */
(function () {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ─── Utility: Show Toast Notification ──────────────────────────────────── */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}
