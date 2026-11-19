// ---------- CONFIG ----------
const TABLE={};'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((c,i)=>TABLE[c]=i+1); // tabel kuantifikasi (editable)
const REV=Object.fromEntries(Object.entries(TABLE).map(([k,v])=>[v,k]));
const enc=x=>6*x+5, dec=y=>(y-5)/6, f=x=>3*x+2, g=x=>2*x+1;
const MSG='BUKA PINTU', LET=MSG.replace(/ /g,'').split(''), PL=LET.map(c=>TABLE[c]), CT=PL.map(enc);
const TOTAL=600, PTS=[100,150,200,250];
const tblHtml=()=>'<details><summary>Tabel kuantifikasi</summary><div class="tbl">'+Object.entries(TABLE).map(([k,v])=>`<span>${k}/${k.toLowerCase()}=${v}</span>`).join('')+'</div></details>';
// ---------- LEVELS (data) ----------
let LV=[
{n:'THE FIRST KEY',obj:'Buka laci kontrol.',story:'Laci kontrol terkunci. Catatan ilmuwan tertempel di sampingnya.',
 stages:[{body:'<div class="eq">f(x) = 2x + 3<br>f(4) = ?</div>',lab:['f(4)'],ans:['11'],hints:['Substitusikan nilai x = 4 ke fungsi.','Hitung 2 × 4, lalu tambahkan 3.'],
 ex:'f(4) = 2(4) + 3 = 8 + 3 = 11.',no:'Periksa lagi: ganti x dengan 4, lalu hitung perkalian sebelum penjumlahan.'}],
 sum:'Fungsi linear f(x)=ax+b: substitusi x lalu hitung. Kode laci = 11.'},
{n:'DOUBLE LOCK',obj:'Buka brankas dua lapis.',story:'Brankas dengan dua lapis keamanan. Kode = (f ∘ g)(2).',
 stages:[{t:'Lapis 1: hitung fungsi dalam',body:'<div class="eq">f(x) = 3x + 2<br>g(x) = 2x + 1<br>(f ∘ g)(x) = f(g(x))<br>g(2) = ?</div>',lab:['g(2)'],ans:['5'],hints:['Kerjakan fungsi di bagian dalam terlebih dahulu, yaitu g(x).'],ex:'g(2) = 2(2) + 1 = 5.',no:'Substitusikan x = 2 ke g(x) = 2x + 1.'},
 {t:'Lapis 2: masukkan hasil ke f',body:'<div class="eq">f(g(2)) = f(5) = ?</div>',lab:['f(5)'],ans:['17'],hints:['Masukkan hasil g(2) ke f(x) = 3x + 2.'],ex:'f(5) = 3(5) + 2 = 17. Kode brankas: 17.',no:'Gunakan f(x) = 3x + 2 dengan x = 5.'}],
 sum:'(f ∘ g)(2) = f(g(2)) = f(5) = 17. Urutan: fungsi dalam dulu.'},
{n:'DECODE THE MESSAGE',obj:'Dekripsi pesan di terminal.',story:'Terminal berisi ciphertext. Fungsi enkripsi: h(x) = f(g(x)) = 6x + 5.',
 stages:[{t:'Tantangan 1: fungsi invers',body:'<div class="eq">CIPHERTEXT: 11 – 71 – 131<br>h(x) = 6x + 5<br>h⁻¹(x) = ?</div>',opts:['(x − 5) / 6','(x + 5) / 6','6x − 5','(5 − x) / 6'],ans:['(x − 5) / 6'],hints:['Tukar x dan y pada y = 6x + 5, lalu selesaikan untuk y.'],ex:'y = 6x + 5 → x = 6y + 5 → x − 5 = 6y → y = (x − 5)/6.',no:'Balik prosesnya: kurangi 5 dulu, lalu bagi 6.'},
 {t:'Tantangan 2: dekripsi',body:'<div class="eq">h⁻¹(x) = (x − 5) / 6</div>'+tblHtml(),lab:['h⁻¹(11)','h⁻¹(71)','h⁻¹(131)'],ans:['1','11','21'],hints:['Hitung (11 − 5) / 6, lalu lakukan hal sama untuk 71 dan 131.'],
 ex:'11→(11−5)/6=1 (A); 71→(71−5)/6=11 (K); 131→(131−5)/6=21 (U). Plaintext: <b>AKU</b>.',no:'Kurangi 5 lalu bagi 6 untuk tiap angka.'}],
 sum:'Invers membalik enkripsi: h⁻¹(x)=(x−5)/6. 11,71,131 → 1,11,21 → AKU.'},
{n:'FINAL ESCAPE',obj:'Buka pintu utama dengan pesan terakhir.',story:`Pesan terakhir ilmuwan: "${MSG}". Enkripsi dengan h(x) = f(g(x)) = 6x + 5.`,
 stages:[{t:'Langkah 1: konversi & enkripsi',body:`<div class="eq">PLAINTEXT: ${MSG}<br>f(x)=3x+2, g(x)=2x+1<br>h(x)=f(g(x))=6x+5</div>`+tblHtml(),lab:LET.map((c,i)=>`${c}=${PL[i]} → h`),ans:CT.map(String),hints:['Ubah huruf ke angka (tabel), lalu hitung 6x + 5 untuk tiap angka.','Contoh: B=2 → 6(2)+5 = 17.'],
  ex:'Ciphertext: '+CT.join(' – ')+'.',no:'Pastikan tiap huruf dikonversi dulu, lalu hitung 6x + 5.'},
 {t:'Langkah 2: verifikasi dengan invers',body:'<div class="eq">h⁻¹(x) = (x − 5) / 6<br>Dekripsi ciphertext ke-8 (125)</div>',lab:['h⁻¹(125)'],ans:['20'],hints:['(125 − 5) / 6'],ex:'(125−5)/6 = 20 → T. Cocok dengan plaintext.',no:'Hitung (125 − 5) lalu bagi 6.'},
 {t:'Langkah 3: kode pintu',body:`<div class="eq">Kode pintu = jumlah semua angka plaintext<br>${PL.join(' + ')}</div>`,lab:['KODE'],ans:[String(PL.reduce((a,b)=>a+b,0))],hints:['Jumlahkan 9 angka plaintext (bukan ciphertext).'],ex:`${PL.join('+')} = ${PL.reduce((a,b)=>a+b,0)}. Pintu terbuka!`,no:'Jumlahkan angka plaintext hasil tabel kuantifikasi.'}],
 sum:'Enkripsi lalu dekripsi saling membalik: h⁻¹(h(x)) = x. Kode pintu = 115.'}];
