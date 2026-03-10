/* ==========================================================================
   WG Nürnberg v015 - JavaScript
   All Interactive Features
   ========================================================================== */

(function() {
    'use strict';

    /* --------------------------------------------------------------------------
       DOM Ready
       -------------------------------------------------------------------------- */
    document.addEventListener('DOMContentLoaded', function() {
        initScrollProgress();
        initHeader();
        initMobileNav();
        initDarkMode();
        initDropdowns();
        initGallery();
        initLightbox();
        initContactForm();
        initStatCounters();
        initCookieConsent();
        initSmoothScroll();
    });

    /* --------------------------------------------------------------------------
       Scroll Progress Bar
       -------------------------------------------------------------------------- */
    function initScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = progress + '%';
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    /* --------------------------------------------------------------------------
       Header Scroll Effect
       -------------------------------------------------------------------------- */
    function initHeader() {
        const header = document.getElementById('header');
        if (!header) return;

        let lastScrollY = 0;

        function handleScroll() {
            const scrollY = window.scrollY;

            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollY = scrollY;
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    /* --------------------------------------------------------------------------
       Mobile Navigation
       -------------------------------------------------------------------------- */
    function initMobileNav() {
        const hamburger = document.getElementById('hamburger');
        const mobileNav = document.getElementById('mobileNav');
        if (!hamburger || !mobileNav) return;

        // Toggle mobile nav
        hamburger.addEventListener('click', function() {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            mobileNav.classList.toggle('active');
            mobileNav.setAttribute('aria-hidden', isExpanded);
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });

        // Close mobile nav on link click
        const mobileLinks = mobileNav.querySelectorAll('a:not(.mobile-dropdown-toggle)');
        mobileLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.setAttribute('aria-expanded', 'false');
                mobileNav.classList.remove('active');
                mobileNav.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });

        // Mobile dropdown toggle
        const mobileDropdownToggles = mobileNav.querySelectorAll('.mobile-dropdown-toggle');
        mobileDropdownToggles.forEach(function(toggle) {
            toggle.addEventListener('click', function() {
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                toggle.setAttribute('aria-expanded', !isExpanded);
            });
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                hamburger.setAttribute('aria-expanded', 'false');
                mobileNav.classList.remove('active');
                mobileNav.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
                hamburger.focus();
            }
        });
    }

    /* --------------------------------------------------------------------------
       Dark Mode Toggle
       -------------------------------------------------------------------------- */
    function initDarkMode() {
        const toggles = document.querySelectorAll('.dark-mode-toggle');
        if (toggles.length === 0) return;

        // Check for saved preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        // Toggle handler
        toggles.forEach(function(toggle) {
            toggle.addEventListener('click', function() {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    }

    /* --------------------------------------------------------------------------
       Desktop Dropdown Navigation
       -------------------------------------------------------------------------- */
    function initDropdowns() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');

        dropdowns.forEach(function(dropdown) {
            const toggle = dropdown.querySelector('.nav-dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (!toggle || !menu) return;

            // Keyboard accessibility
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                    toggle.setAttribute('aria-expanded', !isExpanded);
                }

                if (e.key === 'Escape') {
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.focus();
                }
            });

            // Close on click outside
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Hover support
            dropdown.addEventListener('mouseenter', function() {
                toggle.setAttribute('aria-expanded', 'true');
            });

            dropdown.addEventListener('mouseleave', function() {
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* --------------------------------------------------------------------------
       Gallery Filter
       -------------------------------------------------------------------------- */
    function initGallery() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (filterButtons.length === 0 || galleryItems.length === 0) return;

        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const filter = button.getAttribute('data-filter');

                // Update active state
                filterButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');

                // Filter items
                galleryItems.forEach(function(item) {
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

    /* --------------------------------------------------------------------------
       Lightbox
       -------------------------------------------------------------------------- */
    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = lightbox ? lightbox.querySelector('.lightbox-image') : null;
        const lightboxCaption = lightbox ? lightbox.querySelector('.lightbox-caption') : null;
        const lightboxCounter = lightbox ? lightbox.querySelector('.lightbox-counter') : null;
        const closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;
        const prevBtn = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
        const nextBtn = lightbox ? lightbox.querySelector('.lightbox-next') : null;
        const galleryItems = document.querySelectorAll('.gallery-item');

        if (!lightbox || galleryItems.length === 0) return;

        let currentIndex = 0;
        let visibleItems = [];

        function getVisibleItems() {
            return Array.from(galleryItems).filter(function(item) {
                return !item.classList.contains('hidden');
            });
        }

        function openLightbox(index) {
            visibleItems = getVisibleItems();
            currentIndex = index;
            updateLightbox();
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        function updateLightbox() {
            const item = visibleItems[currentIndex];
            const img = item.querySelector('img');
            const caption = item.querySelector('figcaption');

            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxCaption.textContent = caption ? caption.textContent : '';
            lightboxCounter.textContent = (currentIndex + 1) + ' / ' + visibleItems.length;
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
            updateLightbox();
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % visibleItems.length;
            updateLightbox();
        }

        // Click handlers
        galleryItems.forEach(function(item, index) {
            item.addEventListener('click', function() {
                visibleItems = getVisibleItems();
                const visibleIndex = visibleItems.indexOf(item);
                openLightbox(visibleIndex);
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPrev);
        nextBtn.addEventListener('click', showNext);

        // Click outside to close
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;

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

        lightbox.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const diff = touchStartX - touchEndX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    showNext();
                } else {
                    showPrev();
                }
            }
        }
    }

    /* --------------------------------------------------------------------------
       Contact Form Validation
       -------------------------------------------------------------------------- */
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const fields = {
            name: {
                element: document.getElementById('name'),
                validate: function(value) {
                    if (!value.trim()) return 'Bitte gib deinen Namen ein.';
                    if (value.trim().length < 2) return 'Der Name muss mindestens 2 Zeichen haben.';
                    return '';
                }
            },
            email: {
                element: document.getElementById('email'),
                validate: function(value) {
                    if (!value.trim()) return 'Bitte gib deine E-Mail-Adresse ein.';
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) return 'Bitte gib eine gültige E-Mail-Adresse ein.';
                    return '';
                }
            },
            moveIn: {
                element: document.getElementById('moveIn'),
                validate: function(value) {
                    if (!value) return 'Bitte wähle ein Einzugsdatum.';
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (selectedDate < today) return 'Das Einzugsdatum muss in der Zukunft liegen.';
                    return '';
                }
            },
            duration: {
                element: document.getElementById('duration'),
                validate: function(value) {
                    if (!value) return 'Bitte wähle eine Mietdauer.';
                    return '';
                }
            },
            message: {
                element: document.getElementById('message'),
                validate: function(value) {
                    if (!value.trim()) return 'Bitte schreibe eine Nachricht.';
                    if (value.trim().length < 20) return 'Die Nachricht sollte mindestens 20 Zeichen haben.';
                    return '';
                }
            }
        };

        function showError(field, message) {
            const errorElement = field.element.parentElement.querySelector('.form-error');
            field.element.classList.add('error');
            if (errorElement) {
                errorElement.textContent = message;
            }
        }

        function clearError(field) {
            const errorElement = field.element.parentElement.querySelector('.form-error');
            field.element.classList.remove('error');
            if (errorElement) {
                errorElement.textContent = '';
            }
        }

        // Real-time validation on blur
        Object.keys(fields).forEach(function(key) {
            const field = fields[key];
            if (!field.element) return;

            field.element.addEventListener('blur', function() {
                const error = field.validate(field.element.value);
                if (error) {
                    showError(field, error);
                } else {
                    clearError(field);
                }
            });

            field.element.addEventListener('input', function() {
                if (field.element.classList.contains('error')) {
                    const error = field.validate(field.element.value);
                    if (!error) {
                        clearError(field);
                    }
                }
            });
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;
            let firstErrorField = null;

            Object.keys(fields).forEach(function(key) {
                const field = fields[key];
                if (!field.element) return;

                const error = field.validate(field.element.value);
                if (error) {
                    showError(field, error);
                    isValid = false;
                    if (!firstErrorField) {
                        firstErrorField = field.element;
                    }
                } else {
                    clearError(field);
                }
            });

            if (!isValid && firstErrorField) {
                firstErrorField.focus();
                return;
            }

            // Form is valid - show success
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Wird gesendet...';
            submitButton.disabled = true;

            // Simulate form submission
            setTimeout(function() {
                submitButton.textContent = 'Erfolgreich gesendet!';
                submitButton.style.backgroundColor = '#059669';

                // Reset form after delay
                setTimeout(function() {
                    form.reset();
                    submitButton.textContent = originalText;
                    submitButton.style.backgroundColor = '';
                    submitButton.disabled = false;
                }, 2000);
            }, 1000);
        });
    }

    /* --------------------------------------------------------------------------
       Stat Counter Animation
       -------------------------------------------------------------------------- */
    function initStatCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        if (counters.length === 0) return;

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(function(counter) {
            observer.observe(counter);
        });

        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-count'), 10);
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(start + (target - start) * easeOut);

                element.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            requestAnimationFrame(update);
        }
    }

    /* --------------------------------------------------------------------------
       Cookie Consent
       -------------------------------------------------------------------------- */
    function initCookieConsent() {
        const consent = document.getElementById('cookieConsent');
        const acceptBtn = document.getElementById('cookieAccept');
        const rejectBtn = document.getElementById('cookieReject');
        if (!consent || !acceptBtn || !rejectBtn) return;

        // Check if consent was already given
        const consentGiven = localStorage.getItem('cookieConsent');

        if (!consentGiven) {
            // Show consent banner after short delay
            setTimeout(function() {
                consent.classList.add('active');
                consent.setAttribute('aria-hidden', 'false');
            }, 1000);
        }

        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'all');
            hideConsent();
        });

        rejectBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'necessary');
            hideConsent();
        });

        function hideConsent() {
            consent.classList.remove('active');
            consent.setAttribute('aria-hidden', 'true');
        }
    }

    /* --------------------------------------------------------------------------
       Smooth Scroll
       -------------------------------------------------------------------------- */
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = link.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, '', href);
            });
        });
    }

})();
