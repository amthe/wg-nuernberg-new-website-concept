/**
 * WG Nürnberg v013 — Main JavaScript
 * Enhanced Gallery, Lightbox, Scroll Animations, Cookie Consent
 */

(function() {
    'use strict';

    // ==========================================================================
    // 1. Theme Toggle (Dark/Light Mode)
    // ==========================================================================

    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const THEME_KEY = 'wgn-theme';

    function initTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        htmlElement.setAttribute('data-theme', theme);
    }

    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    initTheme();

    // ==========================================================================
    // 2. Mobile Navigation
    // ==========================================================================

    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');

    function toggleMobileNav() {
        const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isOpen);
        mobileNav.classList.toggle('is-open', !isOpen);
        document.body.style.overflow = !isOpen ? 'hidden' : '';
    }

    function closeMobileNav() {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', toggleMobileNav);

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });
    }

    // ==========================================================================
    // 3. Scroll Progress Bar
    // ==========================================================================

    const scrollProgress = document.querySelector('.scroll-progress');

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;

        if (scrollProgress) {
            scrollProgress.style.transform = `scaleX(${progress})`;
        }
    }

    let scrollTicking = false;

    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            window.requestAnimationFrame(function() {
                updateScrollProgress();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // ==========================================================================
    // 4. Scroll Reveal Animation
    // ==========================================================================

    const revealElements = document.querySelectorAll('.reveal');

    function checkReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function initScrollReveal() {
        if (checkReducedMotion()) {
            revealElements.forEach(el => el.classList.add('is-visible'));
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
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    }

    initScrollReveal();

    // ==========================================================================
    // 5. Counter Animation
    // ==========================================================================

    const counters = document.querySelectorAll('.stat__number[data-count]');

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 2000;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    function initCounters() {
        if (checkReducedMotion()) {
            counters.forEach(counter => {
                counter.textContent = counter.getAttribute('data-count');
            });
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

        counters.forEach(counter => observer.observe(counter));
    }

    initCounters();

    // ==========================================================================
    // 6. Gallery Filter
    // ==========================================================================

    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');

    function filterGallery(filter) {
        galleryItems.forEach(item => {
            const categories = item.getAttribute('data-category') || '';
            const matches = filter === 'all' || categories.includes(filter);
            item.classList.toggle('hidden', !matches);
        });

        galleryFilters.forEach(btn => {
            const isActive = btn.getAttribute('data-filter') === filter;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive);
        });
    }

    galleryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const filterValue = filter.getAttribute('data-filter');
            filterGallery(filterValue);
        });
    });

    // ==========================================================================
    // 7. Lightbox
    // ==========================================================================

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox?.querySelector('.lightbox__image');
    const lightboxCaption = lightbox?.querySelector('.lightbox__caption');
    const lightboxCounter = lightbox?.querySelector('.lightbox__counter');
    const lightboxClose = lightbox?.querySelector('.lightbox__close');
    const lightboxPrev = lightbox?.querySelector('.lightbox__prev');
    const lightboxNext = lightbox?.querySelector('.lightbox__next');

    let currentImageIndex = 0;
    let visibleImages = [];
    let touchStartX = 0;
    let touchEndX = 0;

    function getVisibleGalleryItems() {
        return Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
    }

    function updateLightboxImage(index) {
        const items = getVisibleGalleryItems();
        if (index < 0 || index >= items.length) return;

        currentImageIndex = index;
        const item = items[index];
        const img = item.querySelector('img');
        const caption = item.querySelector('figcaption')?.textContent || '';

        // Preload current image
        const largeUrl = img.src.replace('w=400', 'w=1200').replace('h=300', 'h=800');
        lightboxImage.src = largeUrl;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = caption;
        lightboxCounter.textContent = `${index + 1} / ${items.length}`;

        // Preload adjacent images
        preloadAdjacentImages(index, items);
    }

    function preloadAdjacentImages(index, items) {
        const preloadIndexes = [index - 1, index + 1];
        preloadIndexes.forEach(i => {
            if (i >= 0 && i < items.length) {
                const img = items[i].querySelector('img');
                const preloadImg = new Image();
                preloadImg.src = img.src.replace('w=400', 'w=1200').replace('h=300', 'h=800');
            }
        });
    }

    function openLightbox(index) {
        visibleImages = getVisibleGalleryItems();
        updateLightboxImage(index);
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        lightboxClose.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    function showPrevImage() {
        const items = getVisibleGalleryItems();
        const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : items.length - 1;
        updateLightboxImage(newIndex);
    }

    function showNextImage() {
        const items = getVisibleGalleryItems();
        const newIndex = currentImageIndex < items.length - 1 ? currentImageIndex + 1 : 0;
        updateLightboxImage(newIndex);
    }

    // Event Listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const visibleIndex = getVisibleGalleryItems().indexOf(item);
            openLightbox(visibleIndex);
        });

        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const visibleIndex = getVisibleGalleryItems().indexOf(item);
                openLightbox(visibleIndex);
            }
        });

        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox?.classList.contains('is-open')) return;

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

    // Touch Swipe Support
    if (lightbox) {
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) < swipeThreshold) return;

        if (diff > 0) {
            showNextImage();
        } else {
            showPrevImage();
        }
    }

    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // ==========================================================================
    // 8. Cookie Consent
    // ==========================================================================

    const cookieBanner = document.getElementById('cookie-banner');
    const cookieDialog = document.getElementById('cookie-dialog');
    const cookieAcceptAll = document.getElementById('cookie-accept-all');
    const cookieAcceptNecessary = document.getElementById('cookie-accept-necessary');
    const cookieDetailsBtn = document.getElementById('cookie-details-btn');
    const cookieSave = document.getElementById('cookie-save');
    const cookieDialogClose = document.getElementById('cookie-dialog-close');
    const cookieAnalytics = document.getElementById('cookie-analytics');
    const cookieMarketing = document.getElementById('cookie-marketing');

    const COOKIE_CONSENT_KEY = 'wgn-cookie-consent';

    function getCookieConsent() {
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        return consent ? JSON.parse(consent) : null;
    }

    function setCookieConsent(consent) {
        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    }

    function showCookieBanner() {
        if (cookieBanner) {
            cookieBanner.hidden = false;
        }
    }

    function hideCookieBanner() {
        if (cookieBanner) {
            cookieBanner.hidden = true;
        }
    }

    function showCookieDialog() {
        if (cookieDialog) {
            cookieDialog.hidden = false;
            document.body.style.overflow = 'hidden';
        }
    }

    function hideCookieDialog() {
        if (cookieDialog) {
            cookieDialog.hidden = true;
            document.body.style.overflow = '';
        }
    }

    function initCookieConsent() {
        const consent = getCookieConsent();

        if (!consent) {
            showCookieBanner();
        }
    }

    if (cookieAcceptAll) {
        cookieAcceptAll.addEventListener('click', () => {
            setCookieConsent({ necessary: true, analytics: true, marketing: true });
            hideCookieBanner();
        });
    }

    if (cookieAcceptNecessary) {
        cookieAcceptNecessary.addEventListener('click', () => {
            setCookieConsent({ necessary: true, analytics: false, marketing: false });
            hideCookieBanner();
        });
    }

    if (cookieDetailsBtn) {
        cookieDetailsBtn.addEventListener('click', () => {
            hideCookieBanner();
            showCookieDialog();
        });
    }

    if (cookieSave) {
        cookieSave.addEventListener('click', () => {
            const consent = {
                necessary: true,
                analytics: cookieAnalytics?.checked || false,
                marketing: cookieMarketing?.checked || false
            };
            setCookieConsent(consent);
            hideCookieDialog();
        });
    }

    if (cookieDialogClose) {
        cookieDialogClose.addEventListener('click', () => {
            hideCookieDialog();
            showCookieBanner();
        });
    }

    // Close dialog on overlay click
    if (cookieDialog) {
        const overlay = cookieDialog.querySelector('.cookie-dialog__overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                hideCookieDialog();
                showCookieBanner();
            });
        }
    }

    initCookieConsent();

    // ==========================================================================
    // 9. Smooth Scroll for Anchor Links
    // ==========================================================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // Close mobile nav if open
                if (mobileNav?.classList.contains('is-open')) {
                    closeMobileNav();
                }

                targetElement.scrollIntoView({
                    behavior: checkReducedMotion() ? 'auto' : 'smooth'
                });

                // Update focus for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus({ preventScroll: true });
            }
        });
    });

    // ==========================================================================
    // 10. Form Handling
    // ==========================================================================

    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple validation
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Check required fields
            const requiredFields = ['name', 'email', 'move-date', 'duration', 'message'];
            let isValid = true;

            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!data[field] || data[field].trim() === '') {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (!isValid) {
                alert('Bitte fülle alle Pflichtfelder aus.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Bitte gib eine gültige E-Mail-Adresse ein.');
                return;
            }

            // Here you would normally send the data to a server
            console.log('Form submitted:', data);
            alert('Vielen Dank für deine Anfrage! Wir melden uns innerhalb von 24 Stunden.');
            this.reset();
        });
    }

    // ==========================================================================
    // 11. Header Scroll Effect
    // ==========================================================================

    const header = document.querySelector('.header');
    let lastScrollY = 0;

    function handleHeaderScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }

        lastScrollY = currentScrollY;
    }

    let headerTicking = false;

    window.addEventListener('scroll', function() {
        if (!headerTicking) {
            window.requestAnimationFrame(function() {
                handleHeaderScroll();
                headerTicking = false;
            });
            headerTicking = true;
        }
    }, { passive: true });

    // ==========================================================================
    // 12. Lazy Loading Images
    // ==========================================================================

    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading is supported
            return;
        }

        // Fallback for older browsers
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    lazyObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px'
        });

        lazyImages.forEach(img => lazyObserver.observe(img));
    }

    initLazyLoading();

    // ==========================================================================
    // 13. FAQ Accordion Accessibility
    // ==========================================================================

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const summary = item.querySelector('summary');
        if (summary) {
            summary.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.open = !item.open;
                }
            });
        }
    });

    // ==========================================================================
    // 14. Video Placeholder
    // ==========================================================================

    const videoBtn = document.querySelector('.hero__video-btn');

    if (videoBtn) {
        videoBtn.addEventListener('click', () => {
            // Placeholder for video functionality
            alert('Video-Tour wird geladen...');
            // In production, this would open a video modal or redirect to a video page
        });
    }

    // ==========================================================================
    // 15. Tour Card Buttons
    // ==========================================================================

    const tourButtons = document.querySelectorAll('.tour-card button');

    tourButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tourCard = button.closest('.tour-card');
            const tourTitle = tourCard?.querySelector('.tour-card__title')?.textContent;
            // Placeholder for 360° tour functionality
            alert(`360° Tour "${tourTitle}" wird gestartet...`);
        });
    });

})();
