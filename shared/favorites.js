/* NeuroX: локальное избранное и статистика открытий без сервера.
   Тренажёр считается открытым при переходе на его страницу (перезагрузка не считается).
   Названия и адреса берутся только из общего menu-data.js. */
(function () {
  'use strict';
  const script = document.currentScript;
  if (!script || !script.src) return;
  const ROOT = new URL('../', script.src);
  const KEY_FAV = 'neurox_favorites_v1';
  const KEY_USES = 'neurox_launches_v1';
  const KEY_HIDE_FREQUENT = 'neurox_hide_frequent_v1';

  // Перенос «Реставратора» в «Память»: сохраняем избранное и число запусков.
  (function migrateRestorer(){
    const oldId='attention/restorer.html', newId='memory/restorer.html';
    try {
      const f=JSON.parse(localStorage.getItem(KEY_FAV)||'[]');
      if(Array.isArray(f)&&f.includes(oldId)){
        const updated=[...new Set(f.map(id=>id===oldId?newId:id))];
        localStorage.setItem(KEY_FAV,JSON.stringify(updated));
      }
      const uses=JSON.parse(localStorage.getItem(KEY_USES)||'{}');
      if(uses&&typeof uses==='object'&&!Array.isArray(uses)&&Object.hasOwn(uses,oldId)){
        const old=uses[oldId],current=uses[newId];
        uses[newId]=current?{
          count:Math.min(1000000,(Number(old?.count)||0)+(Number(current?.count)||0)),
          last:Math.max(Number(old?.last)||0,Number(current?.last)||0)
        }:old;
        delete uses[oldId];
        localStorage.setItem(KEY_USES,JSON.stringify(uses));
      }
    }catch(_){/* Доступ к хранилищу может быть запрещён. */}
  })();

  const menu = Array.isArray(window.NEUROX_MENU) ? window.NEUROX_MENU : [];
  const entries = menu.flatMap(section => section.items.map(it => ({
    id: it.file, title: it.title, icon: it.icon, section: section.title,
    url: new URL(it.file, ROOT).href
  })));
  const byId = new Map(entries.map(it => [it.id, it]));
  const byUrl = new Map(entries.map(it => [new URL(it.url).pathname, it]));
  const current = byUrl.get(location.pathname) || null;
  function read(key, fallback) {
    try { const data = JSON.parse(localStorage.getItem(key)); return data && typeof data === 'object' ? data : fallback; }
    catch (_) { return fallback; }
  }
  function write(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); return true; }
    catch (_) { return false; }
  }
  function favorites() {
    const data = read(KEY_FAV, []);
    return Array.isArray(data) ? [...new Set(data.filter(id => typeof id === 'string' && byId.has(id)))].slice(0,200) : [];
  }
  function usage() {
    const data = read(KEY_USES, {});
    return !Array.isArray(data) ? data : {};
  }
  function isFrequencyHidden() {
    try { return localStorage.getItem(KEY_HIDE_FREQUENT) === '1'; }
    catch (_) { return false; }
  }
  function setFrequencyHidden(hidden) {
    try { localStorage.setItem(KEY_HIDE_FREQUENT, hidden ? '1' : '0'); }
    catch (_) { return false; }
    refresh();
    return true;
  }
  function resetOneUsage(id) {
    if (!byId.has(id)) return false;
    const counts=usage();
    if (!Object.prototype.hasOwnProperty.call(counts,id)) return false;
    delete counts[id];
    if (!write(KEY_USES,counts)) return false;
    refresh(); return true;
  }
  function resetAllUsage() {
    if (!write(KEY_USES,{})) return false;
    refresh(); return true;
  }
  function toggle(id) {
    if (!byId.has(id)) return false;
    const f = favorites();
    const i = f.indexOf(id);
    if (i < 0) f.unshift(id); else f.splice(i,1);
    if (!write(KEY_FAV,f)) return false;
    refresh();
    window.dispatchEvent(new Event('neurox:quick-access-change'));
    return true;
  }
  function trackedLaunch() {
    if (!current) return;
    let reloaded = false;
    try { reloaded = performance.getEntriesByType('navigation')[0]?.type === 'reload'; } catch (_) {}
    if (reloaded) return;
    const counts = usage();
    const old = counts[current.id] || {};
    counts[current.id] = { count:Math.min(1000000, (Number(old.count) || 0) + 1), last:Date.now() };
    write(KEY_USES, counts);
  }
  trackedLaunch();
  function makeStar(id) {
    const item = byId.get(id);
    const active = favorites().includes(id);
    const b = document.createElement('button');
    b.type='button'; b.className='nx-fav-button'; b.innerHTML=window.NeuroXIconSvg ? window.NeuroXIconSvg('star') : '';
    b.dataset.favId=id;
    b.title=active?'Убрать из избранного':'Добавить в избранное';
    b.setAttribute('aria-label',(active?'Убрать из избранного: ':'Добавить в избранное: ')+(item?.title||id));
    b.setAttribute('aria-pressed',String(active));
    b.addEventListener('click', function (event) {
      event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
      toggle(id);
    });
    b.addEventListener('keydown', e=>e.stopPropagation());
    return b;
  }
  function renderRows(container, data, showCount) {
    container.replaceChildren();
    data.forEach(it => {
      const line=document.createElement('div');line.className='nx-quick-item';
      const link=document.createElement('a');link.className='nx-quick-link';link.href=it.url;
      const symbol=document.createElement('span'); symbol.className='nx-quick-emoji'; symbol.innerHTML=window.NeuroXIconSvg ? window.NeuroXIconSvg(it.icon) : '';
      const name=document.createElement('span');name.className='nx-quick-name';name.textContent=it.title;
      const count=document.createElement('span');count.className='nx-quick-count';
      if (showCount) count.textContent=it.count+' ×';
      link.append(symbol,name);if(showCount)link.append(count);
      line.append(link,makeStar(it.id));container.append(line);
    });
  }
  function pickMost() {
    const uses=usage();
    return entries.map(it => ({...it,count:Number(uses[it.id]?.count)||0,last:Number(uses[it.id]?.last)||0}))
      .filter(it=>it.count>0).sort((a,b)=>b.count-a.count || b.last-a.last).slice(0,5);
  }
  function makeGroup(title,empty,items,showCount) {
    const sec=document.createElement('div');sec.className='nx-quick-group';
    const heading=document.createElement('h3');heading.className='nx-quick-title'; const headingIcon=window.NeuroXIconSvg ? window.NeuroXIconSvg(title==='Избранное'?'star':'chart') : ''; heading.innerHTML=headingIcon+'<span>'+title+'</span>';
    const body=document.createElement('div');body.className='nx-quick-items';
    if(items.length)renderRows(body,items,showCount);
    else {const p=document.createElement('p');p.className='nx-quick-empty';p.textContent=empty;body.append(p);}
    sec.append(heading,body);return sec;
  }
  function groups(container,compact) {
    container.replaceChildren();
    if(compact && current) {
      const row=document.createElement('div');row.className='nx-current-favorite';
      const t=document.createElement('span');t.textContent='Этот тренажёр: '+current.title;
      row.append(t,makeStar(current.id));container.append(row);
    }
    const f=favorites().map(id=>byId.get(id)).filter(Boolean);
    container.append(makeGroup('Избранное','Пока пусто. Добавляй звёздочкой в разделе.',compact?f.slice(0,5):f,false));
    if (!isFrequencyHidden()) container.append(makeGroup('Часто используемые','Здесь появятся открываемые тренажёры.',pickMost().slice(0,compact?3:5),true));
  }
  function manageRow(item, count, kind) {
    const row=document.createElement('div');row.className='nx-manage-row';
    const name=document.createElement('span');name.className='nx-manage-name'; const symbol=document.createElement('span'); symbol.className='nx-manage-icon'; symbol.innerHTML=window.NeuroXIconSvg ? window.NeuroXIconSvg(item.icon) : ''; const label=document.createElement('span'); label.textContent=item.title; name.append(symbol,label);
    const info=document.createElement('span');info.className='nx-manage-count';
    if(kind==='usage')info.textContent=count+' ×';
    const remove=document.createElement('button');remove.type='button';remove.className='nx-manage-remove';
    remove.textContent=kind==='usage'?'Сбросить':'Убрать';
    remove.setAttribute('aria-label', (kind==='usage'?'Сбросить открытия: ':'Убрать из избранного: ')+item.title);
    remove.addEventListener('click',()=>{
      const index=[...row.parentElement.children].indexOf(row);
      const success=kind==='usage'?resetOneUsage(item.id):toggle(item.id);
      const box=document.getElementById(kind==='usage'?'nx-manage-uses':'nx-manage-favs');
      const buttons=[...box.querySelectorAll('button')];
      const next=buttons[Math.min(index,buttons.length-1)] || document.querySelector(kind==='usage'?'#nx-manage-frequency-details summary':'#nx-manage-favorites-details summary');
      next?.focus({preventScroll:true});
      statusMessage(success?(kind==='usage'?'Счётчик обнулён: ':'Убрано из избранного: ')+item.title:'Не удалось сохранить изменение.');
    });
    row.append(name,info,remove);return row;
  }
  function statusMessage(message){const el=document.getElementById('nx-manage-status');if(el)el.textContent=message}
  function renderManager(){
    const hideBox=document.getElementById('nx-hide-frequency');
    if (hideBox) hideBox.checked=isFrequencyHidden();
    const favBox=document.getElementById('nx-manage-favs');
    const useBox=document.getElementById('nx-manage-uses');
    if(!favBox||!useBox)return;
    const favs=favorites().map(id=>byId.get(id)).filter(Boolean);
    const counts=usage();
    const list=entries.map(it=>({...it,count:Number(counts[it.id]?.count)||0,last:Number(counts[it.id]?.last)||0}))
      .filter(it=>it.count>0).sort((a,b)=>b.count-a.count||b.last-a.last);
    document.getElementById('nx-manage-favs-total').textContent=String(favs.length);
    document.getElementById('nx-manage-uses-total').textContent=String(list.length);
    favBox.replaceChildren();useBox.replaceChildren();
    if(!favs.length){const empty=document.createElement('p');empty.className='nx-manage-empty';empty.textContent='Пока ничего не добавлено.';favBox.append(empty)}
    else favs.forEach(it=>favBox.append(manageRow(it,0,'favorite')));
    if(!list.length){const empty=document.createElement('p');empty.className='nx-manage-empty';empty.textContent='История открытий пуста.';useBox.append(empty)}
    else list.forEach(it=>useBox.append(manageRow(it,it.count,'usage')));
    const reset=document.getElementById('nx-reset-frequency');if(reset)reset.disabled=list.length===0;
  }
  function initManager(){
    if(!document.getElementById('nx-trainer-settings'))return;
    document.getElementById('nx-hide-frequency')?.addEventListener('change',event=>{
      const hidden=event.currentTarget.checked;
      if (!setFrequencyHidden(hidden)) {
        event.currentTarget.checked=!hidden;
        statusMessage('Не удалось сохранить настройку отображения.');
      } else {
        statusMessage(hidden?'Подборка скрыта. Счётчики открытий сохранены.':'Подборка «Часто используемые» снова видна.');
      }
    });
    document.getElementById('nx-reset-frequency')?.addEventListener('click',()=>{
      const c=document.getElementById('nx-frequency-confirm');if(c)c.hidden=false;document.getElementById('nx-frequency-cancel')?.focus();
    });
    document.getElementById('nx-frequency-cancel')?.addEventListener('click',()=>{
      const c=document.getElementById('nx-frequency-confirm');if(c)c.hidden=true;
      document.getElementById('nx-reset-frequency')?.focus({preventScroll:true});
    });
    document.getElementById('nx-frequency-yes')?.addEventListener('click',()=>{
      const success=resetAllUsage();
      const c=document.getElementById('nx-frequency-confirm');if(c)c.hidden=true;
      document.querySelector('#nx-manage-frequency-details summary')?.focus({preventScroll:true});
      statusMessage(success?'Статистика открытий обнулена. Избранное и результаты сохранены.':'Не удалось обнулить статистику.');
    });
    renderManager();
  }
  function refresh() {
    document.querySelectorAll('.nx-fav-button[data-fav-id]').forEach(b=>{
      const active=favorites().includes(b.dataset.favId);
      b.innerHTML=window.NeuroXIconSvg ? window.NeuroXIconSvg('star') : '';b.setAttribute('aria-pressed',String(active));
      b.title=active?'Убрать из избранного':'Добавить в избранное';
      b.setAttribute('aria-label',(active?'Убрать из избранного: ':'Добавить в избранное: ')+(byId.get(b.dataset.favId)?.title||''));
    });
    const home=document.getElementById('nx-quick-home'); if(home) groups(home,false);
    const intro=document.querySelector('#nx-quick-access .nx-quick-intro');
    if (intro) intro.textContent=isFrequencyHidden()
      ? 'Добавляй любимые тренажёры звёздочкой. Часто используемые скрыты в настройках.'
      : 'Добавляй любимые звёздочкой. Часто используемые появляются автоматически.';
    refreshDrawer();
    renderManager();
  }
  function refreshDrawer() {
    const el=document.getElementById('nx-quick-drawer');if(el) groups(el,true);
  }
  function decorateCategory() {
    const localRoot=new URL('.',location.href);
    document.querySelectorAll('.cards > .card').forEach(card=>{
      const relative=card.dataset.trainer || (card.getAttribute('onclick')||'').match(/openTrainer\(\s*['"]([^'"]+)['"]/)?.[1];
      if(!relative) return;
      const target=new URL(relative,localRoot).pathname;
      const item=byUrl.get(target);
      if(!item || card.querySelector('.nx-fav-button'))return;
      // Insert before arrow, without replacing original card or its animations.
      const b=makeStar(item.id);
      const arrow=card.querySelector(':scope > .arrow');
      if(arrow)card.insertBefore(b,arrow);else card.append(b);
    });
  }
  function init() {
    decorateCategory();
    if (location.pathname === ROOT.pathname || location.pathname === new URL('index.html',ROOT).pathname) {
      const cards=document.querySelector('.container > .cards');
      if(cards) {
        const panel=document.createElement('section');panel.className='nx-quick-panel';panel.id='nx-quick-access';
        const header=document.createElement('div');header.className='nx-quick-header';
        const copy=document.createElement('div');copy.className='nx-quick-copy';
        const title=document.createElement('h2');title.className='nx-quick-heading';title.textContent='Мои тренажёры';
        const intro=document.createElement('p');intro.className='nx-quick-intro';intro.textContent='Добавляй любимые звёздочкой. Часто используемые появляются автоматически.';
        copy.append(title,intro);
        const generators=document.createElement('a');
        generators.className='nx-generators-link';
        generators.href=new URL('generators/index.html',ROOT).href;
        generators.title='Открыть генераторы печатных заданий';
        generators.setAttribute('aria-label','Открыть генераторы печатных заданий');
        generators.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M7 8V3h10v5"/><rect x="3" y="8" width="18" height="10" rx="2.5"/><path d="M7 15h10v6H7z"/><circle cx="17.5" cy="12" r="1" class="nx-print-accent" fill="#FF8B3D" stroke="none"/></svg><span class="nx-generators-text">Генераторы</span>`;
        header.append(copy,generators);
        const slots=document.createElement('div');slots.id='nx-quick-home';panel.append(header,slots);
        cards.before(panel);
      }
    }
    initManager();
    refresh();
    window.addEventListener('storage',e=>{if([KEY_FAV,KEY_USES,KEY_HIDE_FREQUENT].includes(e.key))refresh();});
  }
  window.NeuroXQuickAccess=Object.freeze({ refreshDrawer, refresh, favorites, usage, toggle, resetOneUsage, resetAllUsage, isFrequencyHidden, setFrequencyHidden });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
