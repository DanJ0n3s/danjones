const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)]; // short query helpers
const page=location.pathname.split('/').pop()||'index.html'; // current file, used to highlight the nav
const items=[['index.html','Home'],['work.html','Work'],['about.html','About'],['#contact','Contact']];
// inject curtain, progress bar, cursor and nav on every page so the HTML stays small
document.body.insertAdjacentHTML('afterbegin',`<div class="cv"></div><div class="pb"></div><div class="cur"></div><nav><a class="logo" href="index.html">D<span>aniel </span>O<span>rji</span></a><div class="links">${items.map(([h,t])=>`<a href="${h}" class="${h===page?'on':''}">${t}</a>`).join('')}</div></nav>`);
// footer = contact section
document.body.insertAdjacentHTML('beforeend',`<footer id="contact"><div class="wrap"><p class="tag"><i></i>Open to internships and freelance work</p><h2 data-split>Let's build something together.</h2><a class="mail" href="mailto:danielorji050@gmail.com">danielorji050@gmail.com</a><div class="btns"><a class="btn" href="https://www.linkedin.com/in/daniel-orji-858a14350" target="_blank" rel="noopener">LinkedIn</a><a class="btn o" href="https://github.com/danj0n3s" target="_blank" rel="noopener">GitHub</a><a class="btn o" href="assets/Daniel_Orji_CV.pdf" download>Download my CV</a></div><small>© 2026 Daniel Orji, Lagos, Nigeria</small></div></footer>`);
// wrap every word of [data-split] so it can slide up on its own
$$('[data-split]').forEach(el=>{el.innerHTML=el.innerHTML.split(' ').map((t,i)=>`<span class="w"><span style="--i:${i}">${t}</span></span>`).join(' ')});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.2});
$$('[data-split]').forEach(el=>io.observe(el)); // reveal headlines when they scroll into view
// page transition: curtain lifts on arrival, drops before leaving
const cv=$('.cv'),lift=()=>{cv.style.transform='';cv.classList.add('out')};
addEventListener('pageshow',lift); // also runs when the browser Back button restores a page
$$('a[href$=".html"]').forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault();cv.classList.remove('out');
  cv.style.transition='none';cv.style.transform='translateY(100%)';cv.offsetWidth; // jump below the screen, force reflow
  cv.style.transition='';cv.style.transform='none'; // then animate up to cover the page
  setTimeout(()=>location.href=a.getAttribute('href'),700)}));
// custom cursor follows the mouse with easing and grows over links
const cur=$('.cur');let mx=0,my=0,cx=0,cy=0;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function loop(){cx+=(mx-cx)*.18;cy+=(my-cy)*.18;cur.style.left=cx+'px';cur.style.top=cy+'px';requestAnimationFrame(loop)})();
$$('a,.shot').forEach(el=>{el.onmouseenter=()=>cur.classList.add('h');el.onmouseleave=()=>cur.classList.remove('h')});
// magnetic buttons lean toward the pointer
$$('.btn').forEach(b=>{b.onmousemove=e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`};b.onmouseleave=()=>b.style.transform=''});
// 3D tilt on photos and project frames
$$('.ph,.shot').forEach(el=>{el.onmousemove=e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`};el.onmouseleave=()=>el.style.transform=''});
// count-up numbers start when visible
$$('[data-n]').forEach(el=>new IntersectionObserver(([e],o)=>{if(!e.isIntersecting)return;o.disconnect();const n=+el.dataset.n,t0=performance.now();
  (function f(t){const p=Math.min((t-t0)/1300,1);el.textContent=Math.round(n*(1-(1-p)**3))+(el.dataset.s||'');if(p<1)requestAnimationFrame(f)})(t0)}).observe(el));
// rotating role in the hero line
const rot=$('.rot');if(rot){const L=['frontend developer','video editor','data analyst in training'];let i=0;
  setInterval(()=>{rot.style.opacity=0;setTimeout(()=>{rot.textContent=L[i=++i%L.length];rot.style.opacity=1},350)},2800)}
// scroll progress bar + horizontal scroll on the work page (desktop only)
const pin=$('.pin'),track=$('.track'),wide=matchMedia('(min-width:900px)');
function size(){
  if(pin)pin.style.height=wide.matches?track.scrollWidth-innerWidth+innerHeight+'px':''; // vertical distance = sideways distance + one screen
  $$('.view').forEach(v=>$('iframe',v).style.transform=`scale(${v.clientWidth/1280})`)} // shrink each live site to fit its frame
function onScroll(){
  const max=document.documentElement.scrollHeight-innerHeight||1;$('.pb').style.width=scrollY/max*100+'%';
  if(!pin)return;
  if(wide.matches){const p=Math.min(Math.max(-pin.getBoundingClientRect().top/(pin.offsetHeight-innerHeight),0),1);track.style.transform=`translateX(${-p*(track.scrollWidth-innerWidth)}px)`}else track.style.transform=''} // scroll position becomes sideways movement
addEventListener('scroll',onScroll,{passive:true});
addEventListener('resize',()=>{size();onScroll()});addEventListener('load',()=>{size();onScroll()});size();onScroll();
