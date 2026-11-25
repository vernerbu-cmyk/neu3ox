/* NeuroX Filvord — лёгкий словарь, крупные клетки и картинки к словам.
   Дополнение к generators/filvord.html; не меняет механику обычного режима. */
(() => {
  'use strict';
  // Редакторская подборка частотных, узнаваемых слов: только 3–4 буквы.
  const EASY_WORDS = new Set(`
    КОТ КИТ ПЁС БЫК ЛЕВ ЖУК ЛИСА ЁЖИК УТКА ГУСЬ СОВА МУХА КОЗА РЫБА ОВЦА ОСЁЛ МЫШЬ ЛАМА ЗАЯЦ
    СЫР СУП СОК ЧАЙ МЁД РИС КАША ДЫНЯ ТОРТ ЯЙЦО МЯСО СОЛЬ КИВИ БОБЫ ЛУК КЕКС ОРЕХ КОФЕ БЛИН
    ЛЕС ЕЛЬ ЛИСТ РОЗА ЛЁД СНЕГ ТУЧА МОРЕ ГОРА ЛУНА ВОДА ГРИБ НОЧЬ
    ДОМ СТУЛ ОКНО ЧАСЫ ВАЗА КЛЮЧ ДУШ МЫЛО КРАН НОЖ ЛУПА ШАР КУБ БАНТ МЯЧ ПИЛА
    НОС РОТ УХО РУКА НОГА ГЛАЗ ЗУБ ЛАПА КЕДЫ
    БУСЫ КОНЬ КЛАД ЦИРК
    АВТО ЯХТА САНИ МОСТ
    СОН СМЕХ ПРИЗ ЗВОН ШАГ ВЕС РОСТ СИЛА СВЕТ УТРО НОЛЬ ОДИН ДВА ТРИ ПЯТЬ
  `.trim().split(/\s+/));
  BABY_CATEGORIES.slice(1).forEach(category => {
    category.words = category.words.filter(word => EASY_WORDS.has(word));
  });
  // Не показываем темы, в которых осталось меньше трёх однозначных картинок.
  BABY_CATEGORIES.splice(1, BABY_CATEGORIES.length - 1, ...BABY_CATEGORIES.slice(1).filter(category => category.words.length >= 3));
  BABY_CATEGORIES[0].words = [...new Set(BABY_CATEGORIES.slice(1).flatMap(category => category.words))];
  if (cfg.mode === 'baby' && !BABY_CATEGORIES.some(category => category.id === cfg.category)) {
    cfg.category = 'all';
    saveCfg();
  }
  if (cfg.babyPrefs && !BABY_CATEGORIES.some(category => category.id === cfg.babyPrefs.category)) {
    cfg.babyPrefs.category = 'all';
    saveCfg();
  }
  const allWords = BABY_CATEGORIES[0].words.slice().sort((a, b) => a.localeCompare(b, 'ru'));
  const allowedWords = new Set(allWords);

  // Встроенные визуальные подсказки для всех слов детского режима.
  // Собственная картинка (если добавлена) имеет приоритет над эмодзи.
  const DEFAULT_EMOJI = new Map(`
    КОТ 🐈
    КИТ 🐳
    ПЁС 🐕
    БЫК 🐂
    ЛЕВ 🦁
    РАК 🦞
    ОСА 🐝
    ЖУК 🪲
    СОМ 🐟
    ЛИСА 🦊
    ЁЖИК 🦔
    УТКА 🦆
    ГУСЬ 🪿
    СОВА 🦉
    МУХА 🪰
    ЖАБА 🐸
    КОЗА 🐐
    РЫБА 🐟
    ОВЦА 🐑
    ОСЁЛ 🫏
    МЫШЬ 🐭
    ЛАМА 🦙
    ЗАЯЦ 🐇
    СЫР 🧀
    СУП 🍲
    СОК 🧃
    ЧАЙ 🍵
    МЁД 🍯
    РИС 🍚
    КАША 🥣
    РЕПА 🥬
    ДЫНЯ 🍈
    ТОРТ 🎂
    ЯЙЦО 🥚
    МЯСО 🥩
    СОЛЬ 🧂
    КИВИ 🥝
    БОБЫ 🫘
    ЕДА 🍽️
    УХА 🍲
    ЖЕЛЕ 🍮
    МУКА 🌾
    ЛУК 🧅
    КЕКС 🧁
    ОРЕХ 🌰
    СОУС 🥫
    МАК 🌺
    КОФЕ ☕
    ПЮРЕ 🥣
    БЛИН 🥞
    ЛЕС 🌲
    ЛУГ 🌼
    САД 🌳
    ДУБ 🌳
    ИВА 🌳
    ЕЛЬ 🎄
    КУСТ 🌿
    ЛИСТ 🍃
    РОЗА 🌹
    ЛЁД 🧊
    СНЕГ ❄️
    ТУЧА ☁️
    РОСА 💧
    ПРУД 🏞️
    РЕКА 🏞️
    МОРЕ 🌊
    ГОРА 🏔️
    ПОЛЕ 🌾
    ЛУНА 🌙
    НЕБО 🌤️
    ЗИМА ⛄
    ЛЕТО ☀️
    ВОДА 💧
    ГРОМ ⚡
    БУРЯ 🌪️
    ГРИБ 🍄
    КОРА 🌳
    ДЕНЬ ☀️
    НОЧЬ 🌌
    ЖАРА 🥵
    ПЕНЬ 🪵
    ПУХ 🪶
    ДЫМ 💨
    ДОМ 🏠
    ПОЛ 🏠
    СТОЛ 🪑
    СТУЛ 🪑
    ОКНО 🪟
    ЧАСЫ ⏰
    ВАЗА 🏺
    КЛЮЧ 🗝️
    ДУШ 🚿
    МЫЛО 🧼
    КРАН 🚰
    НОЖ 🔪
    ЛУПА 🔍
    ШАР 🎈
    ФЕН 💨
    КУБ 🎲
    БАНТ 🎀
    МЯЧ ⚽
    РАМА 🖼️
    ДАЧА 🏡
    ТАЗ 🪣
    КЛЕЙ 🧴
    БАНЯ 🛁
    ПИЛА 🪚
    СЕТЬ 🥅
    БАК 🛢️
    МЕЛ ✏️
    НОС 👃
    РОТ 👄
    УХО 👂
    ЛОБ 🙂
    РУКА ✋
    НОГА 🦵
    ГЛАЗ 👁️
    ШЕЯ 🧣
    УСЫ 🥸
    ЗУБ 🦷
    ЛИЦО 🙂
    КОЖА 🤲
    ПЯТА 🦶
    ТЕЛО 🧍
    ГУБА 👄
    ЛАПА 🐾
    ЮБКА 👗
    КЕДЫ 👟
    ШУБА 🧥
    ЮЛА 🌀
    ЛЕГО 🧱
    ИГРА 🎮
    ЛОТО 🎲
    БУСЫ 📿
    КОНЬ 🐎
    КЛАД 💰
    ЦИРК 🎪
    МАМА 👩
    ПАПА 👨
    ДЕД 👴
    СЫН 👦
    БРАТ 🧑‍🤝‍🧑
    ДОЧЬ 👧
    ТЁТЯ 👩
    ДЯДЯ 👨
    ДЕТИ 🧒
    ДРУГ 🧑‍🤝‍🧑
    ВНУК 👦
    ЖЕНА 👩
    МУЖ 👨
    ИМЯ 🪪
    АВТО 🚗
    ЯХТА ⛵
    САНИ 🛷
    РУЛЬ 🚘
    ФАРА 🚘
    ПЛОТ 🛶
    МОСТ 🌉
    УРОК 📚
    ТОМ 📕
    ПЕРО 🪶
    НОТА 🎵
    ТЕСТ 📝
    ЦВЕТ 🌈
    ЗВУК 🔊
    СПИ 😴
    ПОЙ 🎤
    ИДИ 🚶
    БЕГИ 🏃
    СТОЙ 🧍
    ЕШЬ 🍽️
    ПЕЙ 🥤
    ДУЙ 💨
    ЛОВИ 🤲
    НЕСИ 🛍️
    ИЩИ 🔎
    ПИШИ ✍️
    ЛЕПИ 🎨
    КАТИ 🛞
    МЕТИ 🧹
    МОЙ 🧼
    УЧИ 📖
    СИДИ 🪑
    ИДУ 🚶
    ЕДУ 🚗
    ЖДИ ⏳
    ЕЛА 🍽️
    ПИЛ 🥤
    ПЁК 🍞
    ПЁТ 🎤
    ДЕЛИ ➗
    ТЯНИ 🪢
    ВЕЗИ 🛒
    ЕЛИ 🍽️
    ПИЛИ 🥤
    МЫЛИ 🧼
    СОН 💤
    МИР 🌍
    СМЕХ 😄
    ДЕЛО 📋
    ЧУДО ✨
    ДАР 🎁
    ПРИЗ 🏆
    ЗВОН 🔔
    ШАГ 👣
    ВЕС ⚖️
    РОСТ 📏
    СИЛА 💪
    СВЕТ 💡
    УТРО 🌅
    ГОД 📅
    ЧАС 🕐
    МАЙ 🌷
    НОЛЬ 0️⃣
    ОДИН 1️⃣
    ДВА 2️⃣
    ТРИ 3️⃣
    ПЯТЬ 5️⃣
    РЯД 🔢
    ПАРА 👥
    ПЛАН 🗺️
    КОД 🔢
  `.trim().split(/\n/).map(line => {
    const m = line.trim().match(/^(\S+)\s+(.+)$/);
    return [m[1], m[2]];
  }));
  // Встроенные подсказки только к разрешённым словам, без двусмысленных замен.
  for (const word of [...DEFAULT_EMOJI.keys()]) {
    if (!allowedWords.has(word)) DEFAULT_EMOJI.delete(word);
  }
  const illustration = word => pictures.has(word)
    ? {kind: 'image', value: pictures.get(word)}
    : {kind: 'emoji', value: DEFAULT_EMOJI.get(word) || '🔎'};
  function makeIllustration(word, className = '') {
    const item = illustration(word);
    if (item.kind === 'image') {
      const img = document.createElement('img');
      img.src = item.value;
      img.alt = 'Картинка к слову ' + word;
      img.loading = 'lazy';
      if (className) img.className = className;
      return img;
    }
    const span = document.createElement('span');
    span.className = 'nx-default-emoji' + (className ? ' ' + className : '');
    span.textContent = item.value;
    span.setAttribute('role', 'img');
    span.setAttribute('aria-label', 'Эмодзи к слову ' + word);
    return span;
  }

  const stylesheet = document.createElement('style');
  stylesheet.textContent = `
    .board.baby{width:min(100%,850px);max-width:850px;gap:6px}
    .board.baby .cell{border-width:2px;border-radius:14px;letter-spacing:.015em}
    body.nx-baby-playing .game-layout{max-width:1080px}
    .nx-picture-group{margin-top:20px;padding-top:20px;border-top:1px solid var(--border)}
    .nx-picture-tools{display:grid;grid-template-columns:minmax(185px,1fr) minmax(160px,1fr);gap:15px;align-items:start}
    .nx-picture-group select{width:100%;height:46px;border:2px solid var(--border);background:var(--panel);color:var(--text);border-radius:12px;padding:8px}
    .nx-picture-preview{height:142px;border:2px dashed var(--border);border-radius:16px;background:var(--bg);display:flex;align-items:center;justify-content:center;color:var(--muted);font-weight:800;overflow:hidden;text-align:center;padding:7px}
    .nx-picture-preview img{max-width:100%;max-height:100%;object-fit:contain}
    .nx-picture-preview .nx-default-emoji{font-size:83px;line-height:1.2}
    .nx-picture-group .actions{margin:12px 0 2px;justify-content:flex-start}
    .nx-picture-group .btn{display:inline-flex;align-items:center;justify-content:center;min-height:42px}
    .nx-picture-group .btn input{display:none}
    .nx-picture-status{font-size:12px;line-height:1.5;color:var(--muted);font-weight:800;min-height:19px;margin-top:7px}
    .nx-picture-gallery{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin:18px 0 2px}
    .nx-picture-item{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border:2px solid var(--border);background:var(--panel);border-radius:16px;padding:8px;min-width:94px;max-width:150px;color:var(--text);font-weight:900;transition:opacity .2s,transform .2s}
    .nx-picture-item:hover{transform:translateY(-2px);border-color:var(--orange)}
    .nx-picture-item img{width:104px;height:85px;object-fit:contain;border-radius:10px;background:#fff}
    .nx-picture-item .nx-default-emoji{width:104px;height:85px;display:flex;align-items:center;justify-content:center;font-size:66px;line-height:1;background:var(--bg);border-radius:10px}
    .nx-picture-item img{background:var(--bg)}
    .nx-picture-gallery{max-width:1080px;margin-left:auto;margin-right:auto}
    .nx-picture-item span:not(.nx-default-emoji){font-size:15px;letter-spacing:.02em}
    .nx-picture-item.done{opacity:.5;border-color:var(--green)}
    .nx-picture-viewer{position:fixed;inset:0;background:rgba(5,16,35,.82);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px}
    .nx-picture-modal{background:var(--panel);color:var(--text);width:min(95vw,720px);border-radius:22px;padding:20px;text-align:center;position:relative}
    .nx-picture-modal img{display:block;max-width:100%;max-height:65vh;margin:0 auto;object-fit:contain}
    .nx-picture-modal strong{display:block;font-size:25px;margin-top:12px}
    .nx-picture-modal .nx-default-emoji{display:block;font-size:min(44vw,185px);line-height:1.5;margin:8px auto}
    .nx-picture-close{position:absolute;right:12px;top:12px;border:0;border-radius:50%;width:42px;height:42px;background:var(--orange);color:#fff;font-size:24px;font-weight:900}
    @media(max-width:700px){body.nx-baby-playing .wrap{padding:0 5px}body.nx-baby-playing .game-layout .panel{padding:8px} .board.baby{gap:3px;width:100%;max-width:none} .board.baby .cell{border-radius:8px} .nx-picture-tools{grid-template-columns:1fr} .nx-picture-item img{width:78px;height:65px} .nx-picture-item .nx-default-emoji{width:78px;height:65px;font-size:52px} .nx-picture-item{min-width:82px;max-width:104px}}
  `;
  document.head.appendChild(stylesheet);

  if (cfg.showPictures === undefined) cfg.showPictures = true;
  const IMAGE_DB = 'neurox_filvord_word_images_v1';
  const IMAGE_STORE = 'pictures';
  const pictures = new Map();
  let databasePromise = null;
  let chosenWord = allWords[0] || '';
  let loadFailed = false;
  const elem = id => document.getElementById(id);

  const openDatabase = () => {
    if (databasePromise) return databasePromise;
    databasePromise = new Promise((resolve, reject) => {
      if (!window.indexedDB) {reject(new Error('Хранилище браузера недоступно'));return;}
      const request = indexedDB.open(IMAGE_DB, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(IMAGE_STORE)) db.createObjectStore(IMAGE_STORE, {keyPath:'word'});
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('Не удалось открыть хранилище'));
    });
    return databasePromise;
  };
  const readRequest = request => new Promise((resolve,reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Ошибка чтения'));
  });
  async function loadPictures() {
    try {
      const db = await openDatabase();
      const list = await readRequest(db.transaction(IMAGE_STORE,'readonly').objectStore(IMAGE_STORE).getAll());
      list.forEach(record => {
        if (record && allowedWords.has(record.word) && /^data:image\/(?:webp|png|jpeg);base64,/i.test(record.src)) pictures.set(record.word,record.src);
      });
      updatePreview();
      renderPictureGallery();
    } catch (error) {
      loadFailed = true;
      setStatus('Сохранение картинок недоступно в этом браузере. Попробуй открыть игру через сайт (HTTPS).');
    }
  }
  async function writePicture(word,src) {
    const db = await openDatabase();
    await new Promise((resolve,reject) => {
      const tx=db.transaction(IMAGE_STORE,'readwrite');
      tx.objectStore(IMAGE_STORE).put({word,src});
      tx.oncomplete=resolve;
      tx.onerror=()=>reject(tx.error||new Error('Ошибка записи'));
      tx.onabort=()=>reject(tx.error||new Error('Операция отменена'));
    });
    pictures.set(word,src);
  }
  async function erasePicture(word) {
    const db = await openDatabase();
    await new Promise((resolve,reject) => {
      const tx=db.transaction(IMAGE_STORE,'readwrite');
      tx.objectStore(IMAGE_STORE).delete(word);
      tx.oncomplete=resolve;
      tx.onerror=()=>reject(tx.error||new Error('Ошибка удаления'));
    });
    pictures.delete(word);
  }
  const setStatus = text => { const node=elem('nxPictureStatus'); if (node) node.textContent=text; };
  function updatePreview() {
    const preview=elem('nxPicturePreview');
    if (!preview) return;
    preview.replaceChildren();
    preview.appendChild(makeIllustration(chosenWord));
    const count=elem('nxPictureCount');
    if(count)count.textContent=`Готовые картинки: ${DEFAULT_EMOJI.size} · своих: ${pictures.size}`;
    const erase=elem('nxPictureErase');
    if(erase)erase.disabled=!pictures.has(chosenWord) || loadFailed;
  }
  function makeThumbnail(file) {
    return new Promise((resolve,reject) => {
      if (!/^image\/(?:png|jpeg|webp|gif|avif)$/i.test(file.type)) {reject(new Error('Выбери PNG, JPG или WebP'));return;}
      if (file.size>20*1024*1024) {reject(new Error('Картинка слишком большая (максимум 20 МБ)'));return;}
      const objectUrl=URL.createObjectURL(file), image=new Image();
      image.onload=()=>{
        try {
          const k=Math.min(1,600/Math.max(image.naturalWidth,image.naturalHeight));
          const canvas=document.createElement('canvas');
          canvas.width=Math.max(1,Math.round(image.naturalWidth*k));
          canvas.height=Math.max(1,Math.round(image.naturalHeight*k));
          canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
          const webp=canvas.toDataURL('image/webp',.88);
          const data=webp.startsWith('data:image/webp;')?webp:canvas.toDataURL('image/png');
          if (data.length>1200000) throw new Error('Файл не удалось достаточно уменьшить');
          resolve(data);
        } catch(error){reject(error)} finally{URL.revokeObjectURL(objectUrl)}
      };
      image.onerror=()=>{URL.revokeObjectURL(objectUrl);reject(new Error('Не удалось открыть изображение'))};
      image.src=objectUrl;
    });
  }
  function downloadSet() {
    const data=JSON.stringify({app:'NeuroX Filvord',version:1,images:Object.fromEntries(pictures)});
    const blob=new Blob([data],{type:'application/json;charset=utf-8'}),url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download='neurox-filvord-kartinki.json';document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    setStatus(`Экспортировано картинок: ${pictures.size}. Файл можно импортировать на другом устройстве.`);
  }
  async function importSet(file) {
    if (file.size>50*1024*1024) throw new Error('Архив слишком большой');
    let data;
    try{data=JSON.parse(await file.text())}catch(_){throw new Error('Это не файл набора картинок JSON')}
    if (!data || data.app!=='NeuroX Filvord' || data.version!==1 || !data.images || typeof data.images!=='object') throw new Error('Неверный формат набора');
    let restored=0;
    for(const [word,src] of Object.entries(data.images)){
      if(!allowedWords.has(word) || typeof src!=='string' || !/^data:image\/(?:webp|png|jpeg);base64,/i.test(src) || src.length>1200000)continue;
      await writePicture(word,src);
      restored++;
    }
    updatePreview();
    setStatus(`Импортировано: ${restored}. Уже добавленные картинки сохранены.`);
  }
  function setupPictureEditor(){
    if(!isBaby())return;
    const panel=document.querySelector('.settings .panel');
    if(!panel)return;
    const description=panel.querySelector('.baby-intro');
    if(description && description.textContent.includes('Больше 300')) description.textContent=description.textContent.replace('Больше 300',`${allWords.length}`);
    const box=document.createElement('section');box.className='nx-picture-group';
    box.innerHTML=`<div class="group-title">🖼 Картинки к словам</div>
      <p class="baby-intro">Для всех детских слов картинки уже есть — это эмодзи. Можно заменить любое эмодзи своим рисунком или фотографией. Находить слова можно и без подсказок.</p>
      <div class="nx-picture-tools"><div><label for="nxPictureWord"><b>Слово</b></label><select id="nxPictureWord"></select>
      <div class="nx-picture-status" id="nxPictureCount"></div></div>
      <div id="nxPicturePreview" class="nx-picture-preview"></div></div>
      <div class="actions"><label class="btn primary" for="nxPictureUpload">↻ Заменить своей картинкой<input type="file" id="nxPictureUpload" accept="image/png,image/jpeg,image/webp,image/gif,image/avif"></label>
      <button type="button" class="btn" id="nxPictureErase">Вернуть эмодзи</button></div>
      <div class="actions"><button type="button" class="btn" id="nxPictureExport">↓ Сохранить набор</button><label class="btn" for="nxPictureImport">↑ Загрузить набор<input type="file" id="nxPictureImport" accept=".json,application/json"></label></div>
      <label class="toggle" style="margin-top:12px"><input type="checkbox" id="nxShowPictures" ${cfg.showPictures?'checked':''}>Показывать картинки к словам в игре</label>
      <p class="baby-intro">Эмодзи уже встроены в игру, работают без интернета. Твои собственные картинки хранятся в браузере; для переноса используй «Сохранить набор».</p>
      <div class="nx-picture-status" id="nxPictureStatus" role="status" aria-live="polite"></div>`;
    panel.insertBefore(box,panel.querySelector('.actions:last-child'));
    const select=elem('nxPictureWord');
    allWords.forEach(word=>{const opt=document.createElement('option');opt.textContent=word;opt.value=word;select.append(opt)});
    if(!allowedWords.has(chosenWord))chosenWord=allWords[0];
    select.value=chosenWord;
    select.onchange=()=>{chosenWord=select.value;updatePreview();setStatus('')};
    elem('nxPictureUpload').onchange=async e=>{
      const file=e.target.files?.[0];if(!file)return;
      try{setStatus('Обрабатываю картинку…');const data=await makeThumbnail(file);await writePicture(chosenWord,data);updatePreview();setStatus('Картинка добавлена к слову «'+chosenWord+'».')}
      catch(error){setStatus(error.message||'Не удалось сохранить картинку')}
      finally{e.target.value=''};
    };
    elem('nxPictureErase').onclick=async()=>{try{await erasePicture(chosenWord);updatePreview();setStatus('Своя картинка удалена. Вернулась встроенная картинка.')}catch(error){setStatus(error.message)}};
    elem('nxPictureExport').onclick=downloadSet;
    elem('nxPictureImport').onchange=async e=>{const file=e.target.files?.[0];if(!file)return;try{await importSet(file)}catch(error){setStatus(error.message)}finally{e.target.value=''}};
    elem('nxShowPictures').onchange=e=>{cfg.showPictures=e.target.checked;saveCfg()};
    if(loadFailed)setStatus('Сохранение картинок недоступно в этом браузере');
    updatePreview();
  }
  function viewPicture(word){
    if(!DEFAULT_EMOJI.has(word) && !pictures.has(word))return;
    const overlay=document.createElement('div');overlay.className='nx-picture-viewer';overlay.tabIndex=-1;
    const modal=document.createElement('div');modal.className='nx-picture-modal';
    const button=document.createElement('button');button.className='nx-picture-close';button.textContent='×';button.setAttribute('aria-label','Закрыть картинку');
    const img=makeIllustration(word);
    const title=document.createElement('strong');title.textContent=word;
    modal.append(button,img,title);overlay.append(modal);document.body.append(overlay);overlay.focus();
    const close=()=>{overlay.remove();document.removeEventListener('keydown',onKey)};
    const onKey=e=>{if(e.key==='Escape')close()};
    document.addEventListener('keydown',onKey);
    button.onclick=close;overlay.onclick=e=>{if(e.target===overlay)close()};
  }
  function renderPictureGallery(){
    document.querySelectorAll('.nx-picture-gallery').forEach(el=>el.remove());
    if(!isBaby() || !cfg.showPictures || !state || !state.placed || state.ended)return;
    const anchor=elem('wordList')||elem('board');if(!anchor)return;
    const words=state.placed.filter(p=>DEFAULT_EMOJI.has(p.word)||pictures.has(p.word));if(!words.length)return;
    const gallery=document.createElement('div');gallery.className='nx-picture-gallery';gallery.setAttribute('aria-label','Картинки-подсказки к словам');
    words.forEach(p=>{
      const btn=document.createElement('button');btn.type='button';btn.className='nx-picture-item';btn.dataset.word=p.word;btn.title='Посмотреть картинку: '+p.word;
      if(state.found.has(p.word))btn.classList.add('done');
      const img=makeIllustration(p.word);
      const caption=document.createElement('span');caption.textContent=p.word;
      btn.append(img,caption);btn.onclick=()=>viewPicture(p.word);gallery.append(btn);
    });
    anchor.insertAdjacentElement('afterend',gallery);
  }

  const originalSettings=showSettings;
  showSettings=function(...args){document.body.classList.remove('nx-baby-playing');originalSettings(...args);setupPictureEditor()};
  const originalRender=renderGame;
  renderGame=function(...args){originalRender(...args);document.body.classList.toggle('nx-baby-playing',isBaby());renderPictureGallery()};
  const originalMark=markFound;
  markFound=function(...args){originalMark(...args);if(state){document.querySelectorAll('.nx-picture-item').forEach(item=>{if(state.found.has(item.dataset.word))item.classList.add('done')})}};
  const originalFit=fitBoard;
  fitBoard=function(...args){originalFit(...args);if(!isBaby())return;const board=elem('board');if(!board||!board.firstElementChild)return;const size=board.firstElementChild.getBoundingClientRect().width;board.style.setProperty('--fs',`${Math.max(25,Math.min(70,size*.64))}px`)};
  window.addEventListener('resize',()=>{if(elem('board')&&isBaby())fitBoard()});
  showSettings();
  loadPictures();
})();