/* NeuroX · Панель педагога: демонстрация, шторка, аннотации и независимый таймер. */
(()=>{
'use strict';
if(window.__nxTeacherPanelLoaded)return;window.__nxTeacherPanelLoaded=true;
const script=document.currentScript;
const cssUrl=new URL('teacher-panel.css',script.src).href;
const style=document.createElement('link');style.rel='stylesheet';style.href=cssUrl;document.head.append(style);
function boot(){
if(document.getElementById('nx-teacher-launch'))return;
const icon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="4" width="18" height="15" rx="2"/><path d="M8 23v-4m8 4v-4M7 9h10M7 13h6"/></svg>';
const ti=(content)=>`<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${content}</svg>`;
const tiIcons={
 demo:ti('<rect x="3" y="3" width="18" height="15" rx="2"/><path d="M8 22h8m-4-4v4"/>'),
 curtain:ti('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 10h18m-9-7v7"/>'),
 draw:ti('<path d="m4 20 4-.8L20 7.2 16.8 4 4.8 16zM14.5 6.3l3.2 3.2"/>'),
 timer:ti('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>'),
 screen:ti('<path d="M8 3H4a1 1 0 0 0-1 1v4m13-5h4a1 1 0 0 1 1 1v4M3 16v4a1 1 0 0 0 1 1h4m13-5v4a1 1 0 0 1-1 1h-4"/>'),
 spot:ti('<circle cx="12" cy="12" r="5"/><path d="M3 9V5a2 2 0 0 1 2-2h4m6 0h4a2 2 0 0 1 2 2v4m0 6v4a2 2 0 0 1-2 2h-4m-6 0H5a2 2 0 0 1-2-2v-4"/>'),
 loupe:ti('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 6 6M8 10.5h5m-2.5-2.5v5"/>'),
 pointer:ti('<path d="M5 3v16l4-4 3.5 6 2.8-1.7-3.6-6.1 7.3-.6z"/>'),
 tv:ti('<rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 22h8M12 18v4"/><path d="m8 9 3 3 5-5"/>')
};
const launch=document.createElement('button');launch.id='nx-teacher-launch';launch.type='button';launch.title='Панель педагога';launch.setAttribute('aria-label','Панель педагога');launch.setAttribute('aria-expanded','false');launch.innerHTML=icon;
const panel=document.createElement('aside');panel.id='nx-teacher-panel';panel.setAttribute('aria-label','Панель педагога');
panel.innerHTML=`<div class="nx-teacher-title"><span>Панель педагога</span><button type="button" class="nx-teacher-btn" id="nxt-close" aria-label="Закрыть панель">×</button></div>
<div id="nxt-tv-indicators" class="nx-tv-indicators" role="status" aria-live="polite" hidden>
 <span id="nxt-tv-link-state" class="nx-tv-indicator" data-status="off">ТВ: не подключён</span>
 <span id="nxt-tv-video-state" class="nx-tv-indicator" data-status="off">Видео: остановлено</span>
 <span id="nxt-tv-curtain-state" class="nx-tv-indicator" data-status="off">Шторка: —</span>
</div>
<div class="nx-teacher-grid">
<button type="button" class="nx-teacher-btn" id="nxt-demo" aria-pressed="false">${tiIcons.demo}<span>Демонстрация</span></button>
<button type="button" class="nx-teacher-btn" id="nxt-fullscreen" aria-pressed="false">${tiIcons.screen}<span>Полный экран</span></button>
<button type="button" class="nx-teacher-btn" id="nxt-tv-toggle" aria-pressed="false">${tiIcons.tv}<span>Экран ребёнка</span></button>
<button type="button" class="nx-teacher-btn" id="nxt-curtain" aria-pressed="false">${tiIcons.curtain}<span>Шторка</span></button>
<button type="button" class="nx-teacher-btn" id="nxt-spotlight" aria-pressed="false">${tiIcons.spot}<span>Прожектор</span></button>
<button type="button" class="nx-teacher-btn" id="nxt-loupe" aria-pressed="false">${tiIcons.loupe}<span>Лупа</span></button>
<button type="button" class="nx-teacher-btn" id="nxt-pointer" aria-pressed="false">${tiIcons.pointer}<span>Указка</span></button>
<button type="button" class="nx-teacher-btn" id="nxt-draw" aria-pressed="false">${tiIcons.draw}<span>Рисовать</span></button>
<button type="button" class="nx-teacher-btn" id="nxt-timer-toggle" aria-pressed="false">${tiIcons.timer}<span>Таймер</span></button>
</div>
<div id="nxt-fullscreen-status" class="nx-teacher-small" role="status" hidden></div>

<div id="nxt-tv-options" class="nx-teacher-options" hidden>
 <div class="nx-teacher-small"><b>Чистый экран ребёнка:</b> в эфир идёт только игровая область. Настройки, шапка и панель педагога не передаются. Нужен браузер с поддержкой Element Capture (например, Chrome для компьютера). Если функции нет, передача не запустится, а не покажет ребёнку всю вкладку.</div>
 <label class="nx-tv-field-label" for="nxt-tv-region">Что показывать на ТВ</label>
 <div class="nx-teacher-row"><select id="nxt-tv-region" aria-label="Область игрового поля"></select><button type="button" class="nx-teacher-btn" id="nxt-tv-refresh">Обновить</button><button type="button" class="nx-teacher-btn" id="nxt-tv-pick">Выбрать на странице</button></div>
 <div id="nxt-tv-region-status" class="nx-teacher-small">Выбери игровое поле, которое увидит ребёнок.</div>
 <label class="nx-tv-field-label" for="nxt-tv-quality">Качество передачи</label>
 <div class="nx-teacher-row"><select id="nxt-tv-quality" aria-label="Качество передачи на телевизор"><option value="sharp" selected>Максимальная чёткость</option><option value="motion">Плавное движение</option></select></div>
 <div id="nxt-tv-quality-info" class="nx-teacher-small">Приоритет чёткости: до 18 Мбит/с и 30 кадров/с. Реальное качество зависит от браузера и разрешения игрового поля.</div>
 <div id="nxt-tv-metrics" class="nx-teacher-small" role="status">Разрешение изображения появится после начала трансляции.</div>
 <div class="nx-teacher-row"><button type="button" class="nx-teacher-btn" id="nxt-tv-open">1. Открыть окно ТВ</button><button type="button" class="nx-teacher-btn" id="nxt-tv-start" disabled>2. Передавать чистое поле</button></div>
 <div class="nx-teacher-row"><button type="button" class="nx-teacher-btn nx-tv-curtain-control" id="nxt-tv-curtain" aria-pressed="true" disabled>Открыть шторку на ТВ</button><button type="button" class="nx-teacher-btn" id="nxt-tv-stop" disabled>Остановить показ</button></div>
 <div id="nxt-tv-status" class="nx-teacher-small" role="status" aria-live="polite">Сначала открой окно на телевизоре.</div>
 <div class="nx-teacher-small">Подключение: <b>Win + P → Расширить</b>, затем перенеси окно ребёнка на ТВ и нажми «На весь экран». Для захвата в запросе браузера выбери <b>именно эту вкладку NeuroX</b>. Шторка закрывает только ТВ. Быстро переключить её: <b>Ctrl + Alt + 9</b>. При смене страницы тренажёра показ нужно запустить заново.</div>
</div>
<div id="nxt-spot-options" class="nx-teacher-options" hidden>
 <div class="nx-teacher-small">Освещённый круг следует за мышью или пальцем. Нажатия не передаются в игру.</div>
 <div class="nx-teacher-row"><label>Диаметр <input id="nxt-spot-size" type="range" min="120" max="560" step="20" value="300"></label><label>Затемнение <input id="nxt-spot-dim" type="range" min="40" max="94" step="2" value="78"></label></div>
</div>
<div id="nxt-loupe-options" class="nx-teacher-options" hidden>
 <div class="nx-teacher-small">Для живой лупы разреши браузеру показ <b>этой вкладки NeuroX</b>. Изображение обрабатывается только в браузере, без отправки на сервер.</div>
 <div class="nx-teacher-row"><label>Увеличение <select id="nxt-loupe-zoom"><option value="1.5">1,5×</option><option value="2" selected>2×</option><option value="2.5">2,5×</option><option value="3">3×</option></select></label></div>
 <div id="nxt-loupe-status" class="nx-teacher-small" role="status"></div>
</div>
<div id="nxt-pointer-options" class="nx-teacher-options" hidden>
 <div class="nx-teacher-small">Яркая указка следует за курсором. Клики в играх работают как обычно.</div>
 <div class="nx-teacher-row"><label>Цвет <input id="nxt-pointer-color" type="color" value="#ff6a00"></label><label>Размер <input id="nxt-pointer-size" type="range" min="22" max="70" step="4" value="38"></label><label class="nx-teacher-check"><input type="checkbox" id="nxt-pointer-trail" checked> След</label></div>
</div>
<div id="nxt-draw-options" class="nx-teacher-options" hidden><div class="nx-teacher-small">Аннотации поверх экрана (игра не принимает касания)</div><div class="nx-teacher-row"><label>Цвет <input id="nxt-color" type="color" value="#ff6a00"></label><label>Толщина <input id="nxt-width" type="range" min="2" max="18" value="5"></label></div><div class="nx-teacher-row"><button type="button" class="nx-teacher-btn" id="nxt-pen" aria-pressed="true">Карандаш</button><button type="button" class="nx-teacher-btn" id="nxt-eraser" aria-pressed="false">Ластик</button><button type="button" class="nx-teacher-btn" id="nxt-undo">Отмена</button><button type="button" class="nx-teacher-btn" id="nxt-clear">Очистить</button></div></div>
<div id="nxt-timer-options" class="nx-teacher-options" hidden>
 <div class="nx-teacher-row"><label>Режим <select id="nxt-time-mode"><option value="countdown">Обратный отсчёт</option><option value="stopwatch">Секундомер</option></select></label></div>
 <div class="nx-teacher-row"><div id="nxt-countdown-fields" class="nx-teacher-row"><label>Мин <input type="number" id="nxt-min" min="0" max="180" value="1"></label><label>Сек <input type="number" id="nxt-sec" min="0" max="59" value="0"></label></div><span id="nxt-clock" class="nx-teacher-clock" role="timer">01:00</span></div>
 <div class="nx-teacher-row"><button type="button" class="nx-teacher-btn" id="nxt-start">Старт</button><button type="button" class="nx-teacher-btn" id="nxt-pause">Пауза</button><button type="button" class="nx-teacher-btn" id="nxt-reset">Сброс</button></div>
 <div class="nx-teacher-small">Секундомер считает вверх, обратный отсчёт подаёт короткий сигнал в конце. Оба работают отдельно от игрового времени.</div>
</div>
<div class="nx-teacher-small">Шторка, прожектор, лупа и рисование не включаются одновременно.</div>`;
const curtain=document.createElement('div');curtain.id='nx-teacher-curtain';curtain.setAttribute('aria-hidden','true');curtain.innerHTML='<div class="nx-curtain-center">Задание закрыто</div>';
const canvas=document.createElement('canvas');canvas.id='nx-teacher-canvas';canvas.setAttribute('aria-label','Слой для рисования');
const spotlight=document.createElement('div');spotlight.id='nx-teacher-spotlight';spotlight.setAttribute('aria-hidden','true');
const loupeCanvas=document.createElement('canvas');loupeCanvas.id='nx-teacher-loupe-lens';loupeCanvas.setAttribute('aria-hidden','true');loupeCanvas.width=448;loupeCanvas.height=448;
const pointerLayer=document.createElement('div');pointerLayer.id='nx-teacher-pointer-layer';pointerLayer.setAttribute('aria-hidden','true');
const pointerDots=Array.from({length:6},(_,i)=>{const dot=document.createElement('span');dot.className='nx-pointer-dot';dot.dataset.index=i;pointerLayer.append(dot);return dot});
const demoExit=document.createElement('button');demoExit.id='nx-teacher-demo-exit';demoExit.type='button';demoExit.textContent='Выйти из показа';
const miniClock=document.createElement('button');miniClock.id='nx-teacher-mini-clock';miniClock.type='button';miniClock.setAttribute('aria-label','Открыть таймер педагога');miniClock.textContent='01:00';
document.body.append(launch,curtain,canvas,spotlight,loupeCanvas,pointerLayer,panel,demoExit,miniClock);
const $=id=>document.getElementById(id);
const stop=e=>e.stopPropagation();for(const type of ['click','pointerdown','pointerup','keydown','keyup','touchstart','touchend']){for(const node of [launch,panel,demoExit])node.addEventListener(type,stop)}
const state={demo:false,curtain:false,draw:false,spotlight:false,loupe:false,loupeStream:null,loupeVideo:null,loupeRAF:0,pointer:false,pointerRAF:0,pointerPosition:{x:innerWidth/2,y:innerHeight/2},timerVisible:false,timerMode:'countdown',pen:'pen',strokes:[],active:null,remaining:60,deadline:0,interval:0,running:false,stopwatchMs:0,stopwatchStart:0};
function setPanel(open){panel.classList.toggle('nx-open',open);launch.setAttribute('aria-expanded',String(open));}
launch.addEventListener('click',()=>setPanel(!panel.classList.contains('nx-open')));$('nxt-close').onclick=()=>setPanel(false);
function toggleDemo(force){state.demo=typeof force==='boolean'?force:!state.demo;document.body.classList.toggle('nx-teacher-demo',state.demo);$('nxt-demo').setAttribute('aria-pressed',String(state.demo)); // Do not force browser fullscreen: native controls may depend on it.
 if(state.demo){setPanel(false)}else{setPanel(true)}}
$('nxt-demo').onclick=()=>toggleDemo();demoExit.onclick=()=>toggleDemo(false);
// Полноэкранный режим браузера не связан с режимом демонстрации и не прячет игровое управление.
const fullscreenButton=$('nxt-fullscreen');
const fullscreenText=fullscreenButton.querySelector('span');
const fullscreenStatus=$('nxt-fullscreen-status');
const fullscreenRoot=document.documentElement;
function fullscreenElement(){return document.fullscreenElement || document.webkitFullscreenElement || null}
function syncFullscreen(){
 const active=!!fullscreenElement();
 fullscreenButton.setAttribute('aria-pressed',String(active));
 fullscreenText.textContent=active?'Выйти из полного экрана':'Полный экран';
 fullscreenButton.setAttribute('aria-label',active?'Выйти из полноэкранного режима':'Перейти в полноэкранный режим');
}
function fullscreenMessage(message){fullscreenStatus.textContent=message;fullscreenStatus.hidden=!message}
async function toggleFullscreen(){
 fullscreenMessage('');
 try{
  if(fullscreenElement()){
   const exit=document.exitFullscreen || document.webkitExitFullscreen;
   if(!exit)throw new Error('Не удалось выйти из полноэкранного режима');
   const task=exit.call(document);
   if(task && typeof task.then==='function')await task;
  }else{
   const enter=fullscreenRoot.requestFullscreen || fullscreenRoot.webkitRequestFullscreen;
   if(!enter)throw new Error('Полноэкранный режим не поддерживается этим браузером');
   // Запускаем запрос непосредственно по клику: браузеру нужен жест пользователя.
   const task=enter.call(fullscreenRoot);
   if(task && typeof task.then==='function')await task;
  }
 }catch(error){
  fullscreenMessage('Не удалось переключить полный экран. Проверь разрешения браузера.');
  console.warn('[NeuroX] Fullscreen:',error);
 }
 syncFullscreen();
}
fullscreenButton.addEventListener('click',toggleFullscreen);
document.addEventListener('fullscreenchange',syncFullscreen);
document.addEventListener('webkitfullscreenchange',syncFullscreen);
document.addEventListener('fullscreenerror',()=>{fullscreenMessage('Браузер не разрешил полный экран');syncFullscreen()});
document.addEventListener('webkitfullscreenerror',()=>{fullscreenMessage('Браузер не разрешил полный экран');syncFullscreen()});
syncFullscreen();

// --- Прожектор. Элементы под затемнением не получают нажатий. ---
function spotMove(x,y){spotlight.style.setProperty('--nx-spot-x',Math.round(x)+'px');spotlight.style.setProperty('--nx-spot-y',Math.round(y)+'px')}
function spotOptions(){spotlight.style.setProperty('--nx-spot-r',Math.round(Number($('nxt-spot-size').value)/2)+'px');spotlight.style.setProperty('--nx-spot-shade',`rgba(8,19,43,${Number($('nxt-spot-dim').value)/100})`)}
function setSpotlight(on){
 if(on){setCurtain(false);setDrawing(false);setLoupe(false);setPointer(false)}
 state.spotlight=!!on;spotlight.classList.toggle('nx-on',state.spotlight);
 $('nxt-spotlight').setAttribute('aria-pressed',String(state.spotlight));$('nxt-spot-options').hidden=!state.spotlight;
 if(on){spotOptions();spotMove(state.pointerPosition.x,state.pointerPosition.y);setPanel(true)}
}
$('nxt-spotlight').onclick=()=>setSpotlight(!state.spotlight);
for(const name of ['nxt-spot-size','nxt-spot-dim'])$(name).addEventListener('input',spotOptions);
spotlight.addEventListener('pointerdown',e=>{e.preventDefault();spotlight.setPointerCapture(e.pointerId);spotMove(e.clientX,e.clientY)});
spotlight.addEventListener('pointermove',e=>{spotMove(e.clientX,e.clientY)});
spotlight.addEventListener('click',e=>{e.preventDefault();e.stopPropagation()});

// --- Лупа. Только с явного разрешения на захват текущей вкладки. ---
const loupeCtx=loupeCanvas.getContext('2d');
let loupeLastFrame=0,loupeRequest=0;
function loupeStatus(text){$('nxt-loupe-status').textContent=text||''}
function stopLoupe(){
 loupeRequest++;
 state.loupe=false;cancelAnimationFrame(state.loupeRAF);state.loupeRAF=0;
 const stream=state.loupeStream;state.loupeStream=null;
 if(stream)for(const track of stream.getTracks())track.stop();
 if(state.loupeVideo){state.loupeVideo.pause();state.loupeVideo.srcObject=null;state.loupeVideo=null}
 loupeCanvas.classList.remove('nx-on');$('nxt-loupe').setAttribute('aria-pressed','false');$('nxt-loupe-options').hidden=true;
}
function placeLoupe(){
 const w=224,edge=10,x=state.pointerPosition.x,y=state.pointerPosition.y;
 const left=x+w+36<innerWidth?x+28:Math.max(edge,x-w-28);
 const top=y+w+30<innerHeight?y+18:Math.max(edge,y-w-18);
 loupeCanvas.style.left=Math.min(innerWidth-w-edge,Math.max(edge,left))+'px';
 loupeCanvas.style.top=Math.min(innerHeight-w-edge,Math.max(edge,top))+'px';
}
function renderLoupe(now){
 if(!state.loupe)return;
 state.loupeRAF=requestAnimationFrame(renderLoupe);
 if(now-loupeLastFrame<35)return;loupeLastFrame=now;
 const video=state.loupeVideo;
 if(!video||video.readyState<2||!video.videoWidth||!video.videoHeight)return;
 placeLoupe();
 const zoom=Number($('nxt-loupe-zoom').value)||2;
 const sxScale=video.videoWidth/innerWidth,syScale=video.videoHeight/innerHeight;
 const sw=Math.min(video.videoWidth,224/zoom*sxScale),sh=Math.min(video.videoHeight,224/zoom*syScale);
 const sx=Math.max(0,Math.min(video.videoWidth-sw,state.pointerPosition.x*sxScale-sw/2));
 const sy=Math.max(0,Math.min(video.videoHeight-sh,state.pointerPosition.y*syScale-sh/2));
 try{loupeCtx.clearRect(0,0,448,448);loupeCtx.drawImage(video,sx,sy,sw,sh,0,0,448,448)}catch(e){/* tab may be changing size */}
}
async function setLoupe(on){
 if(!on){stopLoupe();return}
 const request=++loupeRequest;
 setCurtain(false);setDrawing(false);setSpotlight(false);setPointer(false);
 $('nxt-loupe-options').hidden=false;
 loupeStatus('Выбери текущую вкладку NeuroX в запросе браузера.');
 if(!navigator.mediaDevices?.getDisplayMedia){loupeStatus('Браузер не поддерживает захват вкладки. Лупа доступна в Chromium через HTTPS.');return}
 try{
  // Вызов должен происходить непосредственно после нажатия — нужен жест пользователя.
  const stream=await navigator.mediaDevices.getDisplayMedia({video:{frameRate:{ideal:15}},audio:false,preferCurrentTab:true,selfBrowserSurface:'include'});
  if(request!==loupeRequest){for(const t of stream.getTracks())t.stop();return}
  const track=stream.getVideoTracks()[0];
  const surface=track?.getSettings?.().displaySurface;
  if(surface&&surface!=='browser'){
    for(const t of stream.getTracks())t.stop();
    loupeStatus('Выбери именно вкладку NeuroX, не весь экран или окно.');return;
  }
  if(!track){for(const t of stream.getTracks())t.stop();throw Error('Не получено видео')}
  const video=document.createElement('video');video.muted=true;video.playsInline=true;video.srcObject=stream;
  try{await video.play()}catch(e){for(const t of stream.getTracks())t.stop();throw e}
  if(request!==loupeRequest){for(const t of stream.getTracks())t.stop();video.pause();video.srcObject=null;return}
  state.loupeStream=stream;state.loupeVideo=video;state.loupe=true;
  track.addEventListener('ended',()=>{if(state.loupeStream===stream){stopLoupe();loupeStatus('Захват вкладки остановлен браузером.')}});
  loupeCanvas.classList.add('nx-on');$('nxt-loupe').setAttribute('aria-pressed','true');
  loupeStatus('Лупа работает. Для выключения нажми «Лупа» ещё раз.');
  loupeLastFrame=0;state.loupeRAF=requestAnimationFrame(renderLoupe);
 }catch(err){stopLoupe();$('nxt-loupe-options').hidden=false;loupeStatus(err?.name==='NotAllowedError'?'Доступ не предоставлен. Можно попробовать ещё раз.':'Не удалось запустить захват вкладки. Проверь разрешения браузера.');}
}
$('nxt-loupe').addEventListener('click',()=>{void setLoupe(!state.loupe)});

// --- Указка с ненавязчивым следом. Нажатия по игре проходят сквозь неё. ---
let pointerTrailPositions=[];
function drawPointer(){
 if(!state.pointer)return;
 const target=state.pointerPosition;
 // Trails are sampled on actual pointer moves, not repeated animation frames.
 if(!pointerTrailPositions.length)pointerTrailPositions=[{x:target.x,y:target.y,t:performance.now()}];
 const size=Number($('nxt-pointer-size').value)||38,color=$('nxt-pointer-color').value;
 pointerLayer.style.setProperty('--nx-pointer-color',color);
 const showTrail=$('nxt-pointer-trail').checked;
 pointerDots.forEach((dot,i)=>{
  const p=i===0?target:(pointerTrailPositions[Math.min(i-1,pointerTrailPositions.length-1)]||target);
  const d=Math.max(6,Math.round(size*(i===0?1:0.5-i*0.05)));
  dot.style.width=d+'px';dot.style.height=d+'px';dot.style.left=p.x+'px';dot.style.top=p.y+'px';
  dot.style.borderColor=color;dot.style.backgroundColor=i===0?'transparent':color;
  const age=i===0?0:performance.now()-(p.t||0);
  dot.style.opacity=i===0?'1':showTrail?String(Math.max(0,Math.min(1,1-age/560))*(Math.max(.08,.38-i*.045))):'0';
 });
 state.pointerRAF=requestAnimationFrame(drawPointer);
}
function setPointer(on){
 if(on){setCurtain(false);setDrawing(false);setSpotlight(false);setLoupe(false)}
 state.pointer=!!on;pointerLayer.classList.toggle('nx-on',state.pointer);
 $('nxt-pointer').setAttribute('aria-pressed',String(state.pointer));$('nxt-pointer-options').hidden=!state.pointer;
 cancelAnimationFrame(state.pointerRAF);state.pointerRAF=0;
 if(state.pointer){pointerTrailPositions=[];drawPointer();setPanel(true)}
}
$('nxt-pointer').onclick=()=>setPointer(!state.pointer);
window.addEventListener('pointermove',e=>{
 state.pointerPosition={x:e.clientX,y:e.clientY};
 if(state.pointer){pointerTrailPositions.unshift({x:e.clientX,y:e.clientY,t:performance.now()});if(pointerTrailPositions.length>12)pointerTrailPositions.length=12}
 if(state.spotlight)spotMove(e.clientX,e.clientY);
},{passive:true});

function setCurtain(on){state.curtain=on;curtain.classList.toggle('nx-on',on);$('nxt-curtain').setAttribute('aria-pressed',String(on));if(on){setDrawing(false);setSpotlight(false);setLoupe(false);setPointer(false);setPanel(false)}}
$('nxt-curtain').onclick=()=>setCurtain(!state.curtain);
// Allow revealing a covered lesson without accessing the game below it.
curtain.addEventListener('click',e=>{if(e.target===curtain||e.target.closest('.nx-curtain-center'))setCurtain(false)});
function resize(){const ratio=Math.max(1,window.devicePixelRatio||1);canvas.width=Math.round(innerWidth*ratio);canvas.height=Math.round(innerHeight*ratio);canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(ratio,0,0,ratio,0,0);repaint()}
const ctx=canvas.getContext('2d');
function repaint(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const stroke of state.strokes){if(stroke.points.length===0)continue;ctx.save();ctx.globalCompositeOperation=stroke.mode==='eraser'?'destination-out':'source-over';ctx.strokeStyle=stroke.color;ctx.lineWidth=stroke.width;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(stroke.points[0][0]*innerWidth,stroke.points[0][1]*innerHeight);if(stroke.points.length===1){ctx.lineTo(stroke.points[0][0]*innerWidth+.01,stroke.points[0][1]*innerHeight+.01)}else for(const p of stroke.points.slice(1))ctx.lineTo(p[0]*innerWidth,p[1]*innerHeight);ctx.stroke();ctx.restore()}}
function setDrawing(on){state.draw=on;canvas.classList.toggle('nx-on',on);$('nxt-draw').setAttribute('aria-pressed',String(on));$('nxt-draw-options').hidden=!on;if(on){setCurtain(false);setSpotlight(false);setLoupe(false);setPointer(false);resize();setPanel(true)}}
$('nxt-draw').onclick=()=>setDrawing(!state.draw);
function setPen(mode){state.pen=mode;$('nxt-pen').setAttribute('aria-pressed',String(mode==='pen'));$('nxt-eraser').setAttribute('aria-pressed',String(mode==='eraser'))}
$('nxt-pen').onclick=()=>setPen('pen');$('nxt-eraser').onclick=()=>setPen('eraser');$('nxt-clear').onclick=()=>{state.strokes=[];repaint()};$('nxt-undo').onclick=()=>{state.strokes.pop();repaint()};
const point=e=>[Math.max(0,Math.min(1,e.clientX/innerWidth)),Math.max(0,Math.min(1,e.clientY/innerHeight))];
canvas.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();canvas.setPointerCapture(e.pointerId);state.active={mode:state.pen,color:$('nxt-color').value,width:Number($('nxt-width').value),points:[point(e)]};state.strokes.push(state.active);repaint()});
canvas.addEventListener('pointermove',e=>{if(!state.active)return;e.preventDefault();state.active.points.push(point(e));repaint()});
for(const event of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(event,()=>state.active=null);
window.addEventListener('resize',()=>{if(state.draw)resize()});
function limits(){return Math.min(10800,Math.max(0,Math.floor(Number($('nxt-min').value)||0)*60+Math.floor(Number($('nxt-sec').value)||0)))}
function fmt(n){n=Math.max(0,Math.floor(n));const sec=Math.floor(n%60),min=Math.floor(n/60)%60,hr=Math.floor(n/3600);return (hr?String(hr).padStart(2,'0')+':':'')+String(min).padStart(2,'0')+':'+String(sec).padStart(2,'0')}
function clock(){
 const stopwatch=state.timerMode==='stopwatch';
 const n=stopwatch?Math.floor(state.stopwatchMs/1000):Math.ceil(state.remaining);
 const value=fmt(n);$('nxt-clock').textContent=value;miniClock.textContent=value;
 $('nxt-clock').classList.toggle('nx-finished',!stopwatch&&state.remaining===0);
 miniClock.classList.toggle('nx-show',state.running||state.timerVisible&&(stopwatch?state.stopwatchMs>0:state.remaining===0));
}
function signal(){try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;const a=new AC(),o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=640;g.gain.value=.06;o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+.23);o.onended=()=>a.close()}catch(e){/* sound may be unavailable */}}
function pause(){
 if(state.running){
  if(state.timerMode==='stopwatch')state.stopwatchMs=Math.max(0,performance.now()-state.stopwatchStart);
  else state.remaining=Math.max(0,Math.ceil((state.deadline-Date.now())/1000));
 }
 state.running=false;clearInterval(state.interval);state.interval=0;clock();
}
function tick(){
 if(state.timerMode==='stopwatch')state.stopwatchMs=Math.max(0,performance.now()-state.stopwatchStart);
 else state.remaining=Math.max(0,Math.ceil((state.deadline-Date.now())/1000));
 clock();
 if(state.timerMode==='countdown'&&state.remaining===0){pause();signal()}
}
function start(){
 if(state.running)return;
 if(state.timerMode==='countdown'){
  if(state.remaining<=0)state.remaining=limits();if(state.remaining<=0)return;
  state.deadline=Date.now()+state.remaining*1000;
 }else state.stopwatchStart=performance.now()-state.stopwatchMs;
 state.running=true;state.interval=setInterval(tick,160);tick();
}
function resetTime(){pause();if(state.timerMode==='stopwatch')state.stopwatchMs=0;else state.remaining=limits();clock()}
$('nxt-start').onclick=start;$('nxt-pause').onclick=pause;$('nxt-reset').onclick=resetTime;
$('nxt-time-mode').addEventListener('change',()=>{
 pause();state.timerMode=$('nxt-time-mode').value;
 $('nxt-countdown-fields').hidden=state.timerMode==='stopwatch';
 resetTime();
});
for(const id of ['nxt-min','nxt-sec'])$(id).addEventListener('change',()=>{if(!state.running&&state.timerMode==='countdown'){state.remaining=limits();clock()}});
$('nxt-timer-toggle').onclick=()=>{state.timerVisible=!state.timerVisible;$('nxt-timer-options').hidden=!state.timerVisible;$('nxt-timer-toggle').setAttribute('aria-pressed',String(state.timerVisible));clock()};
miniClock.onclick=()=>{state.timerVisible=true;$('nxt-timer-options').hidden=false;$('nxt-timer-toggle').setAttribute('aria-pressed','true');setPanel(true)};
// --- Режим двух экранов: передаётся только выбранный DOM-элемент.
// Element Capture (track.restrictTo) исключает любые накладывающиеся элементы.
// Если браузер не поддерживает эту функцию, НЕ делаем небезопасный захват всей вкладки.
const tv={viewer:null,session:'',ready:false,stream:null,peer:null,iceQueue:[],curtained:true,
 confirmedCurtain:null,playback:false,lastSeen:0,opening:false,region:null,regions:[],picking:false,connection:'off',styledRegion:null,oldIsolation:null,oldTransformStyle:null,receivedWidth:0,receivedHeight:0,receivedFps:0};
