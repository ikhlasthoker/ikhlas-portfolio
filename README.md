# Ikhlas Hassan — Premium Portfolio Website

Futuristic glassmorphism portfolio built with vanilla HTML, CSS &amp; JavaScript, plus AOS and GSAP for animation.

## 📁 File Structure
```
ikhlas-portfolio/
├── index.html          → Poori site ek hi page pe (Home, About, Skills, Services, Projects, Journey, Contact — sections hain, anchor links se navigate hote hain)
├── style.css            → Core design system (colors, glass cards, layout)
├── animations.css       → Saare keyframes (fade, zoom, glow, float, blob, ripple)
├── responsive.css       → Tablet + mobile breakpoints
├── script.js             → Saari interactivity (typing text, particles, tilt cards, counters, etc.)
└── assets/
    ├── images/og-cover.svg   → Social share preview image
    ├── icons/favicon.svg      → Browser tab icon
    └── fonts/                 → (empty — Google Fonts CDN se load ho rahe hain)
```

> **Note:** Maine ye site ek single page (`index.html`) ke andar sections ke sath banayi hai, alag-alag `about.html` / `projects.html` files ki jagah — ye modern portfolios ka standard approach hai (smooth scroll navigation, faster load, better mobile UX). Agar aap ko genuinely alag pages chahiye (multi-page routing), bata dena, wo bhi bana dunga.

## 🚀 Kaise Use Karein
1. Poora `ikhlas-portfolio` folder kisi bhi jagah extract karein.
2. `index.html` ko browser mein directly open karein — koi build step nahi chahiye.
3. Termux mein test karna ho to:
   ```bash
   cd ikhlas-portfolio
   python -m http.server 8080
   ```
   Phir browser mein `http://localhost:8080` open karein.

## ✏️ Customize Karne Ke Liye
- **CV Download:** Apni resume PDF `assets/` mein daal kar `index.html` mein `#downloadCvBtn` ke `href` ko us file ka path bana dein, aur `script.js` se woh `alert()` wala placeholder hata dein.
- **Social Links:** `index.html` mein saare `social-chip` aur footer links `href="#"` hain — apne GitHub/LinkedIn/Instagram/Telegram/YouTube URLs se replace karein.
- **Project Images:** Filhaal gradient icon placeholders hain (`.project-image-placeholder`). Real screenshots ke liye us div ko `<img src="assets/images/your-project.jpg">` se replace karein.
- **Contact Form:** Abhi form sirf front-end demo hai (koi backend nahi). Real submissions ke liye Formspree, EmailJS, ya apna backend endpoint `script.js` ke `contactForm` submit handler mein add karein.
- **Colors:** Sab kuch `style.css` ke top mein `:root` variables se control hota hai — `--blue`, `--purple`, `--cyan`, `--pink` change karke poori site ka theme badal sakte hain.

## 🎨 Features
- Glassmorphism UI, animated gradient blobs, particle canvas background
- Custom cursor + mouse spotlight (desktop only, auto-disabled on touch)
- Typing animation hero role text
- Scroll-reveal animations (AOS) + GSAP parallax
- Animated skill progress bars &amp; stat counters (trigger on scroll)
- 3D tilt cards, magnetic buttons, ripple click effect
- Fully responsive: mobile, tablet, desktop
- SEO ready: meta tags, Open Graph, favicon

## 🛠 Tech Used
HTML5 • CSS3 • JavaScript (vanilla) • AOS • GSAP + ScrollTrigger • Font Awesome 6 • Google Fonts (Space Grotesk, Inter, JetBrains Mono)

---
Designed &amp; Developed by **Ikhlas Hassan**
