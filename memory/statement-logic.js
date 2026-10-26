function normalizeWord(word) {
  return word.toLowerCase().replace(/ё/g, 'е');
}

function getWords(text) {
  return normalizeWord(text).match(/[а-я]+/g) || [];
}

const SHORT_FORMS = {
  уши: ['ухо','уха','уху','ухом','ухе','ушей','ушам','ушами','ушах'],
  лед: ['льда','льду','льдом','льде','льды','льдов'],
  рот: ['рта','рту','ртом','рте'],
  сон: ['сна','сну','сном','сне'],
  день: ['дня','дню','днем','дне','дни','дней','днями']
};

function matchesWord(word, keyword) {
  word = normalizeWord(word);
  keyword = normalizeWord(keyword);
  if (word === keyword) return true;
  if ((SHORT_FORMS[keyword] || []).includes(word)) return true;
  if (keyword.length <= 3) {
    const stem = keyword.replace(/[аяь]$/, '');
    const endings = /^(а|я|у|ю|е|и|ы|ом|ем|ей|ов|ев|ам|ям|ами|ями|ах|ях|ью)$/;
    return word.startsWith(stem) && endings.test(word.slice(stem.length));
  }
  let prefix = 0;
  while (prefix < Math.min(word.length, keyword.length) && word[prefix] === keyword[prefix]) prefix++;
  return prefix >= 4;
}

function hasKeyword(text, keyword) {
  const words = getWords(text);
  const keys = getWords(keyword);
  return keys.length > 0 && keys.every(key => words.some(word => matchesWord(word, key)));
}

// One answer word can satisfy only one key; short keys need whole-word forms.
function countMatches(userInput, planKeys) {
  const words = [...new Set(getWords(userInput))];
  const remaining = [...new Set(planKeys.map(normalizeWord))];
  let matches = 0;
  for (const word of words) {
    let index = remaining.indexOf(word);
    if (index < 0) index = remaining.findIndex(key => matchesWord(word, key));
    if (index >= 0) { remaining.splice(index, 1); matches++; }
  }
  return matches;
}

function getRetellExercise(textObj, length) {
  const paragraphs = getParagraphs(textObj.text);
  const shown = length === 'short' ? paragraphs.slice(0, 2) : paragraphs;
  const text = shown.join('\n\n');
  const short = shown.length < paragraphs.length;
  const planKeys = (textObj.planKeys || []).slice(0, shown.length);
  const inShown = key => hasKeyword(text, key) || planKeys.flat().some(k => normalizeWord(k) === normalizeWord(key));
  const scope = (window.RETELL_QUESTION_PARAGRAPHS || {})[textObj.title] || [];
  const questions = short
    ? textObj.questions.filter((q, index) => Number.isInteger(scope[index]) && scope[index] >= 1 && scope[index] <= shown.length)
    : textObj.questions;
  const keysFor3 = short ? textObj.keysFor3.filter(inShown) : textObj.keysFor3;
  const keysForRetell = short ? textObj.keysForRetell.filter(inShown) : textObj.keysForRetell;
  return {
    ...textObj, text, planKeys, questions,
    keysFor3: keysFor3.length ? keysFor3 : getKeyWords(text).slice(0, 4),
    keysForRetell: keysForRetell.length ? keysForRetell : getKeyWords(text).slice(0, 6),
    distractors: textObj.distractors.filter(key => !hasKeyword(text, key)),
    paragraphCount: shown.length
  };
}

function getRetellDraftIssue(value, textObj) {
  const minimum = Math.min(3, textObj.paragraphCount || getParagraphs(textObj.text).length);
  const sentences = value.split(/[.!?]+/).map(s => getWords(s)).filter(words => words.length >= 2);
  if (sentences.length < minimum) return `Напиши хотя бы ${minimum} предложения по прочитанному тексту.`;
  const extraWords = new Set(getWords(value).filter(word => !STOP_WORDS.has(word) &&
    !textObj.keysForRetell.some(key => hasKeyword(word, key))));
  if (extraWords.size < 2) return 'Добавь события и действия: одного списка опорных слов недостаточно.';
  return '';
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