// ---------- STATE ----------
let S,timer=null,sound=true,rm=false;
const $=id=>document.getElementById(id);
const fresh=()=>({lvl:0,stage:0,score:0,time:TOTAL,lives:3,spent:0,hints:3,done:[],ans:{},hintIdx:{},paused:false,status:'menu',right:0,wrong:0,used:0,fb:'',sol:'',sel:null,levelDone:false,pts:[]});
function beep(f1,d=.12,type='sine'){if(!sound)return;try{const c=beep.c||(beep.c=new AudioContext()),o=c.createOscillator(),gn=c.createGain();o.type=type;o.frequency.value=f1;gn.gain.value=.05;o.connect(gn);gn.connect(c.destination);o.start();o.stop(c.currentTime+d)}catch(e){}}
function toast(t){const e=document.createElement('div');e.className='toast';e.textContent=t;e.setAttribute('role','status');document.body.appendChild(e);setTimeout(()=>e.remove(),2200)}
const fmt=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
function setSnd(){sound=!sound;['snd','snd2'].forEach(i=>$(i).textContent='Suara: '+(sound?'ON':'OFF'))}
// ---------- TIMER ----------
function stopT(){clearInterval(timer);timer=null}
function startT(){stopT();timer=setInterval(()=>{if(S.paused||S.status!=='play'||S.levelDone)return;S.time--;hud();if(S.time<=0){S.time=0;end('expired')}},1000)}
// ---------- FLOW ----------
function startGame(){LV=buildLV();S=fresh();S.status='play';show('game');startT();draw();beep(520)}
function show(v){$('menuV').classList.toggle('hide',v!=='menu');$('game').classList.toggle('hide',v!=='game');$('result').classList.toggle('hide',v!=='result')}
function toMenu(){stopT();S=fresh();show('menu');closeM()}
function end(st){stopT();S.status=st;if(st!=='won')S.spent+=TOTAL-S.time;closeM();beep(st==='won'?880:200,.4);result()}
function hud(){$('hL').textContent=`${String(S.lvl+1).padStart(2,'0')} / 04`;$('hT').textContent=fmt(S.time);$('hS').textContent=S.score;$('hH').textContent=S.hints;$('hV').textContent='♥'.repeat(S.lives)+'♡'.repeat(3-S.lives);$('hV').setAttribute('aria-label','Nyawa '+S.lives+' dari 3');
 $('pb').style.width=(S.done.length/4*100)+'%';$('hT').style.color=S.time<60?'var(--er)':''}
// ---------- ROOM ----------
function click(i){if(S.paused)return;beep(400,.06);
 if(i>S.lvl&&!S.done[i-1])return toast(`Sistem keamanan masih aktif. Selesaikan Level ${S.lvl+1} terlebih dahulu.`);
 if(S.done[i])return toast('Bagian ini sudah terbuka.');
 const inp=$('puz').querySelector('input,.opts button');inp&&inp.focus()}
