/**
 * MOHAMMED ADAM — PORTFOLIO SCRIPT
 * Vanilla JS · No frameworks · Fast & accessible
 * Features: Loader, Cursor, Typewriter, AOS, Counters,
 *           Skill bars, Nav, Theme, Form validation
 */

'use strict';

/* ================================================================
   1. UTILITY HELPERS
   ================================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);

/**
 * Debounce — limits how often a function fires
 * @param {Function} fn
 * @param {number} delay ms
 */
function debounce(fn, delay = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/* ================================================================
   2. LOADER
   ================================================================ */
function initLoader() {
  const loader = $('#loader');
  if (!loader) return;

  // Hide after page load (max 2s)
  const hideLoader = () => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  };

  document.body.style.overflow = 'hidden';

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 800);
  } else {
    on(window, 'load', () => setTimeout(hideLoader, 800));
    // Fallback — never block UI more than 2s
    setTimeout(hideLoader, 2000);
  }
}

/* ================================================================
   3. CUSTOM CURSOR (desktop only)
   ================================================================ */
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch devices

  const cursor = $('#cursor');
  const follower = $('#cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let raf;

  on(document, 'mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth follower with lerp
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    raf = requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover state on interactive elements
  const hoverEls = $$('a, button, [role="button"], input, textarea, .project-card, .skill-tag');
  hoverEls.forEach(el => {
    on(el, 'mouseenter', () => {
      cursor.classList.add('cursor--hover');
      follower.classList.add('cursor--hover');
    });
    on(el, 'mouseleave', () => {
      cursor.classList.remove('cursor--hover');
      follower.classList.remove('cursor--hover');
    });
  });

  // Hide cursor when leaving window
  on(document, 'mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });
  on(document, 'mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '0.6';
  });
}

/* ================================================================
   4. TYPEWRITER EFFECT
   ================================================================ */
function initTypewriter() {
  const el = $('#typewriter');
  if (!el) return;

  const phrases = [
    'AI Engineer',
    'Full-Stack Developer',
    'Deep Learning Practitioner',
    'Hackathon Winner 🏆',
    'Agentic AI Builder',
    'CS Undergraduate @ JNTUH'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let pause = false;

  function tick() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      charIdx--;
    } else {
      charIdx++;
    }

    el.textContent = current.substring(0, charIdx);

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === current.length) {
      // Pause at end of word
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      speed = 400;
    }

    setTimeout(tick, speed);
  }

  setTimeout(tick, 1200); // slight start delay after load
}

/* ================================================================
   5. ANIMATE ON SCROLL (lightweight AOS)
   ================================================================ */
