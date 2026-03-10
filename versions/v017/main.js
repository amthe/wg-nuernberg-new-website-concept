/**
 * WG Nürnberg v017 - Main JavaScript
 * Performance Optimized | Accessibility Ready | Dark Mode Support
 */

(function() {
    'use strict';

    // ==========================================================================
    // Configuration
    // ==========================================================================

    const CONFIG = {
        scrollThreshold: 500,
        animationDuration: 200,
        counterDuration: 2000,
        cookieConsentDelay: 1000
    };

    // ==========================================================================
    // Utility Functions
    // ==========================================================================

    const $ = (selector, context = document) => context.querySelector(selector);
    const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

    const debounce = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn(...args), delay);
        };
    };

    const prefersReducedMotion = () =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ==========================================================================
    // Theme Toggle (Dark Mode)
    // ==========================================================================

    const initTheme = () => {
        const toggle = $('.theme-toggle');
        const html = document.documentElement;

        // Get saved theme or system preference
        const savedTheme = localStorage.getItem('wgn-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

        html.setAttribute('data-theme', initialTheme);

        if (toggle) {
            toggle.addEventListener('click', () => {
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('wgn-theme', newTheme);

                toggle.setAttribute('aria-label',
                    newTheme === 'dark' ? 'Zum hellen Modus wechseln' : 'Zum dunklen Modus wechseln'
                );
            });
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('wgn-theme')) {
                html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    };

    // ==========================================================================
    // Header Scroll Effects
    // ==========================================================================

    const initHeader = () => {
        const header = $('.header');
        const headerCta = $('.header__cta');
        let lastScroll = 0;
        let ticking = false;

        const updateHeader = () => {
            const scrollY = window.scrollY;

            // Add scrolled class for shadow
            if (scrollY > 10) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }

            // Show/hide header CTA after threshold
            if (headerCta) {
                if (scrollY > CONFIG.scrollThreshold) {
                    headerCta.classList.add('header__cta--visible');
                } else {
                    headerCta.classList.remove('header__cta--visible');
                }
            }

            lastScroll = scrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
    };

    // ==========================================================================
    // Scroll Progress Bar
    // ==========================================================================

    const initScrollProgress = () => {
        const progressBar = $('.scroll-progress');
        if (!progressBar) return;

        let ticking = false;

        const updateProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / scrollHeight) * 100;

            progressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
            progressBar.setAttribute('aria-valuenow', Math.round(scrolled));

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        }, { passive: true });
    };

    // ==========================================================================
    // Mobile Navigation
    // ==========================================================================

    const initMobileNav = () => {
        const hamburger = $('.header__hamburger');
        const mobileNav = $('#mobile-nav');
        const mobileToggles = $$('.mobile-nav__toggle');

        if (!hamburger || !mobileNav) return;

        // Toggle mobile menu
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';

            hamburger.setAttribute('aria-expanded', !isExpanded);
            mobileNav.hidden = isExpanded;

            // Trap focus in mobile nav when open
            if (!isExpanded) {
                const firstLink = $('a, button', mobileNav);
                if (firstLink) firstLink.focus();
            }
        });

        // Toggle submenus
        mobileToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                const submenu = toggle.nextElementSibling;

                toggle.setAttribute('aria-expanded', !isExpanded);
                submenu.hidden = isExpanded;
            });
        });

        // Close mobile nav on link click
        $$('.mobile-nav__link, .mobile-nav__sublink', mobileNav).forEach(link => {
            link.addEventListener('click', () => {
                hamburger.setAttribute('aria-expanded', 'false');
                mobileNav.hidden = true;
            });
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileNav.hidden) {
                hamburger.setAttribute('aria-expanded', 'false');
                mobileNav.hidden = true;
                hamburger.focus();
            }
        });
    };

    // ==========================================================================
    // Smooth Scroll
    // ==========================================================================

    const initSmoothScroll = () => {
        $$('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const target = $(targetId);
                if (!target) return;

                e.preventDefault();

                const headerHeight = $('.header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

                if (prefersReducedMotion()) {
                    window.scrollTo(0, targetPosition);
                } else {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }

                // Update focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            });
        });

        // Hero scroll button
        const heroScroll = $('.hero__scroll');
        if (heroScroll) {
            heroScroll.addEventListener('click', () => {
                const nextSection = $('.hero')?.nextElementSibling;
                if (nextSection) {
                    const headerHeight = $('.header')?.offsetHeight || 0;
                    const targetPosition = nextSection.getBoundingClientRect().top + window.scrollY - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
                    });
                }
            });
        }
    };

    // ==========================================================================
    // Stat Counter Animation
    // ==========================================================================

    const initStatCounters = () => {
        const counters = $$('.stat__number[data-target]');
        if (counters.length === 0) return;

        const animateCounter = (counter) => {
            const target = parseInt(counter.dataset.target, 10);
            const duration = prefersReducedMotion() ? 0 : CONFIG.counterDuration;
            const start = performance.now();

            const update = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(easeOut * target);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            };

            requestAnimationFrame(update);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    };

    // ==========================================================================
    // Scroll Reveal Animations
    // ==========================================================================

    const initScrollReveal = () => {
        if (prefersReducedMotion()) return;

        const revealElements = $$('.section__header, .benefit-card, .room-card, .testimonial-card, .wg-type-card, .tour-card, .alternative-card, .process-step, .feature-card');

        revealElements.forEach(el => el.classList.add('reveal'));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    };

    // ==========================================================================
    // Gallery Filter
    // ==========================================================================

    const initGalleryFilter = () => {
        const filters = $$('.gallery-filter');
        const items = $$('.gallery-item');
        const grid = $('#gallery-grid');

        if (filters.length === 0 || items.length === 0) return;

        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                const category = filter.dataset.filter;

                // Update active filter
                filters.forEach(f => {
                    f.classList.remove('gallery-filter--active');
                    f.setAttribute('aria-selected', 'false');
                });
                filter.classList.add('gallery-filter--active');
                filter.setAttribute('aria-selected', 'true');

                // Filter items
                items.forEach(item => {
                    const itemCategory = item.dataset.category;
                    const shouldShow = category === 'alle' || itemCategory === category;

                    item.hidden = !shouldShow;
                });

                // Announce change to screen readers
                if (grid) {
                    grid.setAttribute('aria-busy', 'true');
                    setTimeout(() => grid.setAttribute('aria-busy', 'false'), 100);
                }
            });
        });
    };

    // ==========================================================================
    // Lightbox
    // ==========================================================================

    const initLightbox = () => {
        const lightbox = $('#lightbox');
        const lightboxImage = $('.lightbox__image', lightbox);
        const lightboxCaption = $('.lightbox__caption', lightbox);
        const lightboxCounter = $('.lightbox__counter', lightbox);
        const closeBtn = $('.lightbox__close', lightbox);
        const prevBtn = $('.lightbox__nav--prev', lightbox);
        const nextBtn = $('.lightbox__nav--next', lightbox);
        const galleryItems = $$('.gallery-item');

        if (!lightbox || galleryItems.length === 0) return;

        let currentIndex = 0;
        let visibleItems = [];

        const getVisibleItems = () => {
            return galleryItems.filter(item => !item.hidden);
        };

        const openLightbox = (index) => {
            visibleItems = getVisibleItems();
            currentIndex = index;
            updateLightbox();

            lightbox.hidden = false;
            lightbox.classList.add('lightbox--open');
            document.body.style.overflow = 'hidden';

            closeBtn.focus();
        };

        const closeLightbox = () => {
            lightbox.classList.remove('lightbox--open');
            document.body.style.overflow = '';

            setTimeout(() => {
                lightbox.hidden = true;
            }, CONFIG.animationDuration);

            // Return focus to trigger
            const triggerIndex = visibleItems[currentIndex]?.dataset.index;
            const trigger = $(`.gallery-item[data-index="${triggerIndex}"]`);
            if (trigger) trigger.focus();
        };

        const updateLightbox = () => {
            const item = visibleItems[currentIndex];
            if (!item) return;

            const img = $('img', item);
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxCaption.textContent = img.alt;
            lightboxCounter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;
        };

        const showNext = () => {
            currentIndex = (currentIndex + 1) % visibleItems.length;
            updateLightbox();
        };

        const showPrev = () => {
            currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
            updateLightbox();
        };

        // Event listeners
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const visibleIndex = getVisibleItems().indexOf(item);
                openLightbox(visibleIndex);
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPrev);
        nextBtn.addEventListener('click', showNext);

        // Keyboard navigation
        lightbox.addEventListener('keydown', (e) => {
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

    // ==========================================================================
    // FAQ Accordion (Single Open)
    // ==========================================================================

    const initFaqAccordion = () => {
        const faqItems = $$('.faq-item');
        if (faqItems.length === 0) return;

        faqItems.forEach(item => {
            const summary = $('summary', item);

            summary.addEventListener('click', (e) => {
                // Allow default behavior but close others
                if (!item.open) {
                    faqItems.forEach(other => {
                        if (other !== item && other.open) {
                            other.open = false;
                        }
                    });
                }
            });
        });
    };

    // ==========================================================================
    // Contact Form Validation
    // ==========================================================================

    const initContactForm = () => {
        const form = $('.contact-form');
        if (!form) return;

        const validateField = (input) => {
            const errorEl = $(`#${input.id}-error`);
            let isValid = true;
            let errorMessage = '';

            if (input.required && !input.value.trim()) {
                isValid = false;
                errorMessage = 'Dieses Feld ist erforderlich.';
            } else if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    errorMessage = 'Bitte gib eine gültige E-Mail-Adresse ein.';
                }
            }

            if (errorEl) {
                errorEl.textContent = errorMessage;
                errorEl.hidden = isValid;
            }

            input.setAttribute('aria-invalid', !isValid);

            return isValid;
        };

        // Validate on blur
        $$('input, textarea', form).forEach(input => {
            input.addEventListener('blur', () => validateField(input));
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const requiredFields = $$('[required]', form);
            let isFormValid = true;

            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // In production, this would submit to a server
                const submitBtn = $('.form-submit', form);
                submitBtn.textContent = 'Wird gesendet...';
                submitBtn.disabled = true;

                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Nachricht gesendet!';
                    submitBtn.style.backgroundColor = 'var(--color-success)';

                    setTimeout(() => {
                        form.reset();
                        submitBtn.textContent = 'Nachricht senden';
                        submitBtn.style.backgroundColor = '';
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1000);
            } else {
                // Focus first invalid field
                const firstInvalid = $('[aria-invalid="true"]', form);
                if (firstInvalid) firstInvalid.focus();
            }
        });
    };

    // ==========================================================================
    // Cookie Consent
    // ==========================================================================

    const initCookieConsent = () => {
        const consent = $('#cookie-consent');
        const acceptBtn = $('#cookie-accept');
        const rejectBtn = $('#cookie-reject');
        const detailsBtn = $('#cookie-details-btn');
        const details = $('#cookie-details');

        if (!consent) return;

        // Check if consent was already given
        const consentGiven = localStorage.getItem('wgn-cookie-consent');

        if (!consentGiven) {
            setTimeout(() => {
                consent.classList.add('cookie-consent--visible');
            }, CONFIG.cookieConsentDelay);
        }

        const hideConsent = () => {
            consent.classList.remove('cookie-consent--visible');
        };

        const saveConsent = (analytics = false, marketing = false) => {
            const consentData = {
                necessary: true,
                analytics,
                marketing,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('wgn-cookie-consent', JSON.stringify(consentData));
            hideConsent();
        };

        acceptBtn?.addEventListener('click', () => {
            const analytics = $('#cookie-analytics')?.checked || true;
            const marketing = $('#cookie-marketing')?.checked || true;
            saveConsent(analytics, marketing);
        });

        rejectBtn?.addEventListener('click', () => {
            saveConsent(false, false);
        });

        detailsBtn?.addEventListener('click', () => {
            const isHidden = details.hidden;
            details.hidden = !isHidden;
            detailsBtn.textContent = isHidden ? 'Weniger' : 'Details';
        });
    };

    // ==========================================================================
    // Lazy Loading Images (Native with Fallback)
    // ==========================================================================

    const initLazyLoading = () => {
        // Most modern browsers support native lazy loading
        // This provides an IntersectionObserver fallback for older browsers
        if ('loading' in HTMLImageElement.prototype) return;

        const images = $$('img[loading="lazy"]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('loading');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        images.forEach(img => imageObserver.observe(img));
    };

    // ==========================================================================
    // Initialize Everything
    // ==========================================================================

    const init = () => {
        initTheme();
        initHeader();
        initScrollProgress();
        initMobileNav();
        initSmoothScroll();
        initStatCounters();
        initScrollReveal();
        initGalleryFilter();
        initLightbox();
        initFaqAccordion();
        initContactForm();
        initCookieConsent();
        initLazyLoading();
    };

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
