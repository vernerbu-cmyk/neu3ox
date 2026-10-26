const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
function load() {
  const c = {shuffle: items => [...items]};
  vm.createContext(c);
  vm.runInContext(fs.readFileSync(path.join(root, 'memory/history-logic.js'), 'utf8'), c);
  return c;
}
function events() {
  const source = fs.readFileSync(path.join(root, 'memory/history.html'), 'utf8');
  return Object.fromEntries([...source.matchAll(/const (EVENTS_\w+) = (\[[\s\S]*?\n\]);/g)]
    .map(m => [m[1], vm.runInNewContext(m[2])]));
}

test('all 16 ancient dates have BCE signs; early CE dates remain positive', () => {
  const e = events(), all = Object.values(e).flat();
  assert.equal(all.filter(e => e.year < 0).length, 16);
  const expected = new Map([
    ['Основание Египетского царства', -3000], ['Основание Рима', -753],
    ['Первые Олимпийские игры (Др. Греция)', -776], ['Марафонская битва', -490],
    ['Убийство Юлия Цезаря', -44], ['Октавиан Август — первый император Рима', -27],
    ['Гиппократ — основатель медицины', -400], ['«Начала» Эвклида', -300],
    ['Эратосфен измерил Землю', -240], ['Начало строительства Парфенона в Афинах', -447],
    ['Бумага в Китае (Цай Лунь)', 105], ['Миланский эдикт (христианство)', 313]
  ]);
  for (const [name, year] of expected) assert.equal(all.find(e => e.event === name).year, year, name);
});

test('chronology sorts across eras without changing source events', () => {
  const c = load(), data = events();
  const egypt = data.EVENTS_WORLD.find(e => e.year === -3000);
  const olympics = data.EVENTS_WORLD.find(e => e.year === -776);
  const paper = data.EVENTS_TECH.find(e => e.year === 105);
  const input = [paper, olympics, egypt];
  assert.deepEqual(Array.from(c.prepareHistoryTimeline(input, input, 'order')), [egypt, olympics, paper]);
  assert.deepEqual(input, [paper, olympics, egypt]);
  assert.equal(c.formatHistoryYear(-776), '776 до н. э.');
  assert.equal(c.formatHistoryYear(105), '105');
});

test('comparison mode replaces a same-year-only sample from its own pool', () => {
  const c = load(), same = [{year: 1054}, {year: 1054}, {year: 1054}], other = {year: 1066};
  const result = c.prepareHistoryTimeline(same, [...same, other], 'before');
  assert.equal(result.length, 3);
  assert.equal(new Set(result.map(e => e.year)).size, 2);
  assert.ok(same.every(e => e.year === 1054));
  assert.ok(c.prepareHistoryTimeline(same, [...same, other], 'order').every(e => e.year === 1054));
});

test('every comparison is between different years, unique, and bounded', () => {
  const c = load(), input = [{year: 1054}, {year: 1054}, {year: 1066}, {year: -44}];
  const pairs = c.buildHistoryPairs(input, 20);
  assert.equal(pairs.length, 5);
  assert.ok(pairs.every(([a,b]) => a.year !== b.year));
  assert.equal(new Set(pairs.map(([a,b]) => [input.indexOf(a),input.indexOf(b)].sort().join('-'))).size, pairs.length);
  assert.equal(c.buildHistoryPairs(input, 2).length, 2);
  assert.equal(c.buildHistoryPairs([{year: 1}, {year: 1}], 6).length, 0);
});

test('same-year events can occupy either equal-year slot', () => {
  const c = load(), a = {year: 1054, event: 'A'}, b = {year: 1054, event: 'B'}, later = {year: 1066};
  assert.ok(c.isHistoryPositionCorrect(b, a));
  assert.ok(c.isHistoryPositionCorrect(a, b));
  assert.ok(!c.isHistoryPositionCorrect(later, a));
  assert.ok(!c.isHistoryPositionCorrect(null, a));
});

test('year options are distinct and contain the signed correct year once', () => {
  const c = load(), pool = [{year:-776},{year:-753},{year:-753},{year:105},{year:105},{year:1961},{year:2020}];
  const result = c.getHistoryYearOptions(-776, pool);
  assert.equal(result.length, 4);
  assert.equal(new Set(result).size, 4);
  assert.equal(result.filter(y => y === -776).length, 1);
});