// ---------- PUZZLE ----------
function draw(){hud();scene();const L=LV[S.lvl],st=L.stages[S.stage];const p=$('puz');
 if(S.levelDone){p.innerHTML=`<div class="big ok">ACCESS GRANTED</div><div class="sol"><b>Pembahasan:</b><br>${S.sol}</div><div class="sol">${L.sum}</div><div class="ctrl"><button class="pri" id="nx">${S.lvl===3?'LIHAT HASIL':'NEXT ROOM'}</button></div>`;
  $('nx').onclick=()=>{if(S.lvl===3)end('won');else{S.lvl++;S.stage=0;S.time=TOTAL;S.levelDone=false;toast('Waktu level baru: 10:00');S.fb='';S.sol='';S.sel=null;draw()}};return}
 const inputs=st.opts?`<div class="opts" role="radiogroup">${st.opts.map(o=>`<button class="${S.sel===o?'sel':''}" data-o="${o}" role="radio" aria-checked="${S.sel===o}">${o}</button>`).join('')}</div>`:
 `<div class="inp">${st.lab.map((l,i)=>`<label>${l}<input inputmode="text" data-k="${i}" autocomplete="off" aria-label="${l}"></label>`).join('')}</div>`;
 p.innerHTML=`<div class="eyebrow">LEVEL ${S.lvl+1} — ${L.n}${L.stages.length>1?` • TAHAP ${S.stage+1}/${L.stages.length}`:''}</div><h2>${st.t||L.n}</h2><p class="story">${L.story}</p>${st.body}${inputs}
 <div class="ctrl"><button class="pri" id="sub">${S.lvl===2&&S.stage===1?'DECRYPT MESSAGE':'SUBMIT CODE'}</button><button id="hint">Hint (−25)</button></div><div class="fb ${S.fbc||''}" id="fb" role="status">${S.fb}</div>`;
 p.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{S.sel=b.dataset.o;S.fb='';draw()});
 p.querySelectorAll('input').forEach((e,i,a)=>{e.value=(S.vals||{})[i]||'';e.oninput=()=>{(S.vals=S.vals||{})[i]=e.value};e.onkeydown=k=>{if(k.key==='Enter'){k.preventDefault();i<a.length-1?a[i+1].focus():submit()}}});
 $('sub').onclick=submit;$('hint').onclick=hint}
function submit(){if(S.paused||S.status!=='play')return;const L=LV[S.lvl],st=L.stages[S.stage];let vals;
 if(st.opts){if(!S.sel){S.fb='Pilih salah satu jawaban dulu.';S.fbc='';return draw()}vals=[S.sel]}
 else{vals=[...$('puz').querySelectorAll('input')].map(e=>e.value.trim());if(vals.some(v=>v===''||isNaN(Number(v)))){S.fb='Masukkan angka yang valid pada semua kolom.';S.fbc='no';return draw()}vals=vals.map(v=>String(Number(v)))}
 (S.ans[S.lvl]=S.ans[S.lvl]||[])[S.stage]=vals.join(', ');
 if(vals.join('|')===st.ans.join('|')){S.right++;S.vals={};S.sel=null;beep(760,.2);
  if(S.stage<L.stages.length-1){S.fb='Benar! '+st.ex;S.fbc='ok';S.stage++;S.sol=(S.sol||'')+st.ex+'<br>';toast('Tahap selesai');draw()}
  else{S.sol=(S.sol||'')+st.ex;S.done[S.lvl]=true;S.spent+=TOTAL-S.time;S.score+=PTS[S.lvl];toast('+'+PTS[S.lvl]+' poin');S.levelDone=true;S.fb='';S.fbc='';draw()}}
 else{S.wrong++;S.lives--;S.score=Math.max(0,S.score-5);beep(180,.25,'square');if(S.lives<=0)return end('dead');toast('Nyawa tersisa: '+S.lives);S.fb='ACCESS DENIED (nyawa −1). '+st.no;S.fbc='no';hud();draw()}}
function hint(){if(S.hints<=0)return toast('Hint habis untuk sesi ini.');const st=LV[S.lvl].stages[S.stage],k=S.lvl+'-'+S.stage,i=Math.min(S.hintIdx[k]||0,st.hints.length-1);
 S.hints--;S.used++;S.score=Math.max(0,S.score-25);S.hintIdx[k]=i+1;hud();
 S.paused=true;modal(`<h2>HINT</h2><p>${st.hints[i]}</p><p class="story">Skor −25 • Sisa hint: ${S.hints}</p><button class="pri" id="ok">OK</button>`);$('ok').onclick=()=>{S.paused=false;closeM()}}
// ---------- MODALS ----------
function modal(h){$('mod').innerHTML=`<div class="modal" role="dialog" aria-modal="true"><div class="panel">${h}</div></div>`}
function closeM(){$('mod').innerHTML=''}
function pause(){if(S.status!=='play'||S.paused)return;S.paused=true;modal(`<h2>PAUSED</h2><p class="story">Timer berhenti.</p><div class="ctrl"><button class="pri" id="rs">RESUME</button><button id="rt">RESTART</button><button id="mm">MAIN MENU</button></div>`);
 $('rs').onclick=()=>{S.paused=false;closeM()};$('mm').onclick=toMenu;
 $('rt').onclick=()=>{modal(`<h2>Restart?</h2><p>Semua progres akan hilang.</p><div class="ctrl"><button class="pri" id="y">Ya, restart</button><button id="n">Batal</button></div>`);$('y').onclick=()=>{closeM();startGame()};$('n').onclick=()=>{S.paused=false;pause()}}}
