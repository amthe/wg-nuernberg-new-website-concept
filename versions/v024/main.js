/**
 * WG Nürnberg v024 - Main JavaScript
 */

(function() {
  'use strict';

  // ============================================
  // Theme Toggle (Dark/Light Mode)
  // ============================================
  const ThemeManager = {
    STORAGE_KEY: 'wgn-theme',

    init() {
      const toggle = document.getElementById('themeToggle');
      if (!toggle) return;

      // Load saved theme or use system preference
      const savedTheme = localStorage.getItem(this.STORAGE_KEY);
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

      this.setTheme(theme);

      toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        localStorage.setItem(this.STORAGE_KEY, newTheme);
      });

      // Listen for system theme changes
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

  // ============================================
  // Mobile Navigation
  // ============================================
  const MobileNav = {
    init() {
      const toggle = document.getElementById('mobileToggle');
      const nav = document.getElementById('mobileNav');
      if (!toggle || !nav) return;

      toggle.addEventListener('click', () => {
        const isOpen = nav.classList.contains('mobile-nav--open');

        if (isOpen) {
          this.close(toggle, nav);
        } else {
          this.open(toggle, nav);
        }
      });

      // Close on link click
      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => this.close(toggle, nav));
      });

      // Close on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('mobile-nav--open')) {
          this.close(toggle, nav);
        }
      });
    },

    open(toggle, nav) {
      toggle.classList.add('mobile-toggle--active');
      toggle.setAttribute('aria-expanded', 'true');
      nav.classList.add('mobile-nav--open');
      document.body.style.overflow = 'hidden';
    },

    close(toggle, nav) {
      toggle.classList.remove('mobile-toggle--active');
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('mobile-nav--open');
      document.body.style.overflow = '';
    }
  };

  // ============================================
  // Header Scroll Effect
  // ============================================
  const HeaderScroll = {
    init() {
      const header = document.getElementById('header');
      if (!header) return;

      let lastScrollY = window.scrollY;

      const updateHeader = () => {
        if (window.scrollY > 50) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
        lastScrollY = window.scrollY;
      };

      window.addEventListener('scroll', () => {
        requestAnimationFrame(updateHeader);
      }, { passive: true });

      updateHeader();
    }
  };

  // ============================================
  // Scroll Progress Bar
  // ============================================
  const ScrollProgress = {
    init() {
      const progressBar = document.getElementById('scrollProgress');
      if (!progressBar) return;

      const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
      };

      window.addEventListener('scroll', () => {
        requestAnimationFrame(updateProgress);
      }, { passive: true });
    }
  };

  // ============================================
  // Scroll Reveal Animations
  // ============================================
  const ScrollReveal = {
    init() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const elements = document.querySelectorAll('.reveal, .reveal-stagger');
      if (!elements.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('reveal')) {
              entry.target.classList.add('reveal--visible');
            } else if (entry.target.classList.contains('reveal-stagger')) {
              entry.target.classList.add('reveal-stagger--visible');
            }
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      elements.forEach(el => observer.observe(el));
    }
  };

  // ============================================
  // Animated Stat Counters
  // ============================================
  const StatCounters = {
    init() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Show final values immediately
        document.querySelectorAll('[data-count]').forEach(el => {
          el.textContent = el.dataset.count + '+';
        });
        return;
      }

      const counters = document.querySelectorAll('[data-count]');
      if (!counters.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(counter => observer.observe(counter));
    },

    animateCounter(element) {
      const target = parseInt(element.dataset.count, 10);
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);

        element.textContent = current + '+';

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.textContent = target + '+';
        }
      };

      requestAnimationFrame(animate);
    }
  };

  // ============================================
  // FAQ Accordion
  // ============================================
  const FAQAccordion = {
    init() {
      const items = document.querySelectorAll('.faq__item');
      if (!items.length) return;

      items.forEach(item => {
        const question = item.querySelector('.faq__question');
        if (!question) return;

        question.addEventListener('click', () => {
          const isOpen = item.classList.contains('faq__item--open');

          // Close all other items
          items.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('faq__item--open');
              otherItem.querySelector('.faq__question')?.setAttribute('aria-expanded', 'false');
            }
          });

          // Toggle current item
          if (isOpen) {
            item.classList.remove('faq__item--open');
            question.setAttribute('aria-expanded', 'false');
          } else {
            item.classList.add('faq__item--open');
            question.setAttribute('aria-expanded', 'true');
          }
        });
      });
    }
  };

  // ============================================
  // Gallery Filter
  // ============================================
  const GalleryFilter = {
    init() {
      const filters = document.querySelectorAll('.gallery__filter');
      const items = document.querySelectorAll('.gallery__item');
      if (!filters.length || !items.length) return;

      filters.forEach(filter => {
        filter.addEventListener('click', () => {
          const category = filter.dataset.filter;

          // Update active filter
          filters.forEach(f => f.classList.remove('gallery__filter--active'));
          filter.classList.add('gallery__filter--active');

          // Filter items
          items.forEach(item => {
            const itemCategory = item.dataset.category;
            if (category === 'all' || itemCategory === category) {
              item.style.display = '';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    }
  };

  // ============================================
  // Gallery Lightbox
  // ============================================
  const Lightbox = {
    currentIndex: 0,
    images: [],

    init() {
      const lightbox = document.getElementById('lightbox');
      const items = document.querySelectorAll('.gallery__item');
      if (!lightbox || !items.length) return;

      const closeBtn = lightbox.querySelector('.lightbox__close');
      const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
      const nextBtn = lightbox.querySelector('.lightbox__nav--next');
      const image = lightbox.querySelector('.lightbox__image');
      const currentSpan = document.getElementById('lightboxCurrent');
      const totalSpan = document.getElementById('lightboxTotal');

      // Collect all images
      this.images = Array.from(items).map(item => {
        const img = item.querySelector('img');
        return {
          src: img.src,
          alt: img.alt
        };
      });

      totalSpan.textContent = this.images.length;

      // Open lightbox on item click
      items.forEach((item, index) => {
        item.addEventListener('click', () => {
          this.currentIndex = index;
          this.showImage(image, currentSpan);
          lightbox.classList.add('lightbox--open');
          document.body.style.overflow = 'hidden';
        });
      });

      // Close button
      closeBtn.addEventListener('click', () => this.close(lightbox));

      // Click outside to close
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) this.close(lightbox);
      });

      // Navigation
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prev(image, currentSpan);
      });

      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.next(image, currentSpan);
      });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('lightbox--open')) return;

        switch (e.key) {
          case 'Escape':
            this.close(lightbox);
            break;
          case 'ArrowLeft':
            this.prev(image, currentSpan);
            break;
          case 'ArrowRight':
            this.next(image, currentSpan);
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
            this.next(image, currentSpan);
          } else {
            this.prev(image, currentSpan);
          }
        }
      }, { passive: true });
    },

    showImage(imageEl, currentSpan) {
      const img = this.images[this.currentIndex];
      imageEl.src = img.src;
      imageEl.alt = img.alt;
      currentSpan.textContent = this.currentIndex + 1;
    },

    prev(imageEl, currentSpan) {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.showImage(imageEl, currentSpan);
    },

    next(imageEl, currentSpan) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.showImage(imageEl, currentSpan);
    },

    close(lightbox) {
      lightbox.classList.remove('lightbox--open');
      document.body.style.overflow = '';
    }
  };

  // ============================================
  // Cookie Banner
  // ============================================
  const CookieBanner = {
    STORAGE_KEY: 'wgn-cookies',

    init() {
      const banner = document.getElementById('cookieBanner');
      if (!banner) return;

      // Check if consent already given
      if (localStorage.getItem(this.STORAGE_KEY)) {
        return;
      }

      // Show banner after short delay
      setTimeout(() => {
        banner.classList.add('cookie-banner--visible');
      }, 1000);

      const acceptAll = document.getElementById('cookieAcceptAll');
      const saveSelected = document.getElementById('cookieSaveSelected');
      const analyticsCheckbox = document.getElementById('cookieAnalytics');
      const marketingCheckbox = document.getElementById('cookieMarketing');

      acceptAll.addEventListener('click', () => {
        this.saveConsent({
          necessary: true,
          analytics: true,
          marketing: true
        });
        this.hide(banner);
      });

      saveSelected.addEventListener('click', () => {
        this.saveConsent({
          necessary: true,
          analytics: analyticsCheckbox.checked,
          marketing: marketingCheckbox.checked
        });
        this.hide(banner);
      });
    },

    saveConsent(consent) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(consent));
    },

    hide(banner) {
      banner.classList.remove('cookie-banner--visible');
    }
  };

  // ============================================
  // Contact Form
  // ============================================
  const ContactForm = {
    init() {
      const form = document.getElementById('contactForm');
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation is handled by HTML5
        // Here you would typically send the data to a server

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simulate submission
        console.log('Form submitted:', data);

        // Show success message (in production, this would happen after server response)
        alert('Vielen Dank für deine Anfrage! Wir melden uns innerhalb von 24 Stunden.');
        form.reset();
      });
    }
  };

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
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
            behavior: 'smooth',
            block: 'start'
          });
        });
      });
    }
  };

  // ============================================
  // Dropdown Navigation (Desktop)
  // ============================================
  const DropdownNav = {
    init() {
      const dropdowns = document.querySelectorAll('.nav__dropdown');

      dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.nav__dropdown-toggle');
        if (!toggle) return;

        // Toggle on click for accessibility
        toggle.addEventListener('click', () => {
          const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
          toggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
          if (!dropdown.contains(e.target)) {
            toggle.setAttribute('aria-expanded', 'false');
          }
        });

        // Keyboard navigation
        toggle.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
          }
        });
      });
    }
  };

  // ============================================
  // Initialize All Modules
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    MobileNav.init();
    HeaderScroll.init();
    ScrollProgress.init();
    ScrollReveal.init();
    StatCounters.init();
    FAQAccordion.init();
    GalleryFilter.init();
    Lightbox.init();
    CookieBanner.init();
    ContactForm.init();
    SmoothScroll.init();
    DropdownNav.init();
  });

})();
