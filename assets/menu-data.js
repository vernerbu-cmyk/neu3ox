/* ============================================================
   NeuroX — список разделов и тренажёров.
   ============================================================ */

window.NEUROX_MENU = [
  {
    id: 'preschool',
    icon: '🧸',
    title: 'Дошколятам',
    items: [
      { icon: '🔤', title: 'Алфавит',       file: 'preschool/alf/letalf.html' },
      { icon: '🔎', title: 'Найди букву',   file: 'preschool/findletter.html' },
      { icon: '🖼️', title: 'Буква и образ', file: 'preschool/letimage.html' },
      { icon: '🌱', title: 'Найди отличия', file: 'preschool/different.html' },
      { icon: '🛤️', title: 'Следопыт',      file: 'preschool/pathfinder.html' },
      { icon: '🧗', title: 'Слоголаз',      file: 'preschool/slogolaz.html' },
      { icon: '💎', title: 'Кристальная пещера', file: 'preschool/cave/index.html' },
    ]
  },
  {
    id: 'reading',
    icon: '📖',
    title: 'Скорочтение',
    items: [
      { icon: '📋', title: 'Шульте',   file: 'reading/shulte.html' },
      { icon: '🌫️', title: 'Читалка',  file: 'reading/chitaem/chitalka.html' },
      { icon: '🅰️', title: 'Алфавит',  file: 'reading/alfabet.html' },
      { icon: '🧠', title: 'Путаница', file: 'reading/putal.html' },
      { icon: '🌈', title: 'Радуга',   file: 'reading/raduga.html' },
      { icon: '🐌', title: 'Столбики', file: 'reading/stolbiky/stolby.html' },
      { icon: '🏔️', title: 'Лавина',   file: 'reading/bystro_chitaem/lavina.html' },
      { icon: '🔤', title: 'Слоги',    file: 'reading/slogi/slogi.html' },
      { icon: '👀', title: 'Двойной фокус', file: 'reading/double_focus/double.html' },
    ]
  },
  {
    id: 'math',
    icon: '🧮',
    title: 'Скоросчёт',
    items: [
      { icon: '🏠', title: 'Домики',             file: 'math/domiky.html' },
      { icon: '🔎', title: 'Найди число',        file: 'math/findnumber.html' },
      { icon: '🔲', title: 'Магический квадрат', file: 'math/magic.html' },
      { icon: '🧮', title: 'Примеры',            file: 'math/primery.html' },
      { icon: '✖️', title: 'Таблица умножения',  file: 'math/tablitsa.html' },
      { icon: '⚫', title: 'Точки',              file: 'math/tochki.html' },
      { icon: '➗', title: 'Деление',            file: 'math/delenie.html' },
    ]
  },
  {
    id: 'memory',
    icon: '💾',
    title: 'Память',
    items: [
      { icon: '🕵️', title: 'Детектив',       file: 'memory/detective.html' },
      { icon: '🎭', title: 'Абсурд',          file: 'memory/absurd.html' },
      { icon: '⛓️', title: 'Цепочка',         file: 'memory/chain.html' },
      { icon: '⚖️', title: 'Двойная задача',  file: 'memory/dual.html' },
      { icon: '🏰', title: 'Подземелье',      file: 'memory/dungeon.html' },
      { icon: '🚪', title: 'Побег',           file: 'memory/escape.html' },
      { icon: '📜', title: 'Лента времени',   file: 'memory/history.html' },
      { icon: '👤', title: 'Фоторобот',       file: 'memory/identikit.html' },
      { icon: '🪞', title: 'Зеркало',         file: 'memory/mirror.html' },
      { icon: '🕰️', title: 'Новые времена',   file: 'memory/newtimes.html' },
      { icon: '🎵', title: 'Симон',           file: 'memory/simon.html' },
      { icon: '📝', title: 'Новости',         file: 'memory/statement.html' },
      { icon: '🗼', title: 'Башня',           file: 'memory/tower.html' },
      { icon: '🔓', title: 'Взлом',           file: 'memory/vzlom.html' },
    ]
  },
  {
    id: 'other',
    icon: '🎲',
    title: 'Другое',
    items: [
      { icon: '🌀', title: 'Лабиринт',        file: 'other/labyrint.html' },
      { icon: '🌀', title: 'Лабиринт 2',      file: 'other/labyrint2.html' },
      { icon: '🃏', title: 'Мемо',            file: 'other/memo.html' },
      { icon: '👀', title: 'Что изменилось?', file: 'other/peremeny.html' },
      { icon: '🚦', title: 'Светофор',        file: 'other/stoplight.html' },
      { icon: '🔤', title: 'Алфавит',         file: 'other/alf/letalf.html' },
    ]
  },
  {
    id: 'generators',
    icon: '📝',
    title: 'Генераторы листов',
    items: [
      { icon: '🧩', title: 'Филворды',          file: 'generators/filvord.html' },
      { icon: '🖨️', title: 'Слоговые таблицы',  file: 'generators/slog_table.html' },
      { icon: '🌀', title: 'Спиралограф',        file: 'generators/spiral.html' },
      { icon: '🔀', title: 'Анаграммы',          file: 'generators/anagrammy.html' },
      { icon: '📊', title: 'Слова по слогам',    file: 'generators/words_table.html' },
      { icon: '🟰', title: 'Генератор примеров', file: 'generators/primery.html' },
      { icon: '🔎', title: 'Корректурная проба', file: 'generators/proba.html' },
      { icon: '🌲', title: 'Ёлочка',            file: 'generators/elochki.html' },
      { icon: '🔢', title: 'Таблицы Шульте',    file: 'generators/shulte.html' },
    ]
  },
  {
    id: 'orfografos',
    icon: '🖊️',
    title: 'Орфография',
    items: [
      { icon: '✅', title: 'Чередование', file: 'orfografos/chek.html' },
      { icon: '🧩', title: 'Морфемы',     file: 'orfografos/morfems.html' },
      { icon: '🔠', title: 'Буква за буквой', file: 'orfografos/ins/insert.html' },
    ]
  }
];