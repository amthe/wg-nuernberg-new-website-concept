/**
 * WG Nürnberg v014 - Main JavaScript
 * Built from scratch with all interactions
 */

(function() {
  'use strict';

  // ==========================================================================
  // Theme Toggle
  // ==========================================================================

  const THEME_KEY = 'wgn-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    // Set initial theme
    setTheme(getPreferredTheme());

    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // ==========================================================================
  // Mobile Navigation
  // ==========================================================================

  function initMobileNav() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.mobile-nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isActive = nav.classList.toggle('active');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isActive);
      toggle.setAttribute('aria-label', isActive ? 'Menü schließen' : 'Menü öffnen');

      // Prevent body scroll when menu is open
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Menü öffnen');
        document.body.style.overflow = '';
      });
    });

    // Mobile dropdown toggles
    const dropdowns = nav.querySelectorAll('.mobile-nav__dropdown');
    dropdowns.forEach(dropdown => {
      const toggleBtn = dropdown.querySelector('.mobile-nav__dropdown-toggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          const isActive = dropdown.classList.toggle('active');
          toggleBtn.setAttribute('aria-expanded', isActive);
        });
      }
    });
  }

  // ==========================================================================
  // Header Scroll Effect
  // ==========================================================================

  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    function onScroll() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }

      lastScroll = currentScroll;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ==========================================================================
  // Scroll Progress Bar
  // ==========================================================================

  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    function updateProgress() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ==========================================================================
  // Scroll Reveal Animation
  // ==========================================================================

  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // ==========================================================================
  // FAQ Accordion
  // ==========================================================================

  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-item__question');
      if (!question) return;

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            other.querySelector('.faq-item__question')?.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        item.classList.toggle('active');
        question.setAttribute('aria-expanded', !isActive);
      });
    });
  }

  // ==========================================================================
  // Gallery Filter & Lightbox
  // ==========================================================================

  function initGallery() {
    const filters = document.querySelectorAll('.gallery__filter');
    const items = document.querySelectorAll('.gallery__item');
    const lightbox = document.querySelector('.lightbox');

    if (!filters.length || !items.length) return;

    // Filter functionality
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        const category = filter.dataset.filter;

        // Update active filter
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');

        // Filter items
        items.forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

    // Lightbox functionality
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox__content img');
    const lightboxCaption = lightbox.querySelector('.lightbox__caption');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__prev');
    const nextBtn = lightbox.querySelector('.lightbox__next');

    let currentIndex = 0;
    let visibleItems = [];

    function updateVisibleItems() {
      visibleItems = Array.from(items).filter(item => item.style.display !== 'none');
    }

    function openLightbox(index) {
      updateVisibleItems();
      currentIndex = index;
      const item = visibleItems[index];
      if (!item) return;

      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = item.dataset.title || '';

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function showPrev() {
      updateVisibleItems();
      currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
      openLightbox(currentIndex);
    }

    function showNext() {
      updateVisibleItems();
      currentIndex = (currentIndex + 1) % visibleItems.length;
      openLightbox(currentIndex);
    }

    // Event listeners
    items.forEach((item, index) => {
      item.addEventListener('click', () => {
        updateVisibleItems();
        const visibleIndex = visibleItems.indexOf(item);
        openLightbox(visibleIndex);
      });
    });

    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', showPrev);
    nextBtn?.addEventListener('click', showNext);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          showPrev();
          break;
        case 'ArrowRight':
          showNext();
          break;
      }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          showNext();
        } else {
          showPrev();
        }
      }
    }, { passive: true });
  }

  // ==========================================================================
  // Cookie Consent
  // ==========================================================================

  const COOKIE_KEY = 'wgn-cookies';

  function initCookieConsent() {
    const consent = document.querySelector('.cookie-consent');
    if (!consent) return;

    // Check if already accepted/declined
    if (localStorage.getItem(COOKIE_KEY)) return;

    // Show consent banner
    setTimeout(() => {
      consent.classList.add('active');
    }, 1000);

    const acceptBtn = consent.querySelector('.cookie-consent__accept');
    const declineBtn = consent.querySelector('.cookie-consent__decline');

    function hideConsent(accepted) {
      localStorage.setItem(COOKIE_KEY, accepted ? 'accepted' : 'declined');
      consent.classList.remove('active');
    }

    acceptBtn?.addEventListener('click', () => hideConsent(true));
    declineBtn?.addEventListener('click', () => hideConsent(false));
  }

  // ==========================================================================
  // Contact Form
  // ==========================================================================

  function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');

      if (!name?.value || !email?.value || !message?.value) {
        alert('Bitte füllen Sie alle Pflichtfelder aus.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        return;
      }

      // Simulate form submission
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Wird gesendet...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Vielen Dank für Ihre Anfrage! Wir melden uns innerhalb von 24 Stunden bei Ihnen.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // ==========================================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  }

  // ==========================================================================
  // Desktop Dropdown Accessibility
  // ==========================================================================

  function initDesktopDropdowns() {
    const dropdowns = document.querySelectorAll('.nav__dropdown');

    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.nav__dropdown-toggle');
      const menu = dropdown.querySelector('.nav__dropdown-menu');

      if (!toggle || !menu) return;

      // Keyboard support
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle.setAttribute('aria-expanded',
            toggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
          );
        }
      });

      // Update aria-expanded on hover
      dropdown.addEventListener('mouseenter', () => {
        toggle.setAttribute('aria-expanded', 'true');
      });

      dropdown.addEventListener('mouseleave', () => {
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================================================
  // Initialize All
  // ==========================================================================

  function init() {
    initThemeToggle();
    initMobileNav();
    initHeaderScroll();
    initScrollProgress();
    initScrollReveal();
    initFAQ();
    initGallery();
    initCookieConsent();
    initContactForm();
    initSmoothScroll();
    initDesktopDropdowns();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
