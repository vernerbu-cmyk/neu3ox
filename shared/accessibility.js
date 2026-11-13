/* Use the existing visible field labels for assistive technology, including generated forms. */
(function () {
  'use strict';
  const clean = text => text.replace(/\s+/g, ' ').trim();
  function fieldName(control) {
    for (let box = control.parentElement, depth = 0; box && depth < 3 && box !== document.body; box = box.parentElement, depth++) {
      const label = box.querySelector(':scope > label, :scope > legend, :scope > .field-label, :scope > .settings-row');
      if (label) {
        const copy = label.cloneNode(true);
        copy.querySelectorAll('input,select,textarea,button,svg,output').forEach(el => el.remove());
        const text = clean(copy.textContent);
        if (text && text.length < 140) return text;
      }
      if (depth === 0) {
        const copy = box.cloneNode(true);
        copy.querySelectorAll('input,select,textarea,button,svg,output,script,style').forEach(el => el.remove());
        const text = clean(copy.textContent);
        if (text && text.length < 90 && /[А-Яа-яЁё]/.test(text)) return text;
      }
    }
    if (control.dataset.r !== undefined && control.dataset.c !== undefined)
      return 'Ответ: строка ' + (+control.dataset.r + 1) + ', столбец ' + (+control.dataset.c + 1);
    if (control.matches('.answer,.simple-input,.dec-input,.cell')) return 'Ответ';
    if (control.placeholder) return control.placeholder;
    return control.tagName === 'SELECT' ? 'Выберите вариант' : control.type === 'range' ? 'Значение настройки' : control.type === 'number' ? 'Числовое значение' : 'Введите значение';
  }
  function annotate(root) {
    const elements = selector => [...(root.matches?.(selector) ? [root] : []), ...root.querySelectorAll(selector)];
    for (const control of elements('input:not([type="hidden"]):not([type="button"]):not([type="submit"]),select,textarea')) {
      if (control.labels?.length || control.hasAttribute('aria-label') || control.hasAttribute('aria-labelledby') || control.title) continue;
      let name = fieldName(control);
      if (/(?:-|_)(?:min|minD)$/.test(control.id)) name += ' — минимум';
      if (/(?:-|_)(?:max|maxD)$/.test(control.id)) name += ' — максимум';
      control.setAttribute('aria-label', name);
    }
    for (const button of elements('button[data-tip]'))
      if (!button.hasAttribute('aria-label')) button.setAttribute('aria-label', button.dataset.tip);
    for (const card of elements('.card[role="link"][aria-label]')) {
      const copy = card.cloneNode(true);
      copy.querySelectorAll('svg,button,.arrow').forEach(el => el.remove());
      const text = clean(copy.textContent);
      if (text) card.setAttribute('aria-label', text);
    }
    for (const image of elements('img.token:not([alt])')) image.alt = 'Фишка';
    for (const button of elements('button.unit[aria-label]')) {
      const text = clean(button.textContent);
      if (text && button.getAttribute('aria-label') !== text) button.setAttribute('aria-label', text);
    }
  }
  function init() {
    annotate(document.body);
    const pending = new Set();
    let scheduled = false;
    new MutationObserver(records => {
      for (const record of records) for (const node of record.addedNodes) if (node.nodeType === 1) pending.add(node);
      if (!pending.size || scheduled) return;
      scheduled = true;
      queueMicrotask(() => {scheduled = false; for (const node of pending) if (node.isConnected) annotate(node); pending.clear();});
    }).observe(document.body, {childList:true,subtree:true});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
