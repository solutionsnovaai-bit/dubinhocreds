/* =============================================
   DU BINHO CRED'S × IA — script.js FINAL
   ============================================= */
(function(){
  'use strict';

  /* ── LOADER ── */
  window.addEventListener('load', () => {
    setTimeout(() => {
      const l = document.getElementById('ldr');
      if (l) { l.classList.add('out'); setTimeout(() => l.remove(), 900); }
    }, 1400);
  });

  /* ── PARTICLES ── */
  const cv = document.getElementById('pts');
  if (cv) {
    const ctx = cv.getContext('2d');
    let W = cv.width = window.innerWidth, H = cv.height = window.innerHeight;
    window.addEventListener('resize', () => { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; });
    const N = window.innerWidth < 600 ? 28 : 55;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * .8 + .12,
      vx: (Math.random() - .5) * .17, vy: (Math.random() - .5) * .17,
      op: Math.random() * .22 + .04,
      gold: Math.random() > .3
    }));
    (function draw() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? `rgba(212,168,67,${p.op})` : `rgba(238,236,230,${p.op * .3})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
      requestAnimationFrame(draw);
    })();
  }

  /* ── NAV ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('on', window.scrollY > 40), { passive: true });

  /* ── SCROLL REVEAL ── */
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
    });
  }, { threshold: .1, rootMargin: '0px 0px -32px 0px' });
  document.querySelectorAll('.rv, .rv-left').forEach(el => ro.observe(el));

  /* ── DIVIDER DRAW ── */
  document.querySelectorAll('.div-inner').forEach(d => {
    const o = new IntersectionObserver(e => {
      if (e[0].isIntersecting) { d.style.width = '100%'; o.disconnect(); }
    }, { threshold: .5 });
    o.observe(d.parentElement);
  });

  /* ── RIPPLE ── */
  function addRipple(el) {
    el.style.position = 'relative'; el.style.overflow = 'hidden';
    el.addEventListener('click', function(e) {
      const r = this.getBoundingClientRect(), s = Math.max(r.width, r.height) * 1.5;
      const sp = document.createElement('span'); sp.className = 'rpl';
      sp.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s/2}px;top:${e.clientY - r.top - s/2}px`;
      this.appendChild(sp); setTimeout(() => sp.remove(), 700);
    });
  }
  document.querySelectorAll('.pl,.hb,.pl-btn,.btn-y,.btn-g,.nav-cta,.ig-card,.comp-row').forEach(addRipple);

  /* ── COMP TABLE ROW HIGHLIGHT ── */
  document.querySelectorAll('.comp-row').forEach(row => {
    row.addEventListener('mouseenter', () => {
      document.querySelectorAll('.comp-row').forEach(r => r.style.opacity = '.5');
      row.style.opacity = '1';
    });
    row.addEventListener('mouseleave', () => {
      document.querySelectorAll('.comp-row').forEach(r => r.style.opacity = '1');
    });
  });

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ── PLAN CARD TILT (desktop) ── */
  if (window.matchMedia('(min-width:900px)').matches) {
    document.querySelectorAll('.pl').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        card.style.transform = `perspective(800px) rotateY(${x * 3}deg) rotateX(${-y * 2}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

})();
