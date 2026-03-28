/**
 * WG Nürnberg v022 - Main JavaScript
 * Features: Dark Mode, Lightbox, Counters, ScrollReveal, Mobile Menu,
 * FAQ Accordion, Cookie Consent, Scroll Progress, Navigation Dropdown
 */

(function() {
    'use strict';

    // ========================================
    // DOM Ready
    // ========================================
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initDarkMode();
        initScrollProgress();
        initHeader();
        initMobileMenu();
        initNavigationDropdown();
        initSmoothScroll();
        initScrollReveal();
        initCounters();
        initGalleryFilter();
        initLightbox();
        initFAQAccordion();
        initContactForm();
        initCookieConsent();
    }

    // ========================================
    // Dark Mode
    // ========================================
    function initDarkMode() {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        // Get saved preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

        // Apply theme
        setTheme(theme);

        // Toggle handler
        toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    // ========================================
    // Scroll Progress Bar
    // ========================================
    function initScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    // ========================================
    // Header (scroll effect)
    // ========================================
    function initHeader() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScroll = 0;

        function handleScroll() {
            const currentScroll = window.scrollY;

            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // ========================================
    // Mobile Menu (Bottom Sheet)
    // ========================================
    function initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('mobile-menu-overlay');
        if (!hamburger || !mobileMenu) return;

        const mobileLinks = mobileMenu.querySelectorAll('a:not(.mobile-dropdown-toggle)');
        const dropdownToggles = mobileMenu.querySelectorAll('.mobile-dropdown-toggle');

        function openMenu() {
            hamburger.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            mobileMenu.classList.add('active');
            mobileMenu.setAttribute('aria-hidden', 'false');
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-hidden', 'true');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        hamburger.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('active');
            isOpen ? closeMenu() : openMenu();
        });

        if (overlay) {
            overlay.addEventListener('click', closeMenu);
        }

        // Close on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Mobile dropdown toggles
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = toggle.closest('.mobile-dropdown');
                const isOpen = parent.classList.contains('open');

                // Close all other dropdowns
                document.querySelectorAll('.mobile-dropdown.open').forEach(dropdown => {
                    if (dropdown !== parent) {
                        dropdown.classList.remove('open');
                        dropdown.querySelector('.mobile-dropdown-toggle').setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle current
                parent.classList.toggle('open');
                toggle.setAttribute('aria-expanded', !isOpen);
            });
        });

        // Touch swipe to close
        let touchStartY = 0;
        mobileMenu.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        mobileMenu.addEventListener('touchmove', (e) => {
            const touchY = e.touches[0].clientY;
            const diff = touchY - touchStartY;

            if (diff > 100) {
                closeMenu();
            }
        }, { passive: true });
    }

    // ========================================
    // Navigation Dropdown (Desktop)
    // ========================================
    function initNavigationDropdown() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');

        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');

            // Keyboard accessibility
            toggle.addEventListener('keydown', (e) => {
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
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.focus();
                }
            });

            // Close when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('open');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // ========================================
    // Smooth Scroll
    // ========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

    // ========================================
    // Scroll Reveal (respects reduced motion)
    // ========================================
    function initScrollReveal() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Show all elements immediately
            document.querySelectorAll('.reveal').forEach(el => {
                el.classList.add('visible');
            });
            return;
        }

        const reveals = document.querySelectorAll('.reveal');

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

    // ========================================
    // Animated Counters
    // ========================================
    function initCounters() {
        const counters = document.querySelectorAll('[data-target]');
        if (!counters.length) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'), 10);

                    if (prefersReducedMotion) {
                        counter.textContent = target;
                    } else {
                        animateCounter(counter, target);
                    }

                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(element, target) {
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = Math.floor(easedProgress * (target - start) + start);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    // ========================================
    // Gallery Filter
    // ========================================
    function initGalleryFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (!filterButtons.length || !galleryItems.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter items
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ========================================
    // Lightbox
    // ========================================
    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCounter = document.getElementById('lightbox-counter');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        const galleryItems = document.querySelectorAll('.gallery-item');

        if (!lightbox || !galleryItems.length) return;

        let currentIndex = 0;
        let visibleItems = [];
        let touchStartX = 0;

        function updateVisibleItems() {
            visibleItems = Array.from(galleryItems).filter(
                item => !item.classList.contains('hidden')
            );
        }

        function openLightbox(index) {
            updateVisibleItems();
            currentIndex = index;
            showImage();
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        function showImage() {
            if (!visibleItems[currentIndex]) return;
            const img = visibleItems[currentIndex].querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCounter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % visibleItems.length;
            showImage();
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
            showImage();
        }

        // Click handlers
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                updateVisibleItems();
                const visibleIndex = visibleItems.indexOf(item);
                if (visibleIndex !== -1) {
                    openLightbox(visibleIndex);
                }
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', nextImage);
        prevBtn.addEventListener('click', prevImage);

        // Click outside to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.getAttribute('aria-hidden') === 'true') return;

            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        });

        // Touch swipe
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextImage();
                } else {
                    prevImage();
                }
            }
        }, { passive: true });
    }

    // ========================================
    // FAQ Accordion (animated height)
    // ========================================
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            // Set initial state for non-active items
            if (!item.classList.contains('active')) {
                answer.style.maxHeight = '0';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                        otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    }
                });

                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    question.setAttribute('aria-expanded', 'false');
                    answer.style.maxHeight = '0';
                } else {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }

    // ========================================
    // Contact Form Validation
    // ========================================
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Set min date to today
        const moveDateInput = document.getElementById('move-in-date');
        if (moveDateInput) {
            const today = new Date().toISOString().split('T')[0];
            moveDateInput.setAttribute('min', today);
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            // Email validation
            const emailField = document.getElementById('email');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }

            if (isValid) {
                // In a real application, you would send the data to a server
                console.log('Form data:', data);

                // Show success message (simplified)
                const button = form.querySelector('button[type="submit"]');
                const originalText = button.textContent;
                button.textContent = 'Gesendet!';
                button.disabled = true;

                setTimeout(() => {
                    form.reset();
                    button.textContent = originalText;
                    button.disabled = false;
                }, 3000);
            }
        });

        // Remove error class on input
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => {
                field.classList.remove('error');
            });
        });
    }

    // ========================================
    // Cookie Consent (DSGVO)
    // ========================================
    function initCookieConsent() {
        const cookieBanner = document.getElementById('cookie-consent');
        const acceptBtn = document.getElementById('cookie-accept');
        const declineBtn = document.getElementById('cookie-decline');

        if (!cookieBanner) return;

        // Check if consent was already given
        const consent = localStorage.getItem('cookieConsent');

        if (!consent) {
            // Show banner after a short delay
            setTimeout(() => {
                cookieBanner.classList.add('active');
            }, 1500);
        }

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('active');
            // Here you would enable analytics/tracking if needed
        });

        declineBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.remove('active');
            // Here you would ensure no tracking is enabled
        });
    }

})();