function how(){modal(`<h2>HOW TO PLAY</h2><ol><li>Baca cerita & objektif tiap level.</li><li>Klik objek bertanda kuning.</li><li>Pelajari fungsi yang diberikan.</li><li>Masukkan jawaban matematika.</li><li>Gunakan hint bila perlu (maks. 3, −25 poin).</li><li>Kamu punya 3 nyawa (jawaban salah −1 nyawa) dan 10 menit untuk SETIAP level.</li><li>Di level dekripsi, gunakan fungsi invers.</li><li>Selesaikan final challenge untuk membuka pintu.</li></ol>
 <p class="story">Fungsi linear f(x)=ax+b • Komposisi (f∘g)(x)=f(g(x)) • Invers: membalik fungsi asal • Enkripsi: plaintext→ciphertext • Dekripsi: ciphertext→plaintext. Salah: −5 poin.</p><button class="pri" id="ok">MENGERTI</button>`);$('ok').onclick=closeM}
// ---------- RESULT ----------
function result(){show('result');const won=S.status==='won',tot=S.right+S.wrong,acc=tot?Math.round(S.right/tot*100):0,used=S.spent;
 $('result').innerHTML=`<div class="big ${won?'ok':'er'}">${won?'MISSION COMPLETE':S.status==='dead'?'GAME OVER':'TIME EXPIRED'}</div><p style="text-align:center;color:var(--t2)">${won?'Pintu utama terbuka. Kamu berhasil keluar dari CIPHER LAB.':(S.status==='dead'?'Nyawamu habis. Sistem keamanan mengunci fasilitas. Coba lagi dengan lebih teliti.':'Waktu level habis. Sistem mengunci fasilitas. Coba lagi dan selesaikan lebih cepat.')}</p>
 <div class="stats"><div>Skor<b>${S.score}</b></div><div>Total waktu<b>${fmt(used)}</b></div><div>Level selesai<b>${S.done.filter(Boolean).length}/4</b></div><div>Benar / Salah<b>${S.right} / ${S.wrong}</b></div><div>Nyawa tersisa<b>${S.lives}/3</b></div><div>Hint dipakai<b>${S.used}</b></div><div>Akurasi<b>${acc}%</b></div></div>
 <div class="ctrl"><button class="pri" id="pa">PLAY AGAIN</button><button id="rv">REVIEW SOLUTIONS</button><button id="bm">BACK TO MAIN MENU</button></div><div id="rvw"></div>`;
 $('pa').onclick=startGame;$('bm').onclick=toMenu;
 $('rv').onclick=()=>{$('rvw').innerHTML=LV.map((L,i)=>`<div class="panel rev"><h3>Level ${i+1}: ${L.n}</h3>${L.stages.map((s,j)=>`<p><b>Soal:</b> ${s.t||L.n}</p>${s.body.replace(/<details.*<\/details>/,'')}<p><b>Jawaban kamu:</b> <span class="mono">${(S.ans[i]||[])[j]||'—'}</span><br><b>Jawaban benar:</b> <span class="mono">${s.ans.join(', ')}</span></p><div class="sol">${s.ex}</div>`).join('')}<p class="story">Kaitan kriptografi: ${L.sum}</p></div>`).join('');$('rvw').scrollIntoView({behavior:rm?'auto':'smooth'})}}
// ---------- INIT ----------
$('start').onclick=startGame;$('how').onclick=how;$('snd').onclick=setSnd;$('snd2').onclick=setSnd;$('pauseB').onclick=pause;
$('rmb').onclick=()=>{rm=!rm;document.body.classList.toggle('rm',rm);$('rmb').textContent='Kurangi animasi: '+(rm?'ON':'OFF')};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&S&&S.status==='play'&&!S.paused)pause()});
S=fresh();requestAnimationFrame(()=>{$('lb').style.width='100%'});setTimeout(()=>$('load').remove(),1600);

