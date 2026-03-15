/**
 * WG Nürnberg v020 - Main JavaScript
 * Handles: Dark Mode, Mobile Nav, Dropdown, Gallery, Lightbox, FAQ, Cookies, Scroll Effects
 */

(function() {
  'use strict';

  // ============================================
  // Utility Functions
  // ============================================

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================
  // Dark Mode
  // ============================================

  const initDarkMode = () => {
    const toggle = $('.theme-toggle');
    const html = document.documentElement;
    const storageKey = 'wgn-theme';

    // Get initial theme
    const getTheme = () => {
      const stored = localStorage.getItem(storageKey);
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Apply theme
    const setTheme = (theme) => {
      html.setAttribute('data-theme', theme);
      localStorage.setItem(storageKey, theme);
    };

    // Initialize
    setTheme(getTheme());

    // Toggle handler
    toggle?.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(storageKey)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  };

  // ============================================
  // Scroll Progress Bar
  // ============================================

  const initScrollProgress = () => {
    const progressBar = $('.scroll-progress');
    if (!progressBar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  };

  // ============================================
  // Mobile Navigation
  // ============================================

  const initMobileNav = () => {
    const toggle = $('.mobile-menu-toggle');
    const nav = $('.mobile-nav');
    const links = $$('.mobile-nav-link:not(.mobile-dropdown-toggle)');
    const dropdownToggles = $$('.mobile-dropdown-toggle');

    if (!toggle || !nav) return;

    const closeNav = () => {
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    };

    const openNav = () => {
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      nav.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.contains('open');
      isOpen ? closeNav() : openNav();
    });

    // Close nav when clicking a link
    links.forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Mobile dropdown
    dropdownToggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdown = btn.closest('.mobile-dropdown');
        dropdown?.classList.toggle('open');
        btn.setAttribute('aria-expanded', dropdown?.classList.contains('open'));
      });
    });

    // Close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        closeNav();
      }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeNav();
        toggle.focus();
      }
    });
  };

  // ============================================
  // Desktop Dropdown
  // ============================================

  const initDesktopDropdown = () => {
    const dropdowns = $$('.nav-dropdown');

    dropdowns.forEach(dropdown => {
      const toggle = $('.nav-dropdown-toggle', dropdown);

      // Keyboard navigation
      toggle?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          dropdown.classList.toggle('open');
          toggle.setAttribute('aria-expanded', dropdown.classList.contains('open'));
        }
      });

      // Close on escape
      dropdown.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          dropdown.classList.remove('open');
          toggle?.setAttribute('aria-expanded', 'false');
          toggle?.focus();
        }
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('open');
          toggle?.setAttribute('aria-expanded', 'false');
        }
      });
    });
  };

  // ============================================
  // Gallery Filter & Lightbox
  // ============================================

  const initGallery = () => {
    const filterBtns = $$('.filter-btn');
    const galleryItems = $$('.gallery-item');
    const lightbox = $('.lightbox');
    const lightboxImage = $('.lightbox-image');
    const lightboxClose = $('.lightbox-close');
    const lightboxPrev = $('.lightbox-prev');
    const lightboxNext = $('.lightbox-next');
    const lightboxCounter = $('.lightbox-counter');

    if (!filterBtns.length || !galleryItems.length) return;

    let currentIndex = 0;
    let visibleItems = [];

    // Filter functionality
    const filterGallery = (filter) => {
      galleryItems.forEach(item => {
        const categories = item.dataset.category?.split(' ') || [];
        const show = filter === 'all' || categories.includes(filter);
        item.classList.toggle('hidden', !show);
      });
      updateVisibleItems();
    };

    const updateVisibleItems = () => {
      visibleItems = galleryItems.filter(item => !item.classList.contains('hidden'));
    };

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        filterGallery(btn.dataset.filter);
      });
    });

    // Initialize visible items
    updateVisibleItems();

    // Lightbox functionality
    const openLightbox = (index) => {
      if (!lightbox || !lightboxImage) return;

      currentIndex = index;
      const item = visibleItems[index];
      const img = $('img', item);

      if (img) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
      }

      updateCounter();
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      lightboxClose?.focus();
    };

    const closeLightbox = () => {
      lightbox?.classList.remove('open');
      document.body.style.overflow = '';
      visibleItems[currentIndex]?.focus();
    };

    const showPrev = () => {
      currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
      const img = $('img', visibleItems[currentIndex]);
      if (img && lightboxImage) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
      }
      updateCounter();
    };

    const showNext = () => {
      currentIndex = (currentIndex + 1) % visibleItems.length;
      const img = $('img', visibleItems[currentIndex]);
      if (img && lightboxImage) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
      }
      updateCounter();
    };

    const updateCounter = () => {
      if (lightboxCounter) {
        lightboxCounter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;
      }
    };

    // Event listeners
    galleryItems.forEach((item, index) => {
      const openHandler = () => {
        const visibleIndex = visibleItems.indexOf(item);
        if (visibleIndex !== -1) {
          openLightbox(visibleIndex);
        }
      };

      item.addEventListener('click', openHandler);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openHandler();
        }
      });
    });

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', showPrev);
    lightboxNext?.addEventListener('click', showNext);

    // Keyboard navigation
    lightbox?.addEventListener('keydown', (e) => {
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

    // Close on backdrop click
    lightbox?.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox?.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox?.addEventListener('touchend', (e) => {
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
  };

  // ============================================
  // Progressive Image Loading
  // ============================================

  const initProgressiveImages = () => {
    const images = $$('.gallery-item img.blur-up');

    if (!images.length || prefersReducedMotion()) {
      // Skip animation, just show images
      images.forEach(img => {
        img.classList.remove('blur-up');
        img.closest('.gallery-item')?.classList.remove('loading');
      });
      return;
    }

    const loadImage = (img) => {
      const item = img.closest('.gallery-item');

      if (img.complete) {
        img.classList.add('loaded');
        img.classList.remove('blur-up');
        item?.classList.remove('loading');
      } else {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
          img.classList.remove('blur-up');
          item?.classList.remove('loading');
        });
      }
    };

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px'
    });

    images.forEach(img => observer.observe(img));
  };

  // ============================================
  // FAQ Accordion
  // ============================================

  const initFAQ = () => {
    const items = $$('.faq-item');

    items.forEach(item => {
      const question = $('.faq-question', item);
      const answer = $('.faq-answer', item);

      question?.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all others
        items.forEach(i => {
          i.classList.remove('open');
          $('.faq-question', i)?.setAttribute('aria-expanded', 'false');
        });

        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
          question.setAttribute('aria-expanded', 'true');
        }
      });

      // Keyboard support
      question?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  };

  // ============================================
  // Scroll Reveal Animation
  // ============================================

  const initScrollReveal = () => {
    if (prefersReducedMotion()) return;

    const reveals = $$('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  };

  // ============================================
  // Button Ripple Effect
  // ============================================

  const initRippleEffect = () => {
    if (prefersReducedMotion()) return;

    const buttons = $$('.btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });
  };

  // ============================================
  // Cookie Consent
  // ============================================

  const initCookieConsent = () => {
    const consent = $('.cookie-consent');
    const modal = $('.cookie-modal');
    const acceptBtn = $('.cookie-accept-btn');
    const settingsBtn = $('.cookie-settings-btn');
    const modalClose = $('.cookie-modal-close');
    const saveBtn = $('.cookie-save-btn');
    const acceptAllBtn = $('.cookie-accept-all-btn');
    const storageKey = 'wgn-cookies';

    if (!consent) return;

    // Check if consent was already given
    const hasConsent = localStorage.getItem(storageKey);

    if (!hasConsent) {
      setTimeout(() => {
        consent.classList.add('show');
      }, 1000);
    }

    const hideConsent = () => {
      consent.classList.remove('show');
    };

    const hideModal = () => {
      modal?.classList.remove('open');
    };

    const saveConsent = (settings) => {
      localStorage.setItem(storageKey, JSON.stringify(settings));
      hideConsent();
      hideModal();
    };

    acceptBtn?.addEventListener('click', () => {
      saveConsent({ necessary: true, analytics: true, marketing: true });
    });

    settingsBtn?.addEventListener('click', () => {
      modal?.classList.add('open');
    });

    modalClose?.addEventListener('click', hideModal);

    saveBtn?.addEventListener('click', () => {
      const analytics = $('#cookie-analytics')?.checked || false;
      const marketing = $('#cookie-marketing')?.checked || false;
      saveConsent({ necessary: true, analytics, marketing });
    });

    acceptAllBtn?.addEventListener('click', () => {
      saveConsent({ necessary: true, analytics: true, marketing: true });
    });

    // Close modal on backdrop click
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideModal();
      }
    });

    // Close modal on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('open')) {
        hideModal();
      }
    });
  };

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================

  const initSmoothScroll = () => {
    const anchors = $$('a[href^="#"]');

    anchors.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = $(href);
        if (target) {
          e.preventDefault();

          // Close mobile nav if open
          const mobileNav = $('.mobile-nav');
          if (mobileNav?.classList.contains('open')) {
            $('.mobile-menu-toggle')?.click();
          }

          target.scrollIntoView({
            behavior: prefersReducedMotion() ? 'auto' : 'smooth'
          });

          // Update URL
          history.pushState(null, '', href);
        }
      });
    });
  };

  // ============================================
  // Form Handling
  // ============================================

  const initFormHandling = () => {
    const form = $('.contact-form');

    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const required = $$('[required]', form);
      let isValid = true;

      required.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });

      if (isValid) {
        // Here you would normally send the form data to a server
        // For now, just show a success message
        const submitBtn = $('button[type="submit"]', form);
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Gesendet!';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          form.reset();
        }, 2000);
      }
    });

    // Remove error class on input
    $$('.form-input, .form-select, .form-textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('error');
      });
    });
  };

  // ============================================
  // Stat Counter Animation
  // ============================================

  const initStatCounters = () => {
    if (prefersReducedMotion()) return;

    const stats = $$('.stat-number[data-count]');

    const animateCounter = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const update = () => {
        current += step;
        if (current < target) {
          el.textContent = Math.floor(current) + (el.textContent.includes('+') ? '+' : '');
          requestAnimationFrame(update);
        } else {
          el.textContent = target + (el.textContent.includes('+') ? '+' : '');
        }
      };

      update();
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
  };

  // ============================================
  // Header Scroll Effect
  // ============================================

  const initHeaderScroll = () => {
    const header = $('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 100) {
        header.style.boxShadow = 'var(--shadow-md)';
      } else {
        header.style.boxShadow = 'none';
      }

      lastScroll = currentScroll;
    }, { passive: true });
  };

  // ============================================
  // View Transitions API Support
  // ============================================

  const initViewTransitions = () => {
    if (!document.startViewTransition) return;

    // Add view-transition support for internal links
    const internalLinks = $$('a[href$=".html"]');

    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');

        document.startViewTransition(() => {
          window.location.href = href;
        });
      });
    });
  };

  // ============================================
  // Initialize Everything
  // ============================================

  const init = () => {
    initDarkMode();
    initScrollProgress();
    initMobileNav();
    initDesktopDropdown();
    initGallery();
    initProgressiveImages();
    initFAQ();
    initScrollReveal();
    initRippleEffect();
    initCookieConsent();
    initSmoothScroll();
    initFormHandling();
    initStatCounters();
    initHeaderScroll();
    initViewTransitions();
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
