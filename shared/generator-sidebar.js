/* NeuroX Beta 9. Reparent DOM nodes without re-creating their controls or event handlers. */
(function(){
 'use strict';
 const name=location.pathname.split('/').pop();
 const topPanel=new Set(['elochki.html','proba.html','slog_table.html','naidi_i_otmet.html']);
 const inContainer=new Set(['anagrammy.html','primery.html']);
 function el(tag,cls){const e=document.createElement(tag);e.className=cls;return e}
 function init(){
   if(!location.pathname.includes('/generators/'))return;
   if(topPanel.has(name)){
     const panel=document.querySelector('body > header');
     if(!panel)return;
     const shell=el('div','nx-generator-workbench');const aside=el('aside','nx-generator-side');const preview=el('section','nx-generator-preview');
     panel.parentNode.insertBefore(shell,panel);shell.append(aside,preview);aside.append(panel);
     let next=shell.nextSibling;
     while(next){const sibling=next.nextSibling;
       if(next.nodeType===1 && (next.matches('script, link, style, footer, .modal, #toast, #printArea, #verner') || next.id==='helpModal'))break;
       if(next.nodeType===1)preview.append(next);
       next=sibling;
     }
     document.body.classList.add('nx-generator-sidebar');
   }else if(inContainer.has(name)){
     const container=document.querySelector('body > .container');
     if(!container)return;
     const aside=el('aside','nx-generator-side');const preview=el('section','nx-generator-preview');
     const settings=container.querySelector(':scope > #panel');
     if(!settings)return;
     const toggle=container.querySelector(':scope > .toggle-btn');if(toggle)aside.append(toggle);
     aside.append(settings);
     for(const c of Array.from(container.children)){
       if(c.classList.contains('nx-generator-side')||c.classList.contains('nx-generator-preview'))continue;
       if(c.classList.contains('controls')||c.classList.contains('hint-note'))aside.append(c);
       else preview.append(c);
     }
     container.append(aside,preview);
     container.classList.add('nx-generator-workbench');document.body.classList.add('nx-generator-sidebar');
   }else if(name==='words_table.html'){
     const controls=document.querySelector('body > .controls');const sheet=document.querySelector('body > .sheet-wrap');
     if(!controls||!sheet)return;
     const shell=el('div','nx-generator-workbench'),aside=el('aside','nx-generator-side'),preview=el('section','nx-generator-preview');
     controls.parentNode.insertBefore(shell,controls);shell.append(aside,preview);aside.append(controls);preview.append(sheet);
     document.body.classList.add('nx-generator-sidebar');
     const fit=()=>{const available=sheet.clientWidth;const page=sheet.querySelector('.sheet');if(!page)return;const scale=Math.min(1,available/(210*96/25.4));sheet.style.setProperty('--nx-sheet-scale',String(scale));};
     new ResizeObserver(fit).observe(sheet);fit();
   }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
