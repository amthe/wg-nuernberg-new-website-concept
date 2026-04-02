/**
 * WG Nürnberg v028 - Main JavaScript
 * Production-quality, accessible, performant
 */

(function() {
    'use strict';

    // ==========================================================================
    // Configuration
    // ==========================================================================
    const CONFIG = {
        STORAGE_KEY_THEME: 'wgn-theme',
        STORAGE_KEY_COOKIE: 'wgn-cookie-consent',
        SCROLL_THRESHOLD: 50,
        COUNTER_DURATION: 2000,
        REVEAL_THRESHOLD: 0.1
    };

    // ==========================================================================
    // DOM Elements
    // ==========================================================================
    const DOM = {
        html: document.documentElement,
        header: document.getElementById('header'),
        themeToggle: document.getElementById('theme-toggle'),
        mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
        navMobile: document.getElementById('nav-mobile'),
        scrollProgress: document.querySelector('.scroll-progress'),
        lightbox: document.getElementById('lightbox'),
        lightboxImage: document.querySelector('.lightbox-image'),
        lightboxCounter: document.querySelector('.lightbox-counter'),
        galleryGrid: document.getElementById('gallery-grid'),
        cookieBanner: document.getElementById('cookie-banner'),
        contactForm: document.getElementById('contact-form')
    };

    // ==========================================================================
    // Theme Management
    // ==========================================================================
    const ThemeManager = {
        init() {
            const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEY_THEME);
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const theme = savedTheme || (prefersDark ? 'dark' : 'light');

            this.setTheme(theme);
            this.bindEvents();
        },

        setTheme(theme) {
            DOM.html.setAttribute('data-theme', theme);
            localStorage.setItem(CONFIG.STORAGE_KEY_THEME, theme);
        },

        toggle() {
            const currentTheme = DOM.html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
        },

        bindEvents() {
            if (DOM.themeToggle) {
                DOM.themeToggle.addEventListener('click', () => this.toggle());
            }

            // Listen for system preference changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem(CONFIG.STORAGE_KEY_THEME)) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    };

    // ==========================================================================
    // Header Scroll Effects
    // ==========================================================================
    const HeaderManager = {
        init() {
            this.updateHeader();
            this.bindEvents();
        },

        updateHeader() {
            if (!DOM.header) return;

            if (window.scrollY > CONFIG.SCROLL_THRESHOLD) {
                DOM.header.classList.add('scrolled');
            } else {
                DOM.header.classList.remove('scrolled');
            }
        },

        bindEvents() {
            window.addEventListener('scroll', () => this.updateHeader(), { passive: true });
        }
    };

    // ==========================================================================
    // Scroll Progress Bar
    // ==========================================================================
    const ScrollProgress = {
        init() {
            if (!DOM.scrollProgress) return;
            this.update();
            this.bindEvents();
        },

        update() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            DOM.scrollProgress.style.width = `${progress}%`;
        },

        bindEvents() {
            window.addEventListener('scroll', () => this.update(), { passive: true });
        }
    };

    // ==========================================================================
    // Mobile Menu
    // ==========================================================================
    const MobileMenu = {
        init() {
            if (!DOM.mobileMenuToggle || !DOM.navMobile) return;
            this.bindEvents();
        },

        toggle() {
            const isExpanded = DOM.mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            DOM.mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
            DOM.navMobile.hidden = isExpanded;

            // Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        },

        close() {
            DOM.mobileMenuToggle.setAttribute('aria-expanded', 'false');
            DOM.navMobile.hidden = true;
            document.body.style.overflow = '';
        },

        bindEvents() {
            DOM.mobileMenuToggle.addEventListener('click', () => this.toggle());

            // Close menu when clicking a link
            DOM.navMobile.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.close());
            });

            // Close menu on escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !DOM.navMobile.hidden) {
                    this.close();
                    DOM.mobileMenuToggle.focus();
                }
            });

            // Handle submenu toggles
            DOM.navMobile.querySelectorAll('.nav-mobile-group-trigger').forEach(trigger => {
                trigger.addEventListener('click', () => {
                    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                    trigger.setAttribute('aria-expanded', !isExpanded);
                    trigger.nextElementSibling.hidden = isExpanded;
                });
            });
        }
    };

    // ==========================================================================
    // Desktop Dropdown Navigation
    // ==========================================================================
    const DesktopNav = {
        init() {
            this.bindEvents();
        },

        bindEvents() {
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                const trigger = dropdown.querySelector('.nav-dropdown-trigger');

                // Mouse events
                dropdown.addEventListener('mouseenter', () => {
                    trigger.setAttribute('aria-expanded', 'true');
                });

                dropdown.addEventListener('mouseleave', () => {
                    trigger.setAttribute('aria-expanded', 'false');
                });

                // Keyboard support
                trigger.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                        trigger.setAttribute('aria-expanded', !isExpanded);
                    }
                });
            });
        }
    };

    // ==========================================================================
    // Scroll Reveal Animation
    // ==========================================================================
    const ScrollReveal = {
        init() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                // Show all elements immediately
                document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
                return;
            }

            this.observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            this.observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: CONFIG.REVEAL_THRESHOLD }
            );

            document.querySelectorAll('.reveal').forEach(el => {
                this.observer.observe(el);
            });
        }
    };

    // ==========================================================================
    // Animated Counters
    // ==========================================================================
    const AnimatedCounters = {
        init() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.showFinalValues();
                return;
            }

            this.observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.animateCounter(entry.target);
                            this.observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );

            document.querySelectorAll('[data-count]').forEach(el => {
                this.observer.observe(el);
            });
        },

        showFinalValues() {
            document.querySelectorAll('[data-count]').forEach(el => {
                el.textContent = el.dataset.count;
            });
        },

        animateCounter(element) {
            const target = parseInt(element.dataset.count, 10);
            const duration = CONFIG.COUNTER_DURATION;
            const start = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out)
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);

                element.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }
    };

    // ==========================================================================
    // Gallery Filter
    // ==========================================================================
    const GalleryFilter = {
        init() {
            this.filters = document.querySelectorAll('.gallery-filter');
            this.items = document.querySelectorAll('.gallery-item');

            if (!this.filters.length || !this.items.length) return;

            this.bindEvents();
        },

        filter(category) {
            this.items.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        },

        bindEvents() {
            this.filters.forEach(filter => {
                filter.addEventListener('click', () => {
                    // Update active state
                    this.filters.forEach(f => f.classList.remove('active'));
                    filter.classList.add('active');

                    // Filter items
                    this.filter(filter.dataset.filter);
                });
            });
        }
    };

    // ==========================================================================
    // Lightbox
    // ==========================================================================
    const Lightbox = {
        images: [],
        currentIndex: 0,
        touchStartX: 0,
        touchEndX: 0,

        init() {
            if (!DOM.lightbox) return;
            this.collectImages();
            this.bindEvents();
        },

        collectImages() {
            this.images = Array.from(document.querySelectorAll('.gallery-item img')).map(img => ({
                src: img.src,
                alt: img.alt
            }));
        },

        open(index) {
            this.currentIndex = index;
            this.updateImage();
            DOM.lightbox.hidden = false;
            document.body.style.overflow = 'hidden';

            // Focus trap
            DOM.lightbox.querySelector('.lightbox-close').focus();
        },

        close() {
            DOM.lightbox.hidden = true;
            document.body.style.overflow = '';

            // Return focus to trigger
            const trigger = document.querySelector(`.gallery-item[data-index="${this.currentIndex}"]`);
            if (trigger) trigger.focus();
        },

        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            this.updateImage();
        },

        next() {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            this.updateImage();
        },

        updateImage() {
            const image = this.images[this.currentIndex];
            if (!image) return;

            DOM.lightboxImage.src = image.src;
            DOM.lightboxImage.alt = image.alt;
            DOM.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
        },

        handleSwipe() {
            const diff = this.touchStartX - this.touchEndX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        },

        bindEvents() {
            // Open lightbox
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.open(parseInt(item.dataset.index, 10));
                });
            });

            // Close button
            DOM.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.close());

            // Overlay click
            DOM.lightbox.querySelector('.lightbox-overlay').addEventListener('click', () => this.close());

            // Navigation buttons
            DOM.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
            DOM.lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.next());

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (DOM.lightbox.hidden) return;

                switch (e.key) {
                    case 'Escape':
                        this.close();
                        break;
                    case 'ArrowLeft':
                        this.prev();
                        break;
                    case 'ArrowRight':
                        this.next();
                        break;
                }
            });

            // Touch swipe support
            DOM.lightbox.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            DOM.lightbox.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, { passive: true });
        }
    };

    // ==========================================================================
    // FAQ Accordion
    // ==========================================================================
    const FAQ = {
        init() {
            const faqItems = document.querySelectorAll('.faq-item');
            if (!faqItems.length) return;

            faqItems.forEach(item => {
                const summary = item.querySelector('summary');

                summary.addEventListener('click', (e) => {
                    // Allow default browser behavior for details/summary
                    // Just update ARIA if needed
                });
            });
        }
    };

    // ==========================================================================
    // Contact Form
    // ==========================================================================
    const ContactForm = {
        init() {
            if (!DOM.contactForm) return;
            this.bindEvents();
        },

        bindEvents() {
            DOM.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // In production, this would send to a backend
                // For now, show a success message
                const formData = new FormData(DOM.contactForm);
                console.log('Form submitted:', Object.fromEntries(formData));

                // Show success feedback
                const button = DOM.contactForm.querySelector('button[type="submit"]');
                const originalText = button.textContent;
                button.textContent = 'Anfrage gesendet!';
                button.disabled = true;

                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    DOM.contactForm.reset();
                }, 3000);
            });
        }
    };

    // ==========================================================================
    // Cookie Banner
    // ==========================================================================
    const CookieBanner = {
        init() {
            if (!DOM.cookieBanner) return;

            const consent = localStorage.getItem(CONFIG.STORAGE_KEY_COOKIE);
            if (!consent) {
                DOM.cookieBanner.hidden = false;
            }

            this.bindEvents();
        },

        accept(type) {
            localStorage.setItem(CONFIG.STORAGE_KEY_COOKIE, type);
            DOM.cookieBanner.hidden = true;
        },

        bindEvents() {
            document.getElementById('cookie-accept-all')?.addEventListener('click', () => {
                this.accept('all');
            });

            document.getElementById('cookie-essential')?.addEventListener('click', () => {
                this.accept('essential');
            });
        }
    };

    // ==========================================================================
    // Smooth Scroll
    // ==========================================================================
    const SmoothScroll = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#') return;

                    const target = document.querySelector(href);
                    if (!target) return;

                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });

                    // Update URL without jumping
                    history.pushState(null, '', href);
                });
            });
        }
    };

    // ==========================================================================
    // Initialize Everything
    // ==========================================================================
    function init() {
        ThemeManager.init();
        HeaderManager.init();
        ScrollProgress.init();
        MobileMenu.init();
        DesktopNav.init();
        ScrollReveal.init();
        AnimatedCounters.init();
        GalleryFilter.init();
        Lightbox.init();
        FAQ.init();
        ContactForm.init();
        CookieBanner.init();
        SmoothScroll.init();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
