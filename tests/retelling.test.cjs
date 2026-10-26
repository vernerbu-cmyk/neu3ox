const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
function load() {
  const element = {textContent: '', innerHTML: ''};
  const context = {document: {getElementById: () => element, addEventListener() {}},
    localStorage: {getItem: () => null}, addEventListener() {}};
  context.window = context;
  vm.createContext(context);
  for (const file of ['texts.js', 'statement-scopes.js', 'statement-logic.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, 'memory', file), 'utf8'), context);
  }
  const html = fs.readFileSync(path.join(root, 'memory/statement.html'), 'utf8');
  for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
    if (match[1].trim()) vm.runInContext(match[1], context);
  }
  return context;
}

test('short keywords accept whole forms, not unrelated word prefixes', () => {
  const c = load();
  for (const [word, key] of [['дома','дом'], ['дубом','дуб'], ['ежа','ёж'], ['Оле','Оля'], ['ушами','уши']]) {
    assert.equal(c.countMatches(word, [key]), 1, `${word}: ${key}`);
  }
  for (const [word, key] of [['лестница','лес'], ['ежевика','ёж'], ['котёл','кот'], ['домик','дом']]) {
    assert.equal(c.countMatches(word, [key]), 0, `${word}: ${key}`);
  }
  assert.equal(c.countMatches('дом дом дома', ['дом']), 1);
});

test('every existing plan accepts its own answer keys, including strict mode', () => {
  const c = load();
  for (const text of c.TEXTS) {
    for (const keys of text.planKeys) {
      assert.equal(c.countMatches(keys.join(' '), keys), new Set(keys).size, text.title);
    }
  }
});

test('all 390 questions have valid paragraph scopes and each short exercise has questions', () => {
  const c = load();
  let questionCount = 0;
  for (const text of c.TEXTS) {
    const scope = c.RETELL_QUESTION_PARAGRAPHS[text.title];
    assert.equal(scope.length, text.questions.length, text.title);
    assert.ok(scope.every(n => Number.isInteger(n) && n >= 1 && n <= c.getParagraphs(text.text).length), text.title);
    questionCount += scope.length;
    const before = JSON.stringify(text);
    const short = c.getRetellExercise(text, 'short');
    assert.equal(short.paragraphCount, 2);
    assert.ok(short.questions.length > 0 && short.keysFor3.length > 0 && short.keysForRetell.length > 0, text.title);
    assert.equal(short.questions.length, scope.filter(n => n <= 2).length, text.title);
    assert.equal(c.getRetellExercise(text, 'medium').questions.length, 5, text.title);
    assert.equal(JSON.stringify(text), before, 'source is not mutated');
  }
  assert.equal(questionCount, 390);
});

test('short Swallows exercise excludes facts about the omitted fledglings paragraph', () => {
  const c = load();
  const text = c.TEXTS.find(t => t.title === 'Ласточки');
  const short = c.getRetellExercise(text, 'short');
  assert.equal(short.questions.length, 4);
  assert.ok(!short.questions.some(q => q.q.includes('кормят птенчиков')));
  for (const keys of [short.keysFor3, short.keysForRetell]) {
    assert.ok(!keys.includes('птенчики') && !keys.includes('родители'));
  }
  assert.ok(!short.text.includes('Скоро из яиц'));
});

test('question scopes follow the source facts, not question order', () => {
  const c = load(), scopes = c.RETELL_QUESTION_PARAGRAPHS;
  assert.ok(scopes['В роще'].every(n => n === 1));
  assert.equal(scopes['Живой подарок'][2], 1);
  assert.equal(scopes['Улетают журавли'][4], 2);
  assert.equal(scopes['Пчёлы и мухи'][3], 2);
});

test('word lists, even with punctuation, do not qualify as a retelling', () => {
  const c = load(), text = c.getRetellExercise(c.TEXTS[0], 'medium');
  assert.ok(c.getRetellDraftIssue(text.keysForRetell.join(' '), text));
  assert.ok(c.getRetellDraftIssue('Ласточка гнездо. Глина яйца. Птенчики родители.', text));
  assert.equal(c.getRetellDraftIssue('Ласточка строит гнездо из глины. Потом она откладывает яйца. Родители кормят птенчиков мошками.', text), '');
  const short = c.getRetellExercise(c.TEXTS[0], 'short');
  assert.equal(c.getRetellDraftIssue('Ласточка строит гнездо под крышей. Самец носит корм самке.', short), '');
});

test('coverage uses word forms and boundaries; typed markup remains plain text', () => {
  const c = load();
  assert.ok(c.hasKeyword('Ласточки построили гнездо.', 'ласточка'));
  assert.ok(!c.hasKeyword('Лестница стояла во дворе.', 'лес'));
  assert.equal(c.escapeHtml('<img src=x>'), '&lt;img src=x&gt;');
});