// ===== KONFIGURASI SOAL (dapat diedit pemain; variabel x tetap) =====
const DEF={a1:2,b1:3,k1:4,p:3,q:2,r:2,s:1,k2:2,m3:'AKU',m4:'BUKA PINTU'};
let CFG={...DEF};try{Object.assign(CFG,JSON.parse(localStorage.getItem('cipherCfg')||'{}'))}catch(e){}
const fn=n=>String(n).replace('-','−'),pr=n=>n<0?'('+fn(n)+')':fn(n),add=b=>b?(b>0?' + ':' − ')+Math.abs(b):'';
const lin=(a,b)=>(a===1?'':a===-1?'−':fn(a))+'x'+add(b);
const inv=(a,b)=>{const nu='x'+add(-b);return a===1?nu:(b?'('+nu+')':nu)+' / '+pr(a)};
const nums=m=>m.replace(/ /g,'').split('').map(c=>TABLE[c.toUpperCase()]);
function buildLV(c=CFG){
 const {a1,b1,k1,p,q,r,s,k2}=c,A=p*r,B=p*s+q,v1=a1*k1+b1,gv=r*k2+s,fv=p*gv+q;
 const L3=c.m3.replace(/ /g,'').split(''),P3=nums(c.m3),C3=P3.map(n=>A*n+B);
 const L4=c.m4.replace(/ /g,'').split(''),P4=nums(c.m4),C4=P4.map(n=>A*n+B),hx=lin(A,B),ix=inv(A,B),ix2=C4.length>>1,sum4=P4.reduce((a,b)=>a+b,0);
 const wr=[...new Set([inv(A,-B),lin(A,-B),`(x ${B<0?'+':'−'} ${Math.abs(B)}) · ${pr(A)}`,`x / ${pr(A*2)}`,`(x − ${B+1}) / ${pr(A)}`])].filter(o=>o!==ix).slice(0,3);
 wr.splice(Math.floor(Math.random()*4),0,ix);
 const by=B?`x ${B>0?'−':'+'} ${Math.abs(B)}`:'x';
 return[
 {n:'THE FIRST KEY',obj:'Buka laci kontrol.',story:'Laci kontrol terkunci. Catatan ilmuwan tertempel di sampingnya.',
  stages:[{body:`<div class="eq">f(x) = ${lin(a1,b1)}<br>f(${fn(k1)}) = ?</div>`,lab:[`f(${fn(k1)})`],ans:[String(v1)],hints:[`Substitusikan nilai x = ${fn(k1)} ke fungsi.`,`Hitung ${fn(a1)} × ${pr(k1)}, lalu ${b1>=0?'tambahkan':'kurangkan'} ${Math.abs(b1)}.`],ex:`f(${fn(k1)}) = ${fn(a1)}(${fn(k1)})${add(b1)} = ${fn(v1)}.`,no:`Periksa lagi: ganti x dengan ${fn(k1)}, lalu hitung perkalian sebelum penjumlahan.`}],
  sum:`Fungsi linear f(x)=ax+b: substitusi x lalu hitung. Kode laci = ${fn(v1)}.`},
 {n:'DOUBLE LOCK',obj:'Buka brankas dua lapis.',story:`Brankas dua lapis. Kode = (f ∘ g)(${fn(k2)}).`,
  stages:[{t:'Lapis 1: hitung fungsi dalam',body:`<div class="eq">f(x) = ${lin(p,q)}<br>g(x) = ${lin(r,s)}<br>(f ∘ g)(x) = f(g(x))<br>g(${fn(k2)}) = ?</div>`,lab:[`g(${fn(k2)})`],ans:[String(gv)],hints:['Kerjakan fungsi di bagian dalam terlebih dahulu, yaitu g(x).'],ex:`g(${fn(k2)}) = ${fn(r)}(${fn(k2)})${add(s)} = ${fn(gv)}.`,no:`Substitusikan x = ${fn(k2)} ke g(x) = ${lin(r,s)}.`},
  {t:'Lapis 2: masukkan hasil ke f',body:`<div class="eq">f(g(${fn(k2)})) = f(${fn(gv)}) = ?</div>`,lab:[`f(${fn(gv)})`],ans:[String(fv)],hints:[`Masukkan hasil g(${fn(k2)}) ke f(x) = ${lin(p,q)}.`],ex:`f(${fn(gv)}) = ${fn(p)}(${fn(gv)})${add(q)} = ${fn(fv)}. Kode brankas: ${fn(fv)}.`,no:`Gunakan f(x) = ${lin(p,q)} dengan x = ${fn(gv)}.`}],
  sum:`(f ∘ g)(${fn(k2)}) = f(g(${fn(k2)})) = f(${fn(gv)}) = ${fn(fv)}. Fungsi dalam dikerjakan dulu.`},
 {n:'DECODE THE MESSAGE',obj:'Dekripsi pesan di terminal.',story:`Terminal berisi ciphertext. Fungsi enkripsi: h(x) = f(g(x)) = ${hx}.`,
  stages:[{t:'Tantangan 1: fungsi invers',body:`<div class="eq">CIPHERTEXT: ${C3.map(fn).join(' – ')}<br>h(x) = ${hx}<br>h⁻¹(x) = ?</div>`,opts:wr,ans:[ix],hints:['Tukar x dan y pada y = h(x), lalu selesaikan untuk y.'],ex:`y = ${hx} → x = ${lin(A,B).replace('x','y')} → ${by} = ${A===1?'':fn(A)}y → y = ${ix}.`,no:'Balik prosesnya: hilangkan konstanta dulu, lalu bagi dengan koefisien x.'},
  {t:'Tantangan 2: dekripsi',body:`<div class="eq">h⁻¹(x) = ${ix}</div>`+tblHtml(),lab:C3.map(x=>`h⁻¹(${fn(x)})`),ans:P3.map(String),hints:['Terapkan h⁻¹ pada tiap angka ciphertext.'],ex:C3.map((x,i)=>`${fn(x)}→${P3[i]} (${L3[i]})`).join('; ')+`. Plaintext: <b>${c.m3.trim()}</b>.`,no:'Terapkan rumus invers pada setiap angka.'}],
  sum:`Invers membalik enkripsi: h⁻¹(x)=${ix}. ${C3.map(fn).join(',')} → ${P3.join(',')} → ${c.m3.trim()}.`},
 {n:'FINAL ESCAPE',obj:'Buka pintu utama dengan pesan terakhir.',story:`Pesan terakhir ilmuwan: "${c.m4.trim()}". Enkripsi dengan h(x) = ${hx}.`,
  stages:[{t:'Langkah 1: konversi & enkripsi',body:`<div class="eq">PLAINTEXT: ${c.m4.trim()}<br>f(x)=${lin(p,q)}, g(x)=${lin(r,s)}<br>h(x)=f(g(x))=${hx}</div>`+tblHtml(),lab:L4.map((ch,i)=>`${ch}=${P4[i]} → h`),ans:C4.map(String),hints:[`Ubah huruf ke angka (tabel), lalu hitung ${hx} untuk tiap angka.`,`Contoh: ${L4[0]}=${P4[0]} → ${fn(A)}(${P4[0]})${add(B)} = ${fn(C4[0])}.`],ex:'Ciphertext: '+C4.map(fn).join(' – ')+'.',no:`Konversi tiap huruf dulu, lalu hitung ${hx}.`},
  {t:'Langkah 2: verifikasi dengan invers',body:`<div class="eq">h⁻¹(x) = ${ix}<br>Dekripsi ciphertext ke-${ix2+1} (${fn(C4[ix2])})</div>`,lab:[`h⁻¹(${fn(C4[ix2])})`],ans:[String(P4[ix2])],hints:[`Hitung ${inv(A,B).replace('x',fn(C4[ix2]))}.`],ex:`h⁻¹(${fn(C4[ix2])}) = ${P4[ix2]} → ${L4[ix2]}. Cocok dengan plaintext.`,no:'Terapkan rumus invers pada angka tersebut.'},
  {t:'Langkah 3: kode pintu',body:`<div class="eq">Kode pintu = jumlah semua angka plaintext<br>${P4.join(' + ')}</div>`,lab:['KODE'],ans:[String(sum4)],hints:['Jumlahkan angka plaintext (bukan ciphertext).'],ex:`${P4.join('+')} = ${sum4}. Pintu terbuka!`,no:'Jumlahkan angka plaintext hasil tabel kuantifikasi.'}],
  sum:`Enkripsi lalu dekripsi saling membalik: h⁻¹(h(x)) = x. Kode pintu = ${sum4}.`}]}
