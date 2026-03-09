/**
 * WG Nürnberg v012 - Scripts
 * Performance-optimiert mit Cookie Consent Details-Dialog
 */

(function() {
  'use strict';

  // ==========================================================================
  // Utility Functions
  // ==========================================================================

  /**
   * Throttle function to limit execution rate
   */
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Check if user prefers reduced motion
   */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // ==========================================================================
  // Theme Toggle
  // ==========================================================================

  const ThemeManager = {
    STORAGE_KEY: 'wgn-theme',

    init() {
      this.toggle = document.getElementById('theme-toggle');
      if (!this.toggle) return;

      // Set initial theme
      const savedTheme = localStorage.getItem(this.STORAGE_KEY);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (prefersDark ? 'dark' : 'light');

      document.documentElement.setAttribute('data-theme', theme);

      // Listen for toggle clicks
      this.toggle.addEventListener('click', () => this.toggleTheme());

      // Listen for system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
      });
    },

    toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(this.STORAGE_KEY, next);
    }
  };

  // ==========================================================================
  // Mobile Navigation
  // ==========================================================================

  const MobileNav = {
    init() {
      this.toggle = document.getElementById('menu-toggle');
      this.nav = document.getElementById('mobile-nav');
      if (!this.toggle || !this.nav) return;

      this.isOpen = false;

      this.toggle.addEventListener('click', () => this.toggleMenu());

      // Close menu when clicking links
      this.nav.querySelectorAll('.mobile-nav__link').forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });

      // Close menu on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeMenu();
        }
      });

      // Close menu on resize to desktop
      window.addEventListener('resize', throttle(() => {
        if (window.innerWidth >= 1024 && this.isOpen) {
          this.closeMenu();
        }
      }, 100));
    },

    toggleMenu() {
      this.isOpen ? this.closeMenu() : this.openMenu();
    },

    openMenu() {
      this.isOpen = true;
      this.nav.classList.add('mobile-nav--open');
      this.toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    },

    closeMenu() {
      this.isOpen = false;
      this.nav.classList.remove('mobile-nav--open');
      this.toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  // ==========================================================================
  // Header Scroll Effects
  // ==========================================================================

  const Header = {
    init() {
      this.header = document.querySelector('.header');
      if (!this.header) return;

      this.scrollProgress = document.querySelector('.scroll-progress');

      // Use requestAnimationFrame for smooth updates
      let ticking = false;

      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            this.handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    },

    handleScroll() {
      const scrollY = window.scrollY;

      // Header shadow on scroll
      if (scrollY > 10) {
        this.header.classList.add('header--scrolled');
      } else {
        this.header.classList.remove('header--scrolled');
      }

      // Scroll progress bar
      if (this.scrollProgress) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / docHeight) * 100;
        this.scrollProgress.style.width = `${progress}%`;
      }
    }
  };

  // ==========================================================================
  // Scroll Reveal Animations
  // ==========================================================================

  const ScrollReveal = {
    init() {
      if (prefersReducedMotion()) return;

      this.elements = document.querySelectorAll('.reveal');
      if (!this.elements.length) return;

      // Use IntersectionObserver for performance
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      this.elements.forEach(el => observer.observe(el));
    }
  };

  // ==========================================================================
  // Counter Animation
  // ==========================================================================

  const CounterAnimation = {
    init() {
      if (prefersReducedMotion()) {
        // Just show final values
        document.querySelectorAll('[data-count]').forEach(el => {
          el.textContent = el.dataset.count + '+';
        });
        return;
      }

      this.counters = document.querySelectorAll('[data-count]');
      if (!this.counters.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      this.counters.forEach(counter => observer.observe(counter));
    },

    animate(element) {
      const target = parseInt(element.dataset.count, 10);
      const duration = 2000;
      const start = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * easeOutQuart);

        element.textContent = current + '+';

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    }
  };

  // ==========================================================================
  // FAQ Accordion
  // ==========================================================================

  const FAQ = {
    init() {
      this.items = document.querySelectorAll('.faq-item');
      if (!this.items.length) return;

      this.items.forEach(item => {
        const question = item.querySelector('.faq-item__question');
        const answer = item.querySelector('.faq-item__answer');

        if (!question || !answer) return;

        // Set initial state
        if (item.classList.contains('faq-item--open')) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }

        question.addEventListener('click', () => this.toggle(item));
      });
    },

    toggle(item) {
      const isOpen = item.classList.contains('faq-item--open');
      const answer = item.querySelector('.faq-item__answer');
      const question = item.querySelector('.faq-item__question');

      if (isOpen) {
        item.classList.remove('faq-item--open');
        answer.style.maxHeight = '0';
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('faq-item--open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    }
  };

  // ==========================================================================
  // Gallery with Lightbox
  // ==========================================================================

  const Gallery = {
    init() {
      this.items = document.querySelectorAll('.gallery__item');
      this.filters = document.querySelectorAll('.gallery__filter');
      this.lightbox = document.getElementById('lightbox');

      if (!this.items.length) return;

      this.currentIndex = 0;
      this.images = [];

      // Collect all images
      this.items.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
          this.images.push({
            src: img.src.replace('w=400', 'w=1200'),
            alt: img.alt
          });
        }

        item.addEventListener('click', () => this.openLightbox(index));
      });

      // Filter functionality
      this.filters.forEach(filter => {
        filter.addEventListener('click', () => this.filterGallery(filter));
      });

      // Lightbox controls
      if (this.lightbox) {
        this.initLightbox();
      }
    },

    filterGallery(activeFilter) {
      const category = activeFilter.dataset.filter;

      // Update active filter
      this.filters.forEach(f => f.classList.remove('gallery__filter--active'));
      activeFilter.classList.add('gallery__filter--active');

      // Filter items
      this.items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    },

    initLightbox() {
      const close = document.getElementById('lightbox-close');
      const prev = document.getElementById('lightbox-prev');
      const next = document.getElementById('lightbox-next');
      this.lightboxImage = document.getElementById('lightbox-image');

      close?.addEventListener('click', () => this.closeLightbox());
      prev?.addEventListener('click', () => this.showPrev());
      next?.addEventListener('click', () => this.showNext());

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (!this.lightbox.classList.contains('lightbox--open')) return;

        switch(e.key) {
          case 'Escape':
            this.closeLightbox();
            break;
          case 'ArrowLeft':
            this.showPrev();
            break;
          case 'ArrowRight':
            this.showNext();
            break;
        }
      });

      // Close on backdrop click
      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) {
          this.closeLightbox();
        }
      });

      // Touch swipe support
      let touchStartX = 0;
      let touchEndX = 0;

      this.lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            this.showNext();
          } else {
            this.showPrev();
          }
        }
      }, { passive: true });
    },

    openLightbox(index) {
      this.currentIndex = index;
      this.updateLightboxImage();
      this.lightbox.classList.add('lightbox--open');
      document.body.style.overflow = 'hidden';
    },

    closeLightbox() {
      this.lightbox.classList.remove('lightbox--open');
      document.body.style.overflow = '';
    },

    showPrev() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.updateLightboxImage();
    },

    showNext() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.updateLightboxImage();
    },

    updateLightboxImage() {
      const image = this.images[this.currentIndex];
      if (image && this.lightboxImage) {
        this.lightboxImage.src = image.src;
        this.lightboxImage.alt = image.alt;
      }
    }
  };

  // ==========================================================================
  // Contact Form
  // ==========================================================================

  const ContactForm = {
    init() {
      this.form = document.getElementById('contact-form');
      this.success = document.getElementById('form-success');

      if (!this.form) return;

      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    handleSubmit(e) {
      e.preventDefault();

      // Basic validation
      const name = this.form.querySelector('#name');
      const email = this.form.querySelector('#email');
      const message = this.form.querySelector('#message');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        alert('Bitte fülle alle Pflichtfelder aus.');
        return;
      }

      if (!this.validateEmail(email.value)) {
        alert('Bitte gib eine gültige E-Mail-Adresse ein.');
        return;
      }

      // Simulate form submission (replace with actual API call)
      this.form.style.display = 'none';
      this.success.classList.add('form-success--visible');
    },

    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  };

  // ==========================================================================
  // Video Play Button (Placeholder)
  // ==========================================================================

  const VideoButton = {
    init() {
      const btn = document.getElementById('video-play-btn');
      if (!btn) return;

      btn.addEventListener('click', () => {
        alert('Video-Funktion kommt bald! Die 360°-Touren findest du weiter unten auf der Seite.');
      });
    }
  };

  // ==========================================================================
  // Cookie Consent
  // ==========================================================================

  const CookieConsent = {
    STORAGE_KEY: 'wgn-cookies',

    init() {
      this.banner = document.getElementById('cookie-banner');
      this.modal = document.getElementById('cookie-modal');

      if (!this.banner || !this.modal) return;

      // Check if consent was already given
      const consent = localStorage.getItem(this.STORAGE_KEY);
      if (!consent) {
        this.showBanner();
      }

      this.setupEventListeners();
    },

    setupEventListeners() {
      // Banner buttons
      const acceptBtn = document.getElementById('cookie-accept-btn');
      const settingsBtn = document.getElementById('cookie-settings-btn');

      acceptBtn?.addEventListener('click', () => this.acceptAll());
      settingsBtn?.addEventListener('click', () => this.openModal());

      // Modal buttons
      const modalClose = document.getElementById('cookie-modal-close');
      const saveBtn = document.getElementById('cookie-save-btn');
      const acceptAllBtn = document.getElementById('cookie-accept-all-btn');

      modalClose?.addEventListener('click', () => this.closeModal());
      saveBtn?.addEventListener('click', () => this.saveSelection());
      acceptAllBtn?.addEventListener('click', () => this.acceptAll());

      // Close modal on backdrop click
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });

      // Close modal on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal.classList.contains('cookie-modal--open')) {
          this.closeModal();
        }
      });
    },

    showBanner() {
      // Small delay for better UX
      setTimeout(() => {
        this.banner.classList.add('cookie-banner--visible');
      }, 1000);
    },

    hideBanner() {
      this.banner.classList.remove('cookie-banner--visible');
    },

    openModal() {
      this.modal.classList.add('cookie-modal--open');
      document.body.style.overflow = 'hidden';

      // Load saved preferences
      const consent = this.getConsent();
      if (consent) {
        document.getElementById('cookie-analytics').checked = consent.analytics;
        document.getElementById('cookie-marketing').checked = consent.marketing;
      }
    },

    closeModal() {
      this.modal.classList.remove('cookie-modal--open');
      document.body.style.overflow = '';
    },

    acceptAll() {
      const consent = {
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: Date.now()
      };

      this.saveConsent(consent);
      this.hideBanner();
      this.closeModal();
    },

    saveSelection() {
      const consent = {
        necessary: true,
        analytics: document.getElementById('cookie-analytics').checked,
        marketing: document.getElementById('cookie-marketing').checked,
        timestamp: Date.now()
      };

      this.saveConsent(consent);
      this.hideBanner();
      this.closeModal();
    },

    saveConsent(consent) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(consent));

      // Here you would typically enable/disable tracking scripts
      // based on the consent given
      if (consent.analytics) {
        // Enable analytics
        console.log('Analytics enabled');
      }
      if (consent.marketing) {
        // Enable marketing
        console.log('Marketing enabled');
      }
    },

    getConsent() {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    }
  };

  // ==========================================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================================

  const SmoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (href === '#') return;

          const target = document.querySelector(href);
          if (!target) return;

          e.preventDefault();

          target.scrollIntoView({
            behavior: prefersReducedMotion() ? 'auto' : 'smooth'
          });
        });
      });
    }
  };

  // ==========================================================================
  // Tour Cards (Placeholder Links)
  // ==========================================================================

  const TourCards = {
    init() {
      document.querySelectorAll('.tour-card').forEach(card => {
        card.addEventListener('click', (e) => {
          e.preventDefault();
          alert('360°-Tour: Diese Funktion wird bald verfügbar sein. Kontaktiere uns für einen Video-Call!');
        });
      });
    }
  };

  // ==========================================================================
  // Initialize All Modules
  // ==========================================================================

  function init() {
    ThemeManager.init();
    MobileNav.init();
    Header.init();
    ScrollReveal.init();
    CounterAnimation.init();
    FAQ.init();
    Gallery.init();
    ContactForm.init();
    VideoButton.init();
    CookieConsent.init();
    SmoothScroll.init();
    TourCards.init();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
