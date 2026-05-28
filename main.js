/* ============================================================
   SURYANSH SINHA — PORTFOLIO SCRIPTS
   main.js
   ============================================================ */

/* ---- STARFIELD -------------------------------------------- */
(function () {
  const sf = document.getElementById('starfield');
  const count = Math.min(70, Math.floor(window.innerWidth * window.innerHeight / 12000));
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() < 0.75 ? 1 : Math.random() < 0.6 ? 1.5 : 2;
    const minOp = (Math.random() * 0.15 + 0.1).toFixed(3);
    const maxOp = (Math.random() * 0.35 + 0.35).toFixed(3);
    const dur = (Math.random() * 4 + 3).toFixed(1);
    const delay = (Math.random() * 6).toFixed(1);
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;` +
      `width:${size}px;height:${size}px;` +
      `--d:${dur}s;--delay:${delay}s;--min:${minOp};--max:${maxOp}`;
    sf.appendChild(s);
  }

  // AstroFit thumbnail mini-stars
  const pfStars = document.getElementById('pf-stars-1');
  if (pfStars) {
    for (let i = 0; i < 55; i++) {
      const s = document.createElement('div');
      s.className = 'pf-star';
      const sz = Math.random() < 0.8 ? 1 : 1.5;
      s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;` +
        `width:${sz}px;height:${sz}px;` +
        `--d:${(3 + Math.random() * 4).toFixed(1)}s;--delay:${(Math.random() * 5).toFixed(1)}s;` +
        `--min:0.15;--max:0.6`;
      pfStars.appendChild(s);
    }
  }
})();

/* ---- LOADER ----------------------------------------------- */
(function () {
  const pct = document.getElementById('lpct');
  let n = 0;
  const t = setInterval(() => {
    n = Math.min(n + (Math.random() * 16 | 0), 99);
    if (pct) pct.textContent = n + '%';
  }, 80);
  window.addEventListener('load', () => {
    clearInterval(t);
    if (pct) pct.textContent = '100%';
    setTimeout(() => document.getElementById('loader').classList.add('out'), 500);
  });
})();

/* ---- CUSTOM CURSOR ---------------------------------------- */
(function () {
  if (window.matchMedia('(max-width:768px)').matches) return;
  const cur = document.getElementById('cursor');
  const tr = document.getElementById('cursor-trail');
  if (!cur || !tr) return;

  let mx = 0, my = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';
  });
  (function lerp() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    tr.style.left = tx + 'px';
    tr.style.top = ty + 'px';
    requestAnimationFrame(lerp);
  })();

  const hoverTargets = 'a,button,.project-card,.contact-card,.about-card,.exp-item,.timeline-card,.gh-card,.gh-arrow';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
  });
  document.addEventListener('mousedown', () => document.body.classList.add('cc'));
  document.addEventListener('mouseup', () => document.body.classList.remove('cc'));
})();

/* ---- SCROLL PROGRESS + NAV -------------------------------- */
const prog = document.getElementById('progress-bar');
const nav = document.getElementById('nav');
const scrollHint = document.querySelector('.scroll-hint');
window.addEventListener('scroll', () => {
  const d = document.documentElement;
  prog.style.width = (d.scrollTop / (d.scrollHeight - d.clientHeight) * 100) + '%';
  nav.classList.toggle('scrolled', d.scrollTop > 30);
  
  // Fade out scroll hint when user scrolls
  if (scrollHint) {
    if (d.scrollTop > 100) {
      scrollHint.style.opacity = '0';
      scrollHint.style.pointerEvents = 'none';
    } else {
      scrollHint.style.opacity = '';
      scrollHint.style.pointerEvents = '';
    }
  }
}, { passive: true });

/* ---- MOBILE NAV ------------------------------------------- */
const hamBtn = document.getElementById('ham-btn');
const navLinks = document.getElementById('nav-links');
hamBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navLinks.classList.toggle('nav-links-desktop', !open);
  hamBtn.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navLinks.classList.add('nav-links-desktop');
    hamBtn.setAttribute('aria-expanded', 'false');
  });
});

/* ---- SCROLL REVEAL ---------------------------------------- */
const revEls = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('visible');
      revObs.unobserve(en.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });
revEls.forEach(el => revObs.observe(el));

/* ---- MOUSE LIGHT IN HERO ---------------------------------- */
const ml = document.getElementById('mouse-light');
const heroSection = document.getElementById('hero');
if (ml && heroSection) {
  heroSection.addEventListener('mousemove', e => {
    const r = heroSection.getBoundingClientRect();
    ml.style.left = (e.clientX - r.left) + 'px';
    ml.style.top = (e.clientY - r.top) + 'px';
  }, { passive: true });
}

