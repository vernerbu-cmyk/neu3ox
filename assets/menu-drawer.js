/* ============================================================
   NeuroX — боковое меню.
   Подключается на любой странице тремя строчками:
     <link rel="stylesheet" href="ПУТЬ/assets/menu-drawer.css">
     <script src="ПУТЬ/assets/menu-data.js"></script>
     <script src="ПУТЬ/assets/menu-drawer.js"></script>
   Путь к корню сайта вычисляется автоматически.
   ============================================================ */

(function () {
  'use strict';

  if (!window.NEUROX_MENU) {
    console.warn('[NeuroX] menu-data.js не подключён');
    return;
  }

  /* ---------- Путь к корню ---------- */
  const scriptEl = document.currentScript;
  let ROOT = new URL('../', location.href).href;
  if (scriptEl) {
    try {
      // script.src = "…/assets/menu-drawer.js" → родитель assets/ → ещё родитель = корень
      ROOT = new URL('../', scriptEl.src).href;
    } catch (_) {}
  }
  // защита: если приложение лежит в подпапке /neurox/, то и корень там же

  /* ---------- Тема ---------- */
  function applyStoredTheme() {
    let stored = null;
    try { stored = localStorage.getItem('neurox_theme'); } catch (_) {}
    const html = document.documentElement;
    if (html.getAttribute('data-theme')) return; // уже установлено страницей
    if (stored === 'dark' || stored === 'light') {
      html.setAttribute('data-theme', stored);
    } else if (window.matchMedia &&
               window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
    }
  }

  /* ---------- Экранирование ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }


  const iconSvg = (...args) => window.NeuroXIconSvg ? window.NeuroXIconSvg(...args) : '';

  /* ---------- Построение ---------- */
  function build() {
    // Кнопка открытия бокового меню
    const btn = document.createElement('button');
    btn.id = 'nx-drawer-btn';
    btn.setAttribute('aria-label', 'Открыть меню');
    btn.innerHTML = iconSvg('grid', 'nx-menu-trigger-icon'); 

    // Оверлей
    const overlay = document.createElement('div');
    overlay.id = 'nx-overlay';

    // Drawer
    const drawer = document.createElement('aside');
    drawer.id = 'nx-drawer';
    drawer.setAttribute('aria-hidden', 'true');
    drawer.inert = true;
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-label', 'Меню NeuroX');
    ['keydown','keyup','keypress','click'].forEach(type=>drawer.addEventListener(type,event=>event.stopPropagation()));

    const sectionsHtml = window.NEUROX_MENU.map(sec => {
      const subLinks = sec.items.map(it => {
        const href = new URL(it.file, ROOT).href;
        const active = new URL(location.href).pathname === new URL(href).pathname;
        return `<a href="${esc(href)}" ${active ? 'aria-current="page" class="nx-current"' : ''}><span class="nx-item-icon">${iconSvg(it.icon)}</span><span class="nx-item-title">${esc(it.title)}</span></a>`;
      }).join('');
      return `
        <button type="button" class="nx-section" data-section="${esc(sec.id)}" aria-expanded="false">
          <span class="nx-section__icon">${iconSvg(sec.icon)}</span>
          <span>${esc(sec.title)}</span>
          <span class="nx-section__chev" aria-hidden="true">${iconSvg('chevron')}</span>
        </button>
        <div class="nx-sub" data-sub="${esc(sec.id)}" inert>
          <div class="nx-sub__inner">${subLinks}</div>
        </div>
      `;
    }).join('');

    drawer.innerHTML = `
      <div class="nx-head">
        <a class="nx-brand" href="${esc(new URL('index.html', ROOT).href)}" aria-label="На главную NeuroX">
          <span class="nx-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="#FF6A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15.5 13a3.5 3.5 0 0 0-3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8"/>
              <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1-7 0v-1.8"/>
              <path d="M17.5 16a3.5 3.5 0 0 0 0-7H17"/>
              <path d="M19 9.3V6.5a3.5 3.5 0 0 0-7 0"/>
              <path d="M6.5 16a3.5 3.5 0 0 1 0-7H7"/>
              <path d="M5 9.3V6.5a3.5 3.5 0 0 1 7 0v10"/>
              <circle cx="9" cy="11.5" r="1.6" fill="#fff" stroke="#FF6A00" stroke-width=".7"/>
              <circle cx="15" cy="11.5" r="1.6" fill="#fff" stroke="#FF6A00" stroke-width=".7"/>
              <circle cx="9" cy="11.5" r=".55" fill="#FF6A00" stroke="none"/>
              <circle cx="15" cy="11.5" r=".55" fill="#FF6A00" stroke="none"/>
            </svg>
          </span>
          <span class="nx-brand-copy"><strong>NeuroX</strong><small>МЕНЮ И РАЗДЕЛЫ</small></span>
        </a>
        <button class="nx-close" aria-label="Закрыть">${iconSvg('multiply')}</button>
      </div>

      <div class="nx-body">
        <a class="nx-home" href="${esc(new URL('index.html', ROOT).href)}"><span class="nx-home-icon">${iconSvg('house')}</span><span>Главная NeuroX</span></a>
        <div id="nx-quick-drawer"></div>
        ${sectionsHtml}
      </div>

      <div class="nx-foot">
        <a id="nx-profile-link" href="${esc(new URL('index.html#profile', ROOT).href)}"><span class="nx-foot-icon">${iconSvg('person')}</span>Профиль и рекомендации</a>
        <a href="${esc(new URL('index.html#settings', ROOT).href)}"><span class="nx-foot-icon">${iconSvg('wrench')}</span>Настройки NeuroX</a>
        <button type="button" id="nx-fullscreen"><span class="nx-foot-icon">${iconSvg('grid')}</span>Полный экран</button>
      </div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    return { btn, overlay, drawer };
  }

  /* ---------- Открыть / закрыть ---------- */
  let isOpen = false;
  let previousOverflow = '';
  let previousFocus = null;

  function open(drawer, overlay, btn) {
    if (isOpen) return;
    isOpen = true;
    previousFocus = document.activeElement;
    drawer.inert = false;
    drawer.setAttribute('aria-modal', 'true');
    drawer.classList.add('open');
    overlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-label', 'Закрыть меню');
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawer.querySelector('.nx-close').focus({preventScroll:true});
    window.dispatchEvent(new CustomEvent('neurox:drawer-state', {detail:{open:true}}));
  }

  function close(drawer, overlay, btn) {
    if (!isOpen) return;
    isOpen = false;
    if (previousFocus?.isConnected) previousFocus.focus({preventScroll:true});
    drawer.removeAttribute('aria-modal');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.inert = true;
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-label', 'Меню NeuroX');
    btn.setAttribute('aria-label', 'Открыть меню');
    document.body.style.overflow = previousOverflow;
    window.dispatchEvent(new CustomEvent('neurox:drawer-state', {detail:{open:false}}));
  }

  /* ---------- Свайпы ---------- */
  function setupSwipe(drawer, overlay, btn) {
    let sx = 0, sy = 0;
    document.addEventListener('touchstart', e => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', e => {
      const ex = e.changedTouches[0].clientX;
      const ey = e.changedTouches[0].clientY;
      const dx = ex - sx;
      const dy = Math.abs(ey - sy);
      if (dy > 80) return;
      if (!isOpen && sx < 40 && dx > 80) open(drawer, overlay, btn);
      if (isOpen && dx < -80) close(drawer, overlay, btn);
    }, { passive: true });
  }

  /* ---------- Полный экран ---------- */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  /* ---------- Старт ---------- */
  function init() {
    applyStoredTheme();

    const { btn, overlay, drawer } = build();
    window.NeuroXQuickAccess?.refreshDrawer();

    btn.addEventListener('click', () => {
      if (isOpen) close(drawer, overlay, btn);
      else open(drawer, overlay, btn);
    });
    overlay.addEventListener('click', () => close(drawer, overlay, btn));
    drawer.querySelector('.nx-close').addEventListener('click', () => close(drawer, overlay, btn));

    drawer.querySelectorAll('.nx-section').forEach(sec => {
      sec.addEventListener('click', () => {
        const id = sec.dataset.section;
        const sub = drawer.querySelector(`.nx-sub[data-sub="${id}"]`);
        const wasOpen = sec.classList.contains('open');

        drawer.querySelectorAll('.nx-section').forEach(s => { s.classList.remove('open'); s.setAttribute('aria-expanded', 'false'); });
        drawer.querySelectorAll('.nx-sub').forEach(s => {s.classList.remove('open');s.inert=true;});

        if (!wasOpen) {
          sec.classList.add('open');
          sec.setAttribute('aria-expanded', 'true');
          sub.classList.add('open'); sub.inert=false;
        }
      });
    });

    const active = drawer.querySelector('.nx-current');
    if (active) {
      const sub = active.closest('.nx-sub');
      const sec = drawer.querySelector(`.nx-section[data-section="${sub.dataset.sub}"]`);
      if (sec) { sec.classList.add('open'); sec.setAttribute('aria-expanded', 'true'); sub.classList.add('open'); sub.inert=false; }
    }

    const fsBtn = drawer.querySelector('#nx-fullscreen');
    if (fsBtn) fsBtn.addEventListener('click', toggleFullscreen);

    document.addEventListener('keydown', e => {
      if (!isOpen) return;
      if (e.key === 'Escape') {e.preventDefault();e.stopImmediatePropagation();close(drawer,overlay,btn);return;}
      if (e.key !== 'Tab') return;
      const focusable = [...drawer.querySelectorAll('a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),[tabindex="0"]')]
        .filter(el => !el.closest('[inert]') && el.checkVisibility());
      if (!focusable.length) return;
      const index = focusable.indexOf(document.activeElement);
      if ((e.shiftKey && index <= 0) || (!e.shiftKey && (index === focusable.length-1 || index === -1))) {
        e.preventDefault();(e.shiftKey ? focusable.at(-1) : focusable[0]).focus();
      }
      e.stopImmediatePropagation();
    }, true);

    setupSwipe(drawer, overlay, btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();