// ===== EDITOR SOAL =====
function editor(){
 const fl=(k,l,t)=>`<label>${l}<input data-c="${k}" ${t?'class="tx" maxlength="14"':'type="number" step="1"'} value="${CFG[k]}"></label>`;
 modal(`<h2>EDIT SOAL</h2><p class="story">Ubah angka dan huruf sesukamu. Variabel x tetap. Jawaban otomatis menyesuaikan.</p>
 <h3>Level 1: f(x) = ax + b, hitung f(k)</h3><div class="inp">${fl('a1','a')}${fl('b1','b')}${fl('k1','k')}</div>
 <h3>Level 2–4: f(x) = px + q, g(x) = rx + s</h3><div class="inp">${fl('p','p')}${fl('q','q')}${fl('r','r')}${fl('s','s')}${fl('k2','(f∘g)(k)')}</div>
 <h3>Pesan rahasia (huruf kapital atau kecil, spasi boleh)</h3><div class="inp">${fl('m3','Level 3 (maks 8 huruf)',1)}${fl('m4','Level 4 (maks 12 huruf)',1)}</div>
 <div class="fb no" id="ef"></div><div class="ctrl"><button class="pri" id="sv">SIMPAN</button><button id="df">RESET DEFAULT</button><button id="cl">TUTUP</button></div>`);
 $('cl').onclick=closeM;
 $('df').onclick=()=>{CFG={...DEF};try{localStorage.removeItem('cipherCfg')}catch(e){}editor()};
 $('sv').onclick=()=>{const n={};let err='';
  document.querySelectorAll('[data-c]').forEach(e=>{const k=e.dataset.c;n[k]=k[0]==='m'?e.value.trim():Number(e.value)});
  for(const k of['a1','b1','k1','p','q','r','s','k2'])if(!Number.isInteger(n[k])||Math.abs(n[k])>20)err='Angka harus bilangan bulat antara −20 dan 20.';
  if(!n.a1||!n.p||!n.r)err='a, p, dan r tidak boleh 0 (fungsi harus punya invers).';
  [['m3',8],['m4',12]].forEach(([k,mx])=>{const L=n[k].replace(/ /g,'').length;if(!/^[A-Za-z ]+$/.test(n[k])||L<1||L>mx)err=`Pesan ${k==='m3'?'Level 3':'Level 4'}: hanya huruf A–Z atau a–z, 1–${mx} huruf.`});
  if(err){$('ef').textContent=err;return}
  CFG=n;try{localStorage.setItem('cipherCfg',JSON.stringify(CFG))}catch(e){}closeM();toast('Soal disimpan')}}