const tvToggle=$('nxt-tv-toggle'),tvOptions=$('nxt-tv-options'),tvOpen=$('nxt-tv-open'),tvStart=$('nxt-tv-start'),tvCurtain=$('nxt-tv-curtain'),tvStop=$('nxt-tv-stop'),tvStatus=$('nxt-tv-status');
const tvIndicators=$('nxt-tv-indicators'),tvLinkState=$('nxt-tv-link-state'),tvVideoState=$('nxt-tv-video-state'),tvCurtainState=$('nxt-tv-curtain-state');
const tvRegionSelect=$('nxt-tv-region'),tvRegionStatus=$('nxt-tv-region-status');
const tvTarget=new URL('student-screen.html',script.src);
// Высокий битрейт и сохранение разрешения важнее экономии пропускной способности.
// Эти значения — ориентиры/верхние границы, фактический поток выбирает браузер.
const tvQualityModes={
 sharp:{label:'Максимальная чёткость',bitrate:18000000,framerate:30,contentHint:'text'},
 motion:{label:'Плавное движение',bitrate:14000000,framerate:50,contentHint:'motion'}
};
const tvQualitySelect=$('nxt-tv-quality'),tvQualityInfo=$('nxt-tv-quality-info'),tvMetrics=$('nxt-tv-metrics');
function tvQuality(){return tvQualityModes[tvQualitySelect.value]||tvQualityModes.sharp}
function tvQualityDescription(){
 const q=tvQuality();tvQualityInfo.textContent=q===tvQualityModes.sharp?
 'Приоритет чёткости: до 18 Мбит/с и 30 кадров/с. Размер игрового поля на ноутбуке ограничивает детализацию.':
 'Приоритет движения: до 14 Мбит/с и 50 кадров/с. При нехватке ресурсов плавность может снижаться.';
}
function tvResolution(n){return Number.isFinite(+n)&&+n>0?Math.round(+n):0}
function tvMetricsText(){
 const track=tv.stream?.getVideoTracks()[0];
 const t=track?.getSettings?.()||{};
 const a=tvResolution(t.width),b=tvResolution(t.height),x=tvResolution(tv.receivedWidth),y=tvResolution(tv.receivedHeight);
 const src=a&&b?`${a} × ${b}`:'не определено',dst=x&&y?`${x} × ${y}`:'ожидание';
 tvMetrics.textContent=tv.stream?`Захват: ${src} px · На ТВ: ${dst} px${tv.receivedFps?' · '+Math.round(tv.receivedFps)+' кадр/с':''}`:
 'Разрешение изображения появится после начала трансляции.';
 if(x&&y&&Math.min(x,y)<650){tvMetrics.textContent+=' · Низкое разрешение: увеличь поле на ноутбуке.'}
}
tvQualitySelect.addEventListener('change',()=>{tvQualityDescription();if(tv.stream)tvNote('Чтобы применить новое качество, останови и заново запусти передачу.');});
tvQualityDescription();
function tvNote(message){tvStatus.textContent=message}
function tvPopupOpen(){try{return !!tv.viewer&&!tv.viewer.closed}catch(e){return false}}
function tvPost(type,data={}){if(!tvPopupOpen())return;
 try{tv.viewer.postMessage({neuroxTV:true,session:tv.session,type,...data},location.origin)}catch(e){tvNote('Не удалось связаться с окном телевизора.')}}
