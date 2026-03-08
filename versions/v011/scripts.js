/**
 * WG Nürnberg v011 - JavaScript
 * Mobile-First, Dark Mode, Animations, Form Validation
 */

(function() {
  'use strict';

  // ==========================================================================
  // Utility Functions
  // ==========================================================================

  /**
   * Debounce function for performance optimization
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Check if user prefers reduced motion
   */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Ease out expo function for smooth counter animation
   */
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  // ==========================================================================
  // Theme Toggle (Dark Mode)
  // ==========================================================================

  const ThemeManager = {
    STORAGE_KEY: 'wgn-theme',

    init() {
      this.toggle = document.querySelector('.theme-toggle');
      if (!this.toggle) return;

      // Get saved theme or system preference
      const savedTheme = localStorage.getItem(this.STORAGE_KEY);
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

      this.setTheme(theme);

      // Event listener
      this.toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        localStorage.setItem(this.STORAGE_KEY, newTheme);
      });

      // Listen for system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    },

    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  };

  // ==========================================================================
  // Mobile Menu
  // ==========================================================================

  const MobileMenu = {
    init() {
      this.toggle = document.querySelector('.mobile-menu-toggle');
      this.menu = document.querySelector('.mobile-menu');
      this.links = document.querySelectorAll('.mobile-menu__link');

      if (!this.toggle || !this.menu) return;

      this.toggle.addEventListener('click', () => this.toggleMenu());

      // Close menu when clicking a link
      this.links.forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen()) {
          this.closeMenu();
        }
      });
    },

    isOpen() {
      return this.menu.getAttribute('aria-hidden') === 'false';
    },

    toggleMenu() {
      const isOpen = this.isOpen();
      this.menu.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
      this.toggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    },

    closeMenu() {
      this.menu.setAttribute('aria-hidden', 'true');
      this.toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  // ==========================================================================
  // Header Scroll Effect
  // ==========================================================================

  const HeaderScroll = {
    init() {
      this.header = document.querySelector('.header');
      if (!this.header) return;

      this.handleScroll();
      window.addEventListener('scroll', debounce(() => this.handleScroll(), 10));
    },

    handleScroll() {
      if (window.scrollY > 50) {
        this.header.classList.add('header--scrolled');
      } else {
        this.header.classList.remove('header--scrolled');
      }
    }
  };

  // ==========================================================================
  // Scroll Progress Bar
  // ==========================================================================

  const ScrollProgress = {
    init() {
      this.progressBar = document.querySelector('.scroll-progress');
      if (!this.progressBar) return;

      this.updateProgress();
      window.addEventListener('scroll', () => this.updateProgress());
    },

    updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      this.progressBar.style.width = progress + '%';
    }
  };

  // ==========================================================================
  // Back to Top Button
  // ==========================================================================

  const BackToTop = {
    init() {
      this.button = document.querySelector('.back-to-top');
      if (!this.button) return;

      this.handleScroll();
      window.addEventListener('scroll', debounce(() => this.handleScroll(), 50));

      this.button.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        });
      });
    },

    handleScroll() {
      if (window.scrollY > 500) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    }
  };

  // ==========================================================================
  // Scroll Reveal Animations
  // ==========================================================================

  const ScrollReveal = {
    init() {
      if (prefersReducedMotion()) {
        // Show all elements immediately if reduced motion is preferred
        document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
          el.classList.add('revealed');
        });
        return;
      }

      this.elements = document.querySelectorAll('.reveal, .reveal-stagger');

      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      this.elements.forEach(el => this.observer.observe(el));
    }
  };

  // ==========================================================================
  // Animated Stat Counters
  // ==========================================================================

  const StatCounters = {
    init() {
      this.stats = document.querySelectorAll('.stat__number[data-count]');
      if (!this.stats.length) return;

      const observerOptions = {
        threshold: 0.5
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      this.stats.forEach(stat => this.observer.observe(stat));
    },

    animateCounter(element) {
      const target = parseInt(element.getAttribute('data-count'), 10);
      const duration = prefersReducedMotion() ? 0 : 2000;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const current = Math.round(easedProgress * target);

        element.textContent = current + '+';

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    }
  };

  // ==========================================================================
  // FAQ Accordion
  // ==========================================================================

  const Accordion = {
    init() {
      this.items = document.querySelectorAll('.accordion-item');
      if (!this.items.length) return;

      this.items.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger');
        const content = item.querySelector('.accordion-content');

        trigger.addEventListener('click', () => this.toggle(item));

        // Keyboard accessibility
        trigger.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggle(item);
          }
        });
      });
    },

    toggle(item) {
      const isExpanded = item.getAttribute('data-expanded') === 'true';
      const trigger = item.querySelector('.accordion-trigger');
      const content = item.querySelector('.accordion-content');

      // Close other items (optional - comment out for multiple open)
      // this.items.forEach(otherItem => {
      //   if (otherItem !== item) {
      //     this.close(otherItem);
      //   }
      // });

      if (isExpanded) {
        this.close(item);
      } else {
        this.open(item);
      }
    },

    open(item) {
      const trigger = item.querySelector('.accordion-trigger');
      const content = item.querySelector('.accordion-content');
      const inner = content.querySelector('.accordion-content__inner');

      item.setAttribute('data-expanded', 'true');
      trigger.setAttribute('aria-expanded', 'true');
      content.style.maxHeight = inner.offsetHeight + 'px';
    },

    close(item) {
      const trigger = item.querySelector('.accordion-trigger');
      const content = item.querySelector('.accordion-content');

      item.setAttribute('data-expanded', 'false');
      trigger.setAttribute('aria-expanded', 'false');
      content.style.maxHeight = '0';
    }
  };

  // ==========================================================================
  // Gallery Filter & Lightbox
  // ==========================================================================

  const Gallery = {
    init() {
      this.filters = document.querySelectorAll('.gallery-filter');
      this.items = document.querySelectorAll('.gallery-item');
      this.lightbox = document.querySelector('.lightbox');

      if (!this.filters.length || !this.items.length) return;

      this.currentIndex = 0;
      this.filteredItems = Array.from(this.items);

      // Filter buttons
      this.filters.forEach(filter => {
        filter.addEventListener('click', () => this.filterItems(filter));
      });

      // Lightbox triggers
      this.items.forEach((item, index) => {
        item.addEventListener('click', () => this.openLightbox(index));
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.openLightbox(index);
          }
        });
      });

      // Lightbox controls
      if (this.lightbox) {
        this.lightbox.querySelector('.lightbox__close').addEventListener('click', () => this.closeLightbox());
        this.lightbox.querySelector('.lightbox__nav--prev').addEventListener('click', () => this.navigate(-1));
        this.lightbox.querySelector('.lightbox__nav--next').addEventListener('click', () => this.navigate(1));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
          if (!this.lightbox.classList.contains('active')) return;

          if (e.key === 'Escape') this.closeLightbox();
          if (e.key === 'ArrowLeft') this.navigate(-1);
          if (e.key === 'ArrowRight') this.navigate(1);
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
              this.navigate(1);
            } else {
              this.navigate(-1);
            }
          }
        }, { passive: true });
      }
    },

    filterItems(filter) {
      const category = filter.getAttribute('data-filter');

      // Update active state
      this.filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');

      // Filter items
      this.items.forEach(item => {
        const categories = item.getAttribute('data-category') || '';
        const shouldShow = category === 'all' || categories.includes(category);

        item.style.display = shouldShow ? '' : 'none';
      });

      // Update filtered items array for lightbox navigation
      this.filteredItems = Array.from(this.items).filter(item => {
        return item.style.display !== 'none';
      });
    },

    openLightbox(index) {
      if (!this.lightbox) return;

      const item = this.items[index];
      if (item.style.display === 'none') return;

      this.currentIndex = this.filteredItems.indexOf(item);
      this.updateLightboxImage();
      this.lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    closeLightbox() {
      this.lightbox.classList.remove('active');
      document.body.style.overflow = '';
    },

    navigate(direction) {
      this.currentIndex += direction;

      if (this.currentIndex < 0) {
        this.currentIndex = this.filteredItems.length - 1;
      } else if (this.currentIndex >= this.filteredItems.length) {
        this.currentIndex = 0;
      }

      this.updateLightboxImage();
    },

    updateLightboxImage() {
      const item = this.filteredItems[this.currentIndex];
      const img = item.querySelector('img');
      const lightboxImg = this.lightbox.querySelector('.lightbox__image');

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    }
  };

  // ==========================================================================
  // Contact Form Validation
  // ==========================================================================

  const ContactForm = {
    init() {
      this.form = document.getElementById('contact-form');
      if (!this.form) return;

      this.form.addEventListener('submit', (e) => this.handleSubmit(e));

      // Real-time validation
      const inputs = this.form.querySelectorAll('.form-input, .form-select, .form-textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => {
          if (input.classList.contains('error')) {
            this.validateField(input);
          }
        });
      });
    },

    validateField(field) {
      const errorElement = field.parentElement.querySelector('.form-error');
      let isValid = true;
      let errorMessage = '';

      // Required check
      if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'Dieses Feld ist erforderlich.';
      }

      // Email validation
      if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          isValid = false;
          errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
        }
      }

      // Phone validation (optional field, but validate format if filled)
      if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[\d\s\-+()]{6,20}$/;
        if (!phoneRegex.test(field.value)) {
          isValid = false;
          errorMessage = 'Bitte geben Sie eine gültige Telefonnummer ein.';
        }
      }

      // Date validation
      if (field.type === 'date' && field.hasAttribute('required') && !field.value) {
        isValid = false;
        errorMessage = 'Bitte wählen Sie ein Datum.';
      }

      // Update UI
      if (!isValid) {
        field.classList.add('error');
        if (errorElement) errorElement.textContent = errorMessage;
      } else {
        field.classList.remove('error');
        if (errorElement) errorElement.textContent = '';
      }

      return isValid;
    },

    handleSubmit(e) {
      e.preventDefault();

      let isFormValid = true;
      const inputs = this.form.querySelectorAll('.form-input, .form-select, .form-textarea');

      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        // Simulate form submission
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Wird gesendet...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
          alert('Vielen Dank für Ihre Anfrage! Wir melden uns innerhalb von 24 Stunden bei Ihnen.');
          this.form.reset();
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }, 1500);
      }
    }
  };

  // ==========================================================================
  // Cookie Consent
  // ==========================================================================

  const CookieConsent = {
    STORAGE_KEY: 'wgn-cookie-consent',

    init() {
      this.banner = document.querySelector('.cookie-consent');
      if (!this.banner) return;

      // Check if user has already consented
      const consent = localStorage.getItem(this.STORAGE_KEY);
      if (!consent) {
        setTimeout(() => this.show(), 1500);
      }

      // Button handlers
      this.banner.querySelectorAll('[data-cookie]').forEach(button => {
        button.addEventListener('click', () => {
          const type = button.getAttribute('data-cookie');
          this.handleConsent(type);
        });
      });
    },

    show() {
      this.banner.classList.add('visible');
      this.banner.setAttribute('aria-hidden', 'false');
    },

    hide() {
      this.banner.classList.remove('visible');
      this.banner.setAttribute('aria-hidden', 'true');
    },

    handleConsent(type) {
      localStorage.setItem(this.STORAGE_KEY, type);
      this.hide();

      // Here you would typically initialize tracking scripts based on consent
      if (type === 'all') {
        // Initialize all tracking
      } else if (type === 'necessary') {
        // Only necessary cookies
      } else if (type === 'settings') {
        // Open settings modal (would be implemented separately)
        console.log('Cookie settings dialog would open here');
        localStorage.setItem(this.STORAGE_KEY, 'necessary'); // Default to necessary
      }
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
          if (target) {
            e.preventDefault();

            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: prefersReducedMotion() ? 'auto' : 'smooth'
            });
          }
        });
      });
    }
  };

  // ==========================================================================
  // Video Play Button (Placeholder)
  // ==========================================================================

  const VideoHero = {
    init() {
      this.playButton = document.querySelector('.play-button');
      if (!this.playButton) return;

      this.playButton.addEventListener('click', () => {
        // This would typically open a video modal or start playing an embedded video
        alert('Video-Funktion: Hier würde ein Video-Player geöffnet werden.');

        // Example implementation with video modal:
        // this.openVideoModal('https://youtube.com/embed/VIDEO_ID');
      });
    }
  };

  // ==========================================================================
  // Initialize All Modules
  // ==========================================================================

  function init() {
    ThemeManager.init();
    MobileMenu.init();
    HeaderScroll.init();
    ScrollProgress.init();
    BackToTop.init();
    ScrollReveal.init();
    StatCounters.init();
    Accordion.init();
    Gallery.init();
    ContactForm.init();
    CookieConsent.init();
    SmoothScroll.init();
    VideoHero.init();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