// ===== PAPAN INVESTIGASI (menu) =====
function boardSvg(){
 const X=[28,148,268],Y=[28,140,252],w=96,h=100,rot=[-4,3,-2,4,-3,2,-3,5,-2];let ph='',c=[];
 for(let i=0;i<9;i++){const x=X[i%3],y=Y[(i/3)|0],cx=x+w/2;c.push([cx,y+8]);
  ph+=`<g transform="rotate(${rot[i]} ${cx} ${y+h/2})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f2e8d0" stroke="#b9a37a"/><rect x="${x+6}" y="${y+6}" width="${w-12}" height="${h-26}" fill="url(#sp)"/><circle cx="${cx}" cy="${y+36}" r="12" fill="#3a2616"/><path d="M${cx-26} ${y+h-20}q26-36 52 0z" fill="#3a2616"/></g>`}
 const pts=[0,4,2,5,8,4,6,3,0,1,4,7,8,5,4].map(i=>c[i].join(',')).join(' ');
 return`<svg viewBox="0 0 400 420" role="img" aria-label="Papan investigasi dengan benang merah"><defs><linearGradient id="sp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b79a6b"/><stop offset="1" stop-color="#6d5233"/></linearGradient><linearGradient id="ck" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfa56a"/><stop offset="1" stop-color="#a97b43"/></linearGradient></defs><rect x="6" y="6" width="388" height="408" rx="6" fill="url(#ck)" stroke="#4a2c16" stroke-width="10"/>${ph}<polyline points="${pts}" fill="none" stroke="#c0392b" stroke-width="1.8" opacity=".9"/>${c.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="4.5" fill="#e03b2e" stroke="#7a1a12"/>`).join('')}<g transform="rotate(-2 200 380)"><rect x="90" y="357" width="220" height="40" fill="#efe3c8" stroke="#b79c6c"/><text x="200" y="373" text-anchor="middle" font-family="Special Elite,monospace" font-size="13" fill="#3b2412">SECURITY SYSTEM ACTIVE</text><text x="200" y="389" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" fill="#b3261e">CIPHER LAB // CASE FILE</text></g></svg>`}
