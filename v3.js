'use strict';
// EyeGaze AAC Web v3.0: expanded customizable communication board and phrase builder.
// Uses the v2.4 calibrated gaze engine; touch input remains available.
const v3Categories={
  Essentials:[['💧','Water'],['🍽️','Food'],['🆘','Help'],['➕','More'],['✅','Yes'],['❌','No']],
  Feelings:[['😊','Happy'],['😢','Sad'],['😠','Angry'],['😴','Tired'],['😟','Worried'],['❤️','Love']],
  Activities:[['🎮','Play'],['📚','Read'],['🎵','Music'],['🚶','Walk'],['🛌','Rest'],['📺','TV']],
  People:[['👩','Mom'],['👨','Dad'],['👩‍🏫','Teacher'],['🧑‍🤝‍🧑','Friend'],['👋','Hello'],['🙏','Thank you']],
  Needs:[['🚽','Bathroom'],['🤕','Pain'],['🥶','Cold'],['🥵','Hot'],['🏠','Home'],['🛑','Stop']]
};
const v3Board=document.getElementById('board');
const v3Phrase=document.createElement('section');
v3Phrase.className='panel v3phrase';
v3Phrase.innerHTML='<h2>My sentence</h2><p id="v3Sentence" aria-live="polite">Choose pictures to build a sentence.</p><div class="actions"><button id="v3Speak">🔊 Speak sentence</button><button id="v3Undo">↶ Undo</button><button id="v3Clear">Clear</button></div>';
v3Board.closest('.panel').after(v3Phrase);
const v3Tabs=document.createElement('div');v3Tabs.className='v3tabs';v3Tabs.setAttribute('role','group');v3Tabs.setAttribute('aria-label','Communication categories');
v3Board.before(v3Tabs);
let v3Words=[],v3Current='Essentials';
function v3Render(category){
 v3Current=category;clearTracking();v3Board.replaceChildren();buttons.length=0;
 for(const [emoji,word] of v3Categories[category]){
  const b=document.createElement('button');b.className='aac';b.dataset.word=word;
  const symbol=document.createElement('span');symbol.textContent=emoji;b.append(symbol,document.createTextNode(word));
  b.addEventListener('click',()=>select(word,'touch'));v3Board.append(b);buttons.push(b);
 }
 [...v3Tabs.children].forEach(b=>{b.setAttribute('aria-pressed',String(b.textContent===category))});
}
for(const category of Object.keys(v3Categories)){
 const b=document.createElement('button');b.textContent=category;b.onclick=()=>v3Render(category);v3Tabs.append(b);
}
function v3Update(){document.getElementById('v3Sentence').textContent=v3Words.join(' ')||'Choose pictures to build a sentence.'}
const v3OriginalSelect=select;
select=function(word,method){v3OriginalSelect(word,method);v3Words.push(word);if(v3Words.length>30)v3Words.shift();v3Update()};
document.getElementById('v3Speak').onclick=()=>{if(v3Words.length)speak(v3Words.join(' '))};
document.getElementById('v3Undo').onclick=()=>{v3Words.pop();v3Update()};
document.getElementById('v3Clear').onclick=()=>{v3Words=[];v3Update()};
v3Render('Essentials');
const v3Keyboard=document.createElement('section');v3Keyboard.className='panel';
v3Keyboard.innerHTML='<h2>Type and speak</h2><label for="v3Text">Message</label><textarea id="v3Text" rows="3" maxlength="500" placeholder="Type a message or use the picture board"></textarea><div class="actions"><button id="v3SayText">🔊 Speak typed message</button><button id="v3AddText">Add to sentence</button></div><p class="hint">The keyboard is touch-operated; picture buttons support calibrated gaze dwell. This is an experimental communication aid.</p>';
v3Phrase.after(v3Keyboard);
document.getElementById('v3SayText').onclick=()=>{const t=document.getElementById('v3Text').value.trim();if(t)speak(t)};
document.getElementById('v3AddText').onclick=()=>{const t=document.getElementById('v3Text').value.trim();if(t){v3Words.push(t);v3Update()}};
const v3Style=document.createElement('style');v3Style.textContent='.v3tabs{display:flex;gap:7px;overflow-x:auto;padding-bottom:12px;margin-bottom:10px}.v3tabs button{white-space:nowrap}.v3tabs button[aria-pressed=true]{background:#2563eb;color:white}.v3phrase #v3Sentence{font-size:22px;min-height:54px;line-height:1.5;background:#f2f7ff;padding:15px;border-radius:12px}#v3Text{display:block;width:100%;font:inherit;padding:12px;border:1px solid #b7c8dd;border-radius:10px;margin:10px 0 12px;resize:vertical}';document.head.append(v3Style);
