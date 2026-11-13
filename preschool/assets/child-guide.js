/* Iskorka child/parent guidance prototype, entirely separate from game logic. */
(()=>{
'use strict';
const kind=document.currentScript?.dataset.game;
if(!['slogolaz','memo','moreless'].includes(kind))return;
const settings={
 slogolaz:{icon:'🧗',title:'Слоголаз',action:'Прочитай вслух',subtitle:'Скажи слог. Взрослый поможет герою подняться.',steps:['👀 Смотри','🗣️ Читай','🧗 Поднимайся'],parent:`<p class="nx-note-title">Зачем играть</p><ul class="nx-notes"><li>Тренирует чтение слогов, слов и более длинных заданий на выбранном уровне.</li><li>Добавляет игровой мотив: за прочитанное задание персонаж поднимается к финишу.</li></ul><p class="nx-note-title">Как помочь</p><ul class="nx-notes"><li>Это <strong>игра для двух детей с ведущим</strong>. Ребёнок читает вслух, а взрослый после успешного чтения нажимает «+1» рядом с нужным игроком.</li><li>Программа <strong>не распознаёт и не оценивает произношение</strong>. Проверку выполняет взрослый.</li><li>В настройках можно изменить уровень, тип материала, число шагов и отключить таймер.</li></ul><div class="nx-alert">Здесь помощь ребёнку не заменяет присутствие взрослого: «Слоголаз» изначально рассчитан на совместную игру.</div>`},
 memo:{icon:'🃏',title:'Мемо',action:'Найди две одинаковые',subtitle:'Сначала посмотри на картинки, потом открывай пары.',steps:['👀 Запомни','👆 Открой','🎯 Найди пару'],parent:`<p class="nx-note-title">Зачем играть</p><ul class="nx-notes"><li>Тренирует зрительную память, внимание и удержание расположения картинок.</li><li>Ребёнок ищет совпадающие пары, а правильно найденные остаются открытыми.</li></ul><p class="nx-note-title">Как помочь</p><ul class="nx-notes"><li>Для знакомства можно выбрать сетку <strong>2×2</strong>, затем постепенно увеличивать число карточек.</li><li>Можно задать предварительный показ на 5, 8, 12, 20, 60 секунд или играть без него.</li><li>Лучше сначала попросить ребёнка объяснить, что он запомнил, и не подсказывать положение каждой картинки.</li></ul><div class="nx-alert">В демонстрации показаны четыре карточки. Это учебный пример, а не дополнительная попытка внутри игры.</div>`},
 moreless:{icon:'⚖️',title:'Где больше?',action:'Посмотри и выбери',subtitle:'Сравни две группы. Где предметов больше?',steps:['👀 Посмотри','🔢 Сравни','👆 Выбери'],parent:`<p class="nx-note-title">Зачем играть</p><ul class="nx-notes"><li>Работа с количеством, сравнением, соответствием «один к одному» и представлением об изменении числа предметов.</li><li>В тренажёре есть разные механики: сравнение, запоминание количества, составление пар, уравнивание, поиск недостающего и изменение расположения.</li></ul><p class="nx-note-title">Как помочь</p><ul class="nx-notes"><li>Сначала выбирайте небольшие количества и один режим, затем подключайте смешанные задания.</li><li>Спрашивайте: «Как ты понял, что здесь больше?» и «Можно ли проверить парами?».</li><li>Подсказки и ошибки в тренажёре считаются отдельно. Игровой результат не является педагогическим диагнозом.</li><li>По умолчанию звуковые сигналы в настройках выключены.</li></ul><div class="nx-alert">Памятка для ребёнка подстраивается под текущий тип задания. На главном игровом экране также остаётся родная кнопка «Правила».</div>`}
}[kind];
const SEEN_KEY='nx_iskorka_access_guide_v1_'+kind;
let timers=[],memoState=null,prevFocus=null,compareMode='compare';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function delay(fn,ms){const id=setTimeout(fn,ms);timers.push(id);return id;}
function clearTimers(){timers.forEach(clearTimeout);timers=[];}
const launch=document.createElement('div');launch.id='nx-guide-launch';launch.innerHTML='<button type="button" data-nx-open="child" aria-label="Покажи, как играть" title="Как играть">?</button><button type="button" data-nx-open="parent" aria-label="Памятка для взрослых">Для взрослых</button>';
const root=document.createElement('div');root.id='nx-guide-root';
root.innerHTML=`<section class="nx-panel" role="dialog" aria-modal="true" aria-labelledby="nx-guide-title" tabindex="-1">
<div class="nx-head"><div class="nx-head-icon" aria-hidden="true">${settings.icon}</div><div class="nx-head-text"><small>Искорка · как играть</small><strong id="nx-guide-title">${esc(settings.title)}</strong></div><button type="button" class="nx-x" id="nx-guide-close" aria-label="Закрыть подсказку">×</button></div>
<div class="nx-tabs" role="tablist" aria-label="Для кого подсказка"><button role="tab" id="nx-child-tab" aria-controls="nx-child-panel" aria-selected="true" type="button" data-nx-tab="child">▶ Ребёнку</button><button role="tab" id="nx-parent-tab" aria-controls="nx-parent-panel" aria-selected="false" type="button" data-nx-tab="parent">ⓘ Взрослым</button></div>
<div class="nx-content" id="nx-child-panel" role="tabpanel" aria-labelledby="nx-child-tab"><h2 class="nx-cta-text" id="nx-child-action">${esc(settings.action)}</h2><p class="nx-explain" id="nx-child-subtitle">${esc(settings.subtitle)}</p><div class="nx-demo" id="nx-demo"></div><div class="nx-steps" id="nx-steps">${settings.steps.map(t=>`<span>${esc(t)}</span>`).join('')}</div></div>
<div class="nx-content" id="nx-parent-panel" role="tabpanel" aria-labelledby="nx-parent-tab" hidden>${settings.parent}</div>
<div class="nx-footer"><button type="button" class="nx-secondary" id="nx-guide-again">↻ Ещё раз</button><button type="button" class="nx-primary" id="nx-guide-play">Играть ✓</button></div>
</section>`;
document.body.append(launch,root);
const q=id=>document.getElementById(id);
function modeNow(){try{return window.NeuroXMoreLessDebug?.getTask()?.mode||'compare';}catch{return 'compare';}}
function setTab(tab){
 const child=tab==='child';
 q('nx-child-tab').setAttribute('aria-selected',String(child));q('nx-parent-tab').setAttribute('aria-selected',String(!child));
 q('nx-child-panel').hidden=!child;q('nx-parent-panel').hidden=child;q('nx-guide-again').hidden=!child;
 if(child)demo();else clearTimers();
}
function open(tab='child'){
 prevFocus=document.activeElement;
 root.classList.add('nx-open');document.body.dataset.nxGuideOpen='1';
 setTab(tab);
 q('nx-guide-close').focus();
}
function close(){clearTimers();root.classList.remove('nx-open');delete document.body.dataset.nxGuideOpen;
 try{localStorage.setItem(SEEN_KEY,'yes');}catch(_){}
 if(prevFocus&&document.contains(prevFocus))prevFocus.focus();
}
function focusTrap(e){if(e.key==='Escape'){e.preventDefault();close();return;}if(e.key!=='Tab')return;
 const all=[...root.querySelectorAll('button:not([disabled]):not([hidden])')].filter(el=>el.offsetWidth>0&&el.offsetHeight>0);if(!all.length)return;
 if(e.shiftKey&&document.activeElement===all[0]){e.preventDefault();all.at(-1).focus();}
 else if(!e.shiftKey&&document.activeElement===all.at(-1)){e.preventDefault();all[0].focus();}
}
function demo(){clearTimers();if(kind==='slogolaz')demoClimb();if(kind==='memo')demoMemo();if(kind==='moreless')demoCompare();}
function demoClimb(){const el=q('nx-demo');el.innerHTML=`<div class="nx-climb-visual"><div class="nx-syllable" aria-label="Слог ма">МА</div><span class="nx-plus" aria-hidden="true">➜</span><div class="nx-climb-track"><span class="nx-climb-win" aria-hidden="true">🏁</span><span class="nx-climb-hero" aria-hidden="true">🧗</span></div></div><button type="button" class="nx-demo-action" id="nx-climb-btn">Взрослый нажимает +1</button><div class="nx-demo-status" role="status" id="nx-demo-status">Посмотри, как герой поднимается</div>`;
 const btn=q('nx-climb-btn'),hero=el.querySelector('.nx-climb-hero');btn.addEventListener('click',()=>{if(hero.classList.toggle('nx-up')){q('nx-demo-status').textContent='Герой поднялся!';btn.textContent='↻ Показать ещё раз';}else{q('nx-demo-status').textContent='Посмотри, как герой поднимается';btn.textContent='Взрослый нажимает +1';}});
}
function demoMemo(){const el=q('nx-demo');memoState={open:[],matched:new Set(),locking:true};
 el.innerHTML=`<div class="nx-memo-board" aria-label="Попробуй найти пары">${['🍎','🐶','🍎','🐶'].map((icon,i)=>`<button type="button" class="nx-memo-tile nx-revealed" data-i="${i}" aria-label="Карточка ${i+1}, сначала запомни" data-icon="${icon}">${icon}</button>`).join('')}</div><div class="nx-demo-status" id="nx-demo-status" role="status">Запомни, где картинки!</div><button type="button" id="nx-memo-reset" class="nx-demo-action">↻ Показать картинки</button>`;
 const buttons=[...el.querySelectorAll('.nx-memo-tile')];
 function showCard(i){const btn=buttons[i];btn.classList.add('nx-revealed');btn.textContent=btn.dataset.icon;btn.setAttribute('aria-label','Карточка '+(i+1)+', '+btn.dataset.icon);}
 function hideCard(i){const btn=buttons[i];btn.classList.remove('nx-revealed');btn.textContent='?';btn.setAttribute('aria-label','Карточка '+(i+1)+', закрыта');}
 function revealStart(){memoState.locking=true;memoState.open=[];memoState.matched.clear();buttons.forEach((b,i)=>{b.classList.remove('nx-paired');showCard(i);});q('nx-demo-status').textContent='Запомни, где картинки!';delay(()=>{buttons.forEach((b,i)=>hideCard(i));memoState.locking=false;q('nx-demo-status').textContent='Открой две одинаковые картинки';},1800);}
 buttons.forEach((btn,i)=>btn.addEventListener('click',()=>{if(memoState.locking||memoState.open.includes(i)||memoState.matched.has(i))return;showCard(i);memoState.open.push(i);if(memoState.open.length!==2)return;
 memoState.locking=true;const [a,b]=memoState.open;if(buttons[a].dataset.icon===buttons[b].dataset.icon){memoState.matched.add(a);memoState.matched.add(b);buttons[a].classList.add('nx-paired');buttons[b].classList.add('nx-paired');q('nx-demo-status').textContent=memoState.matched.size===4?'Все пары найдены! 🎉':'Пара найдена!';memoState.open=[];memoState.locking=false;}
 else{q('nx-demo-status').textContent='Это разные картинки. Попробуй ещё!';delay(()=>{hideCard(a);hideCard(b);memoState.open=[];memoState.locking=false;},850);}
 }));q('nx-memo-reset').addEventListener('click',()=>{clearTimers();revealStart();});revealStart();
}
function choiceDemo({left,right,choices,correct,message,onCorrect}){
 const el=q('nx-demo');el.innerHTML=`<div class="nx-groups"><div class="nx-quantity" id="nx-qty-left" aria-label="Левая группа">${left}</div><div class="nx-quantity" id="nx-qty-right" aria-label="Правая группа">${right}</div></div><div class="nx-choice-row">${choices.map((t,i)=>`<button type="button" class="nx-qty-button" data-nx-answer="${i}">${esc(t)}</button>`).join('')}</div><div class="nx-demo-status" role="status" id="nx-demo-status">${esc(message||'Попробуй!')}</div>`;
 el.querySelectorAll('[data-nx-answer]').forEach(b=>b.addEventListener('click',()=>{let isRight=Number(b.dataset.nxAnswer)===correct;
 el.querySelectorAll('.nx-qty-button').forEach(x=>x.classList.remove('nx-chosen','nx-correct'));b.classList.add(isRight?'nx-correct':'nx-chosen');
 q('nx-demo-status').textContent=isRight?'Правильно! ✨':'Попробуй ещё раз';
 q('nx-qty-left').classList.toggle('nx-correct',isRight&&correct===0);q('nx-qty-right').classList.toggle('nx-correct',isRight&&correct===1);
 if(isRight&&typeof onCorrect==='function')onCorrect();
 }));
}
const dot=(v,n)=>Array.from({length:n},()=>`<span aria-hidden="true">${v}</span>`).join('');
function demoCompare(){compareMode=modeNow();q('nx-steps').innerHTML=settings.steps.map(t=>`<span>${esc(t)}</span>`).join('');
 const title=q('nx-child-action'),subtitle=q('nx-child-subtitle');
 if(compareMode==='memory'){
  title.textContent='Запомни сколько';subtitle.textContent='Посмотри на предметы. Потом выбери число.';
  choiceDemo({left:dot('🍎',3),right:'<span aria-hidden="true" style="font-size:50px">👀</span>',choices:['2','3','4'],correct:1,message:'Сколько яблок слева?'});
  delay(()=>{const left=q('nx-qty-left');if(left&&root.classList.contains('nx-open')){left.textContent='❔';left.setAttribute('aria-label','Спрятанное количество');q('nx-demo-status').textContent='Сколько яблок было?';}},1800);
 }else if(compareMode==='equalize'){
  title.textContent='Сделай поровну';subtitle.textContent='Добавь предмет, чтобы получилось одинаково.';
  choiceDemo({left:dot('🍎',3),right:dot('🍐',2),choices:['➖ 1','➕ 1'],correct:1,message:'Как сделать одинаково?',onCorrect:()=>{q('nx-qty-right').innerHTML=dot('🍐',3);}});
 }else if(compareMode==='missing'){
  title.textContent='Сколько не хватает?';subtitle.textContent='Посмотри: сколько нужно добавить справа?';
  choiceDemo({left:dot('🍎',4),right:dot('🍐',2),choices:['1','2','3'],correct:1,message:'Сколько добавить?',onCorrect:()=>{q('nx-qty-right').innerHTML=dot('🍐',4);}});
 }else if(compareMode==='pairs'){
  title.textContent='Соедини парами';subtitle.textContent='Одному предмету слева найди пару справа.';
  choiceDemo({left:dot('🍎',3),right:dot('🍐',2),choices:['⬅️ Слева','➡️ Справа','⚖️ Поровну'],correct:0,message:'Двум яблокам есть пары. Где лишнее?'});
 }else if(compareMode==='conserve'){
  title.textContent='Количество изменилось?';subtitle.textContent='Предметы переместились. Их стало больше?';
  choiceDemo({left:dot('🍎',3),right:dot('🍎',3),choices:['➕ Больше','⚖️ Столько же','➖ Меньше'],correct:1,message:'Что стало с количеством?'});
 }else{
  title.textContent='Где больше?';subtitle.textContent='Посмотри на картинки и выбери группу.';
  choiceDemo({left:dot('🍎',3),right:dot('🍐',2),choices:['⬅️ Слева','➡️ Справа','⚖️ Поровну'],correct:0,message:'Нажми, где больше предметов'});
 }
}
launch.addEventListener('click',e=>{const btn=e.target.closest('[data-nx-open]');if(btn)open(btn.dataset.nxOpen);});
q('nx-guide-close').addEventListener('click',close);q('nx-guide-play').addEventListener('click',close);
q('nx-guide-again').addEventListener('click',demo);
root.querySelectorAll('[data-nx-tab]').forEach(btn=>btn.addEventListener('click',()=>setTab(btn.dataset.nxTab)));
root.addEventListener('click',e=>{if(e.target===root)close();});root.addEventListener('keydown',focusTrap);
try{if(localStorage.getItem(SEEN_KEY)!=='yes')delay(()=>open('child'),120);}catch(_){delay(()=>open('child'),120);}
})();