// ===== RUANGAN VINTAGE =====
function scene(){
 const d=S.done,c=S.lvl,open=d[3],col=i=>d[i]?'#7bd88f':i===c?'#ffcf6b':'#7a6650';
 const dot=(i,x,y)=>i===c&&!d[i]?`<circle cx="${x}" cy="${y}" r="6" fill="#ffcf6b" class="pulse"/>`:'';
 const hs=(i,x,y,w,h,label,inner)=>`<g class="hs" tabindex="0" role="button" aria-label="${label}" data-i="${i}">${inner}<rect class="gl" x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="transparent" stroke="${col(i)}" stroke-width="2"/>${dot(i,x+w-8,y+8)}</g>`;
 const bulb=x=>`<line x1="${x}" y1="46" x2="${x}" y2="64" stroke="#111"/><circle cx="${x}" cy="76" r="30" fill="url(#gl)" class="pulse"/><ellipse cx="${x}" cy="72" rx="6" ry="9" fill="#ffe2a0"/>`;
 let gears='',planks='';[[170,85,13,'#d94f3a'],[198,82,12,'#4aa56a'],[226,86,11,'#4a78c8'],[182,112,12,'#e8c34a'],[212,114,12,'#eee']].forEach(([x,y,r,k])=>gears+=`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${k}" stroke-width="6" stroke-dasharray="4 3"/>`);
 for(let x=40;x<640;x+=80)planks+=`M${x} 150V300`;
 $('scene').innerHTML=`<defs><radialGradient id="gl"><stop offset="0" stop-color="#ffb84d" stop-opacity=".9"/><stop offset="1" stop-color="#ffb84d" stop-opacity="0"/></radialGradient><linearGradient id="wl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c25a22"/><stop offset="1" stop-color="#8d3a14"/></linearGradient><linearGradient id="wd" x1="0" x2="1"><stop offset="0" stop-color="#6b4226"/><stop offset="1" stop-color="#8a5a35"/></linearGradient><linearGradient id="sp2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b79a6b"/><stop offset="1" stop-color="#6d5233"/></linearGradient></defs>
 <rect width="640" height="400" fill="#120a06"/><rect width="640" height="46" fill="#0b0605"/><path d="M0 12H640M0 36H640" stroke="#7a4a2a" stroke-width="5"/>
 <rect y="46" width="640" height="104" fill="url(#wl)"/><rect y="150" width="640" height="150" fill="#4a2c18"/><path d="${planks}" stroke="#2d1a0e" stroke-width="2"/>
 <rect y="300" width="640" height="100" fill="#2b3636"/><path d="M110 392L165 322H520L585 392Z" fill="#5a2a22" stroke="#c9a05a" stroke-width="2"/>
 <circle cx="24" cy="22" r="5" fill="${open?'#7bd88f':'#ff6b5a'}" class="pulse"/><text x="38" y="26" fill="#ffcf6b" font-size="11" font-family="JetBrains Mono">${open?'ESCAPE ROUTE UNLOCKED':'LOCKDOWN ACTIVE'}</text>
 <rect x="150" y="62" width="100" height="122" fill="url(#wd)" stroke="#2d1a0e" stroke-width="3"/>${gears}
 <rect x="300" y="74" width="56" height="74" fill="#1a0e08" stroke="#c9a05a" stroke-width="3"/><rect x="306" y="80" width="44" height="62" fill="url(#sp2)"/><circle cx="328" cy="103" r="9" fill="#3a2616"/><path d="M310 142q18-30 36 0z" fill="#3a2616"/>
 ${bulb(130)}${bulb(280)}${bulb(470)}
 <rect x="135" y="228" width="150" height="92" fill="url(#wd)" stroke="#2d1a0e" stroke-width="3"/><path d="M135 258H285M175 228V320M245 228V320" stroke="#3a2210" stroke-width="2"/>
 <rect x="380" y="236" width="140" height="84" fill="url(#wd)" stroke="#2d1a0e" stroke-width="3"/><path d="M380 264H520M420 236V320M480 236V320" stroke="#3a2210" stroke-width="2"/>
 <ellipse cx="320" cy="352" rx="110" ry="20" fill="url(#wd)" stroke="#2d1a0e" stroke-width="3"/><rect x="312" y="362" width="16" height="30" fill="#2d1a0e"/><ellipse cx="320" cy="346" rx="22" ry="8" fill="#5a2a22"/><circle cx="320" cy="342" r="6" fill="#e0392b"/><rect x="250" y="347" width="30" height="14" fill="#efe3c8" transform="rotate(-8 265 354)"/><rect x="360" y="349" width="34" height="14" fill="#efe3c8" transform="rotate(6 377 356)"/>
 ${hs(0,8,14,112,316,'Laci kontrol (Level 1)',`<circle cx="64" cy="38" r="22" fill="#c9a062" stroke="#7a5a2a"/><path d="M42 38H86M64 16V60" stroke="#7a5a2a" opacity=".6"/><rect x="8" y="60" width="112" height="270" fill="#3a1b10" stroke="#1a0c06" stroke-width="3"/><path d="M26 85q38-30 76 0V235H26Z" fill="#4a2518" stroke="#1a0c06"/><rect x="22" y="${d[0]?270:252}" width="84" height="40" fill="#5a2d1c" stroke="#c9a05a"/><circle cx="64" cy="${d[0]?290:272}" r="5" fill="#c9a05a"/>${d[0]?'<path d="M44 280h24" stroke="#ffd98a" stroke-width="4"/><circle cx="74" cy="280" r="5" fill="none" stroke="#ffd98a" stroke-width="3"/>':''}<text x="64" y="322" text-anchor="middle" fill="${col(0)}" font-size="10" font-family="JetBrains Mono">${d[0]?'OPEN':'LOCKED'}</text>`)}
 ${hs(2,160,138,104,90,'Komputer terminal (Level 3)',`<rect x="165" y="142" width="94" height="78" rx="8" fill="#2a1d14" stroke="#c9a05a" stroke-width="2"/><rect x="173" y="150" width="78" height="54" rx="4" fill="#06100a"/><text x="178" y="168" font-size="10" fill="${d[2]?'#7bd88f':'#ffcf6b'}" font-family="JetBrains Mono">${d[2]?'PLAINTEXT OK':'ENCRYPTED'}</text><text x="178" y="184" font-size="9" fill="#7bd88f" font-family="JetBrains Mono">${d[2]?'ACCESS GRANTED':'> decrypt_'}</text><rect x="195" y="222" width="30" height="6" fill="#c9a05a"/>`)}
 ${hs(1,395,150,100,88,'Brankas (Level 2)',`<rect x="400" y="154" width="90" height="80" rx="4" fill="#3c4a46" stroke="#1b2523" stroke-width="3"/>${d[1]?'<rect x="408" y="162" width="74" height="64" fill="#1a0e08"/><circle cx="445" cy="194" r="14" fill="#ffcf6b" opacity=".6"/><path d="M400 154l14 8v64l-14 8z" fill="#55655f"/>':'<circle cx="445" cy="194" r="22" fill="#26302d" stroke="#c9a05a" stroke-width="3"/><circle cx="445" cy="194" r="16" fill="none" stroke="#c9a05a" stroke-dasharray="2 4"/><path d="M445 194L458 182" stroke="#ffd98a" stroke-width="3"/>'}`)}
 ${hs(3,532,70,100,252,'Pintu utama (Level 4)',`<rect x="536" y="74" width="92" height="248" fill="#1d0f07" stroke="#c9a05a" stroke-width="3"/>${open?'<rect x="542" y="80" width="80" height="236" fill="#7bd88f" opacity=".35"/><path d="M542 80L572 92V304L542 316Z" fill="#6b3a1c" stroke="#2d1a0e"/>':'<rect x="542" y="80" width="80" height="236" fill="#6b3a1c" stroke="#2d1a0e"/><rect x="552" y="92" width="60" height="70" fill="none" stroke="#3a2010" stroke-width="3"/><rect x="552" y="216" width="60" height="90" fill="none" stroke="#3a2010" stroke-width="3"/><rect x="586" y="170" width="28" height="36" rx="3" fill="#120a06" stroke="#c9a05a"/><circle cx="595" cy="181" r="2" fill="#ffcf6b"/><circle cx="605" cy="181" r="2" fill="#ffcf6b"/><circle cx="595" cy="193" r="2" fill="#ffcf6b"/><circle cx="605" cy="193" r="2" fill="#ffcf6b"/>'}`)}`;
 $('scene').querySelectorAll('.hs').forEach(e=>{const go=()=>click(+e.dataset.i);e.onclick=go;e.onkeydown=k=>{if(k.key==='Enter'||k.key===' '){k.preventDefault();go()}}});
 $('obj').textContent='Objektif: '+LV[S.lvl].obj+' Klik objek bertanda kuning.'}
$('board').innerHTML=boardSvg();$('edt').onclick=editor;