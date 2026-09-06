// ============================ RAMNIVAS UPGRADED — MAIN JS ============================

// ---- Scroll Progress Bar ----
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = progress + '%';
});

// ---- Navbar scroll effect & active link ----
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ---- Mobile Menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ---- Smooth scrolling ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    }
  });
});

// ---- Parallax Collage Elements ----
const collageElements = document.querySelectorAll('[data-speed]');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.scrollY;
      collageElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed'));
        el.style.transform = `translateY(${scrolled * speed * 0.15}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
});

// ---- Tilt effect on polaroids (mouse follow) ----
const polaroids = document.querySelectorAll('[data-tilt]');

document.addEventListener('mousemove', (e) => {
  polaroids.forEach(polaroid => {
    const rect = polaroid.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / 30;
    const deltaY = (e.clientY - centerY) / 30;
    
    const currentRotation = parseFloat(getComputedStyle(polaroid).transform.match(/rotate\(([^)]+)\)/)?.[1] || 0);
    
    polaroid.style.transform = `rotate(${currentRotation}deg) translate(${deltaX}px, ${deltaY}px)`;
  });
});

// ---- Scroll Reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal-up, .reveal-stagger').forEach(el => {
  revealObserver.observe(el);
});

// ---- Stagger animation delays ----
document.querySelectorAll('.reveal-stagger').forEach((el, index) => {
  el.style.transitionDelay = `${index * 0.1}s`;
});

// ---- Header line expand on reveal ----
const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const lines = entry.target.querySelectorAll('.header-line');
      lines.forEach(line => {
        line.style.width = '100px';
      });
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.section-header-vintage').forEach(header => {
  headerObserver.observe(header);
  const lines = header.querySelectorAll('.header-line');
  lines.forEach(line => {
    line.style.width = '80px';
  });
});

// ---- Lightbox ----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.sweet-card-vintage .card-image-v img, .namkeen-image-wrap img').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    if (lightbox && lightboxImg) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  });
}

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classListremove('open');
      document.body.style.overflow = '';
    }
  });
}

// Keyboard close lightbox
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ---- Console log ----
console.log('Ramnivas Sweets — Upgraded Vintage Theme Loaded!');