function tvConnectionAlive(){return tvPopupOpen()&&tv.ready&&Date.now()-tv.lastSeen<8500}
function tvBadge(node,txt,status){node.textContent=txt;node.dataset.status=status}
function syncTV(){
 const popup=tvPopupOpen(),online=tvConnectionAlive();
 if(!popup){tv.ready=false;tv.playback=false;tv.confirmedCurtain=null}
 tvIndicators.hidden=!popup && !tv.stream;
 tvLinkState.title='Состояние связи с окном ребёнка. Физическое подключение телевизора браузер не проверяет.';
 tvBadge(tvLinkState,online?'ТВ: подключён':popup?'ТВ: ожидание связи':'ТВ: не подключён',online?'ok':popup?'wait':'off');
 const hasStream=tv.stream?.getVideoTracks().some(t=>t.readyState==='live');
 tvBadge(tvVideoState,tv.playback&&online?'Видео: идёт':hasStream?'Видео: подключается':'Видео: остановлено',tv.playback&&online?'ok':hasStream?'wait':'off');
 const confirmed=online&&tv.confirmedCurtain!==null&&tv.confirmedCurtain===tv.curtained;
 tvBadge(tvCurtainState,confirmed?`Шторка: ${tv.curtained?'закрыта':'открыта'}`:popup?'Шторка: проверка…':'Шторка: —',confirmed?(tv.curtained?'closed':'ok'):'wait');
 tvOpen.textContent=popup?'Показать окно ТВ':'1. Открыть окно ТВ';
 tvMetricsText();
 tvStart.disabled=!online||!!tv.stream||!tv.region;
 tvRegionSelect.disabled=!!tv.stream;$('nxt-tv-refresh').disabled=!!tv.stream;$('nxt-tv-pick').disabled=!!tv.stream;
 tvStop.disabled=!tv.stream;
 tvCurtain.disabled=!online;
 tvCurtain.textContent=tv.curtained?'Открыть шторку на ТВ':'Закрыть шторку на ТВ';
 tvCurtain.setAttribute('aria-pressed',String(tv.curtained));
 tvToggle.setAttribute('aria-pressed',String(!!tv.stream));
 launch.dataset.tvStatus=online?(tv.playback?'live':'connected'):'off';
 tvToggle.setAttribute('title',online?`Телевизор подключён; ${tv.playback?'видео идёт':'показ не запущен'}; шторка ${tv.curtained?'закрыта':'открыта'}`:'Экран ребёнка');
}
function restoreTVRegion(){
 if(tv.styledRegion){tv.styledRegion.style.isolation=tv.oldIsolation;tv.styledRegion.style.transformStyle=tv.oldTransformStyle}
 tv.styledRegion=null;tv.oldIsolation=null;tv.oldTransformStyle=null;
}
function tvClosePeer(){if(tv.peer){try{tv.peer.onicecandidate=null;tv.peer.close()}catch(e){}tv.peer=null}tv.iceQueue=[];tv.connection='off'}
function stopTV({notify=true}={}){
 tvClosePeer();const s=tv.stream;tv.stream=null;tv.playback=false;tv.receivedWidth=tv.receivedHeight=tv.receivedFps=0;restoreTVRegion();
 if(s)s.getTracks().forEach(t=>{try{t.stop()}catch(e){}});
 if(notify)tvPost('stopped');
 tvNote(tvPopupOpen()?'Показ остановлен. Можно снова выбрать игровую область.':'Показ остановлен.');syncTV();
}
function showTVWindow(){
 if(tvPopupOpen()){try{tv.viewer.focus()}catch(e){}syncTV();return}
 stopTV({notify:false});tv.session=crypto?.randomUUID?.()||`${Date.now()}-${Math.random()}`;
 tv.ready=false;tv.curtained=true;tv.confirmedCurtain=null;tv.playback=false;tv.lastSeen=0;
 const viewerUrl=new URL(tvTarget);viewerUrl.searchParams.set('session',tv.session);
 tv.viewer=window.open(viewerUrl.href,'nxStudentViewer','popup,width=1200,height=750');
 if(!tv.viewer){tvNote('Разреши всплывающие окна для NeuroX.');syncTV();return}
 tvNote('Окно открыто. Перетащи его на телевизор и дождись статуса подключения.');syncTV();
}
// Предпочитаем сцену и игровое поле, а не страницу целиком.
const tvKnownAreas={
 'attention/radar.html':['#board','#radarCanvas'],
 'attention/quiet-glitch.html':['#grid','.game-column'],
 'attention/invisible-walls.html':['#world','main.play','.screen'],
 'attention/peripheral.html':['#scene'],
 'attention/meeting-point.html':['#stage','#field'],
 'attention/negative.html':['#board'],
 'attention/editor.html':['.stage'],
 'attention/decoy.html':['#field','.fieldframe'],
 'attention/counter.html':['#stage'],
 'memory/restorer.html':['#artboard','#scene'],
 'memory/keys.html':['.board-area','.board-panel'],
 'memory/last-four.html':['.play-panel','#signalDisplay'],
 'generators/proba.html':['.field-wrapper'],
 'generators/elochki.html':['.nx-generator-preview','.game-layout'],
 'generators/naidi_bukvu.html':['.paper'],
 'generators/nitki.html':['.paper']
};
const tvGeneric=['[data-nx-tv-area]','#radarCanvas','#board','#world','#scene','#stage','#field','#artboard','#grid','#playing','#game','#maze',
 '.board-area','.board','.artboard','.game-board','.game-field','.game-screen','.game-stage','.arena','.scene','.grid','.stage',
 '.correction-field','.field-wrapper','.sheet','.paper','.work-area','.play-area','main.game','.play-panel','main.play','main.work',
 '.nx-generator-preview','canvas','main'];
