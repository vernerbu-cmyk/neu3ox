/* NeuroX Beta 14 — lightweight mobile navigation. Does not change game-state handlers. */
(function(){
 'use strict';
 function init(){
  const body=document.body;
  if(!body || !body.classList.contains('nx-added-game')) return;
  const collapsible={
   'nx-game-invisible-walls':'.sidebar',
   'nx-game-quiet-glitch':'.settings',
   'nx-game-peripheral':'.side',
   'nx-game-negative':'.sidebar'
  };
  for(const [cls,selector] of Object.entries(collapsible)){
   if(!body.classList.contains(cls))continue;
   const aside=document.querySelector(selector);
   if(aside && !aside.querySelector('.nx-mobile-options-toggle')){
    const btn=document.createElement('button');
    btn.type='button';btn.className='nx-mobile-options-toggle';
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('aria-label','Раскрыть настройки тренажёра');
    btn.innerHTML='<span>Настройки тренажёра</span><span class="nx-mobile-chevron" aria-hidden="true">⌄</span>';
    aside.insertBefore(btn,aside.firstChild);
    aside.classList.add('nx-mobile-collapsible','nx-mobile-closed');
    btn.addEventListener('click',()=>{
      const open=aside.classList.toggle('nx-mobile-closed')===false;
      btn.setAttribute('aria-expanded',String(open));
      btn.setAttribute('aria-label',(open?'Свернуть':'Раскрыть')+' настройки тренажёра');
    });
   }
  }
  // Move the original Radar controls before the canvas on narrow screens;
  // IDs, event listeners, and result counters remain untouched.
  if(body.classList.contains('nx-game-radar')){
    const panel=document.querySelector('.game-panel');
    const controls=panel?.querySelector(':scope > .controls');
    const board=panel?.querySelector(':scope > .board');
    if(panel&&controls&&board){
      const anchor=document.createComment('original radar control position');
      panel.insertBefore(anchor,controls);
      const mq=window.matchMedia('(max-width:720px)');
      const update=()=>{
        if(mq.matches) panel.insertBefore(controls,board);
        else panel.insertBefore(controls,anchor.nextSibling);
      };
      update();
      if(mq.addEventListener)mq.addEventListener('change',update);
      else mq.addListener(update);
    }
  }
  // After a quick start in these games, bring the playing surface into view.
  const startToField={
   'nx-game-keys':['#startBtn','.board-panel'],
   'nx-game-last-four':['#startBtn','.play-panel'],
   'nx-game-restorer':['#startBtn','.work']
  };
  for(const [cls,selectors] of Object.entries(startToField)){
    if(!body.classList.contains(cls))continue;
    const start=document.querySelector(selectors[0]);
    const field=document.querySelector(selectors[1]);
    if(start&&field)start.addEventListener('click',()=>{
      if(!window.matchMedia('(max-width:760px)').matches)return;
      setTimeout(()=>field.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'}),110);
    });
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
