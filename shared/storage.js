/* NeuroX: локальные данные. Существующие ключи тренажёров не переименовываются.
   Менеджер резервных копий и точечного сброса. Без сетевых запросов. */
(function () {
  'use strict';
  // One UTF-8 limit for downloads, file selection and parsing. Board snapshots
  // can legitimately exceed 2 MB; do not reject them with a smaller record cap.
  const MAX_BACKUP_BYTES = 16 * 1024 * 1024;
  const MAX_BACKUP_ENTRIES = 500;

  const exact = new Set([
    'theme', 'board-autosave', 'arenaRecords', 'escapeScore',
    'absurdCfgV1', 'chainCfg', 'detectiveCfg', 'dualCfg', 'dungeonCfg',
    'escapeCfg', 'historyCfg', 'idCfg', 'newsCfg', 'reflectionCfg',
    'retellCfg', 'simonCfg', 'towerCfg', 'caveSettings',
    'fillwordCfg2', 'readingGame_settings_v1', 'findletter.settings.v2',
    'word-picture-sheets-v1', 'neurox.gruzovoi-express.animals.v1',
    'tochkiAch', 'tochkiV4', 'transformationMode', 'transformationCfg', 'eventCounterStats'
  ]);
  const prefixes = [
    'neurox_', 'neurox-', 'nx-', 'nr_', 'vlom', 'maze_', 'readingGame_', 'findletter.'
  ];

  function isManagedKey(key) {
    return exact.has(key) || prefixes.some(prefix => key.startsWith(prefix));
  }

  function collect() {
    const result = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && isManagedKey(key)) result[key] = localStorage.getItem(key);
    }
    return result;
  }

  function exportData() {
    const values = collect();
    const backup = {
      format: 'NeuroX.localStorage', version: 1,
      createdAt: new Date().toISOString(),
      values
    };
    const text = JSON.stringify(backup, null, 2);
    // Never offer a successful download which this same app cannot import.
    parseBackup(text);
    const blob = new Blob([text], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NeuroX-backup-' + new Date().toISOString().slice(0,10) + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    return Object.keys(values).length;
  }

  function parseBackup(text) {
    if (typeof text !== 'string') throw new Error('Файл не является корректным JSON.');
    if (new Blob([text]).size > MAX_BACKUP_BYTES) throw new Error('Файл слишком большой (более 16 МБ).');
    let data;
    try { data = JSON.parse(text); } catch (_) { throw new Error('Файл не является корректным JSON.'); }
    if (!data || data.format !== 'NeuroX.localStorage' || data.version !== 1 ||
        !data.values || typeof data.values !== 'object' || Array.isArray(data.values)) {
      throw new Error('Это не резервная копия NeuroX поддерживаемого формата.');
    }
    const entries = Object.entries(data.values);
    if (!entries.length || entries.length > MAX_BACKUP_ENTRIES || entries.some(([k, v]) =>
      !isManagedKey(k) || typeof v !== 'string')) {
      throw new Error('В копии нет данных NeuroX или содержатся посторонние/некорректные записи.');
    }
    return entries;
  }

  function importData(text) {
    const entries = parseBackup(text);
    // Снимок делается до первой записи; при ошибке квоты откатываем изменения.
    const original = new Map(entries.map(([key]) => [key, localStorage.getItem(key)]));
    const written = [];
    try {
      entries.forEach(([key, value]) => { localStorage.setItem(key, value); written.push(key); });
    } catch (e) {
      // Free the incoming values before restoring old ones. Otherwise a newly
      // imported large value can prevent rollback of an earlier, larger record.
      let restored = true;
      for (const key of written) {
        try { localStorage.removeItem(key); } catch (_) { restored = false; }
      }
      written.forEach(key => {
        const old = original.get(key);
        if (old !== null) try { localStorage.setItem(key, old); } catch (_) { restored = false; }
      });
      throw new Error('Не удалось записать все данные (возможно, заполнена память браузера). ' +
        (restored ? 'Исходные данные сохранены.' : 'Не удалось полностью вернуть исходные данные. Используйте сохранённую резервную копию.'));
    }
    return entries.length;
  }

  function resetData() {
    const keys = Object.keys(collect());
    keys.forEach(key => localStorage.removeItem(key));
    sessionStorage.removeItem('neurox_splash_shown');
    return keys.length;
  }

  window.NeuroXStorage = Object.freeze({ isManagedKey, collect, exportData, parseBackup, importData, resetData, maxBackupBytes: MAX_BACKUP_BYTES });
})();
