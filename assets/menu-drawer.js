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

  /* ---------- Построение ---------- */
  function build() {
    // Кнопка ☰
    const btn = document.createElement('button');
    btn.id = 'nx-drawer-btn';
    btn.setAttribute('aria-label', 'Открыть меню');
    btn.innerHTML = '☰';

    // Оверлей
    const overlay = document.createElement('div');
    overlay.id = 'nx-overlay';

    // Drawer
    const drawer = document.createElement('aside');
    drawer.id = 'nx-drawer';
    drawer.setAttribute('aria-hidden', 'true');

    const sectionsHtml = window.NEUROX_MENU.map(sec => {
      const subLinks = sec.items.map(it => {
        const href = new URL(it.file, ROOT).href;
        const active = new URL(location.href).pathname === new URL(href).pathname;
        return `<a href="${esc(href)}" ${active ? 'aria-current="page" class="nx-current"' : ''}>${esc(it.icon)} ${esc(it.title)}</a>`;
      }).join('');
      return `
        <button type="button" class="nx-section" data-section="${esc(sec.id)}" aria-expanded="false">
          <span class="nx-section__icon">${esc(sec.icon)}</span>
          <span>${esc(sec.title)}</span>
          <span class="nx-section__chev" aria-hidden="true">▾</span>
        </button>
        <div class="nx-sub" data-sub="${esc(sec.id)}">
          <div class="nx-sub__inner">${subLinks}</div>
        </div>
      `;
    }).join('');

    drawer.innerHTML = `
      <div class="nx-head">
        <div class="nx-brand">
          <span class="nx-brain">🧠</span>
          <span>NeuroX</span>
        </div>
        <button class="nx-close" aria-label="Закрыть">×</button>
      </div>

      <div class="nx-body">
        <a class="nx-home" href="${esc(new URL('index.html', ROOT).href)}">🏠 Главное меню</a>
        ${sectionsHtml}
      </div>

      <div class="nx-foot">
        <a id="nx-profile-link" href="${esc(new URL('index.html#profile', ROOT).href)}">👤 Профиль и рекомендации</a>
        <button type="button" id="nx-fullscreen">⛶ Полный экран</button>
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

  function open(drawer, overlay, btn) {
    isOpen = true;
    drawer.classList.add('open');
    overlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-label', 'Закрыть меню');
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  function close(drawer, overlay, btn) {
    isOpen = false;
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-label', 'Открыть меню');
    document.body.style.overflow = previousOverflow;
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
        drawer.querySelectorAll('.nx-sub').forEach(s => s.classList.remove('open'));

        if (!wasOpen) {
          sec.classList.add('open');
          sec.setAttribute('aria-expanded', 'true');
          sub.classList.add('open');
        }
      });
    });

    const active = drawer.querySelector('.nx-current');
    if (active) {
      const sub = active.closest('.nx-sub');
      const sec = drawer.querySelector(`.nx-section[data-section="${sub.dataset.sub}"]`);
      if (sec) { sec.classList.add('open'); sec.setAttribute('aria-expanded', 'true'); sub.classList.add('open'); }
    }

    const fsBtn = drawer.querySelector('#nx-fullscreen');
    if (fsBtn) fsBtn.addEventListener('click', toggleFullscreen);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) close(drawer, overlay, btn);
    });

    setupSwipe(drawer, overlay, btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();