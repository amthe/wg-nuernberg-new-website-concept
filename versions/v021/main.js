/**
 * WG Nürnberg v021 - Main JavaScript
 * Vanilla JS - No frameworks
 */

(function() {
    'use strict';

    // --------------------------------------------------------------------------
    // Theme Toggle
    // --------------------------------------------------------------------------
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    const STORAGE_KEY = 'wgn-theme';

    function getPreferredTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }

    // Initialize theme
    setTheme(getPreferredTheme());

    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            setTheme(currentTheme === 'light' ? 'dark' : 'light');
        });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // --------------------------------------------------------------------------
    // Scroll Progress Bar
    // --------------------------------------------------------------------------
    const scrollProgress = document.querySelector('.scroll-progress');

    function updateScrollProgress() {
        if (!scrollProgress) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    // --------------------------------------------------------------------------
    // Header Scroll Effect
    // --------------------------------------------------------------------------
    const header = document.querySelector('.header');

    function updateHeaderState() {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }

    window.addEventListener('scroll', updateHeaderState, { passive: true });
    updateHeaderState();

    // --------------------------------------------------------------------------
    // Mobile Navigation
    // --------------------------------------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav__link:not(.mobile-nav__group-trigger)');
    const mobileNavSubLinks = document.querySelectorAll('.mobile-nav__sublink');

    function toggleMobileNav() {
        const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isOpen);
        mobileNav.setAttribute('aria-hidden', isOpen);
    }

    function closeMobileNav() {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
    }

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', toggleMobileNav);

        // Close on link click
        [...mobileNavLinks, ...mobileNavSubLinks].forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
                closeMobileNav();
            }
        });
    }

    // Mobile nav group toggle
    const mobileGroupTriggers = document.querySelectorAll('.mobile-nav__group-trigger');
    mobileGroupTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', !isExpanded);
        });
    });

    // --------------------------------------------------------------------------
    // Desktop Dropdown Navigation
    // --------------------------------------------------------------------------
    const dropdownTriggers = document.querySelectorAll('.nav__dropdown-trigger');

    dropdownTriggers.forEach(trigger => {
        const dropdown = trigger.closest('.nav__dropdown');

        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', !isExpanded);
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                trigger.setAttribute('aria-expanded', 'false');
            }
        });

        // Keyboard navigation
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                trigger.setAttribute('aria-expanded', !isExpanded);
            }
            if (e.key === 'Escape') {
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // --------------------------------------------------------------------------
    // Smooth Scroll for Anchor Links
    // --------------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });

    // --------------------------------------------------------------------------
    // Animated Counters
    // --------------------------------------------------------------------------
    const counters = document.querySelectorAll('[data-count]');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'), 10);
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(start + (target - start) * easeOut);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });

        countersAnimated = true;
    }

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.stats');
    if (statsSection && counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // --------------------------------------------------------------------------
    // Scroll Reveal Animation
    // --------------------------------------------------------------------------
    function setupScrollReveal() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const revealElements = document.querySelectorAll('.section__header, .card, .benefit-card, .room-card, .tour-card, .testimonial-card, .wg-type-card, .alternative-card, .step, .faq__item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal', 'revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }

    setupScrollReveal();

    // --------------------------------------------------------------------------
    // Gallery Filter
    // --------------------------------------------------------------------------
    const galleryFilters = document.querySelectorAll('.gallery__filter');
    const galleryItems = document.querySelectorAll('.gallery__item');

    function filterGallery(filter) {
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.hidden = false;
            } else {
                item.hidden = true;
            }
        });
    }

    galleryFilters.forEach(filterBtn => {
        filterBtn.addEventListener('click', () => {
            // Update active state
            galleryFilters.forEach(btn => {
                btn.classList.remove('gallery__filter--active');
                btn.setAttribute('aria-selected', 'false');
            });
            filterBtn.classList.add('gallery__filter--active');
            filterBtn.setAttribute('aria-selected', 'true');

            // Filter items
            const filter = filterBtn.getAttribute('data-filter');
            filterGallery(filter);
        });
    });

    // --------------------------------------------------------------------------
    // Lightbox
    // --------------------------------------------------------------------------
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox?.querySelector('.lightbox__image');
    const lightboxClose = lightbox?.querySelector('.lightbox__close');
    const lightboxPrev = lightbox?.querySelector('.lightbox__prev');
    const lightboxNext = lightbox?.querySelector('.lightbox__next');
    let currentImageIndex = 0;
    let visibleImages = [];

    function getVisibleImages() {
        return Array.from(galleryItems).filter(item => !item.hidden);
    }

    function openLightbox(index) {
        if (!lightbox || !lightboxImage) return;

        visibleImages = getVisibleImages();
        currentImageIndex = index;

        const img = visibleImages[index]?.querySelector('img');
        if (img) {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.hidden = false;
            document.body.style.overflow = 'hidden';
            lightboxClose.focus();
        }
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.hidden = true;
        document.body.style.overflow = '';
        lightboxImage.src = '';
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
        const img = visibleImages[currentImageIndex]?.querySelector('img');
        if (img) {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
        }
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
        const img = visibleImages[currentImageIndex]?.querySelector('img');
        if (img) {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
        }
    }

    // Gallery item click handlers
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const visibleIndex = getVisibleImages().indexOf(item);
            openLightbox(visibleIndex);
        });

        // Keyboard accessibility
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const visibleIndex = getVisibleImages().indexOf(item);
                openLightbox(visibleIndex);
            }
        });
    });

    // Lightbox controls
    if (lightbox) {
        lightboxClose?.addEventListener('click', closeLightbox);
        lightboxPrev?.addEventListener('click', showPrevImage);
        lightboxNext?.addEventListener('click', showNextImage);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.hidden) return;

            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        });

        // Click outside to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
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

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    showNextImage();
                } else {
                    showPrevImage();
                }
            }
        }
    }

    // --------------------------------------------------------------------------
    // Contact Form
    // --------------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Here you would normally send the data to a server
            console.log('Form submitted:', data);

            // Show success message (in production, do this after server response)
            alert('Vielen Dank für deine Anfrage! Wir melden uns innerhalb von 24 Stunden bei dir.');
            contactForm.reset();
        });

        // Set min date for move-in date
        const moveInDate = document.getElementById('move-in-date');
        if (moveInDate) {
            const today = new Date().toISOString().split('T')[0];
            moveInDate.setAttribute('min', today);
        }
    }

    // --------------------------------------------------------------------------
    // Cookie Consent
    // --------------------------------------------------------------------------
    const cookieConsent = document.getElementById('cookie-consent');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieDecline = document.getElementById('cookie-decline');
    const cookieAnalytics = document.getElementById('cookie-analytics');
    const cookieMarketing = document.getElementById('cookie-marketing');
    const COOKIE_KEY = 'wgn-cookie-consent';

    function showCookieConsent() {
        if (!cookieConsent) return;
        cookieConsent.hidden = false;
    }

    function hideCookieConsent() {
        if (!cookieConsent) return;
        cookieConsent.hidden = true;
    }

    function saveCookiePreferences(preferences) {
        localStorage.setItem(COOKIE_KEY, JSON.stringify(preferences));
        hideCookieConsent();
    }

    // Check if consent already given
    const existingConsent = localStorage.getItem(COOKIE_KEY);
    if (!existingConsent) {
        // Show consent after a short delay
        setTimeout(showCookieConsent, 1500);
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            saveCookiePreferences({
                necessary: true,
                analytics: cookieAnalytics?.checked ?? false,
                marketing: cookieMarketing?.checked ?? false
            });
        });
    }

    if (cookieDecline) {
        cookieDecline.addEventListener('click', () => {
            saveCookiePreferences({
                necessary: true,
                analytics: false,
                marketing: false
            });
        });
    }

    // --------------------------------------------------------------------------
    // FAQ Accordion (Enhancement)
    // --------------------------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        const summary = item.querySelector('.faq__question');

        // Add smooth animation
        summary.addEventListener('click', (e) => {
            // Allow default behavior but add animation class
            if (!item.open) {
                item.style.maxHeight = item.scrollHeight + 'px';
            }
        });
    });

    // --------------------------------------------------------------------------
    // Lazy Loading Enhancement
    // --------------------------------------------------------------------------
    // Native lazy loading is used via HTML attributes
    // This adds a fade-in effect when images load

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';

        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });

    // --------------------------------------------------------------------------
    // Initialize
    // --------------------------------------------------------------------------
    console.log('WG Nürnberg v021 initialized');

})();
