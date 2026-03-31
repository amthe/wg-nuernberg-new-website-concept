/* WG Nürnberg v027 — Main JavaScript */
(function () {
  'use strict';

  /* --- Theme Toggle --- */
  const themeToggle = document.querySelector('.theme-toggle');
  const root = document.documentElement;
  const stored = localStorage.getItem('wgn-theme');
  if (stored) root.setAttribute('data-theme', stored);

  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('wgn-theme', next);
  });

  /* --- Scroll Progress --- */
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
      });
    }, { passive: true });
  }

  /* --- Header Shadow on Scroll --- */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 10);
      });
    }, { passive: true });
  }

  /* --- Hamburger & Mobile Nav --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a:not(.mobile-dropdown-toggle)').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    // Mobile dropdown
    const mdt = mobileNav.querySelector('.mobile-dropdown-toggle');
    const mdi = mobileNav.querySelector('.mobile-dropdown-items');
    if (mdt && mdi) {
      mdt.addEventListener('click', (e) => {
        e.preventDefault();
        const vis = mdi.style.display !== 'block';
        mdi.style.display = vis ? 'block' : 'none';
        mdt.textContent = vis ? 'Unsere WGs ▴' : 'Unsere WGs ▾';
      });
    }
  }

  /* --- Scroll Reveal --- */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* --- Stat Counter Animation --- */
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        if (!target) return;
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current + '+';
        }, 30);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.stat-number[data-target]').forEach(el => statObserver.observe(el));

  /* --- Gallery Filter --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      galleryItems.forEach(item => {
        item.hidden = f !== 'all' && item.dataset.cat !== f;
      });
    });
  });

  /* --- Lightbox --- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCounter = document.getElementById('lightboxCounter');
  let lbImages = [];
  let lbIndex = 0;

  function openLightbox(index) {
    lbImages = [...document.querySelectorAll('.gallery-item:not([hidden]) img')];
    lbIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function updateLightbox() {
    if (!lbImages[lbIndex]) return;
    lightboxImg.src = lbImages[lbIndex].src;
    lightboxImg.alt = lbImages[lbIndex].alt;
    lightboxCounter.textContent = (lbIndex + 1) + ' / ' + lbImages.length;
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });
  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.querySelector('.lightbox-prev')?.addEventListener('click', () => {
    lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
    updateLightbox();
  });
  lightbox?.querySelector('.lightbox-next')?.addEventListener('click', () => {
    lbIndex = (lbIndex + 1) % lbImages.length;
    updateLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; updateLightbox(); }
    if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbImages.length; updateLightbox(); }
  });
  // Touch swipe
  let touchStartX = 0;
  lightbox?.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  lightbox?.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 50) {
      lbIndex = dx > 0 ? (lbIndex - 1 + lbImages.length) % lbImages.length : (lbIndex + 1) % lbImages.length;
      updateLightbox();
    }
  }, { passive: true });

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        openItem.querySelector('.faq-answer').style.maxHeight = '0';
      });
      // Toggle clicked
      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* --- Cookie Banner --- */
  const cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner && !localStorage.getItem('wgn-cookie-consent')) {
    cookieBanner.classList.add('show');
  }
  document.getElementById('cookieAcceptAll')?.addEventListener('click', () => {
    localStorage.setItem('wgn-cookie-consent', 'all');
    cookieBanner.classList.remove('show');
  });
  document.getElementById('cookieAcceptEssential')?.addEventListener('click', () => {
    localStorage.setItem('wgn-cookie-consent', 'essential');
    cookieBanner.classList.remove('show');
  });

  /* --- Smooth Scroll for CTA links --- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* --- Desktop Nav CTA visibility --- */
  const ctaBtn = document.querySelector('.header-actions .btn-primary');
  if (ctaBtn && window.innerWidth >= 1024) ctaBtn.style.display = '';

})();
