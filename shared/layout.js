/* ============================================================
   NeuroX — Layout
   Рисует шапку, футер и модалки, вставляет их в DOM.
   ============================================================ */

(function () {
  'use strict';

  /* Мозг-маскот с глазами. Используется в 3 местах: шапка, приветствие, справка. */
  const BRAIN_SVG = `
    <svg viewBox="0 0 24 24" fill="none" stroke="#FF6A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nx-brain">
      <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8"/>
      <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8"/>
      <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5"/>
      <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0"/>
      <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5"/>
      <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10"/>
      <g class="nx-eyes">
        <circle cx="9"  cy="11.5" r="2.15" fill="#fff" stroke="#FF6A00" stroke-width="0.85"/>
        <circle cx="15" cy="11.5" r="2.15" fill="#fff" stroke="#FF6A00" stroke-width="0.85"/>
        <circle class="nx-pupil" cx="9"  cy="11.5" r="0.7" fill="#FF6A00"/>
        <circle class="nx-pupil" cx="15" cy="11.5" r="0.7" fill="#FF6A00"/>
      </g>
    </svg>
  `;

  const HEADER_HTML = `
    <header>
      <div class="header-top">
        <div class="brand">
          <button class="logo" id="logoBtn" title="Показать приветствие" aria-label="Показать приветствие">
            ${BRAIN_SVG}
          </button>
          <div>
            <h1>NeuroX</h1>
            <div class="subtitle" id="headerSubtitle">Развитие когнитивных навыков</div>
          </div>
        </div>

        <div class="header-buttons">
          <button class="icon-btn" id="whatsNewBtn" title="Что нового?" aria-label="Что нового?">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2"/>
              <path d="M3 7l9 6 9-6"/>
            </svg>
          </button>
          <button class="icon-btn" id="helpBtn" title="Справка" aria-label="Справка">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9"/>
              <path d="M9.5 9a2.5 2.5 0 0 1 5 .5c0 1.5-2.5 2-2.5 3.5"/>
              <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none"/>
            </svg>
          </button>
          <button class="icon-btn" id="themeBtn" title="Сменить тему" aria-label="Сменить тему">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
            </svg>
          </button>
          <button class="icon-btn" id="settingsBtn" title="Настройки" aria-label="Настройки">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>
            </svg>
          </button>

          <button class="icon-btn" id="seasonBtn" title="Времена года" aria-label="Времена года" style="display:none;"></button>
        </div>
      </div>

      <div class="season-garland" id="seasonGarland" aria-hidden="true"></div>
    </header>
  `;

  const FOOTER_HTML = `<footer>© verner</footer>`;

  const MODALS_HTML = `
    <div class="modal" id="changelogModal" onclick="if(event.target===this) closeChangelog()">
      <div class="modal-card">
        <div class="modal-header">
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2"/>
              <path d="M3 7l9 6 9-6"/>
            </svg>
            Что нового?
          </h2>
          <button class="modal-close" onclick="closeChangelog()" aria-label="Закрыть">×</button>
        </div>
        <div class="modal-body" id="changelogBody">
          <div class="cl-empty">Загрузка…</div>
        </div>
      </div>
    </div>

    <div class="modal" id="welcomeModal" onclick="if(event.target===this) closeWelcome()">
      <div class="modal-card">
        <div class="modal-header">
          <h2 id="welcomeModalTitle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 11v2a5 5 0 0 0 10 0v-4a4 4 0 0 0-8 0"/>
              <path d="M17 4v3a2 2 0 0 0 2 2h1"/>
              <path d="M5 20l2-3M19 20l-2-3"/>
            </svg>
            Добро пожаловать!
          </h2>
          <button class="modal-close" onclick="closeWelcome()" aria-label="Закрыть">×</button>
        </div>
        <div class="modal-body">

          <div class="welcome-hero">
            <div class="welcome-brain">
              ${BRAIN_SVG}
            </div>
            <h3 id="welcomeTitle">Привет!</h3>
            <p>Это NeuroX — тренажёры для ума. Играй, тренируй голову.</p>
          </div>

          <div class="teacher-toggle reveal d1" id="teacherToggle" role="switch" aria-checked="false" tabindex="0">
            <div class="teacher-toggle__switch"></div>
            <div class="teacher-toggle__text">
              Я учитель
              <small>Показывать подборку для класса без личных уровней</small>
            </div>
          </div>

          <div class="name-field reveal d2">
            <label for="nameInput" id="nameLabel">Как тебя зовут?</label>
            <input type="text" id="nameInput" placeholder="Например, Аня" maxlength="20" autocomplete="off" />
          </div>

          <div id="studentOnly">
            <div class="chip-group reveal d3">
              <span class="chip-group__label">Сколько тебе лет?</span>
              <div class="chip-row" data-field="age">
                <button type="button" class="chip" data-value="4-5">4–5</button>
                <button type="button" class="chip" data-value="6-7">6–7</button>
                <button type="button" class="chip" data-value="8-9">8–9</button>
                <button type="button" class="chip" data-value="10+">10+</button>
              </div>
            </div>

            <div class="chip-group reveal d4">
              <span class="chip-group__label">Как ты читаешь?</span>
              <div class="chip-row" data-field="reading">
                <button type="button" class="chip" data-value="none">Пока не читаю</button>
                <button type="button" class="chip" data-value="slogi">По слогам</button>
                <button type="button" class="chip" data-value="slow">Словами, медленно</button>
                <button type="button" class="chip" data-value="fluent">Бегло</button>
              </div>
            </div>

            <div class="chip-group reveal d5">
              <span class="chip-group__label">Как ты считаешь?</span>
              <div class="chip-row" data-field="math">
                <button type="button" class="chip" data-value="none">Пока не считаю</button>
                <button type="button" class="chip" data-value="to-10">До 10</button>
                <button type="button" class="chip" data-value="to-100">До 100</button>
                <button type="button" class="chip" data-value="mult">Умножаю в уме</button>
              </div>
            </div>
          </div>

          <div id="teacherOnly" class="teacher-note hidden">
            <div class="teacher-note__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 10L12 5 2 10l10 5 10-5z"/>
                <path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5"/>
              </svg>
            </div>
            <div class="teacher-note__text">
              <b>Режим учителя.</b> Личные уровни скрыты. Все тренажёры показываются как каталог — выбирайте для класса без привязки к конкретному ребёнку.
            </div>
          </div>

          <div class="welcome-actions reveal d6">
            <button class="welcome-btn" id="welcomeGoBtn">Поехали</button>
          </div>

        </div>
      </div>
    </div>

    <div class="modal" id="helpModal" onclick="if(event.target===this) closeHelp()">
      <div class="modal-card">
        <div class="modal-header">
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9"/>
              <path d="M9.5 9a2.5 2.5 0 0 1 5 .5c0 1.5-2.5 2-2.5 3.5"/>
              <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none"/>
            </svg>
            Справка
          </h2>
          <button class="modal-close" onclick="closeHelp()" aria-label="Закрыть">×</button>
        </div>
        <div class="modal-body">
          <div class="help-hero">
            <div class="help-brain">
              ${BRAIN_SVG}
            </div>
            <h3>Привет! Чем помочь?</h3>
          </div>

          <div class="help-questions">
            <button type="button" class="help-question" data-help="start">
              <span class="help-question__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
                </svg>
              </span>
              <span class="help-question__text">С чего начать?</span>
              <span class="help-question__chevron">▾</span>
            </button>

            <button type="button" class="help-question" data-help="play">
              <span class="help-question__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="8" width="18" height="10" rx="4"/>
                  <path d="M7 12h3M8.5 10.5v3"/>
                  <circle cx="16" cy="12" r="1" fill="currentColor" stroke="none"/>
                  <circle cx="18" cy="14" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </span>
              <span class="help-question__text">Как играть?</span>
              <span class="help-question__chevron">▾</span>
            </button>

            <button type="button" class="help-question" data-help="levels">
              <span class="help-question__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 20V10M10 20V4M16 20V14M22 20H2"/>
                </svg>
              </span>
              <span class="help-question__text">Что такое уровни?</span>
              <span class="help-question__chevron">▾</span>
            </button>

            <button type="button" class="help-question" data-help="parents">
              <span class="help-question__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/>
                  <path d="M2 20c0-3 3-5 6-5s6 2 6 5"/><path d="M13 15c1-1 2-2 3-2 3 0 6 2 6 5"/>
                </svg>
              </span>
              <span class="help-question__text">Для родителей</span>
              <span class="help-question__chevron">▾</span>
            </button>

            <button type="button" class="help-question" data-help="new">
              <span class="help-question__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>
                </svg>
              </span>
              <span class="help-question__text">Что нового?</span>
              <span class="help-question__chevron">▾</span>
            </button>
          </div>

          <div id="helpAnswerContainer"></div>
        </div>
      </div>
    </div>

    <div class="modal" id="settingsModal" onclick="if(event.target===this) closeSettings()">
      <div class="modal-card">
        <div class="modal-header">
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>
            </svg>
            Настройки
          </h2>
          <button class="modal-close" onclick="closeSettings()" aria-label="Закрыть">×</button>
        </div>
        <div class="modal-body">

          <div class="settings-section">
            <h4>Оформление</h4>
            <div class="settings-row" id="themeRow">
              <div class="settings-row__label">
                Тёмная тема
                <small>Меньше света вечером</small>
              </div>
              <div class="teacher-toggle__switch" id="themeSwitch"></div>
            </div>
          </div>

          <div class="settings-section">
            <h4>Дополнительно</h4>
            <div class="settings-row" id="seasonsToggleRow">
              <div class="settings-row__label">
                Времена года
                <small>Кнопка смены сезона в шапке</small>
              </div>
              <div class="teacher-toggle__switch" id="seasonsSwitch"></div>
            </div>
          </div>

          <div class="settings-section">
            <h4>Профиль</h4>
            <p class="settings-hint">Имя, режим педагога и учебные уровни можно изменить без сброса результатов.</p>
            <button type="button" class="data-action-btn" id="profileEditBtn">👤 Изменить профиль</button>
          </div>

          <div class="settings-section">
            <h4>Данные</h4>
            <p class="settings-hint">
              Профиль, результаты и настройки сохраняются локально на этом устройстве. Для переноса на другое устройство сделайте резервную копию.
            </p>
            <div class="data-actions">
              <button type="button" class="data-action-btn" id="exportBackupBtn">↓ Сохранить копию</button>
              <button type="button" class="data-action-btn" id="importBackupBtn">↑ Восстановить</button>
              <input type="file" id="importBackupFile" accept=".json,application/json" style="display:none" aria-label="Файл резервной копии NeuroX">
            </div>
            <p id="storageStatus" class="storage-status" role="status" aria-live="polite"></p>
            <button class="danger-btn" id="resetBtn">Сбросить данные NeuroX</button>

            <div class="confirm-block" id="resetConfirm" style="display:none;">
              <p>Удалить данные NeuroX из этого браузера? Профиль, результаты и настройки исчезнут без возможности отмены. Сначала сохраните резервную копию.</p>
              <div class="confirm-actions">
                <button class="cancel-btn" id="resetCancelBtn">Отмена</button>
                <button class="confirm-btn" id="resetConfirmBtn">Да, стереть</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  function inject() {
    document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML + MODALS_HTML);
    document.body.classList.add('layout-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

  /* ============================================================
     Маскот-мозг: зрачки следят за курсором
     Работает на всех .nx-brain в документе (шапка, приветствие, справка).
     ============================================================ */
  (function initBrainEyes(){
    function move(x, y){
      document.querySelectorAll('.nx-brain').forEach(svg => {
        const r = svg.getBoundingClientRect();
        if (!r.width) return;

        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;

        let dx = (x - cx) / (r.width  / 2);
        let dy = (y - cy) / (r.height / 2);
        dx = Math.max(-1, Math.min(1, dx));
        dy = Math.max(-1, Math.min(1, dy));

        const MAX = 0.85;
        svg.querySelectorAll('.nx-pupil').forEach(p => {
          p.style.transform = `translate(${dx * MAX}px, ${dy * MAX}px)`;
        });
      });
    }

    document.addEventListener('pointermove', e => move(e.clientX, e.clientY));
    document.addEventListener('touchmove', e => {
      if (e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
  })();

})();