/**
 * WG Nürnberg v016 - Main JavaScript
 * Blueprint-treue Galerie-Filter + Schema.org SEO + Gesamtpolish
 */

(function() {
  'use strict';

  // ============================================
  // DOM Ready
  // ============================================
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initScrollProgress();
    initThemeToggle();
    initMobileMenu();
    initMobileDropdowns();
    initHeaderCta();
    initScrollReveal();
    initStatCounters();
    initFaq();
    initGallery();
    initLightbox();
    initContactForm();
    initCookieConsent();
    initSmoothScroll();
  }

  // ============================================
  // Scroll Progress Bar
  // ============================================
  function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ============================================
  // Theme Toggle (Dark Mode)
  // ============================================
  function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    toggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  }

  // ============================================
  // Mobile Menu
  // ============================================
  function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const nav = document.getElementById('mobileNav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function() {
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    nav.querySelectorAll('a:not(.mobile-nav__dropdown-trigger)').forEach(function(link) {
      link.addEventListener('click', function() {
        toggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================
  // Mobile Dropdowns
  // ============================================
  function initMobileDropdowns() {
    const dropdownTriggers = document.querySelectorAll('.mobile-nav__dropdown-trigger');

    dropdownTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function() {
        const parent = trigger.closest('.mobile-nav__item--dropdown');
        if (parent) {
          parent.classList.toggle('active');
        }
      });
    });
  }

  // ============================================
  // Header CTA (show on scroll)
  // ============================================
  function initHeaderCta() {
    const cta = document.getElementById('headerCta');
    if (!cta) return;

    function checkScroll() {
      if (window.scrollY > 500) {
        cta.classList.remove('hidden');
      } else {
        cta.classList.add('hidden');
      }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  // ============================================
  // Scroll Reveal Animations
  // ============================================
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      reveals.forEach(function(el) {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(function(el) {
      observer.observe(el);
    });
  }

  // ============================================
  // Stat Counters Animation
  // ============================================
  function initStatCounters() {
    const stats = document.querySelectorAll('.about__stat-value[data-count]');
    if (!stats.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);

          if (prefersReducedMotion) {
            el.textContent = target + '+';
          } else {
            animateCounter(el, target);
          }

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(function(stat) {
      observer.observe(stat);
    });
  }

  function animateCounter(el, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);

      el.textContent = current + '+';

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ============================================
  // FAQ Accordion
  // ============================================
  function initFaq() {
    const items = document.querySelectorAll('.faq__item');
    if (!items.length) return;

    items.forEach(function(item) {
      const question = item.querySelector('.faq__question');
      if (!question) return;

      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');

        // Close all other items
        items.forEach(function(otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle current item
        item.classList.toggle('active', !isActive);
      });
    });
  }

  // ============================================
  // Gallery Filter (Blueprint: Alle, Grasstraße, Klarastraße, Sternstraße, Zimmer)
  // ============================================
  function initGallery() {
    const filters = document.querySelectorAll('.gallery__filter');
    const items = document.querySelectorAll('.gallery__item');
    if (!filters.length || !items.length) return;

    filters.forEach(function(filter) {
      filter.addEventListener('click', function() {
        const category = filter.getAttribute('data-filter');

        // Update active filter
        filters.forEach(function(f) {
          f.classList.remove('active');
        });
        filter.classList.add('active');

        // Filter items
        items.forEach(function(item) {
          const itemCategory = item.getAttribute('data-category');

          if (category === 'alle' || itemCategory === category) {
            item.style.display = '';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          } else {
            item.style.display = 'none';
          }
        });

        // Update lightbox indices after filtering
        updateLightboxIndices();
      });
    });
  }

  // ============================================
  // Lightbox
  // ============================================
  let lightboxImages = [];
  let currentLightboxIndex = 0;

  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const closeBtn = lightbox?.querySelector('.lightbox__close');
    const prevBtn = lightbox?.querySelector('.lightbox__prev');
    const nextBtn = lightbox?.querySelector('.lightbox__next');
    const galleryItems = document.querySelectorAll('.gallery__item');

    if (!lightbox || !galleryItems.length) return;

    updateLightboxIndices();

    // Open lightbox on gallery item click
    galleryItems.forEach(function(item) {
      item.addEventListener('click', function() {
        const visibleItems = Array.from(document.querySelectorAll('.gallery__item')).filter(function(i) {
          return i.style.display !== 'none';
        });

        const img = item.querySelector('img');
        if (!img) return;

        lightboxImages = visibleItems.map(function(i) {
          const image = i.querySelector('img');
          return image ? image.src : '';
        });

        currentLightboxIndex = visibleItems.indexOf(item);
        showLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close lightbox
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Navigation
    function showPrev() {
      currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
      showLightboxImage();
    }

    function showNext() {
      currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
      showLightboxImage();
    }

    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          showNext();
        } else {
          showPrev();
        }
      }
    }

    function showLightboxImage() {
      if (lightboxImage && lightboxImages[currentLightboxIndex]) {
        lightboxImage.src = lightboxImages[currentLightboxIndex];
        lightboxImage.alt = 'Galerie Bild ' + (currentLightboxIndex + 1);
      }
      if (lightboxCounter) {
        lightboxCounter.textContent = (currentLightboxIndex + 1) + ' / ' + lightboxImages.length;
      }
    }
  }

  function updateLightboxIndices() {
    const visibleItems = Array.from(document.querySelectorAll('.gallery__item')).filter(function(item) {
      return item.style.display !== 'none';
    });

    lightboxImages = visibleItems.map(function(item) {
      const img = item.querySelector('img');
      return img ? img.src : '';
    });
  }

  // ============================================
  // Contact Form
  // ============================================
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic validation
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const moveIn = form.querySelector('#moveIn');
      const duration = form.querySelector('#duration');
      const message = form.querySelector('#message');

      if (!name?.value || !email?.value || !moveIn?.value || !duration?.value || !message?.value) {
        alert('Bitte fülle alle Pflichtfelder aus.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        alert('Bitte gib eine gültige E-Mail-Adresse ein.');
        return;
      }

      // Simulate form submission
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Wird gesendet...';
        submitBtn.disabled = true;

        setTimeout(function() {
          alert('Vielen Dank für deine Anfrage! Wir melden uns schnellstmöglich bei dir.');
          form.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1500);
      }
    });
  }

  // ============================================
  // Cookie Consent (DSGVO)
  // ============================================
  function initCookieConsent() {
    const consent = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('cookieAccept');
    const declineBtn = document.getElementById('cookieDecline');

    if (!consent) return;

    // Check if consent was already given
    const consentGiven = localStorage.getItem('cookieConsent');

    if (!consentGiven) {
      setTimeout(function() {
        consent.classList.add('active');
      }, 1000);
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        consent.classList.remove('active');
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'declined');
        consent.classList.remove('active');
      });
    }
  }

  // ============================================
  // Smooth Scroll
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
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
