/**
 * WG Nürnberg v023 — Main JavaScript
 * Features: Dark mode, mobile menu, lightbox, scroll animations,
 * FAQ accordion, gallery filters, counters, View Transitions
 */

(function() {
  'use strict';

  // ============================================
  // DOM Ready
  // ============================================
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initTheme();
    initHeader();
    initMobileNav();
    initDropdowns();
    initScrollProgress();
    initRevealAnimations();
    initCounters();
    initGalleryFilters();
    initLightbox();
    initBackToTop();
    initContactForm();
    initImageLoading();
  }

  // ============================================
  // Theme (Dark Mode)
  // ============================================
  function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const storageKey = 'wgn-theme';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function getTheme() {
      const saved = localStorage.getItem(storageKey);
      if (saved) return saved;
      return prefersDark.matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(storageKey, theme);
    }

    // Initialize
    applyTheme(getTheme());

    // Toggle handler
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });

    // Listen for system changes
    prefersDark.addEventListener('change', (e) => {
      if (!localStorage.getItem(storageKey)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // ============================================
  // Header (Scroll-linked shrink effect)
  // ============================================
  function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let ticking = false;

    function updateHeader() {
      const scrolled = window.scrollY > 50;
      header.classList.toggle('compact', scrolled);
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });

    updateHeader();
  }

  // ============================================
  // Mobile Navigation (Slide-in from right)
  // ============================================
  function initMobileNav() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('mobile-nav');
    const groupTriggers = document.querySelectorAll('.mobile-nav-group-trigger');

    if (!toggle || !nav) return;

    function openNav() {
      toggle.setAttribute('aria-expanded', 'true');
      nav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      toggle.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
      const isOpen = nav.getAttribute('aria-hidden') === 'false';
      isOpen ? closeNav() : openNav();
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.getAttribute('aria-hidden') === 'false') {
        closeNav();
      }
    });

    // Mobile dropdown toggles
    groupTriggers.forEach(btn => {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
      });
    });

    // Close nav on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }

  // ============================================
  // Desktop Dropdown Navigation
  // ============================================
  function initDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('.nav-dropdown-trigger');
      if (!trigger) return;

      // Toggle on click for accessibility
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', !expanded);
      });

      // Close on click outside
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
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
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
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
  // Reveal Animations (Stagger)
  // ============================================
  function initRevealAnimations() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(el => el.classList.add('revealed'));
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

    elements.forEach(el => observer.observe(el));
  }

  // ============================================
  // Counter Animation
  // ============================================
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const duration = reduceMotion ? 0 : 2000;

          animateCounter(el, target, duration);
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.5
    });

    counters.forEach(counter => observer.observe(counter));
  }

  function animateCounter(el, target, duration) {
    if (duration === 0) {
      el.textContent = target;
      return;
    }

    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  // ============================================
  // Gallery Filters
  // ============================================
  function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!filterBtns.length || !galleryItems.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter items
        galleryItems.forEach(item => {
          const category = item.dataset.category;
          const shouldShow = filter === 'all' || category === filter;
          item.classList.toggle('hidden', !shouldShow);
        });
      });
    });
  }

  // ============================================
  // Lightbox
  // ============================================
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox?.querySelector('.lightbox-img');
    const lightboxClose = lightbox?.querySelector('.lightbox-close');
    const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
    const lightboxNext = lightbox?.querySelector('.lightbox-next');
    const lightboxCounter = lightbox?.querySelector('.lightbox-counter');
    const lightboxZoomIn = lightbox?.querySelector('.lightbox-zoom-in');
    const lightboxZoomOut = lightbox?.querySelector('.lightbox-zoom-out');
    const lightboxZoomLevel = lightbox?.querySelector('.lightbox-zoom-level');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!lightbox || !galleryItems.length) return;

    let currentIndex = 0;
    let images = [];
    let currentZoom = 1;
    const minZoom = 0.5;
    const maxZoom = 3;
    const zoomStep = 0.5;
    let touchStartX = 0;
    let touchEndX = 0;

    function getVisibleImages() {
      return Array.from(document.querySelectorAll('.gallery-item:not(.hidden) img'))
        .map(img => ({ src: img.src, alt: img.alt }));
    }

    function openLightbox(index) {
      images = getVisibleImages();
      currentIndex = index;
      currentZoom = 1;
      updateLightboxImage();
      lightbox.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      lightboxClose?.focus();
    }

    function closeLightbox() {
      lightbox.setAttribute('hidden', '');
      document.body.style.overflow = '';
      currentZoom = 1;
      updateZoom();
    }

    function updateLightboxImage() {
      if (!lightboxImg || !images.length) return;
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt;
      lightboxImg.style.transform = `scale(${currentZoom})`;
      if (lightboxCounter) {
        lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
      }
    }

    function updateZoom() {
      if (lightboxZoomLevel) {
        lightboxZoomLevel.textContent = `${Math.round(currentZoom * 100)}%`;
      }
      if (lightboxImg) {
        lightboxImg.style.transform = `scale(${currentZoom})`;
      }
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      currentZoom = 1;
      updateZoom();
      updateLightboxImage();
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % images.length;
      currentZoom = 1;
      updateZoom();
      updateLightboxImage();
    }

    function zoomIn() {
      if (currentZoom < maxZoom) {
        currentZoom = Math.min(currentZoom + zoomStep, maxZoom);
        updateZoom();
      }
    }

    function zoomOut() {
      if (currentZoom > minZoom) {
        currentZoom = Math.max(currentZoom - zoomStep, minZoom);
        updateZoom();
      }
    }

    // Gallery item click handlers
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
        const visibleIndex = visibleItems.indexOf(item);
        openLightbox(visibleIndex);
      });

      // Keyboard support
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });

    // Lightbox controls
    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', showPrev);
    lightboxNext?.addEventListener('click', showNext);
    lightboxZoomIn?.addEventListener('click', zoomIn);
    lightboxZoomOut?.addEventListener('click', zoomOut);

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (lightbox.hasAttribute('hidden')) return;

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
        case '+':
        case '=':
          zoomIn();
          break;
        case '-':
          zoomOut();
          break;
      }
    });

    // Touch swipe support
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      const minSwipe = 50;

      if (Math.abs(diff) > minSwipe) {
        if (diff > 0) {
          showNext();
        } else {
          showPrev();
        }
      }
    }, { passive: true });

    // Double tap to zoom
    let lastTap = 0;
    lightboxImg?.addEventListener('touchend', (e) => {
      const currentTime = Date.now();
      const tapLength = currentTime - lastTap;

      if (tapLength < 300 && tapLength > 0) {
        currentZoom = currentZoom === 1 ? 2 : 1;
        updateZoom();
        e.preventDefault();
      }

      lastTap = currentTime;
    });
  }

  // ============================================
  // Back to Top Button
  // ============================================
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    let ticking = false;

    function updateVisibility() {
      if (window.scrollY > 500) {
        btn.removeAttribute('hidden');
      } else {
        btn.setAttribute('hidden', '');
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ============================================
  // Contact Form Validation
  // ============================================
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let valid = true;
      const formData = new FormData(form);

      // Clear previous errors
      form.querySelectorAll('.form-error').forEach(el => {
        el.textContent = '';
      });
      form.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
      });

      // Validate required fields
      ['name', 'email', 'message', 'privacy'].forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        const error = input?.parentElement?.querySelector('.form-error');

        if (!input) return;

        if (input.type === 'checkbox') {
          if (input.hasAttribute('required') && !input.checked) {
            if (error) error.textContent = 'Bitte stimme zu, um fortzufahren.';
            valid = false;
          }
        } else {
          if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('error');
            if (error) error.textContent = 'Dieses Feld ist erforderlich.';
            valid = false;
          } else if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            input.classList.add('error');
            if (error) error.textContent = 'Bitte gib eine gültige E-Mail-Adresse ein.';
            valid = false;
          }
        }
      });

      if (valid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn?.querySelector('.btn-text');
        const btnLoading = submitBtn?.querySelector('.btn-loading');

        // Show loading state
        if (btnText) btnText.setAttribute('hidden', '');
        if (btnLoading) btnLoading.removeAttribute('hidden');
        if (submitBtn) submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
          if (btnText) btnText.removeAttribute('hidden');
          if (btnLoading) btnLoading.setAttribute('hidden', '');
          if (submitBtn) submitBtn.disabled = false;

          alert('Vielen Dank für deine Anfrage! Wir melden uns innerhalb von 24 Stunden bei dir.');
          form.reset();
        }, 1500);
      }
    });
  }

  // ============================================
  // Image Loading (Skeleton states)
  // ============================================
  function initImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    images.forEach(img => {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });
      }
    });

    // Hero image (fetchpriority=high, not lazy)
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
      if (heroImg.complete) {
        heroImg.classList.add('loaded');
      } else {
        heroImg.addEventListener('load', () => {
          heroImg.classList.add('loaded');
        });
      }
    }
  }

})();
