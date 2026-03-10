/**
 * WG Nürnberg v019 - Main JavaScript
 * Komplett neu aufgebaut
 */

(function() {
  'use strict';

  // ============================================
  // DOM Ready
  // ============================================
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initThemeToggle();
    initScrollProgress();
    initHeader();
    initMobileNav();
    initDropdowns();
    initFAQ();
    initGallery();
    initLightbox();
    initScrollReveal();
    initProgressiveImages();
    initContactForm();
    initSmoothScroll();
  }

  // ============================================
  // Theme Toggle (Dark Mode)
  // ============================================
  function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    // Load saved theme or detect system preference
    const savedTheme = localStorage.getItem('wgn-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', initialTheme);

    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('wgn-theme', newTheme);
    });

    // Listen for system theme changes
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

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ============================================
  // Header Scroll Effect
  // ============================================
  function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ============================================
  // Mobile Navigation
  // ============================================
  function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav-mobile');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Mobile submenu toggle
    const submenuToggles = nav.querySelectorAll('.nav-mobile-link[data-submenu]');
    submenuToggles.forEach(toggleBtn => {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const submenu = toggleBtn.nextElementSibling;
        if (submenu && submenu.classList.contains('nav-mobile-submenu')) {
          submenu.classList.toggle('open');
          toggleBtn.classList.toggle('open');
        }
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================
  // Desktop Dropdowns
  // ============================================
  function initDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.nav-dropdown-toggle');

      // Keyboard accessibility
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
        if (e.key === 'Escape') {
          dropdown.classList.remove('open');
        }
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('open');
        }
      });
    });
  }

  // ============================================
  // FAQ Accordion
  // ============================================
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all others
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
          }
        });

        // Toggle current
        item.classList.toggle('open');
      });

      // Keyboard accessibility
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  }

  // ============================================
  // Gallery Filter
  // ============================================
  function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!filterBtns.length || !galleryItems.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter items
        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');

          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
            item.style.display = '';
          } else {
            item.classList.add('hidden');
            item.style.display = 'none';
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
    const lightboxImg = lightbox?.querySelector('img');
    const closeBtn = lightbox?.querySelector('.lightbox-close');
    const prevBtn = lightbox?.querySelector('.lightbox-prev');
    const nextBtn = lightbox?.querySelector('.lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!lightbox || !galleryItems.length) return;

    let currentIndex = 0;
    let images = [];

    const getVisibleImages = () => {
      return Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
    };

    const openLightbox = (index) => {
      images = getVisibleImages();
      currentIndex = index;
      updateLightboxImage();
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    const updateLightboxImage = () => {
      const img = images[currentIndex]?.querySelector('img');
      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      }
    };

    const showPrev = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightboxImage();
    };

    const showNext = () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateLightboxImage();
    };

    // Click handlers
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        const visibleImages = getVisibleImages();
        const visibleIndex = visibleImages.indexOf(item);
        openLightbox(visibleIndex >= 0 ? visibleIndex : 0);
      });
    });

    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', showPrev);
    nextBtn?.addEventListener('click', showNext);

    // Click outside to close
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;

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
      handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          showNext();
        } else {
          showPrev();
        }
      }
    };
  }

  // ============================================
  // Scroll Reveal Animation
  // ============================================
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    if (!reveals.length) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(el => el.classList.add('visible'));
      return;
    }

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
  }

  // ============================================
  // Progressive Image Loading
  // ============================================
  function initProgressiveImages() {
    const images = document.querySelectorAll('.progressive-img img');

    if (!images.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');

          if (src) {
            img.classList.add('loading');

            const newImg = new Image();
            newImg.onload = () => {
              img.src = src;
              img.classList.remove('loading');
              img.classList.add('loaded');
              img.removeAttribute('data-src');
            };
            newImg.src = src;
          }

          observer.unobserve(img);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '100px'
    });

    images.forEach(img => {
      if (img.getAttribute('data-src')) {
        observer.observe(img);
      }
    });
  }

  // ============================================
  // Contact Form
  // ============================================
  function initContactForm() {
    const form = document.querySelector('.contact-form form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');

      let isValid = true;

      [name, email, message].forEach(field => {
        if (field && !field.value.trim()) {
          field.style.borderColor = '#EF4444';
          isValid = false;
        } else if (field) {
          field.style.borderColor = '';
        }
      });

      // Email validation
      if (email && email.value && !isValidEmail(email.value)) {
        email.style.borderColor = '#EF4444';
        isValid = false;
      }

      if (isValid) {
        // Here you would normally send the form data
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Wird gesendet...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
          submitBtn.textContent = 'Gesendet!';
          form.reset();

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 2000);
        }, 1000);
      }
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

})();
