/* One theme setting for the suite. Legacy keys are read only during migration. */
(function () {
  'use strict';
  const root = new URL('../', document.currentScript.src);
  const path = decodeURI(location.pathname.slice(root.pathname.length));
  const valid = value => value === 'light' || value === 'dark';
  function read() {
    try {
      const current = localStorage.getItem('neurox_theme');
      if (valid(current)) return current;
      for (const key of ['nx-theme', 'theme', 'vlomTheme']) {
        const old = localStorage.getItem(key);
        if (valid(old)) return old;
      }
    } catch (_) {}
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function syncBody() {
    if (!document.body) return;
    document.body.dataset.nxPath = path;
    if (path === 'memory/vzlom.html') {
      const dark = document.documentElement.dataset.theme === 'dark';
      document.body.classList.toggle('dark', dark);
      if (typeof window.setThemeIcon === 'function') window.setThemeIcon(dark);
    }
  }
  function set(theme) {
    if (!valid(theme)) return;
    if (document.documentElement.dataset.theme !== theme) document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('neurox_theme', theme); } catch (_) {}
    syncBody();
  }
  window.NeuroXTheme = Object.freeze({set, get:read});
  set(read());
  new MutationObserver(syncBody).observe(document.documentElement, {attributes:true, attributeFilter:['data-theme']});
  document.addEventListener('DOMContentLoaded', syncBody);
  window.addEventListener('storage', event => {
    if (event.key === 'neurox_theme' || event.key === null) set(read());
  });
})();