function initAOS() {
  const elements = $$('[data-aos]');
  if (!elements.length) return;

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('aos-animate'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.aosDelay || 0);
          setTimeout(() => {
            entry.target.classList.add('aos-animate');
          }, delay);
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ================================================================
   6. COUNTER ANIMATION
   ================================================================ */
function initCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const duration = 1200;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ================================================================
   7. SKILL BARS ANIMATION
   ================================================================ */
function initSkillBars() {
  const bars = $$('.skill-bar__fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      const width = bar.dataset.width;
      // Small delay for stagger effect
      const idx = bars.indexOf(bar);
      setTimeout(() => {
        bar.style.width = width + '%';
      }, idx * 120);
      observer.unobserve(bar);
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

/* ================================================================
   8. HEADER — scroll behaviour & active nav link
   ================================================================ */
function initHeader() {
  const header = $('#header');
  if (!header) return;

  // Scroll class
  const handleScroll = debounce(() => {
    header.classList.toggle('scrolled', window.scrollY > 20);
    toggleBackToTop();
  }, 10);

  on(window, 'scroll', handleScroll, { passive: true });

  // Active nav link on scroll (Intersection Observer)
  const sections = $$('section[id]');
  const navLinks = $$('.nav__link, .mobile-menu__link');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: `-${Math.floor(window.innerHeight * 0.4)}px 0px -${Math.floor(window.innerHeight * 0.4)}px 0px` });

  sections.forEach(s => sectionObserver.observe(s));
}

/* ================================================================
   9. MOBILE MENU
   ================================================================ */
function initMobileMenu() {
  const btn = $('#hamburger');
  const menu = $('#mobileMenu');
  if (!btn || !menu) return;

  function toggleMenu(open) {
    btn.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  on(btn, 'click', () => toggleMenu(!btn.classList.contains('open')));

  // Close on link click
  $$('.mobile-menu__link').forEach(link => {
    on(link, 'click', () => toggleMenu(false));
  });

  // Close on outside click
  on(document, 'click', e => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !btn.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close on Escape
  on(document, 'keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) toggleMenu(false);
  });
}

/* ================================================================
   10. THEME TOGGLE (dark / light)
   ================================================================ */
function initTheme() {
  const btn = $('#themeToggle');
  const html = document.documentElement;

  // Load saved preference or system default
  const saved = localStorage.getItem('ma-theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (systemDark ? 'dark' : 'light');
  html.setAttribute('data-theme', theme);

  on(btn, 'click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('ma-theme', next);
  });

  // Listen for system changes
  on(window.matchMedia('(prefers-color-scheme: dark)'), 'change', e => {
    if (!localStorage.getItem('ma-theme')) {
      html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
}

/* ================================================================
   11. BACK TO TOP
   ================================================================ */
function toggleBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;
  btn.hidden = window.scrollY < 400;
}

function initBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;
  on(btn, 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ================================================================
   12. SMOOTH SCROLL (anchor links)
   ================================================================ */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    on(link, 'click', e => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '70');
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 10;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ================================================================
   13. CONTACT FORM
   ================================================================ */
function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;

  /**
   * Validate a single field
   * @returns {string} error message or ''
   */
  function validateField(field) {
    const val = field.value.trim();
    if (field.required && !val) return 'This field is required.';
    if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      return 'Please enter a valid email address.';
    }
    if (field.name === 'name' && val && val.length < 2) return 'Name must be at least 2 characters.';
    if (field.name === 'message' && val && val.length < 10) return 'Message must be at least 10 characters.';
    return '';
  }

  function showError(field, msg) {
    field.classList.toggle('error', !!msg);
    const errEl = field.closest('.form-group')?.querySelector('.form-error');
    if (errEl) errEl.textContent = msg;
  }

  // Live validation on blur
  $$('.form-input', form).forEach(field => {
    on(field, 'blur', () => showError(field, validateField(field)));
    on(field, 'input', () => {
      if (field.classList.contains('error')) showError(field, validateField(field));
    });
  });

  on(form, 'submit', e => {
    e.preventDefault();

    let isValid = true;
    $$('.form-input', form).forEach(field => {
      const err = validateField(field);
      if (err) isValid = false;
      showError(field, err);
    });

    if (!isValid) return;

    // Build mailto link (no backend needed for static site)
    const name = $('#name', form).value.trim();
    const email = $('#email', form).value.trim();
    const subject = $('#subject', form).value.trim();
    const message = $('#message', form).value.trim();

    const mailtoBody = `Hi Mohammed,\n\nMy name is ${name} (${email}).\n\n${message}`;
    const mailtoLink = `mailto:mohammedadam9373@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Visual feedback
    const btn = $('#submitBtn');
    const originalText = btn.querySelector('.btn__text').textContent;
    btn.querySelector('.btn__text').textContent = '✓ Opening email client...';
    btn.disabled = true;

    setTimeout(() => {
      btn.querySelector('.btn__text').textContent = originalText;
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

/* ================================================================
   14. FOOTER YEAR
   ================================================================ */
function initFooterYear() {
  const el = $('#footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ================================================================
   15. PROJECT CARD — TILT EFFECT (desktop)
   ================================================================ */
function initCardTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  $$('.project-card').forEach(card => {
    on(card, 'mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    on(card, 'mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ================================================================
   16. SKILLS SECTION — TAG HOVER SOUND EFFECT (visual only)
   ================================================================ */
function initSkillTagInteraction() {
  $$('.skill-tag').forEach(tag => {
    on(tag, 'click', () => {
      // Brief highlight pulse
      tag.style.transition = 'background 0.1s, transform 0.1s';
      tag.style.transform = 'scale(0.95)';
      setTimeout(() => {
        tag.style.transform = '';
      }, 150);
    });
  });
}

/* ================================================================
   17. SCROLL PROGRESS INDICATOR
   ================================================================ */
function initScrollProgress() {
  // Create element
  const bar = document.createElement('div');
  bar.setAttribute('role', 'progressbar');
  bar.setAttribute('aria-label', 'Page scroll progress');
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: var(--color-accent);
    z-index: 9999;
    transition: width 0.1s linear;
    pointer-events: none;
    box-shadow: 0 0 8px var(--color-accent-glow);
  `;
  document.body.appendChild(bar);

  on(window, 'scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
    bar.setAttribute('aria-valuenow', Math.round(pct));
  }, { passive: true });
}

/* ================================================================
   18. LAZY IMAGE LOADING FALLBACK
   ================================================================ */
function initImageLazyLoad() {
  if ('loading' in HTMLImageElement.prototype) return; // native support

  $$('img[loading="lazy"]').forEach(img => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = img.dataset.src || img.src;
          observer.unobserve(img);
        }
      });
    });
    observer.observe(img);
  });
}

/* ================================================================
   19. KEYBOARD NAVIGATION HELPER
   ================================================================ */
function initKeyboardNav() {
  // Add class when user uses keyboard
  on(document, 'keydown', e => {
    if (e.key === 'Tab') document.body.classList.add('using-keyboard');
  });
  on(document, 'mousedown', () => {
    document.body.classList.remove('using-keyboard');
  });
}

/* ================================================================
   20. INIT — Entry point
   ================================================================ */
function init() {
  initLoader();
  initTheme();
  initCursor();
  initTypewriter();
  initHeader();
  initMobileMenu();
  initSmoothScroll();
  initAOS();
  initCounters();
  initSkillBars();
  initBackToTop();
  initContactForm();
  initFooterYear();
  initCardTilt();
  initSkillTagInteraction();
  initScrollProgress();
  initImageLazyLoad();
  initKeyboardNav();

  console.log(
    '%c Mohammed Adam Portfolio %c v1.0 ',
    'background:#090e1a;color:#00d9ff;font-size:14px;padding:4px 8px;border-radius:4px 0 0 4px;font-weight:bold',
    'background:#00d9ff;color:#090e1a;font-size:14px;padding:4px 8px;border-radius:0 4px 4px 0;font-weight:bold'
  );
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
