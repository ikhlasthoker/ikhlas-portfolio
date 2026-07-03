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

  /* ============================================================
     18. PROJECT DETAIL MODAL
  ============================================================ */
  const projectsData = [
    {
      icon: 'fa-solid fa-store',
      kind: 'Telegram Bot',
      kindClass: 'kind-telegram',
      title: 'The Trusted Seller Bot',
      desc: 'A full digital-goods Telegram store built on Telethon, upgraded through three major versions with trial products, broadcast messaging and admin content controls.',
      features: [
        'Trial product management so buyers can test before purchase',
        'Broadcast system for announcements to all users',
        'Slick 2-per-row shop UI inside Telegram itself',
        'Admin panel for stock, pricing and order control',
      ],
      stack: ['Python', 'Telethon', 'SQLite'],
      links: [
        { label: 'Open in Telegram', href: 'https://t.me/Ikhlasseller', icon: 'fa-brands fa-telegram', style: 'telegram' },
        { label: 'Source', href: '#', icon: 'fa-brands fa-github', style: 'outline' },
      ],
    },
    {
      icon: 'fa-solid fa-server',
      kind: 'Automation Bot',
      kindClass: 'kind-bot',
      title: 'Telegram Server Monitor',
      desc: 'A 17-file production-grade monitoring bot with a full SQLite backend and a psutil / proc fallback so it runs reliably even inside Termux.',
      features: [
        '20+ admin dashboard features in a single bot',
        'Uptime analytics with live alerting on downtime',
        'psutil with /proc fallback for Termux compatibility',
        'Modular 17-file architecture for easy maintenance',
      ],
      stack: ['Telethon', 'psutil', 'aiosqlite'],
      links: [
        { label: 'Source', href: '#', icon: 'fa-brands fa-github', style: 'outline' },
      ],
    },
    {
      icon: 'fa-solid fa-cube',
      kind: 'Web Platform',
      kindClass: 'kind-web',
      title: '3D Portfolio Platform',
      desc: 'A full-stack Next.js 14 + TypeScript portfolio with a PostgreSQL/Prisma backend, JWT-protected admin dashboard, and a 3D bot/node-network hero scene built with Three.js.',
      features: [
        '3D hero scene rendered with Three.js',
        'JWT-protected admin dashboard for content control',
        'Full CRUD system backed by PostgreSQL + Prisma',
        'Smooth page transitions with Framer Motion',
      ],
      stack: ['Next.js', 'Prisma', 'Framer Motion'],
      links: [
        { label: 'Live Demo', href: '#', icon: 'fa-solid fa-arrow-up-right-from-square', style: 'primary' },
        { label: 'Source', href: '#', icon: 'fa-brands fa-github', style: 'outline' },
      ],
    },
    {
      icon: 'fa-solid fa-chart-line',
      kind: 'Telegram Bot',
      kindClass: 'kind-bot-pink',
      title: 'SMM Panel Bot',
      desc: 'A social media growth bot supporting 73 services across Instagram, Facebook, YouTube and Telegram, with a QR-based UPI payment flow tailored for INR pricing.',
      features: [
        '73 services across 4 major platforms',
        'QR-code UPI payment flow built for INR pricing',
        'Order tracking with automatic status updates',
        'SQLite-backed order and user history',
      ],
      stack: ['python-telegram-bot', 'QR Pay', 'SQLite'],
      links: [
        { label: 'Source', href: '#', icon: 'fa-brands fa-github', style: 'outline' },
      ],
    },
    {
      icon: 'fa-solid fa-folder-open',
      kind: 'Telegram Bot',
      kindClass: 'kind-telegram',
      title: 'Ikhlas Files Store Bot',
      desc: 'A deep-link file delivery bot with force-subscribe gating so files only unlock once a user joins the required channel, plus a full admin control panel.',
      features: [
        'Deep-link file delivery straight from Telegram',
        'Force-subscribe gating before file access',
        'Full admin panel for uploads and permissions',
        'Built and run entirely from Termux on Android',
      ],
      stack: ['Pyrogram', 'MongoDB', 'Termux'],
      links: [
        { label: 'Source', href: '#', icon: 'fa-brands fa-github', style: 'outline' },
      ],
    },
    {
      icon: 'fa-solid fa-gamepad',
      kind: 'Gaming Commerce',
      kindClass: 'kind-game',
      title: 'Free Fire Panel Store',
      desc: 'An e-commerce Telegram bot for Free Fire in-game top-ups, with a complete order flow and manual admin approval step before fulfillment.',
      features: [
        'Full e-commerce order flow inside Telegram',
        'Admin approval step before order fulfillment',
        'Broadcast features for promos and restocks',
        'Built for real customers buying real top-ups',
      ],
      stack: ['Python', 'Telegram Bot API', 'Admin Flow'],
      links: [
        { label: 'Source', href: '#', icon: 'fa-brands fa-github', style: 'outline' },
      ],
    },
  ];

  const projectModal = document.getElementById('projectModal');
  const modalIcon = document.getElementById('modalIcon');
  const modalKind = document.getElementById('modalKind');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalStack = document.getElementById('modalStack');
  const modalActions = document.getElementById('modalActions');
  const projectModalBackdrop = document.getElementById('projectModalBackdrop');
  const projectModalClose = document.getElementById('projectModalClose');

  function openProjectModal(index) {
    const data = projectsData[index];
    if (!data || !projectModal) return;

    modalIcon.className = data.icon;
    modalKind.textContent = data.kind;
    modalKind.className = `project-kind ${data.kindClass}`;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    modalFeatures.innerHTML = data.features
      .map((f) => `<li><i class="fa-solid fa-check"></i><span>${f}</span></li>`)
      .join('');

    modalStack.innerHTML = data.stack.map((s) => `<span>${s}</span>`).join('');

    modalActions.innerHTML = data.links
      .map((link) => {
        const btnClass =
          link.style === 'telegram' ? 'btn btn-telegram' :
          link.style === 'primary' ? 'btn btn-primary btn-glow' :
          'btn btn-outline';
        const target = link.href.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
        return `<a href="${link.href}"${target} class="${btnClass}"><i class="${link.icon}"></i><span>${link.label}</span></a>`;
      })
      .join('');

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal?.classList.remove('open');
    projectModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }

  document.querySelectorAll('.project-details-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-project'), 10);
      openProjectModal(index);
    });
  });

  projectModalBackdrop?.addEventListener('click', closeProjectModal);
  projectModalClose?.addEventListener('click', closeProjectModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });

});
