/* NeuroX — принимающее окно для локального показа с независимой шторкой. */
(()=>{
'use strict';
const params=new URLSearchParams(location.search),session=params.get('session');
const video=document.getElementById('nx-student-video');
const curtain=document.getElementById('nx-student-curtain');
const wait=document.getElementById('nx-student-wait');
const fullButton=document.getElementById('nx-student-fullscreen');
let peer=null,iceQueue=[],receiving=false,acknowledged=false,lastQualitySent=0;
const viewModeButton=document.getElementById('nx-student-view-mode');
let nativeSizeMode=false;
function updateVideoSize(){
 const w=video.videoWidth||0,h=video.videoHeight||0;
 const dpr=Math.max(1,window.devicePixelRatio||1);
 video.style.setProperty('--nx-native-width',Math.round((w||1280)/dpr)+'px');
 video.style.setProperty('--nx-native-height',Math.round((h||720)/dpr)+'px');
}
function toggleNativeSize(){nativeSizeMode=!nativeSizeMode;document.body.classList.toggle('nx-student-native',nativeSizeMode);viewModeButton.textContent=nativeSizeMode?'Растянуть по экрану':'Размер 1:1';viewModeButton.setAttribute('aria-pressed',String(nativeSizeMode));}
viewModeButton.addEventListener('click',toggleNativeSize);
video.addEventListener('resize',updateVideoSize);
function send(type,data={}){if(window.opener&&!window.opener.closed&&session)window.opener.postMessage({neuroxTV:true,session,type,...data},location.origin)}
function showWait(message){wait.textContent=message;wait.hidden=false;receiving=false;sendState()}
function closePeer(){if(peer){try{peer.onicecandidate=null;peer.close()}catch(e){}peer=null}iceQueue=[];video.pause();video.srcObject=null;receiving=false;sendState()}
function setCurtain(closed){curtain.hidden=!closed;curtain.setAttribute('aria-hidden',String(!closed));sendState()}
function sendState(){send('viewer-state',{playing:!!receiving&&video.readyState>=2&&!video.paused,curtainClosed:!curtain.hidden,videoWidth:video.videoWidth||0,videoHeight:video.videoHeight||0})}
async function sendStats(){
 if(!peer||!receiving)return;
 try{const s=await peer.getStats();let frames;
  s.forEach(r=>{if(r.type==='inbound-rtp'&&r.kind==='video'&&!r.isRemote)frames=r});
  const now=performance.now();if(now-lastQualitySent<1800)return;lastQualitySent=now;
  send('viewer-state',{playing:true,curtainClosed:!curtain.hidden,videoWidth:frames?.frameWidth||video.videoWidth||0,videoHeight:frames?.frameHeight||video.videoHeight||0,videoFps:frames?.framesPerSecond||0});
 }catch(e){}
}
async function handleOffer(sdp){
 closePeer();showWait('Подключение изображения…');
 if(!window.RTCPeerConnection){showWait('Браузер не поддерживает трансляцию WebRTC.');return}
 const pc=new RTCPeerConnection({iceServers:[]});peer=pc;
 pc.onicecandidate=e=>{if(e.candidate&&peer===pc)send('ice',{candidate:e.candidate.toJSON()})};
 pc.ontrack=e=>{
  if(peer!==pc)return;
  const stream=e.streams[0]||new MediaStream([e.track]);
  video.srcObject=stream;updateVideoSize();
  video.play().then(()=>{if(peer===pc){receiving=true;wait.hidden=true;sendState()}}).catch(()=>showWait('Не удалось запустить видео. Нажми на окно ребёнка.'));
  e.track.addEventListener('ended',()=>{if(peer===pc){closePeer();showWait('Показ остановлен педагогом.')}});
 };
 pc.onconnectionstatechange=()=>{
  if(peer!==pc)return;
  if(pc.connectionState==='connected'&&receiving)wait.hidden=true;
  if(pc.connectionState==='failed'||pc.connectionState==='closed'||pc.connectionState==='disconnected')showWait('Связь прервана. Педагогу нужно повторить подключение.');
 };
 try{
  await pc.setRemoteDescription({type:'offer',sdp});
  const answer=await pc.createAnswer();await pc.setLocalDescription(answer);
  if(peer!==pc)return;
  send('answer',{sdp:pc.localDescription.sdp});
  for(const c of iceQueue){if(peer===pc)await pc.addIceCandidate(c)}iceQueue=[];
 }catch(e){if(peer===pc){closePeer();showWait('Не удалось подключиться к изображению.')}}
}
window.addEventListener('message',async e=>{
 if(e.origin!==location.origin||e.source!==window.opener)return;
 const msg=e.data;if(!msg||msg.neuroxTV!==true||msg.session!==session)return;
 if(msg.type==='ready-ack')acknowledged=true;
 else if(msg.type==='offer')await handleOffer(msg.sdp);
 else if(msg.type==='ice'&&peer){try{if(peer.remoteDescription)await peer.addIceCandidate(msg.candidate);else iceQueue.push(msg.candidate)}catch(e){/* ignore unavailable network candidate */}}
 else if(msg.type==='curtain')setCurtain(!!msg.closed);
 else if(msg.type==='stopped'){closePeer();showWait('Показ остановлен педагогом.');}
});
fullButton.addEventListener('click',async()=>{
 try{
  if(document.fullscreenElement)await document.exitFullscreen();
  else await document.documentElement.requestFullscreen();
 }catch(e){fullButton.textContent='Полный экран недоступен'}
});
// Chrome требует нажатия пользователя для fullscreen; после входа верхняя панель скрывается.
document.addEventListener('fullscreenchange',()=>{fullButton.textContent=document.fullscreenElement?'Выйти из полного экрана':'На весь экран'});
window.addEventListener('beforeunload',()=>{send('viewer-close');closePeer()});
video.addEventListener('playing',()=>{receiving=true;wait.hidden=true;sendState()});
for(const type of ['pause','ended','emptied','error'])video.addEventListener(type,()=>{receiving=false;sendState()});
for(const type of ['stalled','waiting'])video.addEventListener(type,()=>showWait('Передача временно прервана. Ожидание сигнала…'));
// На случай если окно педагога ещё выполняет скрипты при открытии popup.
setCurtain(true);
const poll=setInterval(()=>{void sendStats();if(window.opener?.closed){clearInterval(poll);closePeer();showWait('Окно педагога закрыто.');return}if(!acknowledged)send('ready');else sendState()},1600);
send('ready');
})();