function tvNotTool(el){
 if(!el||!el.isConnected||!document.body.contains(el))return false;
 if(el.closest('#nx-teacher-panel,#nx-teacher-launch,#nx-unified-bar,#nx-drawer,header,nav,aside,footer,.nx-tv-pick-shield'))return false;
 if(el.matches('body,html,header,nav,footer,aside,button,input,select,textarea,script,style'))return false;
 // Не выбираем контейнеры, включающие настройки педагога и навигацию.
 if(el.querySelector('aside, nav, header, .settings-panel, .config-panel, .sidebar, .nx-teacher-panel, [data-teacher-only], #nx-unified-bar, #nx-drawer'))return false;
 const css=getComputedStyle(el),r=el.getBoundingClientRect();
 return css.display!=='none'&&css.visibility!=='hidden'&&r.width>=150&&r.height>=100&&r.width<=innerWidth+100;
}
function tvCandidateLabel(el){
 const id=el.id?'#'+el.id:'';
 const cls=Array.from(el.classList).filter(c=>!c.startsWith('nx-')).slice(0,2).map(c=>'.'+c).join('');
 return (el.tagName.toLowerCase()==='canvas'?'Игровое поле · ':el.tagName.toLowerCase()==='svg'?'Сцена · ':'Область · ')+(id||cls||el.tagName.toLowerCase());
}
function tvPathKey(){const match=location.pathname.match(/\/(attention|memory|preschool|math|reading|other|generators)\/([^/]+\.html)$/);return match?match[1]+'/'+match[2]:''}
function refreshTVRegions(preferred=null){
 if(tv.stream){tvNote('Сначала останови показ, чтобы сменить область.');return}
 const selected=preferred||tv.region,arr=[],seen=new Set();
 const add=el=>{if(tvNotTool(el)&&!seen.has(el)){seen.add(el);arr.push(el)}};
 for(const sel of [...(tvKnownAreas[tvPathKey()]||[]),...tvGeneric]){
  try{document.querySelectorAll(sel).forEach(add)}catch(e){}
 }
 tv.regions=arr.slice(0,25);
 tvRegionSelect.replaceChildren();
 for(const el of tv.regions){const opt=document.createElement('option');opt.value=String(tv.regions.indexOf(el));opt.textContent=tvCandidateLabel(el);tvRegionSelect.append(opt)}
 tv.region=tv.regions.includes(selected)?selected:tv.regions[0]||null;
 tvRegionSelect.value=tv.region?String(tv.regions.indexOf(tv.region)):'';
 tvRegionStatus.textContent=tv.region?'На ТВ попадёт выбранная область и её содержимое, но не элементы поверх неё. Проверь выбор перед открытием шторки.':'Область игры не найдена. Нажми «Выбрать на странице».';
 syncTV();
}
function pickTVRegion(){
 if(tv.picking)return;if(tv.stream){tvNote('Сначала останови трансляцию, затем меняй игровую область.');return}
 tv.picking=true;setPanel(false);
 const shield=document.createElement('div');shield.className='nx-tv-pick-shield';shield.tabIndex=0;
 const outline=document.createElement('div');outline.className='nx-tv-pick-outline';
 const info=document.createElement('div');info.className='nx-tv-pick-hint';info.textContent='Нажми на игровое поле. Esc — отмена.';
 document.body.append(shield,outline,info);
 let hovered=null;
 function candidateAt(x,y){shield.style.pointerEvents='none';const stack=document.elementsFromPoint(x,y);shield.style.pointerEvents='auto';
  for(const el of stack){let item=el;for(let d=0;item&&d<5;d++,item=item.parentElement){
   if(tvNotTool(item)&&!item.matches('a,button,span,p,svg path,svg circle'))return item;
  }}return null;}
 function move(e){hovered=candidateAt(e.clientX,e.clientY);if(!hovered){outline.hidden=true;return}
  const r=hovered.getBoundingClientRect();outline.hidden=false;
  Object.assign(outline.style,{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'});
 }
 function close(){tv.picking=false;shield.remove();outline.remove();info.remove();document.removeEventListener('keydown',onEsc,true)}
 function onEsc(e){if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close();setPanel(true)}}
 shield.addEventListener('pointermove',move);
 shield.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const target=hovered||candidateAt(e.clientX,e.clientY);close();if(target){refreshTVRegions(target);tvNote('Область выбрана. Можно передавать чистое поле.')}else tvNote('Не удалось выбрать игровое поле.');setPanel(true)});
 document.addEventListener('keydown',onEsc,true);shield.focus();
}
async function createTVPeer(){
 if(!tv.stream||!tvConnectionAlive()||tv.opening)return;
 if(!window.RTCPeerConnection){tvNote('В этом браузере недоступна передача WebRTC.');return}
 tv.opening=true;tvClosePeer();tv.playback=false;
 const peer=new RTCPeerConnection({iceServers:[]});tv.peer=peer;
 peer.onicecandidate=e=>{if(e.candidate&&tv.peer===peer)tvPost('ice',{candidate:e.candidate.toJSON()})};
 peer.onconnectionstatechange=()=>{
  if(tv.peer!==peer)return;tv.connection=peer.connectionState;
  if(peer.connectionState==='failed'||peer.connectionState==='closed'){tv.playback=false;tvNote('Связь с телевизором прервалась. Останови и включи показ снова.')}
  if(peer.connectionState==='disconnected'){tv.playback=false;tvNote('Восстанавливается связь с телевизором…')}
  syncTV();
 };
 for(const track of tv.stream.getVideoTracks()){
  const sender=peer.addTrack(track,tv.stream);
  // Подсказка кодировщику: надписи и мелкие символы нельзя превращать в кашу.
  const q=tvQuality();
  try{track.contentHint=q.contentHint}catch(e){}
  try{
   const params=sender.getParameters();
   if(params.encodings?.length){
    params.encodings[0].maxBitrate=q.bitrate;
    params.encodings[0].maxFramerate=q.framerate;
    params.encodings[0].scaleResolutionDownBy=1;
   }
   params.degradationPreference='maintain-resolution';
   await sender.setParameters(params);
  }catch(e){console.warn('[NeuroX] Браузер использует собственные параметры качества:',e)}
 }
 // VP9 обычно сохраняет мелкий текст лучше VP8 при близкой скорости передачи.
 // Если браузер не поддерживает настройку кодеков — оставляем штатный порядок.
 if(tvQualitySelect.value==='sharp'&&typeof RTCRtpSender!=='undefined'&&typeof RTCRtpSender.getCapabilities==='function'){
  try{
   const tr=peer.getTransceivers().find(t=>t.sender.track?.kind==='video');
   const codecs=RTCRtpSender.getCapabilities('video')?.codecs||[];
   const fav=codecs.filter(c=>/video\/VP9/i.test(c.mimeType));
   if(tr&&fav.length&&typeof tr.setCodecPreferences==='function')tr.setCodecPreferences([...fav,...codecs.filter(c=>!/video\/VP9/i.test(c.mimeType))]);
  }catch(e){console.warn('[NeuroX] Порядок видеокодеков не изменён:',e)}
 }
 try{
  const offer=await peer.createOffer();await peer.setLocalDescription(offer);
  if(tv.peer!==peer)return;
  tvPost('offer',{sdp:peer.localDescription.sdp});tvPost('curtain',{closed:tv.curtained});
  tvNote('Подключаю чистое игровое поле к телевизору…');
 }catch(e){tvNote('Не удалось передать видео: '+(e.message||'ошибка'));tvClosePeer()}
 finally{tv.opening=false;syncTV()}
}
async function startTV(){
 if(!tvConnectionAlive()){tvNote('Сначала подключи окно телевизора.');return}
 if(tv.stream){tvNote('Трансляция уже запущена.');return}
 if(!tv.region||!tvNotTool(tv.region)){refreshTVRegions();if(!tv.region){tvNote('Выбери игровое поле для показа.');return}}
 if(!navigator.mediaDevices?.getDisplayMedia||!window.RTCPeerConnection){tvNote('Для трансляции нужен браузер с доступом к показу вкладки по HTTPS.');return}
 // Сначала проверяем поддержку Element Capture. Полную вкладку НЕ отправляем.
 if(!window.RestrictionTarget?.fromElement){tvNote('Чистый показ недоступен в этом браузере. Используй актуальный Chrome на компьютере (Element Capture).');return}
 const target=tv.region;
 tvNote('Выбери текущую вкладку NeuroX. Панель педагога не передаётся.');
 try{
  // getDisplayMedia вызывается сразу после нажатия, чтобы сохранить user activation.
  const q=tvQuality();
  const stream=await navigator.mediaDevices.getDisplayMedia({video:{frameRate:{ideal:q.framerate,max:q.framerate},width:{ideal:1920},height:{ideal:1080},displaySurface:'browser'},audio:false,preferCurrentTab:true,selfBrowserSurface:'include'});
  const track=stream.getVideoTracks()[0];
  if(!track){stream.getTracks().forEach(t=>t.stop());throw Error('Нет видеопотока')}
  if(track.getSettings?.().displaySurface!=='browser'){
   stream.getTracks().forEach(t=>t.stop());tvNote('Выбери именно вкладку NeuroX, а не монитор или окно.');return;
  }
  if(typeof track.restrictTo!=='function'||!target.isConnected||!tvConnectionAlive()){
   stream.getTracks().forEach(t=>t.stop());tvNote('Нельзя изолировать поле или потеряна связь с ТВ.');return;
  }
  try{
   tv.styledRegion=target;tv.oldIsolation=target.style.isolation;tv.oldTransformStyle=target.style.transformStyle;
   target.style.isolation='isolate';target.style.transformStyle='flat';
   const restriction=await RestrictionTarget.fromElement(target);
   await track.restrictTo(restriction);
  }catch(error){stream.getTracks().forEach(t=>t.stop());restoreTVRegion();tvNote('Чистый захват не поддерживается для выбранного поля. Выбери другую область или Chrome на ПК.');return}
  // Отправляем только уже ограниченный трек.
  tv.stream=stream;tv.playback=false;tv.connection='connecting';tv.receivedWidth=tv.receivedHeight=tv.receivedFps=0;
  try{track.contentHint=q.contentHint}catch(e){}
  track.addEventListener('ended',()=>{if(tv.stream===stream)stopTV()},{once:true});
  syncTV();await createTVPeer();
 }catch(e){restoreTVRegion();tvNote(e?.name==='NotAllowedError'?'Браузер не получил разрешение на показ вкладки.':'Не удалось запустить показ: '+(e.message||'ошибка'));syncTV()}
}
function toggleTVCurtain(){
 if(!tvConnectionAlive()){tvNote('Сначала подключи окно ребёнка.');return}
 tv.curtained=!tv.curtained;tv.confirmedCurtain=null;
 tvPost('curtain',{closed:tv.curtained});syncTV();
 tvNote('Переключаю шторку на телевизоре…');
}
window.addEventListener('message',async e=>{
 if(e.origin!==location.origin||e.source!==tv.viewer)return;
 const msg=e.data;if(!msg||msg.neuroxTV!==true||msg.session!==tv.session)return;
 tv.lastSeen=Date.now();
 if(msg.type==='ready'){
  tv.ready=true;syncTV();tvPost('ready-ack');tvPost('curtain',{closed:tv.curtained});
  if(tv.stream)await createTVPeer();else tvNote('ТВ подключён. Выбери поле и нажми «Передавать чистое поле».');
 }else if(msg.type==='viewer-state'){
  tv.ready=true;tv.playback=!!msg.playing;tv.confirmedCurtain=typeof msg.curtainClosed==='boolean'?msg.curtainClosed:null;
  if(Number.isFinite(Number(msg.videoWidth)))tv.receivedWidth=Number(msg.videoWidth)||0;
  if(Number.isFinite(Number(msg.videoHeight)))tv.receivedHeight=Number(msg.videoHeight)||0;
  if(Number.isFinite(Number(msg.videoFps)))tv.receivedFps=Number(msg.videoFps)||0;
  if(tv.playback)tvNote('Изображение передаётся. Ребёнок видит только выбранное поле.');
  syncTV();
 }else if(msg.type==='answer'&&tv.peer){
  const peer=tv.peer;
  try{await peer.setRemoteDescription({type:'answer',sdp:msg.sdp});
   for(const candidate of tv.iceQueue){if(tv.peer===peer)await peer.addIceCandidate(candidate)}tv.iceQueue=[];
  }catch(e){tvNote('Не удалось подключить видеопоток. Останови и включи снова.');}
 }else if(msg.type==='ice'&&tv.peer){
  try{if(tv.peer.remoteDescription)await tv.peer.addIceCandidate(msg.candidate);else tv.iceQueue.push(msg.candidate)}catch(e){}
 }else if(msg.type==='viewer-close'){
  tv.ready=false;tv.playback=false;stopTV({notify:false});tvNote('Окно ребёнка закрыто.');
 }
});
tvToggle.onclick=()=>{const on=tvOptions.hidden;tvOptions.hidden=!on;if(on)refreshTVRegions();syncTV()};
tvOpen.onclick=showTVWindow;
tvStart.addEventListener('click',()=>{void startTV()});
tvStop.onclick=()=>stopTV();tvCurtain.onclick=toggleTVCurtain;
$('nxt-tv-refresh').onclick=()=>refreshTVRegions();
$('nxt-tv-pick').onclick=pickTVRegion;
tvRegionSelect.onchange=()=>{
 const selected=tv.regions[Number(tvRegionSelect.value)];
 if(tv.stream){tvNote('Останови показ перед сменой области.');tvRegionSelect.value=String(tv.regions.indexOf(tv.region));syncTV();return}
 tv.region=selected||null;tvRegionStatus.textContent=tv.region?'Поле выбрано. Покажем только его содержимое.':'Выбери область.';syncTV();
};
window.addEventListener('keydown',e=>{
 if(e.ctrlKey&&e.altKey&&!e.shiftKey&&e.code==='Digit9'&&!e.repeat&&tvConnectionAlive()){
  e.preventDefault();e.stopImmediatePropagation();toggleTVCurtain()
 }
},true);
const tvWatch=setInterval(()=>{
 if(!tvPopupOpen()&&tv.ready){tv.ready=false;tv.playback=false;stopTV({notify:false});tvNote('Окно телевизора закрыто.')}
 if(tvPopupOpen())syncTV();
},2000);
window.addEventListener('beforeunload',()=>{clearInterval(tvWatch);tvPost('stopped');stopTV({notify:false})});
refreshTVRegions();syncTV();

clock();
window.addEventListener('keydown',e=>{if(e.key==='Escape'){if(state.curtain)setCurtain(false);else if(state.draw)setDrawing(false);else if(state.spotlight)setSpotlight(false);else if(state.loupe)setLoupe(false);else if(state.pointer)setPointer(false);else if(state.demo)toggleDemo(false);else setPanel(false)}},true);
window.addEventListener('beforeprint',()=>{setCurtain(false);setDrawing(false);setSpotlight(false);setPointer(false);setLoupe(false)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
