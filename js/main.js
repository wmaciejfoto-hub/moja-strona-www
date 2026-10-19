/* =========================================================
   WMaciejFoto – skrypty strony
   Nie musisz tu nic zmieniać. Formularz kontaktowy
   podłączasz w pliku index.html (patrz README.md).
   ========================================================= */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var nav = document.getElementById('nav');
  var toggle = document.querySelector('.nav-toggle');

  /* ---------- Rok w stopce ---------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Pasek u góry: tło po przewinięciu ---------- */
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menu na telefonie ---------- */
  function setMenu(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
  }
  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
  }

  /* ---------- Podświetlanie aktywnej sekcji w menu ---------- */
  var links = nav ? Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]:not(.btn)')) : [];
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + entry.target.id;
          a.classList.toggle('active', on);
          if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Delikatne pojawianie się sekcji ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Lightbox (powiększanie zdjęć w galerii) ---------- */
  var lb = document.getElementById('lightbox');
  var items = Array.prototype.slice.call(document.querySelectorAll('.g-item'));
  if (lb && items.length) {
    var lbImg = document.getElementById('lb-img');
    var lbCap = document.getElementById('lb-cap');
    var btnClose = lb.querySelector('.lb-close');
    var btnPrev = lb.querySelector('.lb-prev');
    var btnNext = lb.querySelector('.lb-next');
    var shown = [];   // numery zdjęć, które faktycznie się załadowały
    var pos = 0;
    var lastFocus = null;

    function isLoaded(i) {
      var img = items[i].querySelector('img');
      return img && !img.hidden && img.naturalWidth > 0;
    }
    function render() {
      var img = items[shown[pos]].querySelector('img');
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = img.alt + ' (' + (pos + 1) + ' / ' + shown.length + ')';
      var single = shown.length < 2;
      btnPrev.hidden = single;
      btnNext.hidden = single;
    }
    function openLb(i) {
      shown = items.map(function (_, k) { return k; }).filter(isLoaded);
      pos = shown.indexOf(i);
      if (pos < 0) return;      // zdjęcie jeszcze nie istnieje (zastępnik)
      lastFocus = document.activeElement;
      render();
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
      btnClose.focus();
    }
    function closeLb() {
      lb.hidden = true;
      lbImg.removeAttribute('src');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function step(d) {
      if (shown.length < 2) return;
      pos = (pos + d + shown.length) % shown.length;
      render();
    }

    items.forEach(function (btn, i) {
      btn.addEventListener('click', function () { openLb(i); });
    });
    btnClose.addEventListener('click', closeLb);
    btnPrev.addEventListener('click', function () { step(-1); });
    btnNext.addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });

    document.addEventListener('keydown', function (e) {
      if (lb.hidden) {
        if (e.key === 'Escape') setMenu(false);
        return;
      }
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'Tab') {      // fokus zostaje w oknie powiększenia
        var f = [btnClose, btnPrev, btnNext].filter(function (b) { return !b.hidden; });
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // przesuwanie palcem
    var x0 = null;
    lb.addEventListener('touchstart', function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
  }

  /* ---------- Formularz kontaktowy ---------- */
  var form = document.getElementById('kontakt-form');
  var statusEl = document.getElementById('form-status');
  function say(state, text) {
    statusEl.dataset.state = state;
    statusEl.textContent = text;
  }
  if (form && statusEl) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var hp = form.querySelector('[name="_gotcha"]');
      if (hp && hp.value) return;   // pole-pułapka na boty

      var endpoint = form.getAttribute('action') || '';
      if (!endpoint || endpoint.indexOf('WKLEJ_TUTAJ') !== -1) {
        say('info', 'Formularz nie jest jeszcze podłączony. Napisz proszę bezpośrednio na adres wmaciejfoto@gmail.com.');
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      say('info', 'Wysyłam…');
      fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (!res.ok) throw new Error('bad status');
        form.reset();
        say('ok', 'Dziękuję! Wiadomość dotarła. Odezwę się najszybciej, jak to możliwe.');
      }).catch(function () {
        say('error', 'Coś poszło nie tak. Spróbuj ponownie albo napisz na wmaciejfoto@gmail.com.');
      }).then(function () {
        btn.disabled = false;
      });
    });
  }
})();
