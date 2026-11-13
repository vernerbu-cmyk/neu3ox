/* NeuroX: единая система подразделов. Не изменяет данные игр или избранное. */
(() => {
  'use strict';
  const groups = {"attention":[{"id":"search","title":"Наблюдение и поиск","games":["Тихий сбой","Краем глаза","Редактор","Приманка"]},{"id":"movement","title":"События и движение","games":["Радар","Точка встречи","Счётчик событий","Перекрёсток"]},{"id":"logic","title":"Правила и анализ","games":["Невидимые стены","Негатив"]}],"memory":[{"id":"images","title":"Образы и предметы","games":["Детектив","Башня мага","Подземелье","Фоторобот","Реставратор"]},{"id":"sequences","title":"Последовательности","games":["Цепочка","Лента времени","Саймон","Последние четыре"]},{"id":"space","title":"Пространство","games":["Отражение","Слепые ячейки","Трансформация"]},{"id":"complex","title":"Слова и сложные задачи","games":["Изложения","Абсурд-мастер","Новости","Побег","Двойная задача","Взлом"]}],"reading":[{"id":"speed","title":"Темп и внимание","games":["Шульте","Двойной фокус","Читалка","Радуга","Лавина"]},{"id":"letters","title":"Буквы и слоги","games":["Алфавит","Слоги"]},{"id":"words","title":"Работа со словами","games":["Анаграммы","Столбики"]}],"math":[{"id":"count","title":"Числа и счёт","games":["Домики","Найди число","Считалочка"]},{"id":"calculate","title":"Вычисления","games":["Деление","Таблица умножения"]},{"id":"think","title":"Логика и схемы","games":["Магический квадрат","Точки"]}],"other":[{"id":"mazes","title":"Лабиринты","games":["Лабиринт","Лабиринт 2.0"]},{"id":"memory","title":"Память и внимание","games":["Мемо","Что изменилось?","Светофор"]}],"orfografos":[{"id":"parts","title":"Состав слова","games":["Разбор слова по составу"]},{"id":"spelling","title":"Орфограммы","games":["Проверочное слово","Буква за буквой"]}]};
  function init() {
    const section = document.documentElement.dataset.nxSection;
    const entries = groups[section];
    if (!entries) return;
    const cardsBox = document.querySelector('.container > .cards');
    if (!cardsBox || cardsBox.querySelector('.nx-section-filters')) return;
    const cards = Array.from(cardsBox.children).filter(el => el.matches('.card'));
    if (!cards.length) return;
    const byName = new Map();
    for (const card of cards) {
      const name = card.querySelector('.title')?.textContent.trim().replace(/\s+/g, ' ');
      if (name && !byName.has(name)) byName.set(name, card);
    }
    // При несовпадении списка с реальным каталогом ничего не переставляем:
    // неизвестные карточки нельзя незаметно прятать.
    const listed = entries.flatMap(entry => entry.games);
    if (listed.length !== cards.length || listed.some(name => !byName.has(name)) || new Set(listed).size !== listed.length) {
      console.warn('NeuroX: список подразделов не соответствует каталогу', section);
      return;
    }
    const nav = document.createElement('nav');
    nav.className = 'nx-section-filters';
    nav.setAttribute('aria-label', 'Подразделы раздела');
    const controls = [];
    function button(id, text, count) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'nx-section-filter';
      b.dataset.nxGroup = id;
      b.setAttribute('aria-pressed', 'false');
      b.append(document.createTextNode(text + ' '));
      const n = document.createElement('span'); n.textContent = String(count); b.append(n);
      controls.push(b); nav.append(b);
      return b;
    }
    button('all', 'Все', cards.length);
    for (const g of entries) button(g.id, g.title, g.games.length);
    cardsBox.before(nav);
    const headings = [];
    const grid = [];
    for (const group of entries) {
      const h = document.createElement('h2');
      h.className = 'nx-section-group-title';
      h.dataset.nxGroup = group.id;
      h.append(document.createTextNode(group.title + ' '));
      const n = document.createElement('span');
      n.textContent = `${group.games.length} ${group.games.length===1?'игра':group.games.length>=2&&group.games.length<=4?'игры':'игр'}`;
      h.append(n); cardsBox.append(h); headings.push(h);
      for (const name of group.games) {
        const card = byName.get(name);
        card.dataset.nxGroup = group.id;
        cardsBox.append(card); grid.push(card);
      }
    }
    const key = 'nx-subgroup-' + section;
    const allowed = new Set(['all', ...entries.map(g => g.id)]);
    function select(group) {
      if (!allowed.has(group)) group = 'all';
      controls.forEach(b => {
        const active = b.dataset.nxGroup === group;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      [...headings, ...grid].forEach(el => { el.hidden = group !== 'all' && el.dataset.nxGroup !== group; });
      try { sessionStorage.setItem(key, group); } catch (_) {}
    }
    controls.forEach(b => b.addEventListener('click', () => select(b.dataset.nxGroup)));
    let saved = 'all';
    try { saved = sessionStorage.getItem(key) || 'all'; } catch (_) {}
    select(saved);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
