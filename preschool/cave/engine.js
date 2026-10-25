/* ============================================================
   КРИСТАЛЬНАЯ ПЕЩЕРА — движок (v1.3)
   Категории — фильтр в настройках
   ============================================================ */

/* ============================================================
   1. СОСТОЯНИЕ
   ============================================================ */

const state = {
  material: "syllables",
  count: 8,
  category: "all",           // ← фильтр категории
  puzzle: "dragon",
  mode: "none",
  speed: "normal",
  sound: "on",
  pauses: "on",
  changesLevel: "easy",
  pathLevel: "easy",
  learnedLetters: [...ALL_CONSONANTS],
  learnedVowels: ["А","О","У","Ы"],
  syllableTypes: ["cv"]
};

let G = null;
let ZONES = [];
let actx = null;

let usedObserve = { early: [], mid: [], late: [] };
let usedGuess   = { early: [], mid: [], late: [] };

/* ============================================================
   2. УТИЛИТЫ
   ============================================================ */

const $ = id => document.getElementById(id);
const rand = n => Math.floor(Math.random() * n);
const shuffle = a => {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

function beep(freq, dur, type, vol) {
  if (state.sound !== "on") return;
  try {
    if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = type || "sine";
    o.frequency.value = freq;
    const t = actx.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol || 0.07, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(actx.destination);
    o.start(t); o.stop(t + dur + 0.05);
  } catch (e) {}
}

function chime() {
  beep(660, 0.35, "sine", 0.06);
  setTimeout(() => beep(880, 0.40, "sine", 0.05), 110);
  setTimeout(() => beep(1170, 0.55, "sine", 0.04), 230);
}

function softClick() { beep(420, 0.10, "triangle", 0.035); }

/* ============================================================
   3. ВОПРОСЫ
   ============================================================ */

function resetQuestionTrackers() {
  usedObserve = { early: [], mid: [], late: [] };
  usedGuess   = { early: [], mid: [], late: [] };
}

function getStage() {
  if (!G) return "early";
  const p = G.tasks.length ? G.completed.length / G.tasks.length : 0;
  if (p < 0.34) return "early";
  if (p < 0.67) return "mid";
  return "late";
}

function pickFromBank(bank, used) {
  const stage = getStage();
  const pool = bank[stage];
  const u = used[stage];
  const available = pool.map((_, i) => i).filter(i => !u.includes(i));
  if (!available.length) { used[stage] = []; return pickFromBank(bank, used); }
  const idx = available[rand(available.length)];
  u.push(idx);
  return pool[idx];
}

function pickObserve() { return pickFromBank(OBSERVE_BANK, usedObserve); }
function pickGuess()   { return pickFromBank(GUESS_BANK, usedGuess); }

/* ============================================================
   4. СЦЕНА
   ============================================================ */

function crystalSVG(x, y, i) {
  return `<g class="crystal" id="crystal-${i}" transform="translate(${x} ${y})">
    <ellipse cx="0" cy="20" rx="32" ry="10" fill="#070b16" opacity="0.85"/>
    <circle class="cr-halo" cx="0" cy="-8" r="52" fill="url(#crystalHalo)"/>
    <g class="cr-body">
      <polygon points="0,-42 16,-8 0,22 -16,-8" fill="#26324f" stroke="#3d5480" stroke-width="2"/>
      <polygon points="0,-42 16,-8 0,-2" fill="#33456a" stroke="#3d5480" stroke-width="2"/>
      <polygon points="0,-42 -16,-8 0,-2" fill="#2b3a5c" stroke="#3d5480" stroke-width="2"/>
      <polygon points="0,-2 16,-8 0,22" fill="#1e2a45" stroke="#3d5480" stroke-width="2"/>
      <polygon points="0,-2 -16,-8 0,22" fill="#222f4c" stroke="#3d5480" stroke-width="2"/>
    </g>
    <text class="cr-num" x="0" y="-58" text-anchor="middle" font-size="42" font-weight="900"
          fill="#ffe27a" style="paint-order:stroke;stroke:#1a1200;stroke-width:6">1</text>
  </g>`;
}

function buildScene(p) {
  const svg = $("scene");
  let art = "", glow = "", crys = "";
  p.zones.forEach((z, i) => {
    art += `<g class="zone-art" id="zart-${i}" style="opacity:0">${z.art}</g>`;
    const c = CRYSTALS[z.ci];
    glow += `<circle id="zglow-${i}" cx="${c[0]}" cy="${c[1]}" r="0" fill="url(#glowGrad)" opacity="0"/>`;
    crys += crystalSVG(c[0], c[1], i);
  });
  svg.innerHTML = DEFS + BACKDROP +
    `<g id="silhouette" style="opacity:0">${p.silhouette}</g>` +
    `<g id="zoneArt">${art}</g>` +
    `<g id="extras" style="opacity:0">${p.extras}</g>` +
    `<rect id="darkness" x="0" y="0" width="1600" height="900" fill="#03060f" opacity="0.94"/>` +
    `<g id="zoneGlow" style="mix-blend-mode:screen">${glow}</g>` +
    `<g id="crystalLayer">${crys}</g>` +
    `<rect id="veil" x="0" y="0" width="1600" height="900" fill="#000" opacity="0"/>`;
}

/* ============================================================
   5. СВЕТ
   ============================================================ */

function animDuration() { return state.speed === "slow" ? 2200 : 1300; }

function animateGlow(circle, targetR, dur) {
  if (!circle) return;
  const start = performance.now();
  const peak = state.speed === "slow" ? 0.62 : 0.72;
  function step(t) {
    const p = Math.min(1, (t - start) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    circle.setAttribute("r", (targetR * e).toFixed(1));
    circle.setAttribute("opacity", (peak * e).toFixed(3));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function revealZone(i, instant) {
  const art = $("zart-" + i), glow = $("zglow-" + i);
  if (!art) return;
  const dur = instant ? 0 : animDuration();
  art.style.transition = `opacity ${dur}ms ease`;
  art.style.opacity = "1";
  if (instant) {
    if (glow) { glow.setAttribute("r", ZONES[i].r); glow.setAttribute("opacity", 0.7); }
  } else {
    animateGlow(glow, ZONES[i].r, dur);
  }
}

function hideZone(i) {
  const art = $("zart-" + i), glow = $("zglow-" + i);
  if (art) { art.style.transition = "opacity .7s ease"; art.style.opacity = "0"; }
  if (glow) { glow.setAttribute("r", 0); glow.setAttribute("opacity", 0); }
}

function lightCrystal(i, instant) {
  const c = $("crystal-" + i);
  if (!c) return;
  c.classList.add("lit");
  if (!instant) {
    const h = c.querySelector(".cr-halo");
    if (h) { h.style.opacity = "0"; requestAnimationFrame(() => h.style.opacity = "0.9"); }
  }
}

function unlightCrystal(i) {
  const c = $("crystal-" + i);
  if (c) c.classList.remove("lit");
}

function updateDarkness(finale) {
  const d = $("darkness");
  if (!d || !G) return;
  const p = G.tasks.length ? G.completed.length / G.tasks.length : 0;
  let val = 0.94 - 0.90 * p;
  if (finale) val = 0.03;
  d.style.transition = "opacity 1.6s ease";
  d.setAttribute("opacity", val.toFixed(3));

  const ex = $("extras");
  if (ex) { ex.style.transition = "opacity 1.6s ease"; ex.style.opacity = Math.min(1, p * 1.8); }
  const sil = $("silhouette");
  if (sil) { sil.style.transition = "opacity 1.6s ease"; sil.style.opacity = Math.min(1, p * 1.2); }
}

/* ============================================================
   6. ЗАДАНИЯ И РАУНД
   ============================================================ */
const ALL_VOWELS = ["А","О","У","Ы","И","Э","Я","Ю","Е","Ё"];
const SYLLABLE_TYPES = {cv:"МА",vc:"АМ",cvc:"МАК",ccv:"СТА",cccv:"СТРА"};
const CLUSTERS = ["БЛ","БР","ВЛ","ВР","ГЛ","ГР","ДВ","ДР","ЗВ","ЗН","КЛ","КР","ПЛ","ПР","СВ","СК","СЛ","СМ","СН","СП","СТ","ТВ","ТР","ФЛ","ФР","ХЛ","ХР","ЦВ","ЧТ","ШК","ШЛ","ШП","ШТ"];
const TRIPLE_CLUSTERS = ["СТР","СКР","СПР","ВСТ","ВСК","ВСП","СХВ"];
function validCV(c,v) {
  if (c === "Й") return false;
  if ("ЖШ".includes(c) && "ЫЯЮ".includes(v)) return false;
  if ("ЧЩ".includes(c) && "ЫЯЮ".includes(v)) return false;
  if (c === "Ц" && "ЯЮ".includes(v)) return false;
  if ("ГКХ".includes(c) && v === "Ы") return false;
  return true;
}
function getSyllables() {
  const cs = state.learnedLetters, vs = state.learnedVowels, types = state.syllableTypes;
  const pool = [];
  const add = text => pool.push(text);
  for (const type of types) {
    if (type === "vc") for (const v of vs) for (const c of cs) add(v+c);
    if (type === "cv" || type === "cvc") for (const c of cs) for (const v of vs) {
      if (!validCV(c,v)) continue;
      if (type === "cv") add(c+v);
      else for (const end of cs) add(c+v+end);
    }
    if (type === "ccv" || type === "cccv") {
      for (const cluster of (type === "ccv" ? CLUSTERS : TRIPLE_CLUSTERS)) {
        if (![...cluster].every(c=>cs.includes(c))) continue;
        for (const v of vs) if (validCV(cluster.slice(-1),v)) add(cluster+v);
      }
    }
  }
  return [...new Set(pool)];
}
function readingProblem() {
  if (!["syllables","chains"].includes(state.material)) return "";
  if (!state.learnedLetters.length) return "Выберите хотя бы одну согласную.";
  if (!state.learnedVowels.length) return "Выберите хотя бы одну гласную.";
  if (!state.syllableTypes.length) return "Выберите хотя бы один тип слогов.";
  if (!getSyllables().length) return "Из выбранных букв нет сочетаний этого типа. Добавьте буквы или измените тип слогов.";
  return "";
}

function makeTasks(n) {
  if (readingProblem()) return [];
  const out = [];
  const push = (arr, len) => {
    const sh = shuffle(arr);
    for (let i = 0; i < len; i++) out.push(sh[i % sh.length]);
  };

  if (state.material === "syllables") {
    const syl = getSyllables();
    push(syl, n);
  } else if (state.material === "chains") {
    const syl = getSyllables();
    const pool = syl;
    const arr = [];
    for (let i = 0; i < 60; i++) {
      const a = pool[rand(pool.length)];
      const b = pool[rand(pool.length)];
      const c = pool[rand(pool.length)];
      arr.push(a + "-" + b + "-" + c);
    }
    push(arr, n);
  } else if (state.material === "words") {
    const pool = shuffle(WORDS_SHORT).slice(0, Math.ceil(n / 2))
      .concat(shuffle(WORDS_LONG).slice(0, Math.ceil(n / 2)));
    const sh = shuffle(pool);
    for (let i = 0; i < n; i++) out.push(sh[i % sh.length]);
  } else {
    const sh = shuffle(PHRASES);
    for (let i = 0; i < n; i++) out.push(sh[i % sh.length]);
  }
  return out;
}

function zonesForTask(i, n, S) {
  // если заданий меньше чем кусочков — последнее задание раскрывает всё оставшееся
  if (n - 1 < S) {
    if (i === n - 1) {
      const res = [];
      for (let k = n - 1; k < S; k++) res.push(k);
      return res;
    }
    return [i];
  }
  const a = Math.floor(i * S / n);
  const b = Math.floor((i + 1) * S / n);
  const res = [];
  for (let k = a; k < b; k++) res.push(k);
  return res;
}

function computePauses(n) {
  const set = new Set();
  const a = Math.floor(n / 3) - 1;
  const b = Math.floor(2 * n / 3) - 1;
  if (a >= 0 && a < n - 1) set.add(a);
  if (b >= 0 && b < n - 1) set.add(b);
  return [...set].sort((x, y) => x - y);
}

/* какие загадки попадают в текущий фильтр */
function puzzlesInCategory() {
  const keys = Object.keys(PUZZLES);
  if (state.category === "all") return keys;
  return keys.filter(k => PUZZLES[k].category === state.category);
}

function pickPuzzle() {
  if (state.puzzle !== "random" && PUZZLES[state.puzzle]) return PUZZLES[state.puzzle];
  const pool = puzzlesInCategory();
  if (!pool.length) {
    const all = Object.keys(PUZZLES);
    return PUZZLES[all[rand(all.length)]];
  }
  return PUZZLES[pool[rand(pool.length)]];
}

function startRound(keepPuzzle) {
  if (readingProblem()) { showSettings(); return; }
  const p = keepPuzzle && G ? G.puzzle : pickPuzzle();
  ZONES = p.zones;
  resetQuestionTrackers();

  G = {
    puzzle: p,
    tasks: makeTasks(state.count),
    index: 0,
    completed: [],
    paused: false,
    finished: false,
    pauseAfter: computePauses(state.count),
    usedChanges: [],
    hintIdx: 0,
    guessIdx: 0
  };

  buildScene(p);
  hidePausePanel();
  hideOverlay();
  $("taskbar").classList.remove("hidden");
  updateProgress();
  renderTask();
  updateDarkness(false);
  updateUndoBtn();
  softClick();
}

function updateProgress() {
  const done = G.completed.length, total = G.tasks.length;
  $("progressText").textContent = done + " из " + total;
  $("pbarFill").style.width = (total ? (done / total * 100) : 0) + "%";
}

function updateUndoBtn() {
  $("btnUndo").disabled = G.completed.length === 0;
}

function renderTask() {
  const el = $("taskText");
  if (!G || G.index >= G.tasks.length) { el.textContent = "—"; return; }
  const t = G.tasks[G.index];
  el.textContent = t;
  el.className = (t.length > 10 ? "long" : t.length > 4 ? "mid" : "short");
}

function confirmTask() {
  if (!G || G.paused || G.finished) return;
  if (G.index >= G.tasks.length) return;

  const i = G.index;
  const zs = zonesForTask(i, G.tasks.length, ZONES.length);

  zs.forEach(z => revealZone(z, false));
  zs.forEach(z => lightCrystal(z, false));

  G.completed.push(i);
  G.index++;

  chime();
  updateProgress();
  updateUndoBtn();
  updateDarkness(false);

  if (G.index >= G.tasks.length) {
    setTimeout(finishRound, animDuration() * 0.7);
    return;
  }

  renderTask();

  if (state.pauses === "on" && G.pauseAfter.includes(i)) {
    setTimeout(() => startPause(), animDuration() * 0.75);
  }
}

function undoTask() {
  if (!G || !G.completed.length) return;
  const i = G.completed.pop();
  const zs = zonesForTask(i, G.tasks.length, ZONES.length);
  zs.forEach(z => hideZone(z));
  zs.forEach(z => unlightCrystal(z));
  G.index = i;
  G.finished = false;
  updateProgress();
  updateUndoBtn();
  updateDarkness(false);
  renderTask();
  softClick();
}

function finishRound() {
  G.finished = true;
  updateDarkness(true);
  hidePausePanel();
  $("taskbar").classList.add("hidden");
  $("progressText").textContent = G.tasks.length + " из " + G.tasks.length;
  $("pbarFill").style.width = "100%";
  chime();
  setTimeout(() => beep(1320, 0.7, "sine", 0.05), 300);
  showFinale();
}

/* ============================================================
   7. ПАУЗЫ
   ============================================================ */

function showPausePanel(html) {
  const pp = $("pausePanel");
  pp.innerHTML = html;
  pp.classList.add("show");
  $("taskbar").classList.add("hidden");
}

function hidePausePanel() {
  const pp = $("pausePanel");
  pp.classList.remove("show");
  pp.innerHTML = "";
  if (G && !G.finished) $("taskbar").classList.remove("hidden");
}

function startPause() {
  if (!G || G.finished) return;
  G.paused = true;
  switch (state.mode) {
    case "changes": pauseChanges(); break;
    case "path":    pausePath(); break;
    case "hint":    pauseHint(); break;
    case "guess":   pauseGuess(); break;
    default:        pauseObserve(); break;
  }
}

function endPause() {
  if (!G) return;
  G.paused = false;
  hidePausePanel();
  clearHighlights();
  renderTask();
}

function clearHighlights() {
  document.querySelectorAll(".pulse").forEach(e => e.classList.remove("pulse"));
}

function pauseObserve() {
  const q = pickObserve();
  const progress = G.completed.length + " из " + G.tasks.length + " кристаллов горят";
  showPausePanel(`
    <div class="pp-head"><div class="pp-title">Посмотрите на пещеру</div>
      <div class="pp-text" style="font-size:.78em;opacity:.65">${progress}</div>
    </div>
    <div class="pp-text">${q}</div>
    <div class="pp-actions">
      <button class="btn primary" id="ppNext">Дети ответили — продолжить</button>
    </div>`);
  $("ppNext").onclick = () => { softClick(); endPause(); };
}

function pauseChanges() {
  const indices = G.puzzle.changes.map((c, i) => i).filter(i => !G.usedChanges.includes(i));
  if (!indices.length) { pauseObserve(); return; }

  const level = state.changesLevel;
  const countToApply = level === "hard" ? 2 : 1;
  const shuffled = shuffle(indices);
  const chosen = [];
  for (const idx of shuffled) {
    if (chosen.length >= countToApply) break;
    chosen.push({ idx, ch: G.puzzle.changes[idx] });
  }
  chosen.forEach(c => G.usedChanges.push(c.idx));

  if (level === "easy") {
    const obvious = chosen.findIndex(c => c.ch.kind === "hide" || c.ch.kind === "show");
    if (obvious < 0) {
      const altIdx = G.puzzle.changes.findIndex((c, i) =>
        (c.kind === "hide" || c.kind === "show") && !G.usedChanges.includes(i));
      if (altIdx >= 0) {
        G.usedChanges.push(altIdx);
        chosen.length = 0;
        chosen.push({ idx: altIdx, ch: G.puzzle.changes[altIdx] });
      }
    }
  }

  const totalChanges = G.puzzle.changes.length;
  const remaining = G.usedChanges.length;

  showPausePanel(`
    <div class="pp-head"><div class="pp-title">Что изменилось?</div>
      <div class="pp-text" style="font-size:.78em;opacity:.65">Изменение ${remaining} из ${totalChanges}</div>
    </div>
    <div class="pp-text">Смотрите внимательно… Сейчас пещера на миг потемнеет.</div>
    <div class="pp-answer" id="ppAns"></div>
    <div class="pp-actions">
      <button class="btn" id="ppShow" disabled>Показать ответ</button>
      <button class="btn primary" id="ppNext" disabled>Продолжить</button>
    </div>`);

  const veilEl = $("veil");
  veilEl.style.transition = "opacity .7s ease";
  veilEl.setAttribute("opacity", "0.99");

  setTimeout(() => {
    chosen.forEach(c => applyChange(c.ch));
    veilEl.style.transition = "opacity .9s ease";
    veilEl.setAttribute("opacity", "0");
    setTimeout(() => {
      $("ppShow").disabled = false;
      $("ppNext").disabled = false;
    }, 700);
  }, 820);

  $("ppShow").onclick = () => {
    chosen.forEach(c => {
      if (c.ch.target) {
        const el = $(c.ch.target);
        if (el) el.classList.add("pulse");
      } else if (c.ch.kind === "crystal-off") {
        document.querySelectorAll(".crystal.dimmed").forEach(e => e.classList.add("pulse"));
      }
    });
    $("ppAns").textContent = "Ответ: " + chosen.map(c => c.ch.desc).join(" ");
    softClick();
  };

  $("ppNext").onclick = () => {
    chosen.forEach(c => revertChange(c.ch));
    clearHighlights();
    softClick();
    endPause();
  };
}

function applyChange(ch) {
  if (ch.kind === "crystal-off") {
    const lit = [...document.querySelectorAll(".crystal.lit")];
    if (!lit.length) return;
    const pick = lit[rand(lit.length)];
    pick.classList.remove("lit");
    pick.classList.add("dimmed");
    return;
  }
  const el = $(ch.target);
  if (!el) return;
  if (el.dataset.orig === undefined) {
    el.dataset.orig = el.getAttribute("transform") || "";
    el.dataset.origFill = el.getAttribute("fill") || "";
    el.dataset.origOpacity = el.getAttribute("opacity") || "";
  }
  if (ch.kind === "hide") el.setAttribute("opacity", "0");
  if (ch.kind === "show") el.setAttribute("opacity", "1");
  if (ch.kind === "move") el.setAttribute("transform", ch.transform);
  if (ch.kind === "color") el.setAttribute("fill", ch.color);
}

function revertChange(ch) {
  if (ch.kind === "crystal-off") {
    document.querySelectorAll(".crystal.dimmed").forEach(e => {
      e.classList.remove("dimmed");
      e.classList.add("lit");
    });
    return;
  }
  const el = $(ch.target);
  if (!el || el.dataset.orig === undefined) return;
  el.setAttribute("transform", el.dataset.orig);
  if (ch.kind === "color") el.setAttribute("fill", el.dataset.origFill);
  if (ch.kind === "hide" || ch.kind === "show") {
    el.setAttribute("opacity", ch.kind === "hide" ? "1" : "0");
  }
  el.classList.remove("pulse");
}

function pausePath() {
  const level = state.pathLevel;
  const count = level === "easy" ? 3 : level === "medium" ? 5 : 6;
  const litIdx = G.completed.flatMap(i => zonesForTask(i, G.tasks.length, ZONES.length));
  let pool = [...new Set(litIdx)];
  if (pool.length < count) {
    const all = ZONES.map((_, i) => i);
    pool = [...new Set(pool.concat(shuffle(all)))];
  }
  const seq = shuffle(pool).slice(0, Math.min(count, pool.length));

  showPausePanel(`
    <div class="pp-head"><div class="pp-title">Вспомни путь</div></div>
    <div class="pp-text" id="ppText">Смотрите, в каком порядке загораются кристаллы…</div>
    <div class="pp-answer" id="ppAns"></div>
    <div class="pp-actions">
      <button class="btn" id="ppShow" disabled>Показать ответ</button>
      <button class="btn" id="ppAgain" disabled>Показать ещё раз</button>
      <button class="btn primary" id="ppNext" disabled>Дети ответили — продолжить</button>
    </div>`);

  const onMs = state.speed === "slow" ? 900 : 620;
  const offMs = state.speed === "slow" ? 420 : 280;
  let timers = [];

  function clearTimeoutAll() {
    timers.forEach(t => clearTimeout(t));
    timers = [];
    document.querySelectorAll(".crystal.demo").forEach(c => c.classList.remove("demo"));
  }

  function demo() {
    clearTimeoutAll();
    seq.forEach((z, k) => {
      timers.push(setTimeout(() => {
        const c = $("crystal-" + z);
        if (!c) return;
        c.classList.add("demo");
        beep(500 + k * 90, 0.28, "sine", 0.05);
        timers.push(setTimeout(() => c.classList.remove("demo"), onMs));
      }, k * (onMs + offMs)));
    });
    timers.push(setTimeout(() => {
      $("ppText").textContent = "Теперь кристаллы погасли. В каком порядке они загорались?";
      $("ppShow").disabled = false;
      $("ppAgain").disabled = false;
      $("ppNext").disabled = false;
    }, seq.length * (onMs + offMs) + 200));
  }

  demo();

  $("ppAgain").onclick = () => { softClick(); clearHighlights(); demo(); };
  $("ppShow").onclick = () => {
    seq.forEach((z, k) => {
      const c = $("crystal-" + z);
      if (!c) return;
      const t = c.querySelector(".cr-num");
      if (t) t.textContent = (k + 1);
      c.classList.add("shownum");
    });
    $("ppAns").textContent = "Порядок: " + seq.map((_, k) => (k + 1)).join(" → ");
    softClick();
  };
  $("ppNext").onclick = () => {
    clearTimeoutAll();
    document.querySelectorAll(".crystal.shownum").forEach(c => c.classList.remove("shownum"));
    softClick();
    endPause();
  };
}

function pauseHint() {
  const hints = G.puzzle.hints;
  if (!hints || !hints.length) { pauseObserve(); return; }
  const h = hints[G.hintIdx % hints.length];
  G.hintIdx++;

  showPausePanel(`
    <div class="pp-head"><div class="pp-title">Найди подсказку</div>
      <div class="pp-text" style="font-size:.78em;opacity:.65">Подсказка ${G.hintIdx} из ${hints.length}</div>
    </div>
    <div class="pp-text">${h.q}</div>
    <div class="pp-answer" id="ppAns"></div>
    <div class="pp-actions">
      <button class="btn" id="ppShow">Показать ответ</button>
      <button class="btn primary" id="ppNext">Дети нашли — продолжить</button>
    </div>`);

  $("ppShow").onclick = () => {
    const el = $(h.target);
    if (el) el.classList.add("pulse");
    $("ppAns").textContent = "Подсказка подсвечена на экране.";
    softClick();
  };
  $("ppNext").onclick = () => { softClick(); endPause(); };
}

function pauseGuess() {
  const q = pickGuess();
  const revealed = G.completed.length;
  const total = G.tasks.length;
  showPausePanel(`
    <div class="pp-head"><div class="pp-title">Объясни догадку</div>
      <div class="pp-text" style="font-size:.78em;opacity:.65">Открыто ${revealed} из ${total}</div>
    </div>
    <div class="pp-text">${q}</div>
    <div class="pp-answer">Постарайтесь не просто назвать, а объяснить: «Я думаю, что это…, потому что…»</div>
    <div class="pp-actions">
      <button class="btn primary" id="ppNext">Продолжить</button>
    </div>`);
  $("ppNext").onclick = () => { softClick(); endPause(); };
}

/* ============================================================
   8. ФИНАЛ
   ============================================================ */

function showFinale() {
  const name = G.puzzle.name;
  showPausePanel(`
    <div class="pp-head"><div class="pp-title">Тайна раскрыта!</div></div>
    <div class="pp-text">В глубине пещеры — <b style="color:#ffd24a">${name.toLowerCase()}</b>.
      Свет всех кристаллов осветил пещеру полностью.</div>
    <div class="pp-answer">Обсудите: какие детали помогли вам догадаться? Что вы заметили раньше всего?</div>
    <div class="pp-actions">
      <button class="btn primary" id="fAgain">Повторить раунд</button>
      <button class="btn gold" id="fNew">Другая загадка</button>
      <button class="btn" id="fSettings">Настройки</button>
      <button class="btn" id="fMenu">В главное меню</button>
    </div>`);
  $("fAgain").onclick = () => { softClick(); startRound(true); };
  $("fNew").onclick = () => { softClick(); startRound(false); };
  $("fSettings").onclick = () => { showSettings(); };
  $("fMenu").onclick = () => { softClick(); showMenu(); };
}

/* ============================================================
   9. ЭКРАНЫ
   ============================================================ */

function showOverlay(html) {
  const ov = $("overlay");
  ov.innerHTML = html;
  ov.classList.remove("hidden");
}



function hideOverlay() { $("overlay").classList.add("hidden"); }

function showMenu() {
  G = null;
  hidePausePanel();
  $("taskbar").classList.add("hidden");
  $("progressText").textContent = "—";
  $("pbarFill").style.width = "0%";

  ZONES = PUZZLES.dragon.zones;
  buildScene(PUZZLES.dragon);
  const d = $("darkness"); if (d) d.setAttribute("opacity", "0.92");
  const sil = $("silhouette"); if (sil) sil.style.opacity = "0";
  const ex = $("extras"); if (ex) ex.style.opacity = "0";

  showOverlay(`
    <div class="card-panel">
      <h1>Кристальная пещера</h1>
      <p class="lead">В глубине пещеры спрятана тайна. Зажги кристаллы, исследуй пещеру и узнай, что скрывается во тьме.</p>
      <div class="menu-actions">
        <button class="btn primary big" id="mStart">Начать игру</button>
        <button class="btn big" id="mSettings">Настройки</button>
      </div>
      <p class="note">Ребёнок читает вслух — взрослый нажимает «Прочитано».<br>
      Каждое выполненное задание зажигает кристалл и освещает новый участок пещеры.</p>
    </div>`);

  $("mStart").onclick = () => { softClick(); hideOverlay(); startRound(false); };
  $("mSettings").onclick = () => { softClick(); showSettings(); };
}

/* список загадок для <select>, отфильтрованный по категории */
function puzzleOptionsHTML() {
  const cats = Object.keys(CATEGORIES);
  const out = ['<option value="random">🎲 Случайная</option>'];

  cats.forEach(catKey => {
    if (state.category !== "all" && state.category !== catKey) return;
    const cat = CATEGORIES[catKey];
    const items = Object.keys(PUZZLES).filter(k => PUZZLES[k].category === catKey);
    if (!items.length) return;
    out.push(`<optgroup label="${cat.icon} ${cat.name}">`);
    items.forEach(k => {
      out.push(`<option value="${k}">${PUZZLES[k].name}</option>`);
    });
    out.push("</optgroup>");
  });
  return out.join("");
}

function showSettings() {
  const options = pairs => pairs.map(([value,label]) => `<option value="${value}">${label}</option>`).join("");
  const field = (id,label,pairs) => `<div class="field" id="${id}Field"><label for="${id}">${label}</label><select id="${id}">${options(pairs)}</select></div>`;
  const chips = (id,label,values,chosen) => `<fieldset class="field field-wide" id="${id}Field"><legend>${label}</legend><div class="letter-grid" id="${id}">${values.map(([value,text])=>`<button type="button" class="letter-chip${chosen.includes(value)?" active":""}" data-letter="${value}" aria-pressed="${chosen.includes(value)}">${text}</button>`).join("")}</div><div class="letter-actions"><button type="button" id="${id}All">Все</button><button type="button" id="${id}None">Ничего</button></div></fieldset>`;
  showOverlay(`<div class="card-panel settings-panel" role="dialog" aria-modal="true" aria-labelledby="settingsTitle">
    <h2 id="settingsTitle">Настройки занятия</h2>
    <p class="settings-note">Буквы и типы применяются к слогам и цепочкам. Слова и фразы — из отдельного банка.</p>
    ${G?'<p class="settings-note">Материал, буквы, типы слогов, число заданий и загадка — для следующего раунда. Звук, скорость и дополнительные задания меняются сразу.</p>':''}
    <div class="settings-grid">
      ${field("setCategory","Категория загадок",[["all","Все категории"],...Object.entries(CATEGORIES).map(([k,v])=>[k,v.name])])}
      <div class="field"><label for="setPuzzle">Загадка</label><select id="setPuzzle">${puzzleOptionsHTML()}</select></div>
      ${field("setMaterial","Материал для чтения",[["syllables","Слоги"],["chains","Цепочки слогов"],["words","Слова"],["phrases","Короткие фразы"]])}
      ${field("setCount","Количество заданий",[[5,"5"],[8,"8"],[12,"12"]])}
      ${chips("letterGrid","Согласные",ALL_CONSONANTS.map(c=>[c,c]),state.learnedLetters)}
      ${chips("vowelGrid","Гласные",ALL_VOWELS.map(c=>[c,c]),state.learnedVowels)}
      ${chips("typeGrid","Типы слогов",Object.entries(SYLLABLE_TYPES),state.syllableTypes)}
      <div id="syllableHelp" class="settings-note field-wide">МА — открытые · АМ — обратные · МАК — закрытые · СТА / СТРА — стечения согласных. Это сочетания для чтения, не обязательно слова.</div>
      <section class="reading-preview field-wide" aria-labelledby="previewTitle"><div class="preview-heading"><strong id="previewTitle">Пример заданий</strong><button type="button" id="previewRefresh">Другие примеры</button></div><div id="readingPreview"></div><p id="readingError" role="status" aria-live="polite"></p><p id="previewCount" class="settings-note"></p></section>
      ${field("setPauses","Остановки для обсуждения",[["on","Включены"],["off","Выключены"]])}
      ${field("setMode","Задание на остановках",[["none","Рассмотреть пещеру"],["changes","Что изменилось?"],["path","Вспомни путь"],["hint","Найди подсказку"],["guess","Объясни догадку"]])}
      ${field("setChanges","Сложность «Что изменилось?»",[["easy","Одно заметное изменение"],["medium","Одно небольшое изменение"],["hard","Два изменения"]])}
      ${field("setPath","Сложность «Вспомни путь»",[["easy","2–3 кристалла"],["medium","4–5 кристаллов"],["hard","6 кристаллов"]])}
      ${field("setSpeed","Скорость анимации",[["normal","Обычная"],["slow","Медленная"]])}
      ${field("setSound","Звуковые эффекты",[["on","Включены"],["off","Выключены"]])}
    </div><p id="storageNote" class="settings-note" role="status"></p>
    <div class="settings-actions">
      ${G?'<button class="btn" id="sUndo">Отменить последнее</button><button class="btn" id="sSkip">Открыть участок</button><button class="btn" id="sFinish">Открыть финал</button>':''}
      <button class="btn primary" id="sRestart">${G?'Начать новый раунд':'Начать раунд'}</button>
      <button class="btn" id="sMenu">В главное меню</button><button class="btn gold" id="sClose">${G?'Вернуться к раунду':'Готово'}</button>
    </div></div>`);
  const fields = {setCategory:"category",setPuzzle:"puzzle",setMaterial:"material",setCount:"count",setPauses:"pauses",setMode:"mode",setChanges:"changesLevel",setPath:"pathLevel",setSpeed:"speed",setSound:"sound"};
  Object.entries(fields).forEach(([id,key])=>$(id).value=String(state[key]));
  const refresh = () => {
    const syllables = ["syllables","chains"].includes(state.material);
    ["letterGridField","vowelGridField","typeGridField","syllableHelp"].forEach(id=>$(id).hidden=!syllables);
    $("setModeField").hidden=state.pauses!=="on";
    $("setChangesField").hidden=state.pauses!=="on" || state.mode!=="changes";
    $("setPathField").hidden=state.pauses!=="on" || state.mode!=="path";
    const error=readingProblem();
    $("readingError").textContent=error;
    $("sRestart").disabled=!!error;
    $("previewRefresh").disabled=!!error;
    $("readingPreview").replaceChildren();
    if (!error) makeTasks(6).forEach(text=>{const span=document.createElement("span");span.textContent=text;$("readingPreview").appendChild(span);});
    $("previewCount").textContent=syllables&&!error?`Доступно сочетаний: ${getSyllables().length}. В цепочке — три слога.`:"";
    if(syllables && state.material!=="chains" && !error) $("previewCount").textContent=`Доступно сочетаний: ${getSyllables().length}.`;
    if($("sUndo")) $("sUndo").disabled=!G.completed.length || G.paused || G.finished;
    if($("sSkip")) $("sSkip").disabled=G.paused || G.finished;
    if($("sFinish")) $("sFinish").disabled=G.finished;
  };
  const persist = () => {const saved=saveSettings();$("storageNote").textContent=saved?"Настройки сохранены на этом устройстве.":"Браузер не разрешил сохранение. Настройки действуют в этой вкладке.";};
  Object.entries(fields).forEach(([id,key])=>$(id).onchange=()=>{
    state[key]=key==="count"?Number($(id).value):$(id).value;
    if(id==="setCategory") {
      if(state.puzzle!=="random" && state.category!=="all" && PUZZLES[state.puzzle]?.category!==state.category) state.puzzle="random";
      $("setPuzzle").innerHTML=puzzleOptionsHTML();$("setPuzzle").value=state.puzzle;
    }
    persist();refresh();
  });
  [["letterGrid","learnedLetters"],["vowelGrid","learnedVowels"],["typeGrid","syllableTypes"]].forEach(([id,key])=>{
    const buttons=[...$(id).querySelectorAll(".letter-chip")];
    const read=()=>{state[key]=buttons.filter(b=>b.classList.contains("active")).map(b=>b.dataset.letter);buttons.forEach(b=>b.setAttribute("aria-pressed",String(b.classList.contains("active"))));persist();refresh();};
    buttons.forEach(b=>b.onclick=()=>{b.classList.toggle("active");read();});
    $(id+"All").onclick=()=>{buttons.forEach(b=>b.classList.add("active"));read();};
    $(id+"None").onclick=()=>{buttons.forEach(b=>b.classList.remove("active"));read();};
  });
  $("previewRefresh").onclick=refresh;
  $("sRestart").onclick=()=>{if(!readingProblem())startRound(false);};
  $("sClose").onclick=()=>{if(G)hideOverlay();else showMenu();};
  $("sMenu").onclick=showMenu;
  if($("sUndo")) $("sUndo").onclick=()=>{undoTask();refresh();};
  if($("sSkip")) $("sSkip").onclick=()=>{hideOverlay();confirmTask();};
  if($("sFinish")) $("sFinish").onclick=()=>{
    if(!G || G.finished)return;
    for(let i=G.completed.length;i<G.tasks.length;i++){
      zonesForTask(i,G.tasks.length,ZONES.length).forEach(z=>{revealZone(z,true);lightCrystal(z,true);});G.completed.push(i);
    }
    G.index=G.tasks.length;updateProgress();updateUndoBtn();hideOverlay();finishRound();
  };
  refresh();persist();
}

function saveSettings() {
  try {localStorage.setItem("caveSettings",JSON.stringify(state));return true;}catch(e){return false;}
}
function loadSettings() {
  let raw;
  try {raw=localStorage.getItem("caveSettings");}catch(e){}
  if(!raw)try{raw=sessionStorage.getItem("caveSettings");}catch(e){}
  try {
    const s=JSON.parse(raw||"null");if(!s || typeof s!=="object")return;
    const allowed={material:["syllables","chains","words","phrases"],count:[5,8,12],category:["all",...Object.keys(CATEGORIES)],puzzle:["random",...Object.keys(PUZZLES)],mode:["none","changes","path","hint","guess"],speed:["normal","slow"],sound:["on","off"],pauses:["on","off"],changesLevel:["easy","medium","hard"],pathLevel:["easy","medium","hard"]};
    for(const [key,values] of Object.entries(allowed))if(values.includes(s[key]))state[key]=s[key];
    for(const [key,values] of [["learnedLetters",ALL_CONSONANTS],["learnedVowels",ALL_VOWELS],["syllableTypes",Object.keys(SYLLABLE_TYPES)]])if(Array.isArray(s[key]))state[key]=[...new Set(s[key].filter(v=>values.includes(v)))];
    if(state.puzzle!=="random" && state.category!=="all" && PUZZLES[state.puzzle].category!==state.category)state.puzzle="random";
    saveSettings();
  }catch(e){}
}

/* ============================================================
   10. UI
   ============================================================ */

function initUI() {
  $("btnConfirm").onclick = () => { softClick(); confirmTask(); };
  $("btnUndo").onclick = () => { undoTask(); };
  $("btnRepeat").onclick = () => {
    const el = $("taskText");
    el.classList.add("flash");
    beep(700, 0.12, "triangle", 0.04);
    setTimeout(() => el.classList.remove("flash"), 320);
  };
  $("btnSettings").onclick = () => { softClick(); showSettings(); };
  $("btnFullscreen").onclick = () => {
    softClick();
    if (!document.fullscreenElement) {
      const el = document.documentElement;
      (el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen || function () {}).call(el);
    } else {
      (document.exitFullscreen || document.webkitExitFullscreen || function () {}).call(document);
    }
  };
  document.addEventListener("fullscreenchange", () => {
    $("btnFullscreen").textContent = document.fullscreenElement ? "Выйти из режима" : "Во весь экран";
  });
  document.addEventListener("keydown", e => {
    if (!G || G.finished || !$("overlay").classList.contains("hidden") || /^(INPUT|SELECT|TEXTAREA|BUTTON)$/.test(e.target.tagName)) return;
    if (e.code === "Space" && !G.paused) { e.preventDefault(); confirmTask(); }
    if (e.code === "Backspace") { e.preventDefault(); undoTask(); }
  });
}

/* ============================================================
   11. СТАРТ
   ============================================================ */

function init() {
  loadSettings();
  initUI();
  showMenu();
}

init();