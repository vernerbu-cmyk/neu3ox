/* NeuroX Beta 9: a shared navigation bar for training and generator pages.
   Does not replace game-specific controls, scoreboards, or form controls. */
(function(){
  'use strict';
  const script=document.currentScript;
  const root=new URL('../', script.src);
  const sections={
    memory:'Память',attention:'Внимание',preschool:'Дошкольники',reading:'Скорочтение',
    math:'Математика',orfografos:'Орфография',generators:'Генераторы',other:'Другое'
  };
  const relative=location.pathname.startsWith(root.pathname)?decodeURI(location.pathname.slice(root.pathname.length)):'';
  const category=relative.split('/')[0];
  if(!sections[category] || relative===category+'/index.html')return;
  const folderLink=new URL(category+'/index.html',root).href;
  const homeLink=new URL('index.html',root).href;
  const fallback=(document.title||'Тренажёр').replace(/\s*[—–|-]\s*NeuroX.*$/i,'').trim();
  const item=Array.isArray(window.NEUROX_MENU)?window.NEUROX_MENU.flatMap(x=>x.items).find(x=>x.file===relative):null;
  const name=item?.title||fallback;
  const brain='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5c-3-5-9-.8-7 3-4 1-3 7 1 7-1 5 5 7 6 2 1 5 7 3 6-2 4 0 5-6 1-7 2-4-4-8-7-3z"/><path d="M12 5v14M8 9c0 3 2 3 4 3m4-3c0 3-2 3-4 3"/></svg>';
  const moon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 16a8.4 8.4 0 0 1-12-12 8.4 8.4 0 1 0 12 12z"/></svg>';
  const sun='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.4 1.4m11.34 11.34 1.4 1.4M2 12h2m16 0h2M4.93 19.07l1.4-1.4M17.67 6.33l1.4-1.4"/></svg>';
  function makeButton(icon,label){const b=document.createElement('button');b.type='button';b.className='nxub-action';b.setAttribute('aria-label',label);b.title=label;b.innerHTML=icon;return b}
  /* Beta 15: only one branded navigation header per game.
     Existing scoreboards and game controls are preserved, not recreated. */
  function harmonizeNativeHeader(nav, actions){
    const legacy=document.querySelector('header');
    if(!legacy || legacy.closest('#nx-unified-bar'))return;
    const moved=[];
    function move(selectors){
      for(const selector of selectors){
        const node=legacy.querySelector(selector);
        if(node && !moved.some(kept=>kept.contains(node) || node.contains(kept))){moved.push(node)}
      }
    }
    // Short legacy headers: move scores and essential game buttons into the shared bar.
    if(relative==='preschool/gruzovoi_express/gruzovoi_express.html'){
      move(['.top-right']);
      legacy.classList.add('nx-retired-header');
    }else if(relative==='preschool/veryu-ne-veryu/index.html'){
      move(['#status','#readingPopup']);
      legacy.classList.add('nx-retired-header');
    }else if(category==='memory' && relative!=='memory/index.html'){
      if(relative==='memory/keys.html')move(['.top-actions']);
      else if(relative==='memory/last-four.html')move(['.right-top']);
      else move([':scope > .score-bar',':scope > .header-right']);
      legacy.classList.add('nx-retired-header');
    }else if(category==='attention'){
      const routes={
        'decoy.html':['.stats'],
        'editor.html':['.buttons'],
        'meeting-point.html':['.header-actions'],
        'negative.html':['.head-actions'],
        'quiet-glitch.html':['.counts'],
        'radar.html':['.header-actions'],
        'restorer.html':['.righttop']
      };
      if(relative==='attention/invisible-walls.html'||relative==='attention/peripheral.html'){
        legacy.classList.add('nx-retired-header');
      }else if(routes[relative.slice('attention/'.length)]){
        move(routes[relative.slice('attention/'.length)]);
        legacy.classList.add('nx-retired-header');
      }
    }else if([
      'math/delenie.html','math/tochki.html','math/magic.html','math/tablitsa.html',
      'preschool/letimage.html','preschool/different.html','preschool/alf/letalf.html','other/alf/letalf.html','other/peremeny.html',
      'generators/filvord.html','generators/spiral.html','generators/nitki.html',
      'generators/shulte.html','generators/naidi_bukvu.html',
      'generators/slovo-generator/index.html'
    ].includes(relative)){
      if(relative==='math/delenie.html')move(['.stats']);
      else if(relative==='math/tochki.html')move(['.chips']);
      else if(relative==='preschool/letimage.html')move(['.score-bar']);
      else if(relative==='generators/filvord.html')move(['.score-bar']);
      else if(relative==='generators/spiral.html')move(['.actions']);
      else if(relative==='generators/nitki.html')move(['.header-right']);
      else if(relative==='generators/naidi_bukvu.html')move(['.header-actions']);
      else if(relative==='generators/slovo-generator/index.html')move(['.site-header-inner button#bankBtn']);
      legacy.classList.add('nx-retired-header');
    }else{
      // Settings-heavy headers remain as a *work panel*, not a second branded header.
      // Preserve all controls; hide only duplicated branding/back/theme actions.
      const nativeBrands=[
        ':scope > .brand',':scope > .header-top > .brand',
        ':scope > .header-top > .brand-row',
        ':scope > .header-inner > .brand',
        ':scope > .brandIcon',':scope > .header-title'
      ];
      let hidden=0;
      for(const selector of nativeBrands){
        const node=legacy.querySelector(selector);
        if(node && node!==legacy){node.classList.add('nx-duplicated-native');hidden++}
      }
      // Older games sometimes put the title and back button directly in the header.
      for(const child of Array.from(legacy.children)){
        if(child.matches('h1,h2,.back-btn,.back,.logo')){
          child.classList.add('nx-duplicated-native');hidden++;
        }
      }
      if(hidden)legacy.classList.add('nx-native-tools-only');
    }
    // Do not move native action elements out of their original DOM nodes unless
    // necessary: their attached event listeners and live score IDs remain intact.
    if(moved.length){
      const status=document.createElement('div');status.className='nxub-context';
      status.setAttribute('aria-label','Управление и показатели тренажёра');
      for(const node of moved)status.append(node);
      nav.insertBefore(status,actions);
    }
    // Distinguish global NeuroX settings (gear) from the game-specific ones (sliders).
    const localScope=legacy.classList.contains('nx-retired-header')?nav.querySelector('.nxub-context'):legacy;
    if(localScope){
      for(const btn of localScope.querySelectorAll('button')){
        const mark=((btn.id||'')+' '+(btn.className||'')+' '+(btn.title||'')+' '+(btn.getAttribute('aria-label')||'')).toLowerCase();
        if(/settingsbutton|settingstoggle|togglesettings|настройки/.test(mark) && !/togglebtn|свернуть настройки|скрыть настройки/.test(mark)){
          if(btn.querySelector('svg') && !btn.classList.contains('nx-duplicated-native')){
            btn.querySelector('svg').outerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="var(--blue-pale,#e8eef9)"/><circle cx="16" cy="17" r="3" fill="var(--blue-pale,#e8eef9)"/></svg>';
          }
          if(btn.textContent.trim()==='⚙ Настройки')btn.textContent='Параметры игры';
          btn.title='Параметры тренажёра';btn.setAttribute('aria-label','Параметры тренажёра');
        }
      }
    }
    // Older local theme buttons and back arrows duplicate the NeuroX controls.
    // Keep the original elements in DOM for scripts that reference their IDs.
    const duplicates=legacy.classList.contains('nx-retired-header')
      ? nav.querySelector('.nxub-context') : legacy;
    if(duplicates){
      for(const btn of duplicates.querySelectorAll('button,a')){
        const tag=(btn.id+' '+btn.className+' '+btn.title+' '+btn.getAttribute('aria-label')).toLowerCase();
        if(/themebtn|themetoggle|theme-btn|theme-toggle|сменить тему|переключить тему/.test(tag)){
          btn.classList.add('nx-duplicated-native');
        }
        if(btn.getAttribute('href')==='index.html' && /назад|меню памяти|раздел/.test(tag)){
          btn.classList.add('nx-duplicated-native');
        }
      }
    }
    // Standardize vertical spacing without overriding game settings panels.
    if(legacy.classList.contains('nx-native-tools-only')){
      legacy.setAttribute('aria-label','Настройки и управление тренажёром');
    }
  }
  function init(){
    if(document.getElementById('nx-unified-bar'))return;
    const nav=document.createElement('div');nav.id='nx-unified-bar';nav.setAttribute('role','banner');
    ['keydown','keyup','keypress','click'].forEach(type=>nav.addEventListener(type,event=>event.stopPropagation()));
    const left=document.createElement('div');left.className='nxub-left';
    const brand=document.createElement('a');brand.className='nxub-brand';brand.href=homeLink;
    const logo=document.createElement('span');logo.className='nxub-logo';logo.innerHTML=brain;
    const titles=document.createElement('div');titles.className='nxub-titles';
    const main=document.createElement('div');main.className='nxub-main';main.textContent='NeuroX';
    const crumb=document.createElement('div');crumb.className='nxub-crumb';crumb.textContent=sections[category]+' / '+name;
    titles.append(main,crumb);brand.append(logo,titles);
    const back=document.createElement('a');back.className='nxub-section';back.href=folderLink;back.title='К разделу «'+sections[category]+'»';back.setAttribute('aria-label',back.title);
    const backIcon=document.createElement('span');backIcon.className='nxub-back-arrow';backIcon.textContent='←';
    const backText=document.createElement('span');backText.className='nxub-back-label';backText.textContent=sections[category];back.append(backIcon,backText);
    left.append(brand,back);
    const actions=document.createElement('div');actions.className='nxub-actions';
    if(item && window.NeuroXQuickAccess){
      const fav=makeButton('☆','Добавить в избранное');
      const sync=()=>{const marked=window.NeuroXQuickAccess.favorites().includes(item.file);fav.textContent=marked?'★':'☆';fav.setAttribute('aria-pressed',String(marked));fav.title=marked?'Убрать из избранного':'Добавить в избранное';fav.setAttribute('aria-label',fav.title)};
      fav.addEventListener('click',e=>{e.stopPropagation();window.NeuroXQuickAccess.toggle(item.file);sync()});
      window.addEventListener('storage',sync);window.addEventListener('neurox:quick-access-change',sync);sync();actions.append(fav);
    }
    const theme=makeButton(moon,'Сменить тему');theme.classList.add('nxub-theme-action');
    function syncTheme(){theme.innerHTML=document.documentElement.dataset.theme==='dark'?sun:moon;theme.title=document.documentElement.dataset.theme==='dark'?'Светлая тема':'Тёмная тема';theme.setAttribute('aria-label',theme.title)}
    theme.addEventListener('click',e=>{e.stopPropagation();const next=document.documentElement.dataset.theme==='dark'?'light':'dark';window.NeuroXTheme.set(next);syncTheme()});
    new MutationObserver(syncTheme).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});syncTheme();actions.append(theme);
    const season=makeButton('','Сезонное оформление');season.classList.add('nxub-season-action');season.id='seasonBtn';season.style.display='none';season.addEventListener('click',e=>e.stopPropagation());
    actions.append(season);
    const settings=document.createElement('a');settings.className='nxub-action';
    settings.href=new URL('index.html#settings',root).href;
    settings.title='Настройки NeuroX';settings.setAttribute('aria-label','Настройки NeuroX');
    settings.textContent='⚙';actions.append(settings);
    const menu=makeButton('☰','Открыть меню NeuroX');menu.setAttribute('aria-controls','nx-drawer');menu.setAttribute('aria-expanded','false');window.addEventListener('neurox:drawer-state',e=>menu.setAttribute('aria-expanded',String(e.detail.open)));
    menu.addEventListener('click',e=>{e.stopPropagation();const old=document.getElementById('nx-drawer-btn');if(old)old.click();else location.href=homeLink});
    actions.append(menu);
    const garland=document.createElement('div');garland.className='season-garland';garland.id='seasonGarland';garland.setAttribute('aria-hidden','true');
    nav.append(left,actions,garland);
    document.body.dataset.nxPath=relative;
    document.body.insertAdjacentElement('afterbegin',nav);document.body.classList.add('nx-unified-page');
    harmonizeNativeHeader(nav,actions);
    let height=-1;
    const resize=()=>{const next=Math.round(nav.getBoundingClientRect().height);if(next===height)return;height=next;document.documentElement.style.setProperty('--nx-nav-height',next+'px');if(['other/labyrint.html','other/labyrint2.html','preschool/findletter.html','math/findnumber.html','preschool/cave/index.html','reading/alfabet.html','reading/raduga.html','reading/chitaem/chitalka.html'].includes(relative))requestAnimationFrame(()=>window.dispatchEvent(new Event('resize')))};
    new ResizeObserver(resize).observe(nav);resize();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
