/* Отдельный демонстрационный слой общего UI. Никакой модификации игровой логики. */
(()=>{
 'use strict';
 const cfg={findnumber:{title:'Найди цифру',type:'number'},slogolaz:{title:'Слоголаз',type:'climb'},syllablebuilder:{title:'Построй слово',type:'word'}}[document.currentScript?.dataset.game];
 if(!cfg)return;
 const body=document.body;
 body.classList.add('ix-'+cfg.type);
 const header=document.createElement('header');
 header.className='ix-header';
 header.setAttribute('aria-label','Навигация Искорки');
 header.innerHTML=`<a class="ix-home" href="../index.html" aria-label="Все игры, на главную">← <span class="ix-home-word">Все игры</span></a>
 <div class="ix-identity"><span class="ix-mascot"><img src="../assets/icons/squirrel-192.png" alt=""></span><span class="ix-label"><strong>${cfg.title}</strong><small>NeuroX · Подготовка к школе</small></span></div>
 <button type="button" class="ix-action" id="ix-settings-trigger" aria-controls="${cfg.type==='climb'?'settingsOverlay':cfg.type==='number'?'panel':'settingsCard'}" aria-expanded="false"><span aria-hidden="true" class="ix-settings-icon">⚙</span><span class="ix-settings-caption">Настройки</span></button>`;
 body.insertBefore(header,body.firstChild);
 const trigger=document.getElementById('ix-settings-trigger');
 const caption=trigger.querySelector('.ix-settings-caption');
 let backdrop=null,panel=null,closeBtn=null;
 function sync(isOpen){trigger.setAttribute('aria-expanded',String(isOpen));caption.textContent=isOpen?'Закрыть':'Настройки';if(cfg.type==='climb')body.classList.toggle('ix-settings-visible',isOpen);}
 function close(){
   if(cfg.type==='climb'){
     const ov=document.getElementById('settingsOverlay');
     if(ov&&!ov.classList.contains('hidden'))document.getElementById('btnCloseSettings')?.click();
   }else{
     panel?.classList.remove('ix-open');body.classList.remove('ix-settings-visible');
   }
   sync(false);
 }
 function open(){
   if(cfg.type==='climb'){
     document.getElementById('btnSettings')?.click();
     sync(!!document.getElementById('settingsOverlay')&&!document.getElementById('settingsOverlay').classList.contains('hidden'));
   }else{
     panel?.classList.add('ix-open');body.classList.add('ix-settings-visible');sync(true);
     closeBtn?.focus({preventScroll:true});
   }
 }
 trigger.addEventListener('click',()=>trigger.getAttribute('aria-expanded')==='true'?close():open());
 if(cfg.type==='number'||cfg.type==='word'){
   backdrop=document.createElement('div');backdrop.className='ix-backdrop';backdrop.setAttribute('aria-hidden','true');body.appendChild(backdrop);
   backdrop.addEventListener('click',close);
   panel=document.getElementById(cfg.type==='number'?'panel':'settingsCard');
   const panelHead=document.createElement('div');panelHead.className='ix-panel-head';
   panelHead.innerHTML='<span>⚙ Настройки игры</span><button type="button" class="ix-panel-close" aria-label="Закрыть настройки" title="Закрыть">×</button>';
   closeBtn=panelHead.querySelector('button');closeBtn.addEventListener('click',close);
   panel?.insertBefore(panelHead,panel.firstChild);
   if(cfg.type==='number'){
     const wrap=document.getElementById('wrap');
     const hud=document.createElement('div');hud.className='ix-number-hud';
     for(const id of ['target','timer']){const el=document.getElementById(id);if(el)hud.appendChild(el);}
     wrap?.appendChild(hud);
   }
 }
 if(cfg.type==='word'){
   // Положительное применение настроек возвращает в игровое поле. При ошибке оставляем панель открытой.
   document.getElementById('startBtn')?.addEventListener('click',()=>{if(document.getElementById('settingsError')?.hidden)close();});
 }
 if(cfg.type==='climb'){
   const settingsOv=document.getElementById('settingsOverlay');
   const settingsCard=settingsOv?.querySelector('.settings-card');
   if(settingsCard){
     const top=document.createElement('div');top.className='ix-panel-head';
     top.innerHTML='<span>⚙ Настройки игры</span><button type="button" class="ix-panel-close" aria-label="Закрыть настройки" title="Закрыть">×</button>';
     top.querySelector('button').addEventListener('click',close);
     settingsCard.insertBefore(top,settingsCard.firstChild);
   }
   // Состояние обновляется при закрытии существующими игровыми кнопками.
   new MutationObserver(()=>sync(!settingsOv.classList.contains('hidden'))).observe(settingsOv,{attributes:true,attributeFilter:['class']});
 }
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&trigger.getAttribute('aria-expanded')==='true'){e.preventDefault();close();}});
})();
