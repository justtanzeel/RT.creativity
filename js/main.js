const cursor=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=(mx-5)+'px';cursor.style.top=(my-5)+'px';});
(function a(){rx+=(mx-rx-18)*0.12;ry+=(my-ry-18)*0.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(a);})();
document.querySelectorAll('a,button,.p-item,.service-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cursor.style.transform='scale(2)';ring.style.transform='scale(1.5)';});
  el.addEventListener('mouseleave',()=>{cursor.style.transform='scale(1)';ring.style.transform='scale(1)';});
});
const obs=new IntersectionObserver(entries=>entries.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('visible'),i*80);}),{threshold:0.1});
document.querySelectorAll('.reveal').forEach(r=>obs.observe(r));
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',function(){
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    const f=this.dataset.filter;
    document.querySelectorAll('.p-item').forEach(item=>{
      if(f==='all'||item.dataset.cat===f){item.classList.remove('hidden');}else{item.classList.add('hidden');}
    });
  });
});
let cur=0;const total=10;
const track=document.getElementById('carouselTrack');
const dots=document.querySelectorAll('.dot');
// ── Seamless Carousel ─────────────────────────────────────────────────
const TOTAL = 10;
let curSlide = 0;
let isTransitioning = false;
let autoTimer;

function getW(){ return document.querySelector('.carousel-wrap').offsetWidth; }

function updateDots(n){
  document.querySelectorAll('.dot').forEach((d,i)=> d.classList.toggle('active', i===n));
}

function jumpTo(n, animate){
  track.style.transition = animate ? 'transform 0.55s cubic-bezier(0.4,0,0.2,1)' : 'none';
  track.style.transform  = 'translateX(-' + (n * getW()) + 'px)';
}

function goTo(n){
  if(isTransitioning) return;
  curSlide = ((n % TOTAL) + TOTAL) % TOTAL;
  jumpTo(curSlide, true);
  updateDots(curSlide);
}

function nextSlide(){
  if(isTransitioning) return;
  isTransitioning = true;
  if(curSlide < TOTAL - 1){
    curSlide++;
    jumpTo(curSlide, true);
    updateDots(curSlide);
    setTimeout(()=>{ isTransitioning = false; }, 600);
  } else {
    // Slide to clone (index TOTAL), then silently snap to slide 0
    jumpTo(TOTAL, true);
    updateDots(0);
    setTimeout(()=>{
      jumpTo(0, false);
      curSlide = 0;
      setTimeout(()=>{ isTransitioning = false; }, 50);
    }, 560);
  }
}

function prevSlide(){
  if(isTransitioning) return;
  isTransitioning = true;
  if(curSlide > 0){
    curSlide--;
    jumpTo(curSlide, true);
    updateDots(curSlide);
    setTimeout(()=>{ isTransitioning = false; }, 600);
  } else {
    // Jump to clone of last slide before index 0, then animate back
    jumpTo(-1, false);
    setTimeout(()=>{
      jumpTo(TOTAL - 1, true);
      curSlide = TOTAL - 1;
      updateDots(curSlide);
      setTimeout(()=>{ isTransitioning = false; }, 600);
    }, 20);
  }
}

// Clone first slide and append after last for seamless forward wrap
(function(){
  const clone = track.children[0].cloneNode(true);
  clone.setAttribute('aria-hidden','true');
  track.appendChild(clone);
})();

// Init
jumpTo(0, false);
updateDots(0);
window.addEventListener('resize', ()=> jumpTo(curSlide, false));

function startAuto(){ autoTimer = setInterval(nextSlide, 4500); }
function stopAuto(){  clearInterval(autoTimer); }
startAuto();
document.querySelector('.carousel-wrap').addEventListener('mouseenter', stopAuto);
document.querySelector('.carousel-wrap').addEventListener('mouseleave', startAuto);
const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{let c='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-200)c=s.id;});navLinks.forEach(a=>{a.style.color=a.getAttribute('href')==='#'+c?'var(--accent)':'';});});
function filterAndGo(cat){
  // activate correct filter button
  document.querySelectorAll('.filter-btn').forEach(b=>{
    b.classList.toggle('active', b.dataset.filter===cat);
  });
  // show/hide items
  document.querySelectorAll('.p-item').forEach(item=>{
    if(item.dataset.cat===cat){item.classList.remove('hidden');}
    else{item.classList.add('hidden');}
  });
  // scroll to portfolio section
  document.getElementById('portfolio').scrollIntoView({behavior:'smooth'});
}