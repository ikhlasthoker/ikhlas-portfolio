/* ==========================================================================
   IKHLAS HASSAN — PREMIUM PORTFOLIO
   script.js — All interactivity & animation logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     0. INIT AOS
  ============================================================ */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }

  /* ============================================================
     1. LOADING SCREEN
  ============================================================ */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 900);
  });

  /* ============================================================
     2. CUSTOM CURSOR
  ============================================================ */
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');
  const isTouch = window.matchMedia('(hover: none)').matches;

  if (!isTouch && cursorDot && cursorOutline) {
    let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

      // mouse spotlight follows too
      const spotlight = document.getElementById('mouseSpotlight');
      if (spotlight) {
        spotlight.style.left = `${mouseX}px`;
        spotlight.style.top = `${mouseY}px`;
      }
    });

    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;
      requestAnimationFrame(animateOutline);
    };
    animateOutline();

    const hoverTargets = document.querySelectorAll('a, button, .tilt-card, input, textarea');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovering'));
    });
  } else {
    cursorDot?.remove();
    cursorOutline?.remove();
  }

  /* ============================================================
     3. SCROLL PROGRESS BAR
  ============================================================ */
  const progressBar = document.getElementById('scrollProgressBar');
  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;
  };
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  /* ============================================================
     4. NAVBAR: scroll state, mobile toggle, active link
  ============================================================ */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');

  const updateNavbarState = () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', updateNavbarState, { passive: true });

  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinkItems.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // Active link highlighting via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkItems.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
  sections.forEach((sec) => navObserver.observe(sec));

  /* ============================================================
     5. TYPING ANIMATION
  ============================================================ */
  const typingText = document.getElementById('typingText');
  const roles = [
    'Full Stack Developer',
    'Android Developer',
    'Creative Designer',
    'Video Editor',
    'AI Enthusiast',
  ];
  let roleIndex = 0, charIndex = 0, isDeleting = false;

  function typeLoop() {
    if (!typingText) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingText.textContent = currentRole.substring(0, charIndex);

    let speed = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1600;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(typeLoop, speed);
  }
  typeLoop();

  /* ============================================================
     6. SKILL BARS — animate on scroll into view
  ============================================================ */
  const skillItems = document.querySelectorAll('.skill-item');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.skill-bar-fill');
        const percent = entry.target.getAttribute('data-percent');
        if (fill) fill.style.width = `${percent}%`;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillItems.forEach((item) => skillObserver.observe(item));

  /* ============================================================
     7. ANIMATED COUNTERS (STATS)
  ============================================================ */
  const statNumbers = document.querySelectorAll('.stat-number');
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const value = Math.floor(eased * target);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = `${target}${suffix}`;
    };
    requestAnimationFrame(step);
  };

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach((el) => statObserver.observe(el));

  /* ============================================================
     8. MAGNETIC BUTTONS
  ============================================================ */
  const magneticButtons = document.querySelectorAll('.magnetic');
  magneticButtons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  /* ============================================================
     9. RIPPLE EFFECT ON BUTTONS
  ============================================================ */
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ============================================================
     10. 3D TILT ON CARDS
  ============================================================ */
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -8;
      const rotateY = ((x - rect.width / 2) / rect.width) * 8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  /* ============================================================
     11. BACK TO TOP BUTTON
  ============================================================ */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  }, { passive: true });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ============================================================
     12. CONTACT FORM (front-end only demo handling)
  ============================================================ */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();

    formNote.textContent = `Thanks ${name || 'there'} — your message is ready to send. Connect a backend or mail service to deliver it.`;
    contactForm.reset();

    setTimeout(() => { formNote.textContent = ''; }, 6000);
  });

  /* ============================================================
     13. FOOTER YEAR
  ============================================================ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============================================================
     14. GSAP SCROLL-TRIGGERED SECTION HEADS (subtle parallax)
  ============================================================ */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.section-head').forEach((head) => {
      gsap.fromTo(
        head,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: head,
            start: 'top 85%',
          },
        }
      );
    });

    // Parallax on hero blobs
    gsap.to('.blob-1', { y: 80, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
    gsap.to('.blob-2', { y: -60, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
  }

  /* ============================================================
     15. PARTICLE BACKGROUND (canvas)
  ============================================================ */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;

    const colors = ['#4f7cff', '#8b5cf6', '#22d3ee', '#ec4899'];

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function createParticles() {
      const count = Math.min(70, Math.floor((width * height) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
      }));
    }
    createParticles();
    window.addEventListener('resize', createParticles);

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      // connecting lines for nearby particles
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  /* ============================================================
     16. DOWNLOAD CV — graceful placeholder handling
  ============================================================ */
  const downloadCvBtn = document.getElementById('downloadCvBtn');
  downloadCvBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Add your resume file at assets/Ikhlas-Hassan-CV.pdf and link it here to enable downloads.');
  });

  /* ============================================================
     17. LIQUID GLASS — mouse-tracked highlight + conic border
  ============================================================ */
  if (!isTouch) {
    const liquidEls = document.querySelectorAll('.glass-card, .glass-panel');
    liquidEls.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
        const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--mx', `${xPercent}%`);
        el.style.setProperty('--my', `${yPercent}%`);
      });
      el.addEventListener('mouseenter', () => el.classList.add('liquid-active'));
      el.addEventListener('mouseleave', () => el.classList.remove('liquid-active'));
    });
  }

});
