/**
 * WG Nürnberg v026 - Main JavaScript
 * Handles all interactive features
 */

(function() {
  'use strict';

  // ===== Theme Toggle =====
  const initTheme = () => {
    const toggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    const storageKey = 'wgn-theme';

    // Get saved theme or system preference
    const getSavedTheme = () => {
      const saved = localStorage.getItem(storageKey);
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Apply theme
    const applyTheme = (theme) => {
      html.setAttribute('data-theme', theme);
      localStorage.setItem(storageKey, theme);
    };

    // Initialize
    applyTheme(getSavedTheme());

    // Toggle handler
    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    }

    // Listen for system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(storageKey)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  };

  // ===== Mobile Navigation =====
  const initMobileNav = () => {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.mobile-nav');
    const links = nav?.querySelectorAll('.mobile-nav__link');
    const body = document.body;

    if (!toggle || !nav) return;

    const openNav = () => {
      toggle.classList.add('is-active');
      toggle.setAttribute('aria-expanded', 'true');
      nav.classList.add('is-open');
      body.style.overflow = 'hidden';
    };

    const closeNav = () => {
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.contains('is-open');
      isOpen ? closeNav() : openNav();
    });

    // Close on link click
    links?.forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
      }
    });
  };

  // ===== Desktop Dropdown =====
  const initDropdowns = () => {
    const dropdowns = document.querySelectorAll('.nav__dropdown');

    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.nav__dropdown-toggle');

      toggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('is-open');

        // Close all dropdowns
        dropdowns.forEach(d => {
          d.classList.remove('is-open');
          d.querySelector('.nav__dropdown-toggle')?.setAttribute('aria-expanded', 'false');
        });

        // Open clicked if was closed
        if (!isOpen) {
          dropdown.classList.add('is-open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', () => {
      dropdowns.forEach(d => {
        d.classList.remove('is-open');
        d.querySelector('.nav__dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      });
    });
  };

  // ===== Mobile Dropdown =====
  const initMobileDropdowns = () => {
    const dropdowns = document.querySelectorAll('.mobile-nav__dropdown');

    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.mobile-nav__dropdown-toggle');

      toggle?.addEventListener('click', () => {
        const isOpen = dropdown.classList.contains('is-open');
        dropdown.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', !isOpen);
      });
    });
  };

  // ===== Scroll Progress =====
  const initScrollProgress = () => {
    const progress = document.querySelector('.scroll-progress');
    if (!progress) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progress.style.width = `${scrollPercent}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  };

  // ===== Scroll Reveal =====
  const initScrollReveal = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  };

  // ===== Stat Counter Animation =====
  const initStatCounters = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stats = document.querySelectorAll('.stat__value[data-count]');
    if (!stats.length) return;

    const animateCounter = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const duration = prefersReducedMotion ? 0 : 2000;
      const start = performance.now();

      const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        const current = Math.round(eased * target);

        el.textContent = current + '+';

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      if (duration === 0) {
        el.textContent = target + '+';
      } else {
        requestAnimationFrame(update);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(el => observer.observe(el));
  };

  // ===== Gallery Filter =====
  const initGalleryFilter = () => {
    const filters = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery__item');
    if (!filters.length || !items.length) return;

    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active state
        filters.forEach(f => f.classList.remove('is-active'));
        btn.classList.add('is-active');

        // Filter items
        items.forEach(item => {
          const category = item.dataset.category;
          if (filter === 'all' || category === filter) {
            item.classList.remove('is-hidden');
          } else {
            item.classList.add('is-hidden');
          }
        });
      });
    });
  };

  // ===== Lightbox =====
  const initLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox?.querySelector('.lightbox__image');
    const closeBtn = lightbox?.querySelector('.lightbox__close');
    const prevBtn = lightbox?.querySelector('.lightbox__nav--prev');
    const nextBtn = lightbox?.querySelector('.lightbox__nav--next');
    const counter = lightbox?.querySelector('.lightbox__counter');
    const galleryItems = document.querySelectorAll('.gallery__item');

    if (!lightbox || !galleryItems.length) return;

    let currentIndex = 0;
    let visibleItems = [];
    let touchStartX = 0;
    let touchEndX = 0;

    const getVisibleItems = () => {
      return Array.from(galleryItems).filter(item => !item.classList.contains('is-hidden'));
    };

    const updateLightbox = () => {
      visibleItems = getVisibleItems();
      const item = visibleItems[currentIndex];
      const img = item?.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      }
      if (counter) {
        counter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;
      }
    };

    const openLightbox = (index) => {
      visibleItems = getVisibleItems();
      currentIndex = index;
      updateLightbox();
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    const navigate = (direction) => {
      visibleItems = getVisibleItems();
      currentIndex = (currentIndex + direction + visibleItems.length) % visibleItems.length;
      updateLightbox();
    };

    // Event listeners
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        const visibleIndex = getVisibleItems().indexOf(item);
        openLightbox(visibleIndex);
      });
    });

    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', () => navigate(-1));
    nextBtn?.addEventListener('click', () => navigate(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigate(-1);
          break;
        case 'ArrowRight':
          navigate(1);
          break;
      }
    });

    // Click outside to close
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Touch swipe support
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        navigate(diff > 0 ? 1 : -1);
      }
    }, { passive: true });
  };

  // ===== FAQ Accordion =====
  const initFAQ = () => {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(item => {
      const toggle = item.querySelector('.faq-item__toggle');

      toggle?.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close all
        items.forEach(i => {
          i.classList.remove('is-open');
          i.querySelector('.faq-item__toggle')?.setAttribute('aria-expanded', 'false');
        });

        // Open clicked if was closed
        if (!isOpen) {
          item.classList.add('is-open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    });
  };

  // ===== Contact Form =====
  const initContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');

      if (!name?.value || !email?.value || !message?.value) {
        alert('Bitte fülle alle Pflichtfelder aus.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        alert('Bitte gib eine gültige E-Mail-Adresse ein.');
        return;
      }

      // Success feedback (in production, this would send to a server)
      alert('Vielen Dank für deine Anfrage! Wir melden uns innerhalb von 24 Stunden.');
      form.reset();
    });
  };

  // ===== Cookie Banner =====
  const initCookieBanner = () => {
    const banner = document.getElementById('cookie-banner');
    const acceptAll = document.getElementById('cookie-accept-all');
    const acceptSelected = document.getElementById('cookie-accept-selected');
    const analyticsCheckbox = document.getElementById('cookie-analytics');
    const marketingCheckbox = document.getElementById('cookie-marketing');
    const storageKey = 'wgn-cookies';

    if (!banner) return;

    // Check if already consented
    const consent = localStorage.getItem(storageKey);
    if (consent) return;

    // Show banner after a short delay
    setTimeout(() => {
      banner.classList.add('is-visible');
    }, 1000);

    const saveConsent = (analytics, marketing) => {
      const consent = {
        necessary: true,
        analytics: analytics,
        marketing: marketing,
        timestamp: Date.now()
      };
      localStorage.setItem(storageKey, JSON.stringify(consent));
      banner.classList.remove('is-visible');
    };

    acceptAll?.addEventListener('click', () => {
      saveConsent(true, true);
    });

    acceptSelected?.addEventListener('click', () => {
      saveConsent(
        analyticsCheckbox?.checked || false,
        marketingCheckbox?.checked || false
      );
    });
  };

  // ===== Smooth Scroll for Anchor Links =====
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  };

  // ===== Header Background on Scroll =====
  const initHeaderScroll = () => {
    const header = document.querySelector('.header');
    if (!header) return;

    const updateHeader = () => {
      if (window.scrollY > 50) {
        header.style.boxShadow = 'var(--shadow-md)';
      } else {
        header.style.boxShadow = '';
      }
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  };

  // ===== Initialize All =====
  const init = () => {
    initTheme();
    initMobileNav();
    initDropdowns();
    initMobileDropdowns();
    initScrollProgress();
    initScrollReveal();
    initStatCounters();
    initGalleryFilter();
    initLightbox();
    initFAQ();
    initContactForm();
    initCookieBanner();
    initSmoothScroll();
    initHeaderScroll();
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
