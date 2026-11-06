/* Keep navigation icons private: trainers may have their own ICONS constant. */
(function () {
  'use strict';
/* ============================================================
   NeuroX — список разделов и тренажёров.
   ============================================================ */

window.NEUROX_MENU = [
  {
    id: 'preschool',
    icon: 'preschool',
    title: 'Дошколятам',
    items: [
      { icon: 'alphabet', title: 'Буквы',       file: 'preschool/alf/letalf.html' },
      { icon: 'alphabet', title: 'Буквенные тени', file: 'preschool/bukvennye-teni.html' },
      { icon: 'search', title: 'Найди букву',   file: 'preschool/findletter.html' },
      { icon: 'image', title: 'Буква — картинка', file: 'preschool/letimage.html' },
      { icon: 'sprout', title: 'Что лишнее?', file: 'preschool/different.html' },
      { icon: 'route', title: 'Следопыт',      file: 'preschool/pathfinder.html' },
      { icon: 'climb', title: 'Слоголаз',      file: 'preschool/slogolaz.html' },
      { icon: 'gem', title: 'Кристальная пещера', file: 'preschool/cave/index.html' },
      { icon: 'alphabet', title: 'Построй слово', file: 'preschool/iskorka/syllablebuilder.html' },
      { icon: 'hash', title: 'Мир чисел', file: 'preschool/iskorka/numbers.html' },
      { icon: 'scale', title: 'Где больше?', file: 'preschool/iskorka/moreless.html' },
      { icon: 'calculator', title: 'Математическая мастерская', file: 'preschool/iskorka/mathworkshop.html' },
      { icon: 'pattern', title: 'Продолжи узор', file: 'preschool/iskorka/patterns.html' },
    ]
  },
  {
    id: 'reading',
    icon: 'book',
    title: 'Скорочтение',
    items: [
      { icon: 'clipboard', title: 'Шульте',   file: 'reading/shulte.html' },
      { icon: 'cloud', title: 'Читалка',  file: 'reading/chitaem/chitalka.html' },
      { icon: 'alphabet', title: 'Алфавит',  file: 'reading/alfabet.html' },
      { icon: 'brain', title: 'Анаграммы', file: 'reading/putal.html' },
      { icon: 'rainbow', title: 'Радуга',   file: 'reading/raduga.html' },
      { icon: 'snail', title: 'Столбики', file: 'reading/stolbiky/stolby.html' },
      { icon: 'mountain', title: 'Лавина',   file: 'reading/bystro_chitaem/lavina.html' },
      { icon: 'alphabet', title: 'Слоги',    file: 'reading/slogi/slogi.html' },
      { icon: 'eyes', title: 'Двойной фокус', file: 'reading/double_focus/double.html' },
    ]
  },
  {
    id: 'math',
    icon: 'calculator',
    title: 'Скоросчёт',
    items: [
      { icon: 'house', title: 'Домики',             file: 'math/domiky.html' },
      { icon: 'search', title: 'Найди число',        file: 'math/findnumber.html' },
      { icon: 'grid', title: 'Магический квадрат', file: 'math/magic.html' },
      { icon: 'calculator', title: 'Считалочка',            file: 'math/primery.html' },
      { icon: 'multiply', title: 'Таблица умножения',  file: 'math/tablitsa.html' },
      { icon: 'dot', title: 'Точки',              file: 'math/tochki.html' },
      { icon: 'divide', title: 'Деление',            file: 'math/delenie.html' },
    ]
  },
  {
    id: 'memory',
    icon: 'memory',
    title: 'Память',
    items: [
      { icon: 'detective', title: 'Детектив',       file: 'memory/detective.html' },
      { icon: 'masks', title: 'Абсурд-мастер',          file: 'memory/absurd.html' },
      { icon: 'chain', title: 'Цепочка',         file: 'memory/chain.html' },
      { icon: 'scale', title: 'Двойная задача',  file: 'memory/dual.html' },
      { icon: 'castle', title: 'Подземелье',      file: 'memory/dungeon.html' },
      { icon: 'door', title: 'Побег',           file: 'memory/escape.html' },
      { icon: 'scroll', title: 'Лента времени',   file: 'memory/history.html' },
      { icon: 'person', title: 'Фоторобот',       file: 'memory/identikit.html' },
      { icon: 'mirror', title: 'Отражение',         file: 'memory/mirror.html' },
      { icon: 'clock', title: 'Новости',   file: 'memory/newtimes.html' },
      { icon: 'music', title: 'Саймон',           file: 'memory/simon.html' },
      { icon: 'pencil', title: 'Изложения',         file: 'memory/statement.html' },
      { icon: 'tower', title: 'Башня мага',           file: 'memory/tower.html' },
      { icon: 'unlock', title: 'Взлом',           file: 'memory/vzlom.html' },
      { icon: 'key', title: 'Слепые ячейки', file: 'memory/keys.html' },
      { icon: 'hash', title: 'Последние четыре', file: 'memory/last-four.html' },
      { icon: 'refresh', title: 'Трансформация', file: 'memory/transformation.html' },
      { icon: 'image', title: 'Реставратор', file: 'memory/restorer.html' },
    ]
  },
  {
    id: 'attention',
    icon: 'eye',
    title: 'Внимание',
    items: [
      { icon: 'wrench', title: 'Тихий сбой', file: 'attention/quiet-glitch.html' },
      { icon: 'radar', title: 'Радар', file: 'attention/radar.html' },
      { icon: 'brick', title: 'Невидимые стены', file: 'attention/invisible-walls.html' },
      { icon: 'target', title: 'Точка встречи', file: 'attention/meeting-point.html' },
      { icon: 'eye', title: 'Краем глаза', file: 'attention/peripheral.html' },
      { icon: 'contrast', title: 'Негатив', file: 'attention/negative.html' },
      { icon: 'pencil', title: 'Редактор', file: 'attention/editor.html' },
      { icon: 'trap', title: 'Приманка', file: 'attention/decoy.html' },
      { icon: 'hash', title: 'Счётчик событий', file: 'attention/counter.html' },
      { icon: 'traffic', title: 'Перекрёсток', file: 'attention/perekrestok.html' },
    ]
  },
  {
    id: 'other',
    icon: 'dice',
    title: 'Другое',
    items: [
      { icon: 'spiral', title: 'Лабиринт',        file: 'other/labyrint.html' },
      { icon: 'spiral', title: 'Лабиринт 2.0',      file: 'other/labyrint2.html' },
      { icon: 'cards', title: 'Мемо',            file: 'other/memo.html' },
      { icon: 'eyes', title: 'Что изменилось?', file: 'other/peremeny.html' },
      { icon: 'traffic', title: 'Светофор',        file: 'other/stoplight.html' },
    ]
  },
  {
    id: 'generators',
    icon: 'pencil',
    title: 'Генераторы листов',
    items: [
      { icon: 'puzzle', title: 'Филворды',          file: 'generators/filvord.html' },
      { icon: 'printer', title: 'Слоговые таблицы',  file: 'generators/slog_table.html' },
      { icon: 'spiral', title: 'Спиралограф',        file: 'generators/spiral.html' },
      { icon: 'shuffle', title: 'Анаграммы',          file: 'generators/anagrammy.html' },
      { icon: 'chart', title: 'Слова по слогам',    file: 'generators/words_table.html' },
      { icon: 'equal', title: 'Генератор примеров', file: 'generators/primery.html' },
      { icon: 'search', title: 'Корректурная проба', file: 'generators/proba.html' },
      { icon: 'tree', title: 'Ёлочка',            file: 'generators/elochki.html' },
      { icon: 'hash', title: 'Таблицы Шульте',    file: 'generators/shulte.html' },
      { icon: 'printer', title: 'Найди и отметь', file: 'generators/naidi_i_otmet.html' },
      { icon: 'thread', title: 'Нитки', file: 'generators/nitki.html' },
      { icon: 'alphabet', title: 'Слово в порядке', file: 'generators/slovo-generator/index.html' },
      { icon: 'search', title: 'Найди букву', file: 'generators/naidi_bukvu.html' },
      { icon: 'printer', title: 'Столбики+', file: 'generators/stolbiki_plus.html' },
    ]
  },
  {
    id: 'orfografos',
    icon: 'pen',
    title: 'Орфография',
    items: [
      { icon: 'check', title: 'Проверочное слово', file: 'orfografos/chek.html' },
      { icon: 'puzzle', title: 'Разбор слова по составу',     file: 'orfografos/morfems.html' },
      { icon: 'case', title: 'Буква за буквой', file: 'orfografos/ins/insert.html' },
    ]
  }
];

  /* NeuroX: единый SVG-набор навигационных иконок. */
  const ICONS = {
    preschool: '<path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5z"/><path d="m4 8.5 8 4.5 8-4.5M12 13v7"/>',
    pattern: '<circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 6h8M6 8v8M18 8v8M8 18h8"/>',
    alphabet: '<path d="M4 19 10 5l6 14M7 14h7"/><path d="M16 19h4M18 17v4"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4.5 4.5"/>',
    image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="9" r="1.5"/><path d="m5 17 5-5 3 3 2-2 4 4"/>',
    sprout: '<path d="M12 20v-8"/><path d="M12 13C5 13 4 8 4 5c5 0 8 2 8 8ZM12 16c0-6 4-9 8-9 0 5-2 9-8 9Z"/>',
    route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h3a3 3 0 0 0 3-3v-3a3 3 0 0 1 3-3h1"/>',
    climb: '<path d="m4 20 5-8 3 3 4-8 4 13"/><circle cx="16" cy="4.5" r="1.8"/><path d="m10 12 2-4 3 1"/>',
    gem: '<path d="m4 8 4-4h8l4 4-8 12z"/><path d="M4 8h16M8 4l4 16 4-16"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z"/><path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20M8 7h8"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M8 9h8M8 13h8M8 17h5"/>',
    cloud: '<path d="M6 18h12a3.5 3.5 0 0 0 .4-7A6.5 6.5 0 0 0 6 9.5 4.2 4.2 0 0 0 6 18Z"/><path d="m8 20-1 1m6-1-1 1m6-1-1 1"/>',
    brain: '<path d="M12 5a3 3 0 0 0-5.8 1.1A3.5 3.5 0 0 0 5 12a3.5 3.5 0 0 0 1.8 5.9A3 3 0 0 0 12 19z"/><path d="M12 5a3 3 0 0 1 5.8 1.1A3.5 3.5 0 0 1 19 12a3.5 3.5 0 0 1-1.8 5.9A3 3 0 0 1 12 19zM8 9h2m-3 5h3m4-5h2m-1 5h3M12 5v14"/>',
    rainbow: '<path d="M3 19a9 9 0 0 1 18 0M6 19a6 6 0 0 1 12 0M9 19a3 3 0 0 1 6 0"/>',
    snail: '<path d="M3 17h17a2 2 0 0 0 0-4h-2a6 6 0 1 0-6 6H7a4 4 0 0 1-4-2Z"/><path d="M12 13a2.5 2.5 0 1 0-2.5-2.5A2.5 2.5 0 0 0 12 13Z"/><path d="M18 12V8m3 4V8"/>',
    mountain: '<path d="m2.5 19 6.5-11 3.2 5 2.3-3 7 9z"/><path d="m7 11 2 2 2-1m3 0 2 2 1.5-1"/>',
    eyes: '<path d="M2.5 12s3.3-5 7.5-5 7.5 5 7.5 5-3.3 5-7.5 5-7.5-5-7.5-5Z"/><circle cx="10" cy="12" r="2"/><path d="M14.5 12s3.1-4 6-4 3 4 3 4-1.5 4-4.5 4"/><circle cx="19" cy="12" r="1.4"/>',
    calculator: '<rect x="4" y="3" width="16" height="18" rx="2"/><rect x="7" y="6" width="10" height="3" rx=".6"/><path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01"/>',
    house: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-7h6v7"/>',
    grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
    multiply: '<path d="m6 6 12 12M18 6 6 18"/>',
    dot: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.5"/>',
    divide: '<path d="M5 12h14"/><circle cx="12" cy="6" r="1.5"/><circle cx="12" cy="18" r="1.5"/>',
    memory: '<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 2v3m4-3v3m4-3v3M8 19v3m4-3v3m4-3v3M2 9h2m-2 4h2m16-4h2m-2 4h2"/><path d="m8 14 2-3 2 3 2-3 2 3"/>',
    detective: '<circle cx="10" cy="10" r="5.5"/><path d="m14 14 6 6M7 10h6m-3-3v6"/>',
    masks: '<path d="M3 7c3-2 6-2 9 0v7c-2 3-7 4-9 0zM12 7c3-2 6-2 9 0v7c-2 4-7 3-9 0z"/><path d="M6 11h.01M9 11h.01m6 0h.01m3 0h.01"/>',
    chain: '<path d="M9 8 7 6a4 4 0 0 0-5.7 5.7l3 3A4 4 0 0 0 10 15l2-2M15 16l2 2a4 4 0 0 0 5.7-5.7l-3-3A4 4 0 0 0 14 9l-2 2M8 16l8-8"/>',
    scale: '<path d="M12 3v18m-6 0h12M5 7h14M7 7l-4 7h8L7 7Zm10 0-4 7h8l-4-7Z"/>',
    castle: '<path d="M4 21V8h4V4l4 3 4-3v4h4v13z"/><path d="M9 21v-6h6v6M4 11h16"/>',
    door: '<path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17z"/><circle cx="14.5" cy="13" r=".8"/>',
    scroll: '<path d="M6 4h13a2 2 0 0 1 0 4H7a3 3 0 0 0 0 6h12a2 2 0 0 1 0 4H6a2 2 0 0 1 0-4"/><path d="M6 4v14"/>',
    person: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    mirror: '<rect x="6" y="3" width="12" height="18" rx="6"/><path d="m9 7 6 10m0-10-6 10"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    pencil: '<path d="m4 16-.8 4.8L8 20l11-11-4-4zM13.5 6.5l4 4M4 4h5"/>',
    tower: '<path d="M8 21V7h8v14M6 7h12l-2-4h-8zM5 21h14M10 11h4m-4 4h4"/>',
    unlock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.5-2"/><circle cx="12" cy="15" r="1"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9m-3 3 3 3m-6 0 3 3"/>',
    hash: '<path d="M5 9h14M4 15h14M10 4 8 20m8-16-2 16"/>',
    refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.5 9A7 7 0 0 1 18 6l2 6M4 12l2 6a7 7 0 0 0 12.5-3"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.7"/>',
    wrench: '<path d="M14 6a5 5 0 0 0-6 6L3 17a2 2 0 0 0 3 3l5-5a5 5 0 0 0 6-6l-3 3-3-3z"/>',
    radar: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 12 18 5"/>',
    brick: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 12h18M9 5v7m6 0v7"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    contrast: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z"/>',
    trap: '<path d="M4 5h16l-2 15H6z"/><path d="M8 5V3h8v2m-4 4v6m-2-3 2 3 2-3"/>',
    dice: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 8h.01M16 8h.01M12 12h.01M8 16h.01M16 16h.01"/>',
    spiral: '<path d="M12 12c0-2 3-2 3 0s-2 4-5 4-6-2-6-6 4-8 9-8 9 4 9 9-3 8-7 9"/>',
    cards: '<rect x="5" y="4" width="13" height="16" rx="2"/><path d="M9 2h10a2 2 0 0 1 2 2v13M9 9h5m-5 4h5"/>',
    traffic: '<path d="M9 3h6l2 3v12l-2 3H9l-2-3V6z"/><circle cx="12" cy="8" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="16" r="1.6"/>',
    puzzle: '<path d="M4 4h6a2 2 0 1 1 4 0h6v6a2 2 0 1 0 0 4v6h-6a2 2 0 1 1-4 0H4v-6a2 2 0 1 0 0-4z"/>',
    printer: '<path d="M7 8V3h10v5M6 17H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v7H7zM18 11h.01"/>',
    shuffle: '<path d="m3 7 3 0c5 0 7 10 12 10h3m-3-3 3 3-3 3M3 17h3c2 0 3-2 4-4m4-6c1-1 2-2 4-2h3m-3-3 3 3-3 3"/>',
    chart: '<path d="M4 20V5m0 15h17M8 16v-4m4 4V7m4 9v-6m4 6V3"/>',
    equal: '<path d="M5 9h14M5 15h14"/>',
    tree: '<path d="m12 3 5 6h-3l5 6h-5v6h-4v-6H5l5-6H7z"/>',
    thread: '<path d="M5 4c9 0 5 16 14 16M5 20c9 0 5-16 14-16"/><circle cx="5" cy="4" r="1.5"/><circle cx="19" cy="20" r="1.5"/>',
    pen: '<path d="m4 20 4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16zM14 7l3 3"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    case: '<path d="M4 19 10 5l6 14M7 14h7M17 14h3a2 2 0 0 1 0 4h-3z"/>',
    star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>'
  };
  window.NeuroXIconSvg = function iconSvg(name, extraClass='') {
    const content = ICONS[name] || ICONS.puzzle;
    const className = String(extraClass || '').replace(/[^a-zA-Z0-9 _-]/g, '');
    return `<svg class="nx-line-icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${content}</svg>`;
  };



})();
