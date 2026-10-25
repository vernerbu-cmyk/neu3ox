/* ============================================================
   NeuroX — Динамическая генерация карточек на главном экране
   ============================================================ */

// Справочник визуальных элементов для каждого раздела (иконки и бейджи)
const CARD_VISUALS = {
  preschool: {
    badge: '',
    svg: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><g class="float-cube float-1"><rect x="5" y="24" width="18" height="18" rx="4" fill="none"/><text x="14" y="37" font-family="Fredoka, sans-serif" font-size="12" font-weight="700" fill="currentColor" stroke="none" text-anchor="middle">А</text></g><g class="float-cube float-2"><rect x="25" y="24" width="18" height="18" rx="4" fill="#FF6A00" stroke="#FF6A00"/><text x="34" y="37" font-family="Fredoka, sans-serif" font-size="12" font-weight="700" fill="white" stroke="none" text-anchor="middle">Б</text></g><g class="float-cube float-3"><rect x="15" y="5" width="18" height="18" rx="4" fill="none"/><text x="24" y="18" font-family="Fredoka, sans-serif" font-size="12" font-weight="700" fill="currentColor" stroke="none" text-anchor="middle">В</text></g></svg>`
  },
  reading: {
    badge: '',
    svg: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"><path d="M6 12 Q14 8 24 12 L24 38 Q14 34 6 38 Z"/><path d="M42 12 Q34 8 24 12 L24 38 Q34 34 42 38 Z"/><path d="M11 18 L19 20"/><path d="M11 24 L19 26"/><path d="M11 30 L19 32"/><path class="book-line-1" d="M29 20 L37 18" stroke="#FF6A00"/><path class="book-line-2" d="M29 26 L37 24" stroke="#FF6A00"/><path class="book-line-3" d="M29 32 L37 30" stroke="#FF6A00"/></svg>`
  },
  math: {
    badge: '',
    svg: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"><path d="M10 8 L10 40"/><path d="M20 8 L20 40"/><path d="M30 8 L30 40"/><path d="M40 8 L40 40"/><circle class="bead bead-1" cx="10" cy="16" r="3.5" fill="#FF6A00" stroke="#FF6A00"/><circle class="bead bead-2" cx="10" cy="30" r="3.5" fill="#FF6A00" stroke="#FF6A00"/><circle class="bead bead-3" cx="20" cy="14" r="3.5"/><circle class="bead bead-4" cx="20" cy="26" r="3.5"/><circle class="bead bead-5" cx="30" cy="20" r="3.5"/><circle class="bead bead-6" cx="40" cy="16" r="3.5" fill="#FF6A00" stroke="#FF6A00"/><circle class="bead bead-7" cx="40" cy="34" r="3.5"/></svg>`
  },
  other: {
    badge: '',
    svg: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><rect x="8" y="8" width="32" height="32" rx="8"/><circle class="dot dot-1" cx="17" cy="17" r="2.2" fill="#FF6A00" stroke="none"/><circle class="dot dot-2" cx="31" cy="17" r="2.2" fill="currentColor" stroke="none"/><circle class="dot dot-3" cx="17" cy="31" r="2.2" fill="currentColor" stroke="none"/><circle class="dot dot-4" cx="31" cy="31" r="2.2" fill="#FF6A00" stroke="none"/><circle class="dot dot-5" cx="24" cy="24" r="2.2" fill="currentColor" stroke="none"/></svg>`
  },
  memory: {
    badge: 'в разработке',
    svg: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M8 8 L34 8 L40 14 L40 40 L8 40 Z"/><rect class="disk-shutter" x="16" y="8" width="16" height="12" fill="#FF6A00" stroke="#FF6A00"/><rect x="22" y="10" width="4" height="8" fill="white" stroke="none"/><rect x="14" y="26" width="20" height="14"/></svg>`
  },
  generators: {
    badge: 'в разработке',
    svg: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"><defs><clipPath id="printClipMain"><rect x="0" y="0" width="48" height="20"/></clipPath></defs><g clip-path="url(#printClipMain)"><g class="print-paper"><rect x="15" y="3" width="18" height="15" rx="1.5"/><path d="M20 8 L28 8" stroke="#FF6A00" stroke-width="1.8"/><path d="M20 12 L26 12" stroke="#FF6A00" stroke-width="1.8"/></g></g><rect x="6" y="20" width="36" height="20" rx="3"/><circle cx="11" cy="26" r="1.5" fill="#FF6A00" stroke="none"/><circle class="print-led" cx="37" cy="26" r="1.6" fill="#FF6A00" stroke="none"/><path d="M14 34 L34 34" stroke-width="3.2"/></svg>`
  },
  orfografos: {
    badge: 'в разработке',
    svg: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"><text class="letter-a" x="14" y="38" font-family="Fredoka, sans-serif" font-size="28" font-weight="700" fill="currentColor" stroke="none" text-anchor="middle">А</text><text class="letter-o" x="34" y="38" font-family="Fredoka, sans-serif" font-size="28" font-weight="700" fill="#FF6A00" stroke="none" text-anchor="middle">О</text></svg>`
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.cards');
  
  // Если контейнера или меню нет, выходим (чтобы ничего не сломать)
  if (!container || !window.NEUROX_MENU) return;

  // Очищаем контейнер от старого хардкода
  container.innerHTML = '';

  // Проходим по каждому разделу из menu-data.js
  window.NEUROX_MENU.forEach(section => {
    const visual = CARD_VISUALS[section.id] || { svg: '', badge: '' };
    const badgeHtml = visual.badge ? `<span class="badge">${visual.badge}</span>` : '';
    const countText = section.items.length > 0 ? `<div class="subtitle">${section.items.length} тренажёров</div>` : '';

    // Создаём карточку
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.category = section.id;
    
    card.innerHTML = `
      <div class="left">
        <div class="icon-wrap">${visual.svg}</div>
        <div class="card-text">
          <div class="title">${section.title}${badgeHtml}</div>
          ${countText}
        </div>
      </div>
      <div class="arrow">›</div>
    `;

    // Вешаем тот же обработчик, что был у тебя в HTML
    card.addEventListener('click', () => {
      if (typeof window.openCategory === 'function') {
        window.openCategory(section.id);
      } else {
        console.warn('Функция window.openCategory не найдена');
      }
    });

    container.appendChild(card);
  });
});