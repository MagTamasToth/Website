/* ==========================================================================
   Mag. Tamas Toth — Site JavaScript
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. Sticky Header Scroll-State ---------------------------------------
  const header = document.querySelector('.site-header');
  if (header) {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 24) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- 2. Mobile Menu Toggle ----------------------------------------------
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('is-open', !open);
      document.body.style.overflow = !open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- 3. Reveal on Scroll (IntersectionObserver) -------------------------
  if ('IntersectionObserver' in window) {
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }

  // --- 4. Smooth Anchor Scroll mit Header-Offset --------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // --- 5. Aktuelles Jahr im Footer ----------------------------------------
  const yearSpan = document.querySelector('[data-current-year]');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
})();

// ── FAB CTA gomb — cookie-banner után jelenik meg ────────────────────────
(function () {
  var fab = document.getElementById('fab-cta');
  if (!fab) return;

  function showFab() {
    fab.classList.add('is-visible');
  }

  // Ha a cookie-notice már el van fogadva → azonnal látható
  var cookieKey = 'cookie_notice_v1';
  try {
    if (sessionStorage.getItem(cookieKey)) {
      // Kis késleltetés az oldalbetöltés utáni animációhoz
      setTimeout(showFab, 600);
      return;
    }
  } catch (e) {}

  // Cookie-banner még látható → FAB csak a bezárás után jelenik meg
  // MutationObserver: figyeli ha a banner eltűnik a DOM-ból
  var observer = new MutationObserver(function () {
    var banner = document.querySelector('.cookie-banner');
    if (!banner || !banner.classList.contains('is-visible')) {
      setTimeout(showFab, 400);
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });

  // Fallback: 5mp után mindenképp megjelenik
  setTimeout(function () {
    showFab();
    observer.disconnect();
  }, 5000);

  // Cookie-banner "Verstanden" → body.cookie-visible class kezelés
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.cookie-banner__btn');
    if (!btn) return;
    document.body.classList.remove('cookie-visible');
    setTimeout(showFab, 450);
  });

  // Kezdeti állapot: ha banner látható, body kap egy class-t
  var checkBanner = function () {
    var b = document.querySelector('.cookie-banner.is-visible');
    if (b) document.body.classList.add('cookie-visible');
    else document.body.classList.remove('cookie-visible');
  };
  setTimeout(checkBanner, 350);
})();
