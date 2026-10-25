/* ============================================================
   NeuroX — Времена года 🌸☀️🍂❄️
   ============================================================ */

(function () {
  'use strict';

  const LS_SEASON_KEY          = 'neurox_season';
  const LS_SEASONS_ENABLED_KEY = 'neurox_seasons_enabled';

  const SEASON_ORDER = ['', 'autumn', 'winter', 'spring', 'summer'];

  const SEASON_ICONS = {
    off: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    winter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/><path d="M12 5l-2 -2M12 5l2 -2M12 19l-2 2M12 19l2 2"/><path d="M5 12l-2 -2M5 12l-2 2M19 12l2 -2M19 12l2 2"/></svg>',
    spring: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2.5"/><path d="M12 9.5c0-3 1-4.5 3-4.5s3 1.5 3 3.5"/><path d="M12 9.5c0-3-1-4.5-3-4.5S6 6.5 6 8.5"/><path d="M12 14.5c0 3 1 4.5 3 4.5s3-1.5 3-3.5"/><path d="M12 14.5c0 3-1 4.5-3 4.5S6 17.5 6 15.5"/></svg>',
    summer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1l2.1-2.1M17 7l2.1-2.1"/></svg>',
    autumn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>'
  };

  const SEASON_TITLES = {
    '': 'Времена года (клик — переключить)',
    winter: 'Зима ❄️ — клик, чтобы сменить',
    spring: 'Весна 🌸 — клик, чтобы сменить',
    summer: 'Лето ☀️ — клик, чтобы сменить',
    autumn: 'Осень 🍂 — клик, чтобы сменить'
  };

  /* ============================================================
     ЧАСТИЦЫ
     ============================================================ */

  function seasonBuildParticles(season) {
    const el = document.getElementById('seasonFx');
    if (!el) return;

    if (!season) { el.innerHTML = ''; return; }

    const isMobile = window.innerWidth < 700;
    const counts = {
      winter: isMobile ? 28 : 48,
      spring: isMobile ? 20 : 36,
      summer: isMobile ? 10 : 18,
      autumn: isMobile ? 18 : 32
    };
    const count = counts[season] || 30;

    const sizes = {
      winter: [3, 9],
      spring: [5, 11],
      summer: [12, 20],
      autumn: [6, 13]
    };
    const [minS, maxS] = sizes[season];

    let html = '';
    for (let i = 0; i < count; i++) {
      const left    = (Math.random() * 100).toFixed(2);
      const delay   = -(Math.random() * 12).toFixed(2);
      const dur     = (8 + Math.random() * 10).toFixed(2);
      const size    = (minS + Math.random() * (maxS - minS)).toFixed(2);
      const drift   = ((Math.random() - 0.5) * 120).toFixed(1);
      const spin    = ((Math.random() - 0.5) * 720).toFixed(0);
      const opacity = (0.55 + Math.random() * 0.45).toFixed(2);

      html += `<span class="season-particle p-${season}" style="
        left:${left}%;
        width:${size}px;height:${size}px;
        opacity:${opacity};
        animation-duration:${dur}s;
        animation-delay:${delay}s;
        --drift:${drift}px;
        --spin:${spin}deg;
      "></span>`;
    }
    el.innerHTML = html;
  }

  /* ============================================================
     ГИРЛЯНДЫ / ВЕТКИ
     ============================================================ */

  function seasonBuildGarland() {
    const el = document.getElementById('seasonGarland');
    if (!el) return;

    const width = el.clientWidth || window.innerWidth;
    const height = 56;
    const wireTop = 8;
    const wireSag = 22;
    const colors = ['#FF3B30', '#FF9500', '#FFD60A', '#34C759', '#0A84FF', '#BF5AF2'];

    const curveY = t => wireTop + Math.sin(t * Math.PI) * wireSag;

    const N = 100;
    let pathD = `M 0,${curveY(0).toFixed(2)}`;
    for (let i = 1; i <= N; i++) {
      const t = i / N;
      pathD += ` L ${(t * width).toFixed(2)},${curveY(t).toFixed(2)}`;
    }

    let svg = `<svg width="100%" height="${height}" style="display:block;overflow:visible">`;
    svg += `<path d="${pathD}" stroke="rgba(15,50,25,.85)" stroke-width="2" fill="none" stroke-linecap="round"/>`;

    const bulbCount = Math.max(10, Math.floor(width / 60));
    for (let i = 1; i < bulbCount; i++) {
      const t     = i / bulbCount;
      const x     = t * width;
      const y     = curveY(t);
      const c     = colors[i % colors.length];
      const delay = ((i * 0.17) % 2.4).toFixed(2);

      svg += `<line x1="${x.toFixed(2)}" y1="${y.toFixed(2)}" x2="${x.toFixed(2)}" y2="${(y + 9).toFixed(2)}" stroke="rgba(15,50,25,.7)" stroke-width="1.6"/>`;
      svg += `<circle class="season-bulb-glow" cx="${x.toFixed(2)}" cy="${(y + 13).toFixed(2)}" r="11" fill="${c}" style="animation-delay:${delay}s"/>`;
      svg += `<circle class="season-bulb"      cx="${x.toFixed(2)}" cy="${(y + 13).toFixed(2)}" r="5.5" fill="${c}" style="animation-delay:${delay}s"/>`;
    }

    svg += '</svg>';
    el.innerHTML = svg;
  }

  function seasonBuildSpringGarland() {
    const el = document.getElementById('seasonGarland');
    if (!el) return;

    const width   = el.clientWidth || window.innerWidth;
    const height  = 70;
    const wireTop = 6;
    const wireSag = 14;

    const curveY = t => wireTop + Math.sin(t * Math.PI) * wireSag;

    const N = 100;
    let pathD = `M 0,${curveY(0).toFixed(2)}`;
    for (let i = 1; i <= N; i++) {
      const t = i / N;
      pathD += ` L ${(t * width).toFixed(2)},${curveY(t).toFixed(2)}`;
    }

    const leafCount   = Math.max(8, Math.floor(width / 45));
    const flowerCount = Math.max(3, Math.floor(width / 150));

    const LEAF_START   = 0.2;
    const LEAF_STAGGER = 0.22;
    const FLOWER_START = LEAF_START + leafCount * LEAF_STAGGER + 0.5;

    const leafGreens  = ['#6BBF59', '#5FA84C', '#7DCC6B', '#4F9E40', '#8BD677'];
    const petalColors = ['#FFB8D9', '#FFD1E8', '#F5E1FF', '#FFFFFF', '#FFC0CB'];

    let svg = `<svg width="100%" height="${height}" style="display:block;overflow:visible">`;

    svg += `<path d="${pathD}" stroke="#7A4A2A" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    svg += `<path d="${pathD}" stroke="rgba(255,255,255,0.16)" stroke-width="0.9" fill="none" stroke-linecap="round"/>`;

    for (let i = 1; i <= 4; i++) {
      const t   = i / 5;
      const x   = t * width;
      const y   = curveY(t);
      const dir = i % 2 === 0 ? 1 : -1;
      const len = 8 + Math.random() * 6;
      const ty  = y + dir * len;
      svg += `<path d="M ${x.toFixed(2)},${y.toFixed(2)} Q ${(x + 3).toFixed(2)},${((y + ty) / 2).toFixed(2)} ${x.toFixed(2)},${ty.toFixed(2)}" stroke="#7A4A2A" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
    }

    for (let i = 0; i < leafCount; i++) {
      const t = (i + 0.5) / leafCount;
      const x = t * width;
      const y = curveY(t);

      const up        = i % 2 === 0;
      const angleBase = up ? -60 : 60;
      const angle     = angleBase + (Math.random() - 0.5) * 40;

      const color = leafGreens[i % leafGreens.length];
      const delay = (LEAF_START + i * LEAF_STAGGER).toFixed(2);

      svg += `
        <g transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${angle.toFixed(1)})">
          <ellipse class="season-spring-leaf" cx="6.5" cy="0" rx="6.5" ry="3.2"
                   fill="${color}" style="animation-delay:${delay}s"/>
          <line class="season-spring-leaf" x1="2" y1="0" x2="11" y2="0"
                stroke="rgba(0,0,0,0.18)" stroke-width="0.7"
                style="animation-delay:${delay}s"/>
        </g>`;
    }

    for (let i = 0; i < flowerCount; i++) {
      const t = (i + 0.9) / (flowerCount + 0.3);
      const x = t * width;
      const y = curveY(t);

      const up = i % 2 === 0;
      const fx = x;
      const fy = y + (up ? -10 : 10);

      const petalColor = petalColors[i % petalColors.length];
      const delay = (FLOWER_START + i * 0.4).toFixed(2);

      svg += `
        <g transform="translate(${fx.toFixed(2)} ${fy.toFixed(2)})">
          <g class="season-spring-flower" style="animation-delay:${delay}s">
            <circle cx="0"    cy="-3.4" r="2.2" fill="${petalColor}"/>
            <circle cx="3.2"  cy="-1"   r="2.2" fill="${petalColor}"/>
            <circle cx="2"    cy="2.9"  r="2.2" fill="${petalColor}"/>
            <circle cx="-2"   cy="2.9"  r="2.2" fill="${petalColor}"/>
            <circle cx="-3.2" cy="-1"   r="2.2" fill="${petalColor}"/>
            <circle cx="0"    cy="0"    r="1.7" fill="#FFD60A"/>
          </g>
        </g>`;
    }

    svg += '</svg>';
    el.innerHTML = svg;
  }

  function seasonBuildSummerGarland() {
    const el = document.getElementById('seasonGarland');
    if (!el) return;

    const width   = el.clientWidth || window.innerWidth;
    const height  = 70;
    const wireTop = 8;
    const wireSag = 14;

    const curveY = t => wireTop + Math.sin(t * Math.PI) * wireSag;

    const N = 100;
    let pathD = `M 0,${curveY(0).toFixed(2)}`;
    for (let i = 1; i <= N; i++) {
      const t = i / N;
      pathD += ` L ${(t * width).toFixed(2)},${curveY(t).toFixed(2)}`;
    }

    const headCount = Math.max(6, Math.floor(width / 90));
    const R = 9;

    let svg = `<svg width="100%" height="${height}" style="display:block;overflow:visible">`;
    svg += `<path d="${pathD}" stroke="rgba(90,60,20,.55)" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;

    for (let i = 1; i <= headCount; i++) {
      const t = i / (headCount + 1);
      const x = t * width;
      const y = curveY(t);

      const isYellow = i % 2 === 0;
      const delay = (i * 0.3).toFixed(2);

      const headY = y + 12;

      svg += `<line x1="${x.toFixed(2)}" y1="${y.toFixed(2)}" x2="${x.toFixed(2)}" y2="${headY.toFixed(2)}" stroke="rgba(90,60,20,.45)" stroke-width="0.9"/>`;

      svg += `<g transform="translate(${x.toFixed(2)} ${headY.toFixed(2)})">`;
      svg += `<g class="season-summer-flower" style="animation-delay:${delay}s">`;

      if (isYellow) {
        const petals = 20;
        for (let p = 0; p < petals; p++) {
          const angle = (p / petals) * 360;
          svg += `<ellipse cx="0" cy="${(-R * 0.7).toFixed(2)}" rx="1.6" ry="${(R * 0.7).toFixed(2)}" fill="#FFD60A" transform="rotate(${angle})"/>`;
        }
        svg += `<circle cx="0" cy="0" r="${(R * 0.45).toFixed(2)}" fill="#FFB300"/>`;
        svg += `<circle cx="0" cy="0" r="${(R * 0.25).toFixed(2)}" fill="#FF9500"/>`;
      } else {
        const filaments = 18;
        for (let p = 0; p < filaments; p++) {
          const angle = (p / filaments) * 360;
          const rad = angle * Math.PI / 180;
          const ex = Math.cos(rad) * R;
          const ey = Math.sin(rad) * R;
          svg += `<line x1="0" y1="0" x2="${ex.toFixed(2)}" y2="${ey.toFixed(2)}" stroke="rgba(190,205,225,.8)" stroke-width="0.55"/>`;
          svg += `<circle cx="${ex.toFixed(2)}" cy="${ey.toFixed(2)}" r="1.15" fill="#FFFFFF"/>`;
        }
        svg += `<circle cx="0" cy="0" r="${(R * 0.32).toFixed(2)}" fill="#E8EEF9"/>`;
      }

      svg += `</g></g>`;
    }

    svg += '</svg>';
    el.innerHTML = svg;
  }

  function seasonBuildAutumnGarland() {
    const el = document.getElementById('seasonGarland');
    if (!el) return;

    const width   = el.clientWidth || window.innerWidth;
    const height  = 70;
    const wireTop = 8;
    const wireSag = 16;

    const curveY = t => wireTop + Math.sin(t * Math.PI) * wireSag;

    const N = 100;
    let pathD = `M 0,${curveY(0).toFixed(2)}`;
    for (let i = 1; i <= N; i++) {
      const t = i / N;
      pathD += ` L ${(t * width).toFixed(2)},${curveY(t).toFixed(2)}`;
    }

    const leafCount  = Math.max(9, Math.floor(width / 55));
    const leafColors = ['#E67E22', '#D35400', '#C0392B', '#F39C12', '#B8680E', '#A04000'];

    let svg = `<svg width="100%" height="${height}" style="display:block;overflow:visible">`;
    svg += `<path d="${pathD}" stroke="rgba(90,50,20,.65)" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;

    for (let i = 1; i < leafCount; i++) {
      const t = i / leafCount;
      const x = t * width;
      const y = curveY(t);

      const color = leafColors[i % leafColors.length];
      const delay = (i * 0.15).toFixed(2);
      const tilt  = ((i * 53) % 50) - 25;

      svg += `<line x1="${x.toFixed(2)}" y1="${y.toFixed(2)}" x2="${x.toFixed(2)}" y2="${(y + 5).toFixed(2)}" stroke="rgba(90,50,20,.55)" stroke-width="0.9"/>`;

      svg += `<g transform="translate(${x.toFixed(2)} ${(y + 5).toFixed(2)}) rotate(${tilt})">`;
      svg += `<g class="season-autumn-leaf" style="animation-delay:${delay}s">`;
      svg += `<path d="M 0,0 Q 6,4 5,10 Q 2,14 0,16 Q -2,14 -5,10 Q -6,4 0,0 Z" fill="${color}"/>`;
      svg += `<line x1="0" y1="1" x2="0" y2="15" stroke="rgba(0,0,0,0.28)" stroke-width="0.7"/>`;
      svg += `<line x1="0" y1="5" x2="3"  y2="8"  stroke="rgba(0,0,0,0.2)" stroke-width="0.5"/>`;
      svg += `<line x1="0" y1="5" x2="-3" y2="8"  stroke="rgba(0,0,0,0.2)" stroke-width="0.5"/>`;
      svg += `<line x1="0" y1="9" x2="3"  y2="12" stroke="rgba(0,0,0,0.2)" stroke-width="0.5"/>`;
      svg += `<line x1="0" y1="9" x2="-3" y2="12" stroke="rgba(0,0,0,0.2)" stroke-width="0.5"/>`;
      svg += `</g></g>`;
    }

    svg += '</svg>';
    el.innerHTML = svg;
  }

  /* ============================================================
     ПРИМЕНЕНИЕ
     ============================================================ */

  function applySeason(season) {
    const body = document.body;

    SEASON_ORDER.forEach(s => {
      if (s) body.classList.remove('season-' + s);
    });
    body.classList.toggle('season-on', !!season);
    if (season) body.classList.add('season-' + season);

    const btn = document.getElementById('seasonBtn');
    if (btn) {
      btn.classList.remove('season-btn-winter', 'season-btn-spring', 'season-btn-summer', 'season-btn-autumn', 'season-btn-active');
      if (season) {
        btn.classList.add('season-btn-' + season, 'season-btn-active');
        btn.innerHTML = SEASON_ICONS[season];
      } else {
        btn.innerHTML = SEASON_ICONS.off;
      }
      btn.title = SEASON_TITLES[season] || SEASON_TITLES[''];
    }

    seasonBuildParticles(season);

    const g = document.getElementById('seasonGarland');
    if (g) {
      if (season === 'winter')      seasonBuildGarland();
      else if (season === 'spring') seasonBuildSpringGarland();
      else if (season === 'summer') seasonBuildSummerGarland();
      else if (season === 'autumn') seasonBuildAutumnGarland();
      else                          g.innerHTML = '';
    }
  }

  function cycleSeason() {
    const current = localStorage.getItem(LS_SEASON_KEY) || '';
    const idx = SEASON_ORDER.indexOf(current);
    const next = SEASON_ORDER[(idx + 1) % SEASON_ORDER.length];
    localStorage.setItem(LS_SEASON_KEY, next);
    applySeason(next);
  }

  /* ============================================================
     ФИЧА "ВРЕМЕНА ГОДА" В НАСТРОЙКАХ
     ============================================================ */

  function isSeasonsEnabled() {
    return localStorage.getItem(LS_SEASONS_ENABLED_KEY) === '1';
  }

  function syncSeasonsSwitch() {
    const sw = document.getElementById('seasonsSwitch');
    if (!sw) return;
    const row = sw.closest('.settings-row');
    if (row) row.classList.toggle('theme-switch-on', isSeasonsEnabled());
  }

  function applySeasonsFeature() {
    const enabled = isSeasonsEnabled();
    const btn = document.getElementById('seasonBtn');
    if (btn) btn.style.display = enabled ? '' : 'none';

    syncSeasonsSwitch();

    if (!enabled) {
      localStorage.setItem(LS_SEASON_KEY, '');
      applySeason('');
    } else {
      const saved = localStorage.getItem(LS_SEASON_KEY) || '';
      if (saved) applySeason(saved);
    }
  }

  function toggleSeasonsFeature() {
    const enabled = !isSeasonsEnabled();
    localStorage.setItem(LS_SEASONS_ENABLED_KEY, enabled ? '1' : '0');
    applySeasonsFeature();
  }

  /* ============================================================
     СТАРТ
     ============================================================ */

  function initSeason() {
    // Контейнер для частиц — первым в body
    if (!document.getElementById('seasonFx')) {
      const fx = document.createElement('div');
      fx.className = 'season-fx';
      fx.id = 'seasonFx';
      document.body.insertBefore(fx, document.body.firstChild);
    }

    // Кнопка
    const btn = document.getElementById('seasonBtn');
    if (btn) {
      btn.innerHTML = SEASON_ICONS.off;
      btn.title = SEASON_TITLES[''];
      btn.addEventListener('click', cycleSeason);
    }

    applySeasonsFeature();
  }

  let seasonResizeTimer = null;
  window.addEventListener('resize', () => {
    const season = localStorage.getItem(LS_SEASON_KEY) || '';
    if (!isSeasonsEnabled()) return;
    if (season !== 'winter' && season !== 'spring' &&
        season !== 'summer' && season !== 'autumn') return;
    clearTimeout(seasonResizeTimer);
    seasonResizeTimer = setTimeout(() => {
      if (season === 'winter')      seasonBuildGarland();
      else if (season === 'spring') seasonBuildSpringGarland();
      else if (season === 'summer') seasonBuildSummerGarland();
      else if (season === 'autumn') seasonBuildAutumnGarland();
    }, 180);
  });

  // Экспортируем наружу
  window.syncSeasonsSwitch = syncSeasonsSwitch;
  window.toggleSeasonsFeature = toggleSeasonsFeature;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSeason);
  } else {
    initSeason();
  }
})();