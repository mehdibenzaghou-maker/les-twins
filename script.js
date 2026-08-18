/* ═══ LES TWINS — script.js ═══ */
const WA_RESERVATION = "213555474087";

function initNav(){
  const nav=document.querySelector('nav');
  if(nav)window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>30),{passive:true});
  const page=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a,.mob-nav a').forEach(a=>{if((a.getAttribute('href')||'')===page)a.classList.add('active');});
  const burger=document.getElementById('burger'),mob=document.getElementById('mobNav');
  if(burger&&mob){
    burger.addEventListener('click',()=>{burger.classList.toggle('open');mob.classList.toggle('open');document.body.style.overflow=mob.classList.contains('open')?'hidden':'';});
    mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('open');mob.classList.remove('open');document.body.style.overflow='';}));
  }
}
function initReveal(){
  const io=new IntersectionObserver(es=>{
    const v=[...es].filter(e=>e.isIntersecting);
    v.forEach((e,i)=>{setTimeout(()=>e.target.classList.add('in'),i*70);io.unobserve(e.target);});
  },{threshold:.05,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.rv').forEach(el=>io.observe(el));
}
function initSectionBar(){
  const bar=document.querySelector('.section-bar');
  if(!bar)return;
  const act=bar.querySelector('.sb-link.active');
  if(!act)return;
  bar.scrollLeft=Math.max(0,act.offsetLeft-(bar.clientWidth/2)+(act.offsetWidth/2));
}

/* ── Reservation modal ── */
function openReservation(){
  document.querySelector('.res-modal')?.classList.add('show');
  const t=document.getElementById('r-time');
  if(t){t.min='20:00';t.max='22:30';}
}
function closeReservation(){document.querySelector('.res-modal')?.classList.remove('show');}
function submitReservation(){
  const name=document.getElementById('r-name')?.value?.trim();
  const phone=document.getElementById('r-phone')?.value?.trim();
  const date=document.getElementById('r-date')?.value;
  const time=document.getElementById('r-time')?.value;
  const covers=document.getElementById('r-covers')?.value;
  const notes=document.getElementById('r-notes')?.value?.trim();
  if(!name||!phone||!date||!time||!covers){alert('Veuillez remplir tous les champs obligatoires.');return;}
  if(time<'20:00'||time>'22:30'){alert('Les réservations sont possibles uniquement entre 20h00 et 22h30.');return;}
  let msg=`✨ *Réservation — Les Twins*\n\n`;
  msg+=`👤 Nom: *${name}*\n📱 Tél: *${phone}*\n`;
  msg+=`📅 Date: *${date}*\n🕐 Heure: *${time}*\n👥 Couverts: *${covers}*\n`;
  if(notes)msg+=`📝 Notes: ${notes}\n`;
  window.open(`https://wa.me/${WA_RESERVATION}?text=${encodeURIComponent(msg)}`,'_blank');
  closeReservation();
}



/* ── Doléance / Réclamation ── */
function openComplaint(){document.querySelector('.cpl-modal')?.classList.add('show');}
function closeComplaint(){document.querySelector('.cpl-modal')?.classList.remove('show');}
function submitComplaint(){
  const name=document.getElementById('c-name')?.value?.trim();
  const phone=document.getElementById('c-phone')?.value?.trim();
  const msg=document.getElementById('c-msg')?.value?.trim();
  if(!name||!msg){alert('Veuillez indiquer votre nom et votre message.');return;}
  let m=`⚠️ *Doléance / Réclamation — Les Twins*\n\n`;
  m+=`👤 Nom: *${name}*\n`;
  if(phone)m+=`📱 Tél: *${phone}*\n`;
  m+=`\n📝 Message:\n${msg}`;
  window.open(`https://wa.me/${WA_RESERVATION}?text=${encodeURIComponent(m)}`,'_blank');
  closeComplaint();
}

document.addEventListener('DOMContentLoaded',()=>{
  initNav();initReveal();initSectionBar();
});
