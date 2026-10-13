'use strict';
// v4.0: gaze-operable keyboard, local preferences and stability controls.
// Experimental webcam estimation; always provide touch fallback.
const v4KeyboardTab=document.createElement('button');v4KeyboardTab.textContent='Keyboard';v3Tabs.append(v4KeyboardTab);
const v4KeyboardKeys='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(k=>[k,k]).concat([['␣','Space'],['⌫','Delete'],['🔊','Speak']]);
function v4KeyboardMode(){
 clearTracking();v3Current='Keyboard';v3Board.replaceChildren();buttons.length=0;
 for(const [symbol,word] of v4KeyboardKeys){
  const b=document.createElement('button');b.className='aac v4key';b.dataset.word=word;
  const sp=document.createElement('span');sp.textContent=symbol;b.append(sp);
  b.setAttribute('aria-label',word);b.addEventListener('click',()=>v4Key(word,'touch'));
  v3Board.append(b);buttons.push(b);
 }
 [...v3Tabs.children].forEach(b=>b.setAttribute('aria-pressed',String(b===v4KeyboardTab)));
}
v4KeyboardTab.onclick=v4KeyboardMode;
function v4Key(word,method){
 const input=document.getElementById('v3Text');
 if(word==='Space')input.value+=' ';
 else if(word==='Delete')input.value=input.value.slice(0,-1);
 else if(word==='Speak'){if(input.value.trim())speak(input.value.trim())}
 else input.value+=word.toLowerCase();
 input.dispatchEvent(new Event('input'));input.scrollIntoView({block:'nearest',behavior:'smooth'});
 if(method==='gaze'){selections++;lastGazeSelection=true;document.getElementById('falseBtn').disabled=false;updateMetrics()}
}
const v4PreviousSelect=select;
select=function(word,method){if(v3Current==='Keyboard')v4Key(word,method);else v4PreviousSelect(word,method)};
const v4Controls=document.createElement('section');v4Controls.className='panel';
v4Controls.innerHTML='<h2>Version 4.0 accessibility</h2><div class="settings"><label>Tracking smoothing <output id="v4SmoothOut">Medium</output><input id="v4Smooth" type="range" min="1" max="3" step="1" value="2"></label><label>Minimum dwell <output id="v4DwellOut">1.6 s</output><input id="v4Dwell" type="range" min="1" max="4" step=".1" value="1.6"></label></div><p class="hint">Higher smoothing reduces jitter but adds delay. Gaze tracking requires a valid calibration. Recalibrate after moving the device. Camera images are processed on this device.</p>';
v3Keyboard.after(v4Controls);
const v4Smooth=document.getElementById('v4Smooth');
const v4Dwell=document.getElementById('v4Dwell');
const v4Store='eyegaze-v4-preferences';
try{const p=JSON.parse(localStorage.getItem(v4Store)||'null');if(p){v4Smooth.value=Math.max(1,Math.min(3,p.smooth||2));v4Dwell.value=Math.max(1,Math.min(4,p.dwell||1.6))}}catch(_){}
function v4Apply(){
 window.v4SmoothingLevel=Number(v4Smooth.value);
 document.getElementById('v4SmoothOut').textContent=['','Light','Medium','Strong'][window.v4SmoothingLevel];
 dwell=Number(v4Dwell.value);document.getElementById('dwell').value=Math.min(3,dwell);
 document.getElementById('dwellOut').textContent=dwell.toFixed(1)+' s';
 document.getElementById('v4DwellOut').textContent=dwell.toFixed(1)+' s';
 clearTracking();
 try{localStorage.setItem(v4Store,JSON.stringify({smooth:window.v4SmoothingLevel,dwell}))}catch(_){}
}
v4Smooth.oninput=v4Apply;v4Dwell.oninput=v4Apply;v4Apply();
document.getElementById('dwell').addEventListener('input',()=>{v4Dwell.value=dwell;document.getElementById('v4DwellOut').textContent=dwell.toFixed(1)+' s'});
const v4Css=document.createElement('style');v4Css.textContent='.v4key{min-height:72px;font-size:19px}.v4key span{font-size:23px}.v3tabs button[aria-pressed=true]{background:#2563eb;color:#fff}@media(max-width:560px){.board:has(.v4key){grid-template-columns:repeat(4,minmax(0,1fr))}.v4key{min-height:65px;padding:5px}}';document.head.append(v4Css);
