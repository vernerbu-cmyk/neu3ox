/* Единая навигация NeuroX для добавленных демонстрационных игр.
   Нет изменений в обработчиках ввода, конфигурации или данных игр. */
(() => {
  'use strict';
  const b = document.body;
  if (!b || !b.classList.contains('nx-added-game')) return;
  const section = b.dataset.nxSection || 'attention';
  const label = section === 'memory' ? 'Память' : 'Внимание';
  try {
    const stored = localStorage.getItem('neurox_theme');
    if ((stored === 'light' || stored === 'dark') && !document.documentElement.dataset.theme)
      document.documentElement.dataset.theme = stored;
  } catch (_) {}
  // У полноэкранного счётчика собственная доступная кнопка выхода.
  if (b.classList.contains('nx-game-counter') || b.classList.contains('nx-has-native-dark')) return;
  const link = document.createElement('a');
  link.className = 'nx-suite-link';
  link.href = 'index.html';
  link.setAttribute('aria-label', 'Вернуться в раздел «' + label + '»');
  link.innerHTML = '<span class="nx-suite-link__mark" aria-hidden="true">‹</span>'+
    '<span class="nx-suite-link__label"><span class="nx-suite-link__section">NEUROX</span>'+
    '<span class="nx-suite-link__name">' + label + '</span></span>';
  document.body.appendChild(link);
})();
