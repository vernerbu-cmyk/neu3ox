/* Единый внешний UI Искорки. Подключен к 16 играм, исходная механика не модифицируется. */
(()=>{
 'use strict';
 const current=document.currentScript;
 const name=current?.dataset.game;
 const type=current?.dataset.kind;
 const title=current?.dataset.title;
 const base=current?.dataset.base||'../';
 if(!name || !title || !document.body)return;
 const body=document.body;
 body.classList.add('ix-rest','ix-'+type,'ix-'+name.replaceAll('/','-'));
 const shell=document.createElement('div');shell.innerHTML=`<header class="ix-header" aria-label="Навигация Искорки">
 <a class="ix-home" href="${base}index.html" aria-label="Все игры, на главную">← <span class="ix-home-word">Все игры</span></a>
 <div class="ix-identity"><span class="ix-mascot"><img src="${base}assets/icons/squirrel-192.png" alt=""></span><span class="ix-label"><strong></strong><small>NeuroX · Подготовка к школе</small></span></div>
 <span class="ix-extra"></span>
 </header>`;
 const header=shell.firstElementChild;header.querySelector('.ix-label strong').textContent=title;
 body.insertBefore(header,body.firstChild);
 const actions=header.querySelector('.ix-extra');
 function action(text,klass='ix-action'){
   const el=document.createElement('button');el.type='button';el.className=klass;el.textContent=text;actions.appendChild(el);return el;
 }
 let trigger=null,closeSettings=()=>{},openSettings=()=>{},sync=()=>{};
 const drawerIds={findletter:'panel',changed:'panel',labyrinth:'topbar',mathworkshop:'settingsPanel',numbers:'settingsPanel'};
 const modalIds=['moreless','patterns'];
 if(drawerIds[name]){
   const panel=document.getElementById(drawerIds[name]);
   if(panel){
     panel.classList.add('ix-rest-drawer');
     panel.setAttribute('aria-label','Настройки игры');
     panel.setAttribute('aria-hidden','true');
     const backdrop=document.createElement('div');backdrop.className='ix-backdrop';backdrop.setAttribute('aria-hidden','true');body.appendChild(backdrop);
     const heading=document.createElement('div');heading.className='ix-panel-head';heading.innerHTML='<span>⚙ Настройки игры</span><button type="button" class="ix-panel-close" aria-label="Закрыть настройки">×</button>';
     panel.prepend(heading);
     trigger=action('⚙ Настройки','ix-action ix-new-settings');
     trigger.setAttribute('aria-controls',drawerIds[name]);trigger.setAttribute('aria-expanded','false');
     sync=()=>{const active=panel.classList.contains('ix-open');trigger.setAttribute('aria-expanded',String(active));panel.setAttribute('aria-hidden',String(!active));trigger.textContent=active?'× Закрыть':'⚙ Настройки';body.classList.toggle('ix-settings-visible',active)};
     closeSettings=()=>{panel.classList.remove('ix-open');sync()};
     openSettings=()=>{panel.classList.add('ix-open');sync();heading.querySelector('button').focus({preventScroll:true})};
     trigger.addEventListener('click',()=>panel.classList.contains('ix-open')?closeSettings():openSettings());
     backdrop.addEventListener('click',closeSettings);heading.querySelector('button').addEventListener('click',closeSettings);
     // Сохраняем нативные игровые обработчики существующих кнопок.
     const closeOnClickIds={findletter:['pauseBtn','restartBtn'],changed:[],labyrinth:['btnGenerate'],mathworkshop:['applyBtn'],numbers:['applyBtn']};
     (closeOnClickIds[name]||[]).forEach(id=>document.getElementById(id)?.addEventListener('click',()=>{if(name==='findletter'&&id==='pauseBtn'&&document.getElementById('pauseBtn')?.textContent.trim()==='Пауза'){}closeSettings()}));
     if(name==='changed'){
       const start=[...panel.querySelectorAll('button')].find(b=>/старт/i.test(b.textContent));start?.addEventListener('click',closeSettings);
     }
   }
 }else if(modalIds.includes(name)){
   const overlay=document.getElementById('settingsOverlay');
   const original=document.getElementById('settingsOpen');
   if(overlay && original){
     const help=document.getElementById('helpOpen');
     if(help){const h=action('? Правила','ix-action ix-new-help');h.addEventListener('click',()=>help.click())}
     trigger=action('⚙ Настройки','ix-action ix-new-settings');trigger.setAttribute('aria-controls','settingsOverlay');trigger.setAttribute('aria-expanded','false');
     sync=()=>{let opened=overlay.classList.contains('open');trigger.setAttribute('aria-expanded',String(opened));trigger.textContent=opened?'× Закрыть':'⚙ Настройки'};
     openSettings=()=>original.click();
     closeSettings=()=>{if(overlay.classList.contains('open')){
       const x=overlay.querySelector('[data-close="settingsOverlay"]');if(x)x.click();else overlay.dispatchEvent(new MouseEvent('click',{bubbles:true}));
     }};
     trigger.addEventListener('click',()=>overlay.classList.contains('open')?closeSettings():openSettings());
     new MutationObserver(sync).observe(overlay,{attributes:true,attributeFilter:['class']});
   }
 }else if(name==='cave/index'){
   const native=document.getElementById('btnSettings'),overlay=document.getElementById('overlay');
   if(native&&overlay){
     trigger=action('⚙ Настройки','ix-action ix-new-settings');trigger.setAttribute('aria-controls','overlay');
     const isSettings=()=>!overlay.classList.contains('hidden')&&!!overlay.querySelector('.settings-panel');
     sync=()=>{let s=isSettings();trigger.setAttribute('aria-expanded',String(s));trigger.textContent=s?'× Закрыть':'⚙ Настройки'};
     closeSettings=()=>{if(isSettings())overlay.querySelector('#sClose')?.click()};
     openSettings=()=>native.click();
     trigger.addEventListener('click',()=>isSettings()?closeSettings():openSettings());
     new MutationObserver(sync).observe(overlay,{attributes:true,attributeFilter:['class','childList'],childList:true});
   }
 }else if(name==='memo'){
   trigger=action('⚙ Настройки','ix-action ix-new-settings');
   trigger.addEventListener('click',()=>{
     if(!document.getElementById('game')?.classList.contains('hidden'))window.toSettings?.();
     document.getElementById('size')?.focus({preventScroll:true});
     document.getElementById('startScreen')?.scrollIntoView({block:'nearest',behavior:'smooth'});
   });
 }else if(name==='pathfinder'){
   const dynamicLabel=document.getElementById('headerLabel');
   if(dynamicLabel){const small=header.querySelector('.ix-label small');small.replaceWith(dynamicLabel);dynamicLabel.style.cssText='font-size:11px;color:#7285A3;font-weight:750;max-width:170px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis'}
   trigger=action('⚙ Настройки','ix-action ix-new-settings');
   trigger.addEventListener('click',()=>{const back=document.getElementById('headerBack');if(back&&!back.hidden)back.click();else document.getElementById('detailsToggle')?.focus()});
 }
 // Речь идёт только о внешнем слое: ошибки, таймеры, хранилища игр не меняем.
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&trigger?.getAttribute('aria-expanded')==='true'){closeSettings()}});
})()