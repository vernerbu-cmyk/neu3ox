const $=s=>document.querySelector(s);let count=8,tasks=[],revealed=false;
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
// Prefer syllable-sized changes and local reading errors, keeping the initial letter.
function errorCandidates(word){
 const vowels='АЕЁИОУЫЭЮЯ', groups=[new Set(),new Set(),new Set()];
 const add=(group,v)=>{if(v!==word)groups[group].add(v)};
 // Swap neighbouring syllables after the first syllable.
 const syllables=word.match(/[^АЕЁИОУЫЭЮЯ]*[АЕЁИОУЫЭЮЯ](?:[^АЕЁИОУЫЭЮЯ]*$)?/g)||[];
 if(syllables.join('')===word)for(let i=1;i<syllables.length-1;i++){
  let a=[...syllables];[a[i],a[i+1]]=[a[i+1],a[i]];add(0,a.join(''));
 }
 // Exchange nearby vowel sounds: РАКЕТА → РЕКАТА.
 for(let i=1;i<word.length;i++)if(vowels.includes(word[i]))for(let j=i+1;j<=Math.min(i+3,word.length-1);j++)if(vowels.includes(word[j])){
  let a=[...word];[a[i],a[j]]=[a[j],a[i]];add(0,a.join(''));
 }
 // Local transpositions: РАКЕТА → РАКТЕА, МЕДУЗА → МЕДЗУА.
 for(let i=1;i<word.length-1;i++){
  let a=[...word];[a[i],a[i+1]]=[a[i+1],a[i]];add(1,a.join(''));
 }
 // Move a short neighbouring fragment, rather than shuffling the whole word.
 for(let i=1;i<word.length-2;i++)for(let size of [2,3])if(i+size<word.length){
  add(2,word.slice(0,i)+word.slice(i+1,i+size+1)+word[i]+word.slice(i+size+1));
 }
 return groups;
}
function variants(word){
 let wrong=[];
 for(const group of errorCandidates(word))for(const v of shuffle([...group]))if(!wrong.includes(v)&&wrong.length<2)wrong.push(v);
 // A three-letter word has only one distinct rearrangement with its initial fixed.
 if(wrong.length<2)for(let i=1;i<word.length;i++){
  const v=word.slice(i)+word.slice(0,i);if(v!==word&&!wrong.includes(v))wrong.push(v);if(wrong.length===2)break;
 }
 return shuffle([word,...wrong]);
}
function pool(){let n=+$('#length').value;return DATA.filter(d=>(!$('#category').value||d.category===$('#category').value)&&(!n||(n===4?d.word.length<=4:n===6?d.word.length>=5&&d.word.length<=6:d.word.length>=7)))}
function updatePool(){let size=pool().length;$('#pool').textContent=`Подходит слов: ${size} из ${DATA.length}`;$('#generate').disabled=size===0}
function generate(){let p=pool();updatePool();if(!p.length)return;let total=count*+$('#pages').value;let chosen=[];while(chosen.length<total)chosen.push(...shuffle(p));tasks=chosen.slice(0,total).map(d=>({...d,options:variants(d.word)}));revealed=false;$('#answers').textContent='Показать ответы';render()}
function render(){let pages=Math.ceil(tasks.length/count);$('#summary').textContent=`${pages} ${pages===1?'лист':'листа'} · ${count} заданий · А4`;$('#sheets').className=($('#mono').checked?'mono ':'')+(revealed?'reveal':'');$('#sheets').innerHTML=Array.from({length:pages},(_,p)=>`<article class="sheet"><div class="sheethead"><span class="leaf">✦</span><h2>Прочитай и отметь<br>правильное слово</h2><p>Посмотри на картинку. Найди слово, в котором все буквы на своих местах.</p></div><div class="name"><span>Имя ____________________</span><span>Дата ______________</span></div><div class="grid">${tasks.slice(p*count,(p+1)*count).map((d,k)=>{let i=p*count+k;return `<div class="card"><img src="${d.image}" alt="Иллюстрация к заданию ${i+1}"><div class="options">${d.options.map((v,j)=>`<label class="option ${v===d.word?'correct':''}"><input type="radio" name="task-${i}" aria-label="${v}">${v}</label>`).join('')}</div><button class="replace" data-index="${i}" aria-label="Заменить задание ${i+1}" title="Заменить задание">↻</button></div>`}).join('')}</div><div class="sheetfooter"><span>СЛОВО В ПОРЯДКЕ · учимся читать</span><span>${p+1} / ${pages}</span></div></article>`).join('')}
for(let c of [...new Set(DATA.map(d=>d.category))])$('#category').add(new Option(c,c));
$('#counts').onclick=e=>{let b=e.target.closest('[data-count]');if(!b)return;count=+b.dataset.count;document.querySelectorAll('[data-count]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});generate()};
for(let id of ['category','length','pages'])$('#'+id).onchange=generate;
$('#mono').onchange=()=>$('#sheets').classList.toggle('mono',$('#mono').checked);
$('#generate').onclick=generate;$('#print').onclick=()=>window.print();$('#answers').onclick=()=>{revealed=!revealed;$('#sheets').classList.toggle('reveal',revealed);$('#answers').textContent=revealed?'Скрыть ответы':'Показать ответы'};
$('#sheets').onclick=e=>{let b=e.target.closest('[data-index]');if(!b)return;let i=+b.dataset.index;let used=new Set(tasks.map(d=>d.word));let p=pool().filter(d=>!used.has(d.word));if(!p.length)p=pool().filter(d=>d.word!==tasks[i].word);if(!p.length)return;let d=shuffle(p)[0];tasks[i]={...d,options:variants(d.word)};render()};
function bank(){let q=$('#search').value.toUpperCase().trim();$('#bankItems').innerHTML=DATA.filter(d=>d.word.includes(q)).map(d=>`<div class="bankitem"><img src="${d.image}" alt="">${d.word}</div>`).join('')||'Ничего не найдено'}
$('#bankBtn').onclick=()=>{bank();$('#bank').showModal()};$('#closeBank').onclick=()=>$('#bank').close();$('#search').oninput=bank;generate();
