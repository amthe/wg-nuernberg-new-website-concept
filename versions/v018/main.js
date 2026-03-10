/**
 * WG Nürnberg v018 - Main JavaScript
 * Premium Visual Polish + Elevated Interactions
 */

(function() {
  'use strict';

  // ============================================
  // DOM Ready
  // ============================================
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    // Remove loading state
    document.body.classList.add('loaded');

    // Initialize all modules
    initThemeToggle();
    initScrollProgress();
    initHeader();
    initMobileNav();
    initDropdowns();
    initFAQ();
    initGallery();
    initLightbox();
    initScrollReveal();
    initSmoothScroll();
    initCookieConsent();
    initFormValidation();
    initStatCounters();
  }

  // ============================================
  // Theme Toggle (Dark/Light Mode)
  // ============================================
  function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('wgn-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', theme);

    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      // Smooth transition
      document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('wgn-theme', newTheme);

      // Remove transition after animation
      setTimeout(() => {
        document.documentElement.style.transition = '';
      }, 300);
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('wgn-theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  }

  // ============================================
  // Scroll Progress Bar
  // ============================================
  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    let ticking = false;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });
  }

  // ============================================
  // Header Scroll Effect
  // ============================================
  function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollY = 0;
    let ticking = false;

    function updateHeader() {
      const scrollY = window.scrollY;

      if (scrollY > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }

      lastScrollY = scrollY;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  // ============================================
  // Mobile Navigation
  // ============================================
  function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.mobile-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('mobile-toggle--open');
      nav.classList.toggle('mobile-nav--open', isOpen);
      nav.setAttribute('aria-hidden', !isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('mobile-toggle--open');
        nav.classList.remove('mobile-nav--open');
        nav.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('mobile-nav--open')) {
        toggle.click();
      }
    });
  }

  // ============================================
  // Dropdown Navigation
  // ============================================
  function initDropdowns() {
    // Desktop dropdowns
    const desktopDropdowns = document.querySelectorAll('.header__dropdown');
    desktopDropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.header__dropdown-toggle');
      if (!toggle) return;

      // Keyboard support
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          dropdown.classList.toggle('header__dropdown--open');
          toggle.setAttribute('aria-expanded', dropdown.classList.contains('header__dropdown--open'));
        }
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('header__dropdown--open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Mobile dropdowns
    const mobileDropdowns = document.querySelectorAll('.mobile-nav__dropdown');
    mobileDropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.mobile-nav__dropdown-toggle');
      if (!toggle) return;

      toggle.addEventListener('click', () => {
        const isOpen = dropdown.classList.toggle('mobile-nav__dropdown--open');
        toggle.setAttribute('aria-expanded', isOpen);
      });
    });
  }

  // ============================================
  // FAQ Accordion
  // ============================================
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const button = item.querySelector('.faq-question');
      if (!button) return;

      button.addEventListener('click', () => {
        const isOpen = item.classList.contains('faq-item--open');

        // Close all other items (optional - remove for multi-open)
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('faq-item--open');
            otherItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        item.classList.toggle('faq-item--open', !isOpen);
        button.setAttribute('aria-expanded', !isOpen);
      });
    });
  }

  // ============================================
  // Gallery Filter
  // ============================================
  function initGallery() {
    const filters = document.querySelectorAll('.gallery-filter');
    const items = document.querySelectorAll('.gallery-item');
    if (!filters.length || !items.length) return;

    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        const category = filter.dataset.filter;

        // Update active filter
        filters.forEach(f => {
          f.classList.remove('gallery-filter--active');
          f.setAttribute('aria-selected', 'false');
        });
        filter.classList.add('gallery-filter--active');
        filter.setAttribute('aria-selected', 'true');

        // Filter items with animation
        items.forEach(item => {
          const itemCategory = item.dataset.category;
          const shouldShow = category === 'all' || itemCategory === category;

          if (shouldShow) {
            item.classList.remove('gallery-item--hidden');
            item.style.position = '';
          } else {
            item.classList.add('gallery-item--hidden');
            // After animation, remove from layout
            setTimeout(() => {
              if (item.classList.contains('gallery-item--hidden')) {
                item.style.position = 'absolute';
              }
            }, 400);
          }
        });
      });
    });
  }

  // ============================================
  // Lightbox
  // ============================================
  function initLightbox() {
    const lightbox = document.querySelector('.lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (!lightbox || !galleryItems.length) return;

    const lightboxImage = lightbox.querySelector('.lightbox__image');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__prev');
    const nextBtn = lightbox.querySelector('.lightbox__next');
    const backdrop = lightbox.querySelector('.lightbox__backdrop');

    let currentIndex = 0;
    let visibleImages = [];

    function getVisibleImages() {
      return Array.from(galleryItems)
        .filter(item => !item.classList.contains('gallery-item--hidden'))
        .map(item => item.querySelector('img'));
    }

    function openLightbox(index) {
      visibleImages = getVisibleImages();
      currentIndex = index;
      updateLightboxImage();
      lightbox.classList.add('lightbox--open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Focus management
      closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('lightbox--open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function updateLightboxImage() {
      if (visibleImages[currentIndex]) {
        lightboxImage.src = visibleImages[currentIndex].src;
        lightboxImage.alt = visibleImages[currentIndex].alt;
      }
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % visibleImages.length;
      updateLightboxImage();
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
      updateLightboxImage();
    }

    // Event listeners
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        const visibleIndex = getVisibleImages().indexOf(item.querySelector('img'));
        if (visibleIndex !== -1) {
          openLightbox(visibleIndex);
        }
      });

      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const visibleIndex = getVisibleImages().indexOf(item.querySelector('img'));
          if (visibleIndex !== -1) {
            openLightbox(visibleIndex);
          }
        }
      });

      // Make focusable
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
    });

    closeBtn?.addEventListener('click', closeLightbox);
    backdrop?.addEventListener('click', closeLightbox);
    nextBtn?.addEventListener('click', nextImage);
    prevBtn?.addEventListener('click', prevImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('lightbox--open')) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
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
          nextImage();
        } else {
          prevImage();
        }
      }
    }, { passive: true });
  }

  // ============================================
  // Scroll Reveal Animation
  // ============================================
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(el => el.classList.add('reveal--visible'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    reveals.forEach(el => observer.observe(el));
  }

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        const headerHeight = document.querySelector('.header')?.offsetHeight || 72;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL without scrolling
        history.pushState(null, '', targetId);

        // Focus target for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  // ============================================
  // Cookie Consent
  // ============================================
  function initCookieConsent() {
    const consent = document.querySelector('.cookie-consent');
    if (!consent) return;

    const acceptBtn = consent.querySelector('#cookie-accept');
    const declineBtn = consent.querySelector('#cookie-decline');
    const closeBtn = consent.querySelector('.cookie-consent__close');

    // Check if already consented
    if (localStorage.getItem('wgn-cookies')) {
      return;
    }

    // Show consent after short delay
    setTimeout(() => {
      consent.classList.add('cookie-consent--visible');
      consent.setAttribute('aria-hidden', 'false');
    }, 2000);

    function hideConsent() {
      consent.classList.remove('cookie-consent--visible');
      consent.setAttribute('aria-hidden', 'true');
    }

    acceptBtn?.addEventListener('click', () => {
      const analytics = document.querySelector('#cookie-analytics')?.checked;
      const marketing = document.querySelector('#cookie-marketing')?.checked;

      localStorage.setItem('wgn-cookies', JSON.stringify({
        necessary: true,
        analytics: analytics,
        marketing: marketing,
        timestamp: Date.now()
      }));

      hideConsent();
    });

    declineBtn?.addEventListener('click', () => {
      localStorage.setItem('wgn-cookies', JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
        timestamp: Date.now()
      }));

      hideConsent();
    });

    closeBtn?.addEventListener('click', hideConsent);
  }

  // ============================================
  // Form Validation
  // ============================================
  function initFormValidation() {
    const forms = document.querySelectorAll('.form');

    forms.forEach(form => {
      const inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');

      // Real-time validation feedback
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          validateInput(input);
        });

        input.addEventListener('input', () => {
          if (input.classList.contains('invalid')) {
            validateInput(input);
          }
        });
      });

      // Form submission
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        inputs.forEach(input => {
          if (!validateInput(input)) {
            isValid = false;
          }
        });

        if (isValid) {
          // Here you would normally submit the form
          // For demo, show success message
          const button = form.querySelector('button[type="submit"]');
          const originalText = button.textContent;
          button.textContent = 'Gesendet!';
          button.disabled = true;

          setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            form.reset();
          }, 3000);
        }
      });
    });

    function validateInput(input) {
      const isRequired = input.hasAttribute('required');
      const value = input.value.trim();

      if (isRequired && !value) {
        input.classList.add('invalid');
        return false;
      }

      if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          input.classList.add('invalid');
          return false;
        }
      }

      input.classList.remove('invalid');
      return true;
    }
  }

  // ============================================
  // Stat Counters Animation
  // ============================================
  function initStatCounters() {
    const stats = document.querySelectorAll('.stat__number[data-count]');
    if (!stats.length) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));

    function animateCounter(element) {
      const target = parseInt(element.dataset.count, 10);
      const duration = 2000;
      const startTime = performance.now();
      const startValue = 0;

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOut);

        element.textContent = currentValue + (element.textContent.includes('+') ? '+' : '');

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          element.textContent = target + (element.dataset.count.includes('+') ? '+' : '');
        }
      }

      requestAnimationFrame(update);
    }
  }

})();
