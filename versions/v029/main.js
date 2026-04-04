/**
 * WG NÜRNBERG v029 - Main JavaScript
 * Interactive features for the website
 */

(function() {
    'use strict';

    // ========== DOM ELEMENTS ==========
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const themeToggle = document.getElementById('theme-toggle');
    const dropdownToggles = document.querySelectorAll('.header__dropdown-toggle');
    const galerieFilterBtns = document.querySelectorAll('.galerie__filter-btn');
    const galerieItems = document.querySelectorAll('.galerie__item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox?.querySelector('.lightbox__image');
    const lightboxClose = lightbox?.querySelector('.lightbox__close');
    const lightboxPrev = lightbox?.querySelector('.lightbox__prev');
    const lightboxNext = lightbox?.querySelector('.lightbox__next');
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieDecline = document.getElementById('cookie-decline');
    const kontaktForm = document.getElementById('kontakt-form');

    // Lightbox state
    let currentGalleryImages = [];
    let currentImageIndex = 0;

    // ========== UTILITY FUNCTIONS ==========

    /**
     * Debounce function for scroll events
     */
    function debounce(func, wait = 10) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    /**
     * Check if element is in viewport
     */
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // ========== HEADER SCROLL EFFECT ==========

    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header?.classList.add('header--scrolled');
        } else {
            header?.classList.remove('header--scrolled');
        }
    }

    window.addEventListener('scroll', debounce(handleHeaderScroll, 5));

    // ========== MOBILE NAVIGATION ==========

    function toggleMobileNav() {
        const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isOpen);
        nav.classList.toggle('is-open');
        document.body.style.overflow = isOpen ? '' : 'hidden';
    }

    function closeMobileNav() {
        hamburger?.setAttribute('aria-expanded', 'false');
        nav?.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    hamburger?.addEventListener('click', toggleMobileNav);

    // Close mobile nav on link click
    nav?.querySelectorAll('.header__link:not(.header__dropdown-toggle)').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // Close mobile nav on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileNav();
            closeLightbox();
        }
    });

    // ========== DROPDOWN MENU (Mobile) ==========

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = toggle.closest('.header__dropdown');
                dropdown.classList.toggle('is-open');
                toggle.setAttribute('aria-expanded', dropdown.classList.contains('is-open'));
            }
        });
    });

    // ========== DARK MODE TOGGLE ==========

    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    function toggleTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    themeToggle?.addEventListener('click', toggleTheme);
    initTheme();

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                closeMobileNav();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========== GALLERY FILTER ==========

    function filterGallery(category) {
        galerieItems.forEach(item => {
            const itemCategory = item.dataset.category;
            if (category === 'alle' || itemCategory === category) {
                item.classList.remove('is-hidden');
            } else {
                item.classList.add('is-hidden');
            }
        });

        // Update active button
        galerieFilterBtns.forEach(btn => {
            btn.classList.toggle('galerie__filter-btn--active', btn.dataset.filter === category);
        });

        // Update lightbox images array
        updateGalleryImages();
    }

    function updateGalleryImages() {
        currentGalleryImages = Array.from(galerieItems)
            .filter(item => !item.classList.contains('is-hidden'))
            .map(item => ({
                src: item.querySelector('img').src,
                alt: item.querySelector('img').alt
            }));
    }

    galerieFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterGallery(btn.dataset.filter);
        });
    });

    // Initialize gallery images
    updateGalleryImages();

    // ========== LIGHTBOX ==========

    function openLightbox(index) {
        if (!lightbox || !lightboxImage) return;

        currentImageIndex = index;
        lightboxImage.src = currentGalleryImages[index].src;
        lightboxImage.alt = currentGalleryImages[index].alt;
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;

        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        lightboxImage.src = currentGalleryImages[currentImageIndex].src;
        lightboxImage.alt = currentGalleryImages[currentImageIndex].alt;
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
        lightboxImage.src = currentGalleryImages[currentImageIndex].src;
        lightboxImage.alt = currentGalleryImages[currentImageIndex].alt;
    }

    // Gallery item click
    galerieItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Find the actual index among visible items
            const visibleItems = Array.from(galerieItems).filter(i => !i.classList.contains('is-hidden'));
            const visibleIndex = visibleItems.indexOf(item);
            openLightbox(visibleIndex);
        });
    });

    // Lightbox controls
    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', showPrevImage);
    lightboxNext?.addEventListener('click', showNextImage);

    // Close lightbox on backdrop click
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox?.classList.contains('is-open')) return;

        if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });

    // Touch swipe for lightbox
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
                showNextImage();
            } else {
                showPrevImage();
            }
        }
    }, { passive: true });

    // ========== COOKIE BANNER ==========

    function showCookieBanner() {
        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                cookieBanner?.classList.add('is-visible');
            }, 1000);
        }
    }

    function hideCookieBanner(consent) {
        localStorage.setItem('cookieConsent', consent);
        cookieBanner?.classList.remove('is-visible');
    }

    cookieAccept?.addEventListener('click', () => hideCookieBanner('all'));
    cookieDecline?.addEventListener('click', () => hideCookieBanner('necessary'));

    showCookieBanner();

    // ========== CONTACT FORM ==========

    kontaktForm?.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (!data.name || !data.email || !data.nachricht) {
            alert('Bitte fülle alle Pflichtfelder aus.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Bitte gib eine gültige E-Mail-Adresse ein.');
            return;
        }

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Vielen Dank für deine Anfrage! Wir melden uns schnellstmöglich bei dir.');
        this.reset();
    });

    // ========== FAQ ACCORDION ==========

    // Close other FAQ items when one is opened (optional behavior)
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        item.addEventListener('toggle', function() {
            if (this.open) {
                // Optional: Close other items
                // faqItems.forEach(otherItem => {
                //     if (otherItem !== this && otherItem.open) {
                //         otherItem.open = false;
                //     }
                // });
            }
        });
    });

    // ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========

    if ('IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll(
            '.zimmer-card, .vorteile-card, .besichtigung-card, .tour-card, .bewertung-card, .wg-typ-card'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    // ========== ACTIVE NAVIGATION HIGHLIGHTING ==========

    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.header__link[href^="#"]');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('is-active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('is-active');
            }
        });
    }

    window.addEventListener('scroll', debounce(updateActiveNav, 50));

    // ========== RESIZE HANDLER ==========

    window.addEventListener('resize', debounce(() => {
        // Close mobile nav on resize to desktop
        if (window.innerWidth > 768) {
            closeMobileNav();
            // Close mobile dropdowns
            document.querySelectorAll('.header__dropdown').forEach(dropdown => {
                dropdown.classList.remove('is-open');
            });
        }
    }, 100));

    // ========== INITIALIZE ==========

    // Run on page load
    handleHeaderScroll();
    updateActiveNav();

})();
