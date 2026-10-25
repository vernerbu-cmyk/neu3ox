/* ============================================================
   NeuroX — App
   Тема, профиль, справка, changelog, настройки, welcome.
   ============================================================ */

(function () {
  'use strict';

  const LS_SEEN_KEY     = 'neurox_changelog_lastSeen';
  const LS_WELCOME_KEY  = 'neurox_welcome_seen';
  const LS_PROFILE_KEY  = 'neurox_profile';
  const LS_THEME_KEY    = 'neurox_theme';
  const SS_SPLASH_KEY   = 'neurox_splash_shown';

  /* ---------- Базовый путь (к корню сайта) ---------- */

  function getBasePath() {
    const scripts = document.querySelectorAll('script[src*="app.js"]');
    if (!scripts.length) return './';
    const src = scripts[scripts.length - 1].getAttribute('src') || '';
    return src.replace(/shared\/app\.js.*$/, '') || './';
  }

  const BASE = getBasePath();

  /* ============================================================
     SPLASH
     ============================================================ */

  let splashWillShow = false;

  function initSplash() {
    const splash = document.getElementById('splash');
    if (!splash) return;

    if (sessionStorage.getItem(SS_SPLASH_KEY)) {
      splash.remove();
      return;
    }
    sessionStorage.setItem(SS_SPLASH_KEY, '1');
    splashWillShow = true;

    setTimeout(() => {
      splash.classList.add('hide');
      setTimeout(() => splash.remove(), 650);
    }, 1300);
  }

  /* ============================================================
     ТЕМА
     ============================================================ */

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    const sw = document.getElementById('themeSwitch');
    if (sw) {
      const row = sw.closest('.settings-row');
      if (row) row.classList.toggle('theme-switch-on', theme === 'dark');
    }
  }

  function getStoredTheme() { return localStorage.getItem(LS_THEME_KEY) || ''; }
  function saveTheme(theme) { localStorage.setItem(LS_THEME_KEY, theme); }

  function initTheme() {
    let theme = getStoredTheme();
    if (!theme) {
      const prefersDark = window.matchMedia &&
                          window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'dark' : 'light';
    }
    applyTheme(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
  }

  /* ============================================================
     ПРОФИЛЬ
     ============================================================ */

  function loadProfile() {
    try {
      const raw = localStorage.getItem(LS_PROFILE_KEY);
      if (raw) {
        const value = JSON.parse(raw);
        if (value && typeof value === 'object' && !Array.isArray(value)) return value;
      }
      const oldName = localStorage.getItem('neurox_user_name');
      return oldName ? { name: oldName } : {};
    } catch (_) { return {}; }
  }

  function saveProfile(profile) {
    try { localStorage.setItem(LS_PROFILE_KEY, JSON.stringify(profile)); return true; }
    catch (e) {
      alert('Не удалось сохранить профиль. Проверьте, разрешено ли хранение данных в браузере.');
      return false;
    }
  }

  // Старые поля name/age/reading/math сохраняются для совместимости.
  // Переход в режим учителя не удаляет учебные уровни ребёнка.
  function studentData(profile) {
    return profile.student || {
      name: profile.role === 'teacher' ? '' : (profile.name || ''),
      age: profile.age || '', reading: profile.reading || '', math: profile.math || ''
    };
  }

  function applyNameToUI() {
    const profile = loadProfile();
    const name = (profile.name || '').trim();
    const subtitle = document.getElementById('headerSubtitle');
    const welcomeTitle = document.getElementById('welcomeTitle');
    if (!subtitle) return;

    if (name) {
      subtitle.textContent = 'Привет, ' + name + '!';
      if (welcomeTitle) welcomeTitle.textContent = 'Привет, ' + name + '!';
    } else {
      subtitle.textContent = 'Развитие когнитивных навыков';
      if (welcomeTitle) welcomeTitle.textContent = 'Привет!';
    }
  }

  function openCategory(category) {
    location.href = BASE + category + '/index.html';
  }

  /* ============================================================
     НАСТРОЙКИ
     ============================================================ */

  function showSettings() {
    hideResetConfirm();
    if (typeof window.syncSeasonsSwitch === 'function') window.syncSeasonsSwitch();
    const m = document.getElementById('settingsModal');
    if (m) m.classList.add('open');
  }

  function closeSettings() {
    const m = document.getElementById('settingsModal');
    if (m) m.classList.remove('open');
    hideResetConfirm();
  }

  function showResetConfirm() {
    const a = document.getElementById('resetBtn');
    const b = document.getElementById('resetConfirm');
    if (a) a.style.display = 'none';
    if (b) b.style.display = '';
  }

  function hideResetConfirm() {
    const a = document.getElementById('resetBtn');
    const b = document.getElementById('resetConfirm');
    if (a) a.style.display = '';
    if (b) b.style.display = 'none';
  }

  function doReset() {
    try {
      if (!window.NeuroXStorage) throw new Error('Менеджер данных недоступен.');
      window.NeuroXStorage.resetData();
      location.reload();
    } catch (e) { showDataStatus(e.message, true); }
  }

  function showDataStatus(message, error) {
    const el = document.getElementById('storageStatus');
    if (el) {
      el.textContent = message;
      el.classList.toggle('error', !!error);
      el.setAttribute('role', error ? 'alert' : 'status');
    }
  }

  function exportBackup() {
    try {
      const count = window.NeuroXStorage.exportData();
      showDataStatus(`Создана резервная копия: ${count} записей. Сохраните файл в надёжном месте.`, false);
    } catch (e) { showDataStatus('Не удалось выгрузить данные: ' + e.message, true); }
  }

  async function restoreBackup(event) {
    const input = event.target;
    const file = input.files && input.files[0];
    input.value = '';
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showDataStatus('Размер файла превышает 5 МБ.', true); return;
    }
    try {
      const text = await file.text();
      const entries = window.NeuroXStorage.parseBackup(text);
      const overlaps = entries.filter(([key]) => localStorage.getItem(key) !== null).length;
      if (!confirm(`Восстановить ${entries.length} записей NeuroX? Совпадающие ключи (${overlaps}) будут перезаписаны. Остальные данные останутся на месте.`)) return;
      const count = window.NeuroXStorage.importData(text);
      showDataStatus(`Восстановлено ${count} записей. Перезагрузка страницы…`, false);
      location.reload();
    } catch (e) { showDataStatus('Ошибка восстановления: ' + e.message, true); }
  }

  /* ============================================================
     РЕЖИМ "УЧИТЕЛЬ"
     ============================================================ */

  let teacherMode = false;
  let draftNames = { teacher: '', student: '' };

  function setTeacherMode(on) {
    teacherMode = !!on;
    const toggle  = document.getElementById('teacherToggle');
    const student = document.getElementById('studentOnly');
    const teacher = document.getElementById('teacherOnly');
    const nameLbl = document.getElementById('nameLabel');
    const nameInp = document.getElementById('nameInput');
    if (!toggle) return;

    toggle.classList.toggle('checked', teacherMode);
    toggle.setAttribute('aria-checked', teacherMode ? 'true' : 'false');

    if (student) student.style.display = teacherMode ? 'none' : '';
    if (teacher) teacher.classList.toggle('hidden', !teacherMode);

    if (teacherMode) {
      nameLbl.textContent = 'Как вас зовут?';
      nameInp.placeholder = 'Например, Мария Ивановна';
    } else {
      nameLbl.textContent = 'Как тебя зовут?';
      nameInp.placeholder = 'Например, Аня';
    }
  }

  function toggleTeacher() {
    const input = document.getElementById('nameInput');
    if (input) draftNames[teacherMode ? 'teacher' : 'student'] = input.value;
    setTeacherMode(!teacherMode);
    if (input) input.value = draftNames[teacherMode ? 'teacher' : 'student'];
  }

  /* ============================================================
     ПРИВЕТСТВИЕ
     ============================================================ */

  function showWelcomePreview() { openWelcome(); }

  function openWelcome() {
    const profile = loadProfile();
    const student = studentData(profile);
    draftNames = {
      teacher: profile.teacherName || (profile.role === 'teacher' ? profile.name || '' : ''),
      student: student.name || ''
    };
    setTeacherMode(profile.role === 'teacher');
    const nameInput = document.getElementById('nameInput');
    if (nameInput) nameInput.value = draftNames[teacherMode ? 'teacher' : 'student'];
    setActiveChip('age',     student.age);
    setActiveChip('reading', student.reading);
    setActiveChip('math',    student.math);
    const m = document.getElementById('welcomeModal');
    if (m) m.classList.add('open');

    if (!profile.name && nameInput) {
      setTimeout(() => nameInput.focus(), 350);
    }
  }

  function closeWelcome() {
    const nameInput = document.getElementById('nameInput');
    const profile = loadProfile();
    const name = nameInput ? nameInput.value.trim().slice(0, 20) : '';
    const student = studentData(profile);
    profile.role = teacherMode ? 'teacher' : 'student';
    draftNames[profile.role] = name;
    profile.teacherName = draftNames.teacher.trim().slice(0, 20);
    profile.student = {
      name: draftNames.student.trim().slice(0, 20),
      age: getActiveChip('age') || student.age || '',
      reading: getActiveChip('reading') || student.reading || '',
      math: getActiveChip('math') || student.math || ''
    };
    profile.name = teacherMode ? profile.teacherName : profile.student.name;
    // Для старых интеграций сохраняем плоские поля уровня ученика.
    profile.age = profile.student.age;
    profile.reading = profile.student.reading;
    profile.math = profile.student.math;

    if (!saveProfile(profile)) return;
    applyNameToUI();
    renderRecommendations();
    const m = document.getElementById('welcomeModal');
    if (m) m.classList.remove('open');
    localStorage.setItem(LS_WELCOME_KEY, '1');
  }

  function setActiveChip(field, value) {
    const row = document.querySelector('.chip-row[data-field="' + field + '"]');
    if (!row) return;
    row.querySelectorAll('.chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.value === value);
    });
  }

  function getActiveChip(field) {
    const row = document.querySelector('.chip-row[data-field="' + field + '"]');
    if (!row) return '';
    const active = row.querySelector('.chip.active');
    return active ? active.dataset.value : '';
  }

  /* ============================================================
     ПОДБОР ПО ПРОФИЛЮ: рекомендации, но не автоматическая
     смена сложности в тренажёрах. Всегда можно выбрать любую игру.
     ============================================================ */
  function renderRecommendations() {
    const cards = document.querySelector('.container > .cards');
    if (!cards || !document.querySelector('.card[data-category]')) return;
    let host = document.getElementById('profileRecommendations');
    if (!host) {
      host = document.createElement('section');
      host.id = 'profileRecommendations';
      host.className = 'profile-recommendations';
      cards.after(host);
    }
    const profile = loadProfile();
    const student = studentData(profile);
    const teacher = profile.role === 'teacher';
    let picks = [];
    if (!teacher) {
      if (student.reading === 'none') {
        picks.push(['Найди букву', 'preschool/findletter.html', 'Узнавание букв']);
        picks.push(['Слоголаз', 'preschool/slogolaz.html', 'Первые шаги к слогам']);
      } else if (student.reading === 'slogi') {
        picks.push(['Слоги', 'reading/slogi/slogi.html', 'Закрепление слогового чтения']);
        picks.push(['Читалка', 'reading/chitaem/chitalka.html', 'Чтение с опорой на текст']);
      } else if (student.reading === 'slow') {
        picks.push(['Столбики', 'reading/stolbiky/stolby.html', 'Тренировка чтения слов']);
        picks.push(['Шульте', 'reading/shulte.html', 'Зрительное внимание']);
      } else if (student.reading === 'fluent') {
        picks.push(['Двойной фокус', 'reading/double_focus/double.html', 'Распределение внимания']);
        picks.push(['Лавина', 'reading/bystro_chitaem/lavina.html', 'Темп чтения']);
      }
      if (student.math === 'to-10') picks.push(['Домики', 'math/domiky.html', 'Состав числа']);
      if (student.math === 'to-100') picks.push(['Примеры', 'math/primery.html', 'Устный счёт']);
      if (student.math === 'mult') picks.push(['Таблица умножения', 'math/tablitsa.html', 'Автоматизация умножения']);
    }
    host.replaceChildren();
    const h = document.createElement('h2');
    h.textContent = teacher ? 'Каталог для педагога' : 'Попробуй в первую очередь';
    host.appendChild(h);
    const description = document.createElement('p');
    description.textContent = teacher
      ? 'В режиме педагога доступны все разделы. Выбирайте задания под конкретного ребёнка или группу.'
      : picks.length
        ? 'Подобрали несколько отправных точек по уровню из профиля. Это рекомендации, а не ограничение доступа.'
        : 'Укажите уровень чтения или счёта в профиле, чтобы увидеть подходящие упражнения.';
    host.appendChild(description);
    if (picks.length) {
      const links = document.createElement('div');
      links.className = 'profile-recommendations__links';
      picks.forEach(([title, path, description]) => {
        const a = document.createElement('a');
        a.href = BASE + path;
        const strong = document.createElement('strong');
        strong.textContent = title;
        const small = document.createElement('small');
        small.textContent = description;
        a.append(strong, small);
        links.appendChild(a);
      });
      host.appendChild(links);
    }
    const edit = document.createElement('button');
    edit.type = 'button';
    edit.className = 'profile-recommendations__edit';
    edit.textContent = 'Изменить профиль';
    edit.addEventListener('click', openWelcome);
    host.appendChild(edit);
  }

  /* ============================================================
     СПРАВКА
     ============================================================ */

  const SVG_CHANGELOG_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';

  const HELP_ANSWERS = {
    start: `
      <p>Загляни в раздел <b>«Другое»</b> — там самые игровые тренажёры, с них проще всего начать.</p>
      <p>Дальше выбирай по настроению: хочешь читать — иди в «Скорочтение», хочешь считать — в «Скоросчёт». Захочешь чего-то попроще — в «Дошколятам».</p>
    `,
    play: `
      <p>Правила у каждого тренажёра свои, но принцип один: <b>читаешь задание, отвечаешь, смотришь результат.</b></p>
      <p>Не бойся ошибаться. Ошибка — это нормально, на то и тренировка. Если что-то непонятно, всегда можно вернуться в меню и попробовать другой тренажёр.</p>
      <p>Совет: занимайся <b>по 5–10 минут</b>. Лучше каждый день по чуть-чуть, чем раз в неделю час.</p>
    `,
    levels: `
      <p>Когда ты заполняешь профиль, ты рассказываешь о себе: сколько тебе лет, как читаешь, как считаешь. Это и есть <b>уровень</b>.</p>
      <p>Уровни нужны, чтобы подбирать тебе тренажёры, которые подходят именно сейчас. Слишком лёгкие — скучно, слишком сложные — обидно. А в самый раз — интересно.</p>
      <p>Пока подбор работает вручную — ты сам выбираешь, что тебе интересно. Скоро научусь подсказывать автоматически, по твоим результатам.</p>
    `,
    parents: `
      <p><b>NeuroX</b> — набор тренажёров для развития внимания, памяти, скорости чтения и устного счёта. Подходит детям примерно от 4 до 11 лет.</p>
      <p><b>Принципы:</b></p>
      <ul>
        <li>Никаких оценок и давления. Только игра и прогресс.</li>
        <li>Достаточно 5–10 минут в день.</li>
        <li>Это дополнение к занятиям, а не замена.</li>
      </ul>
      <p><b>Про данные:</b> имя, возраст и результаты хранятся только в браузере этого устройства. Никуда не отправляются, никому не показываются, аккаунтов не требуется.</p>
      <p><b>Для учителей</b> есть отдельный режим — включается в профиле. Приложение показывает все тренажёры как каталог, без привязки к конкретному ребёнку.</p>
    `,
    new: `
      <p>Открывает список последних обновлений — что добавилось, что изменилось, что исправили.</p>
      <p>Если в кнопке горит оранжевая точка — со времени последнего визита что-то поменялось. Стоит заглянуть.</p>
      <button type="button" class="help-link-btn" onclick="openChangelogFromHelp()">${SVG_CHANGELOG_ICON}Открыть список обновлений</button>
    `
  };

  let currentHelpKey = null;

  function showHelpModal() {
    currentHelpKey = null;
    const container = document.getElementById('helpAnswerContainer');
    if (container) container.innerHTML = '';
    document.querySelectorAll('#helpModal .help-question').forEach(q => q.classList.remove('active'));
    const m = document.getElementById('helpModal');
    if (m) m.classList.add('open');
  }

  function closeHelp() {
    const m = document.getElementById('helpModal');
    if (m) m.classList.remove('open');
  }

  function toggleHelpAnswer(key) {
    const container = document.getElementById('helpAnswerContainer');
    const buttons = document.querySelectorAll('#helpModal .help-question');

    if (currentHelpKey === key) {
      currentHelpKey = null;
      container.innerHTML = '';
      buttons.forEach(q => q.classList.remove('active'));
      return;
    }

    currentHelpKey = key;
    buttons.forEach(q => q.classList.toggle('active', q.dataset.help === key));
    container.innerHTML = '<div class="help-answer">' + HELP_ANSWERS[key] + '</div>';
  }

  function openChangelogFromHelp() {
    closeHelp();
    setTimeout(showChangelog, 200);
  }

  /* ============================================================
     CHANGELOG
     ============================================================ */

  function loadChangelogItems() {
    const data = window.NEUROX_CHANGELOG;
    if (!Array.isArray(data)) {
      console.warn('[changelog] Не найден window.NEUROX_CHANGELOG. Подключён ли shared/changelog.js до app.js?');
      return [];
    }
    return data
      .filter(it => it && typeof it === 'object' && it.text)
      .map(it => ({
        date: String(it.date || ''),
        type: String(it.type || 'update').toLowerCase(),
        text: String(it.text || '')
      }));
  }

  function showChangelog() {
    const modal = document.getElementById('changelogModal');
    const body  = document.getElementById('changelogBody');
    if (!modal || !body) return;
    modal.classList.add('open');
    body.innerHTML = '<div class="cl-empty">Загрузка…</div>';

    let items;
    try {
      items = loadChangelogItems();
    } catch (e) {
      console.error('[changelog] ошибка загрузки:', e);
      body.innerHTML = '<div class="cl-error">Не удалось загрузить.<br>' + e.message + '</div>';
      return;
    }

    renderChangelog(items);

    if (items.length) {
      localStorage.setItem(LS_SEEN_KEY, String(items.length));
      const btn = document.getElementById('whatsNewBtn');
      if (btn) btn.classList.remove('has-new');
    }
  }

  function renderChangelog(items) {
    const body = document.getElementById('changelogBody');
    if (!items.length) {
      body.innerHTML = '<div class="cl-empty">Пока обновлений нет.</div>';
      return;
    }

    const labels = { new: 'Новое', fix: 'Фикс', update: 'Изменено', remove: 'Удалено' };

    body.innerHTML = items.map(it => {
      const type = labels[it.type] ? it.type : 'update';
      return `
        <div class="cl-item type-${type}">
          <span class="cl-badge">${labels[type]}</span>
          <div class="cl-content">
            <div class="cl-text">${escapeHtml(it.text)}</div>
            ${it.date ? `<div class="cl-date">${formatDate(it.date)}</div>` : ''}
          </div>
        </div>`;
    }).join('');
  }

  function closeChangelog() {
    const m = document.getElementById('changelogModal');
    if (m) m.classList.remove('open');
  }

  /* ============================================================
     ХЕЛПЕРЫ
     ============================================================ */

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function formatDate(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  /* ============================================================
     НАВЕШИВАНИЕ ОБРАБОТЧИКОВ
     ============================================================ */

  function setupChips() {
    document.querySelectorAll('#welcomeModal .chip-row').forEach(row => {
      row.addEventListener('click', e => {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        row.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  }

  function bindUI() {
    const logoBtn = document.getElementById('logoBtn');
    if (logoBtn) setupLogoLongPress(logoBtn);

    const whatsNewBtn = document.getElementById('whatsNewBtn');
    if (whatsNewBtn) whatsNewBtn.addEventListener('click', showChangelog);

    const helpBtn = document.getElementById('helpBtn');
    if (helpBtn) helpBtn.addEventListener('click', showHelpModal);

    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) settingsBtn.addEventListener('click', showSettings);

    const welcomeGoBtn = document.getElementById('welcomeGoBtn');
    if (welcomeGoBtn) welcomeGoBtn.addEventListener('click', closeWelcome);

    const teacherToggle = document.getElementById('teacherToggle');
    if (teacherToggle) {
      teacherToggle.addEventListener('click', toggleTeacher);
      teacherToggle.addEventListener('keydown', e => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          toggleTeacher();
        }
      });
    }

    const nameInput = document.getElementById('nameInput');
    if (nameInput) {
      nameInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') closeWelcome();
      });
    }

    document.querySelectorAll('#helpModal .help-question').forEach(q => {
      q.addEventListener('click', () => toggleHelpAnswer(q.dataset.help));
    });

    const themeRow = document.getElementById('themeRow');
    if (themeRow) themeRow.addEventListener('click', toggleTheme);

    const seasonsToggleRow = document.getElementById('seasonsToggleRow');
    if (seasonsToggleRow && typeof window.toggleSeasonsFeature === 'function') {
      seasonsToggleRow.addEventListener('click', window.toggleSeasonsFeature);
    }

    const profileEditBtn = document.getElementById('profileEditBtn');
    if (profileEditBtn) profileEditBtn.addEventListener('click', () => { closeSettings(); openWelcome(); });

    const exportBtn = document.getElementById('exportBackupBtn');
    if (exportBtn) exportBtn.addEventListener('click', exportBackup);

    const importBtn = document.getElementById('importBackupBtn');
    const importInput = document.getElementById('importBackupFile');
    if (importBtn && importInput) importBtn.addEventListener('click', () => importInput.click());
    if (importInput) importInput.addEventListener('change', restoreBackup);

    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) resetBtn.addEventListener('click', showResetConfirm);

    const resetCancelBtn = document.getElementById('resetCancelBtn');
    if (resetCancelBtn) resetCancelBtn.addEventListener('click', hideResetConfirm);

    const resetConfirmBtn = document.getElementById('resetConfirmBtn');
    if (resetConfirmBtn) resetConfirmBtn.addEventListener('click', doReset);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeChangelog();
        const w = document.getElementById('welcomeModal');
        if (w) w.classList.remove('open');
        closeHelp();
        closeSettings();
      }
    });
  }

    /* ============================================================
     Секрет: долгое нажатие на логотип → доска
     ============================================================ */

  const LOGO_HOLD_MS = 1500;
  let logoHoldTimer = null;
  let logoLongPressed = false;

  function openBoard() {
    location.href = BASE + 'board/index.html';
  }

  function setupLogoLongPress(btn) {
    const start = () => {
      logoLongPressed = false;
      btn.classList.add('logo--holding');
      clearTimeout(logoHoldTimer);
      logoHoldTimer = setTimeout(() => {
        logoLongPressed = true;
        btn.classList.remove('logo--holding');
        openBoard();
      }, LOGO_HOLD_MS);
    };

    const cancel = () => {
      clearTimeout(logoHoldTimer);
      btn.classList.remove('logo--holding');
    };

    btn.addEventListener('pointerdown', start);
    btn.addEventListener('pointerup', cancel);
    btn.addEventListener('pointerleave', cancel);
    btn.addEventListener('pointercancel', cancel);
    btn.addEventListener('contextmenu', e => e.preventDefault());

    btn.addEventListener('click', e => {
      e.preventDefault();
      if (logoLongPressed) {
        logoLongPressed = false;
        return;
      }
      showWelcomePreview();
    });
  }

  /* ============================================================
     СТАРТ
     ============================================================ */

  // Экспортируем наружу то, что нужно другим модулям
  window.NEUROX_BASE = BASE;
  window.openCategory = openCategory;
  window.showWelcomePreview = showWelcomePreview;
  window.showChangelog = showChangelog;
  window.closeChangelog = closeChangelog;
  window.showHelpModal = showHelpModal;
  window.closeHelp = closeHelp;
  window.toggleHelpAnswer = toggleHelpAnswer;
  window.openChangelogFromHelp = openChangelogFromHelp;
  window.showSettings = showSettings;
  window.closeSettings = closeSettings;
  window.showResetConfirm = showResetConfirm;
  window.hideResetConfirm = hideResetConfirm;
  window.doReset = doReset;
  window.toggleTheme = toggleTheme;
  window.closeWelcome = closeWelcome;

  initTheme();
  initSplash();

  (function checkForUpdates() {
    try {
      const items = loadChangelogItems();
      if (!items.length) return;
      const seen = localStorage.getItem(LS_SEEN_KEY);
      const btn  = document.getElementById('whatsNewBtn');
      if (btn && String(items.length) !== seen) {
        btn.classList.add('has-new');
      }
    } catch (e) {
      console.warn('[changelog] не удалось прочитать список:', e);
    }
  })();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  function onReady() {
    setupChips();
    bindUI();
    applyNameToUI();
    renderRecommendations();
    if (location.hash === '#profile') {
      openWelcome();
      history.replaceState(null, '', location.pathname + location.search);
      return;
    }

    if (!localStorage.getItem(LS_WELCOME_KEY)) {
      const delay = splashWillShow ? 1600 : 400;
      setTimeout(() => openWelcome(), delay);
    }
  }

  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', e => {
      if (!getStoredTheme()) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
})();