/* ---- HERO PARTICLE CANVAS --------------------------------- */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  let mx = 0.5, my = 0.5;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); init(); }, { passive: true });

  function init() {
    const n = Math.min(55, Math.floor(W * H / 13000));
    particles = [];
    for (let i = 0; i < n; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.1 + 0.15,
        a: Math.random() * 0.35 + 0.05,
        p: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.016 + 0.005
      });
    }
  }
  init();

  heroSection.addEventListener('mousemove', e => {
    const r = e.currentTarget.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width;
    my = (e.clientY - r.top) / r.height;
  }, { passive: true });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.p += p.sp;
      p.x += p.vx + (mx - 0.5) * 0.07;
      p.y += p.vy + (my - 0.5) * 0.05;
      if (p.x < -8) p.x = W + 8;
      if (p.x > W + 8) p.x = -8;
      if (p.y < -8) p.y = H + 8;
      if (p.y > H + 8) p.y = -8;
      const a = p.a * (0.55 + 0.45 * Math.sin(p.p));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(176,136,255,${a})`;
      ctx.fill();
    });
    // Constellation lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 105) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(90,158,255,${(1 - d / 105) * 0.035})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

/* ---- PROJECT CARD GLOW ------------------------------------ */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });
});

/* ---- GITHUB CAROUSEL -------------------------------------- */
const ICONS = {
  'C++': '⚙️', 'C#': '🎮', 'Python': '🐍', 'JavaScript': '🌐',
  'HTML': '🌐', 'CSS': '🎨', 'TypeScript': '🌐', 'GDScript': '🕹️',
  'C': '🔧', 'default': '📦'
};
const SKIP = ['astrofit', 'sinxcos07', 'hidden-collector'];
let ghRepos = [], carouselIdx = 0;

const carousel = document.getElementById('gh-carousel');
const prevBtn = document.getElementById('gh-prev');
const nextBtn = document.getElementById('gh-next');
const cardsVisible = () => window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;

function updateCarousel() {
  if (!ghRepos.length) return;
  const cardW = carousel.children[0]?.offsetWidth || 280;
  carousel.style.transform = `translateX(-${carouselIdx * (cardW + 14)}px)`;
  const maxIdx = ghRepos.length - cardsVisible();
  prevBtn.disabled = carouselIdx <= 0;
  nextBtn.disabled = carouselIdx >= maxIdx;
}

prevBtn.addEventListener('click', () => {
  if (carouselIdx > 0) { carouselIdx--; updateCarousel(); }
});
nextBtn.addEventListener('click', () => {
  const maxIdx = ghRepos.length - cardsVisible();
  if (carouselIdx < maxIdx) { carouselIdx++; updateCarousel(); }
});
window.addEventListener('resize', updateCarousel, { passive: true });

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

async function fetchGH() {
  try {
    const res = await fetch('https://api.github.com/users/sinxcos07/repos?sort=updated&per_page=30&type=public');
    if (!res.ok) throw new Error('API error');
    const all = await res.json();
    ghRepos = all.filter(r => !r.fork && !SKIP.some(s => r.name.toLowerCase().includes(s)));

    document.getElementById('gh-loading').remove();
    if (!ghRepos.length) {
      document.querySelector('.gh-section').style.display = 'none';
      return;
    }
    document.getElementById('gh-count').textContent = `· ${ghRepos.length} repos`;

    ghRepos.forEach(repo => {
      const icon = ICONS[repo.language] || ICONS['default'];
      const card = document.createElement('div');
      card.className = 'gh-card';
      card.innerHTML = `
        <div class="gh-card-top">
          <div class="gh-card-icon">${icon}</div>
          <div class="gh-card-name">${esc(repo.name.replace(/[-_]/g, ' '))}</div>
        </div>
        <div class="gh-card-desc">${esc(repo.description || 'No description yet.')}</div>
        <div class="gh-card-meta">
          ${repo.language ? `<span class="gh-lang">${esc(repo.language)}</span>` : ''}
          ${repo.stargazers_count > 0 ? `<span class="gh-stars">★ ${repo.stargazers_count}</span>` : ''}
          <span class="gh-lang" style="color:var(--blue);font-size:11px">↗ View</span>
        </div>`;
      card.addEventListener('click', () => window.open(repo.html_url, '_blank', 'noopener'));
      card.addEventListener('mouseenter', () => document.body.classList.add('ch'));
      card.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
      carousel.appendChild(card);
    });

    prevBtn.disabled = true;
    nextBtn.disabled = ghRepos.length <= cardsVisible();
    updateCarousel();
  } catch (e) {
    const el = document.getElementById('gh-loading');
    if (el) el.textContent = 'Could not load repos — visit github.com/sinxcos07';
  }
}
fetchGH();

/* ---- SMOOTH HASH SCROLL ----------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
