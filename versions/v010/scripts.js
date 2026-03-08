/**
 * WG Nürnberg v010 - Scroll Storytelling Edition
 * Complete JavaScript for animations, interactions, and functionality
 */

(function() {
  'use strict';

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

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

  // ============================================
  // THEME TOGGLE (Dark Mode)
  // ============================================

  function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    const storageKey = 'wgn-theme';

    // Get saved theme or system preference
    function getPreferredTheme() {
      const savedTheme = localStorage.getItem(storageKey);
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Apply theme
    function setTheme(theme) {
      html.setAttribute('data-theme', theme);
      localStorage.setItem(storageKey, theme);
    }

    // Initialize
    setTheme(getPreferredTheme());

    // Toggle handler
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
      });
    }

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(storageKey)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // ============================================
  // SCROLL PROGRESS INDICATOR
  // ============================================

  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    window.addEventListener('scroll', throttle(updateProgress, 10), { passive: true });
    updateProgress();
  }

  // ============================================
  // PARALLAX HERO
  // ============================================

  function initParallaxHero() {
    if (prefersReducedMotion || isMobile) return;

    const heroImage = document.querySelector('[data-parallax]');
    if (!heroImage) return;

    let ticking = false;

    function updateParallax() {
      const scrollTop = window.scrollY;
      const heroSection = document.querySelector('.hero');
      if (!heroSection) return;

      const heroHeight = heroSection.offsetHeight;

      if (scrollTop <= heroHeight) {
        const yPos = scrollTop * 0.3; // 30% speed
        heroImage.style.transform = `translateY(${yPos}px)`;
      }

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // ============================================
  // INTERSECTION OBSERVER ANIMATION SYSTEM
  // ============================================

  function initScrollAnimations() {
    if (prefersReducedMotion) {
      // Make all elements visible immediately if reduced motion is preferred
      document.querySelectorAll('.animate-on-scroll, .animate-stagger > *').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    // Observer for single elements
    const singleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          singleObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observer for staggered animations
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          staggerObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe single animations
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      singleObserver.observe(el);
    });

    // Observe staggered animations
    document.querySelectorAll('.animate-stagger').forEach(el => {
      staggerObserver.observe(el);
    });
  }

  // ============================================
  // ANIMATED STAT COUNTERS
  // ============================================

  function initStatCounters() {
    if (prefersReducedMotion) {
      // Show final values immediately
      document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        el.textContent = target + suffix;
      });
      return;
    }

    const counters = document.querySelectorAll('[data-count]');
    if (counters.length === 0) return;

    // Easing function (easeOutExpo)
    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function animateCounter(element) {
      const target = parseInt(element.dataset.count, 10);
      const suffix = element.dataset.suffix || '';
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const current = Math.floor(target * easedProgress);

        element.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ============================================
  // MOBILE MENU
  // ============================================

  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.mobile-menu');
    const links = document.querySelectorAll('.mobile-menu__link');

    if (!toggle || !menu) return;

    function openMenu() {
      toggle.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on link click
    links.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', debounce(() => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    }, 100));
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });

        // Update URL without scrolling
        history.pushState(null, '', href);
      });
    });
  }

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================

  function initBackToTop() {
    const button = document.querySelector('.back-to-top');
    if (!button) return;

    function toggleVisibility() {
      if (window.scrollY > 500) {
        button.classList.add('back-to-top--visible');
      } else {
        button.classList.remove('back-to-top--visible');
      }
    }

    window.addEventListener('scroll', throttle(toggleVisibility, 100), { passive: true });

    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  // ============================================
  // FAQ ACCORDION
  // ============================================

  function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');

      question.addEventListener('click', () => {
        // Close other items (optional - comment out for multi-open)
        // faqItems.forEach(other => {
        //   if (other !== item && other.hasAttribute('open')) {
        //     other.removeAttribute('open');
        //   }
        // });
      });

      // Keyboard support
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.toggleAttribute('open');
        }
      });
    });
  }

  // ============================================
  // GALLERY FILTER
  // ============================================

  function initGalleryFilter() {
    const filters = document.querySelectorAll('.gallery-filter');
    const items = document.querySelectorAll('.gallery-item');

    if (filters.length === 0 || items.length === 0) return;

    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        const category = filter.dataset.filter;

        // Update active state
        filters.forEach(f => f.classList.remove('gallery-filter--active'));
        filter.classList.add('gallery-filter--active');

        // Filter items
        items.forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ============================================
  // LIGHTBOX
  // ============================================

  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox?.querySelector('.lightbox__content img');
    const closeBtn = lightbox?.querySelector('.lightbox__close');
    const prevBtn = lightbox?.querySelector('.lightbox__prev');
    const nextBtn = lightbox?.querySelector('.lightbox__next');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!lightbox || galleryItems.length === 0) return;

    let currentIndex = 0;
    const images = [];

    // Collect all images
    galleryItems.forEach((item, index) => {
      const img = item.querySelector('img');
      if (img) {
        images.push({
          src: img.src.replace('w=400', 'w=1200'),
          alt: img.alt
        });

        item.addEventListener('click', () => openLightbox(index));
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(index);
          }
        });
      }
    });

    function openLightbox(index) {
      currentIndex = index;
      updateLightboxImage();
      lightbox.classList.add('lightbox--open');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('lightbox--open');
      document.body.style.overflow = '';
      galleryItems[currentIndex]?.focus();
    }

    function updateLightboxImage() {
      if (images[currentIndex]) {
        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt;
      }
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightboxImage();
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % images.length;
      updateLightboxImage();
    }

    // Event listeners
    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', showPrev);
    nextBtn?.addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('lightbox--open')) return;

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
  }

  // ============================================
  // CONTACT FORM VALIDATION
  // ============================================

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(input, errorId) {
      input.classList.add('error');
      document.getElementById(errorId)?.classList.add('visible');
    }

    function hideError(input, errorId) {
      input.classList.remove('error');
      document.getElementById(errorId)?.classList.remove('visible');
    }

    function validateField(input, errorId, validator) {
      const isValid = validator(input.value);
      if (isValid) {
        hideError(input, errorId);
      } else {
        showError(input, errorId);
      }
      return isValid;
    }

    // Real-time validation
    nameInput?.addEventListener('blur', () => {
      validateField(nameInput, 'name-error', val => val.trim().length > 0);
    });

    emailInput?.addEventListener('blur', () => {
      validateField(emailInput, 'email-error', validateEmail);
    });

    messageInput?.addEventListener('blur', () => {
      validateField(messageInput, 'message-error', val => val.trim().length > 0);
    });

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, 'name-error', val => val.trim().length > 0);
      const isEmailValid = validateField(emailInput, 'email-error', validateEmail);
      const isMessageValid = validateField(messageInput, 'message-error', val => val.trim().length > 0);

      if (isNameValid && isEmailValid && isMessageValid) {
        // Success - in production, send to server
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Gesendet!';
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = 'var(--color-primary-dark)';

        setTimeout(() => {
          form.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = '';
        }, 3000);
      }
    });
  }

  // ============================================
  // COOKIE CONSENT
  // ============================================

  function initCookieConsent() {
    const consent = document.getElementById('cookie-consent');
    const acceptAll = document.getElementById('cookie-accept-all');
    const acceptEssential = document.getElementById('cookie-accept-essential');
    const settings = document.getElementById('cookie-settings');
    const storageKey = 'wgn-cookie-consent';

    if (!consent) return;

    // Check if consent already given
    const savedConsent = localStorage.getItem(storageKey);
    if (savedConsent) return;

    // Show consent banner after a short delay
    setTimeout(() => {
      consent.classList.add('cookie-consent--visible');
    }, 1500);

    function hideConsent(choice) {
      localStorage.setItem(storageKey, JSON.stringify({
        choice,
        timestamp: Date.now()
      }));
      consent.classList.remove('cookie-consent--visible');
    }

    acceptAll?.addEventListener('click', () => hideConsent('all'));
    acceptEssential?.addEventListener('click', () => hideConsent('essential'));
    settings?.addEventListener('click', () => {
      // In production, open settings modal
      hideConsent('essential');
    });
  }

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================

  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', throttle(() => {
      const currentScroll = window.scrollY;

      if (currentScroll > 100) {
        header.style.boxShadow = 'var(--shadow-card)';
      } else {
        header.style.boxShadow = '';
      }

      lastScroll = currentScroll;
    }, 100), { passive: true });
  }

  // ============================================
  // BUTTON CLICK FEEDBACK
  // ============================================

  function initButtonFeedback() {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.98)';
      });

      btn.addEventListener('mouseup', () => {
        btn.style.transform = '';
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ============================================
  // CARD GLOW EFFECT (subtle)
  // ============================================

  function initCardGlow() {
    if (prefersReducedMotion || isMobile) return;

    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--glow-x', `${x}px`);
        card.style.setProperty('--glow-y', `${y}px`);
      });
    });
  }

  // ============================================
  // INITIALIZE ALL
  // ============================================

  function init() {
    initThemeToggle();
    initScrollProgress();
    initParallaxHero();
    initScrollAnimations();
    initStatCounters();
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
    initFAQAccordion();
    initGalleryFilter();
    initLightbox();
    initContactForm();
    initCookieConsent();
    initHeaderScroll();
    initButtonFeedback();
    initCardGlow();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
