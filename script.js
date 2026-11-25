const menu=document.querySelector('.menu'),nav=document.querySelector('nav');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const header=document.querySelector('.header');
const footer=document.querySelector('.grand-footer');
const updateChrome=()=>{header?.classList.toggle('is-scrolled',window.scrollY>70);if(footer&&footer.getBoundingClientRect().top<window.innerHeight*.88)footer.classList.add('is-visible')};
window.addEventListener('scroll',updateChrome,{passive:true});
updateChrome();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('section:not(.room-showcase),figure,.space-list article,.pillars article,.room-card').forEach(el=>{el.classList.add('reveal');observer.observe(el)});

const showcase=document.querySelector('.room-showcase');
if(showcase){
  const rooms=[
    ['assets/2026-11-23 13.42.47.jpg','HabitaciÃ³nes<br><em>matrimoniales</em>','HabitaciÃ³nes cÃ¡lidas y tranquilas, pensadas para descansar despuÃ©s de un dia descubriendo Tera y sus alrededores.'],
    ['assets/2026-11-23 13.44.20.jpg','HabitaciÃ³nes<br><em>matrimoniales</em>','Luz natural, materiales sencillos y todo lo necesario para sentirse como en casa.'],
    ['assets/2026-11-23 13.46.11.jpg','HabitaciÃ³n<br><em>doble</em>','Dos camas y un espacio sereno para descansar y compartir unos dias en el entorno del Tera.'],
    ['assets/2026-11-23 13.47.53.jpg','HabitaciÃ³n<br><em>doble</em>','Un dormitorio acogedor para bajar el ritmo y dormir rodeado de la calma de Tera.']
  ];
  let current=0, locked=false, lastWheel=0, sectionActive=false, released=false;
  const image=document.querySelector('#room-image'),title=document.querySelector('#room-title'),description=document.querySelector('#room-description'),counter=document.querySelector('#room-current');
  function changeRoom(next){if(next<0||next>=rooms.length||locked)return;locked=true;showcase.classList.add('is-changing');setTimeout(()=>{current=next;image.src=rooms[current][0];title.innerHTML=rooms[current][1];description.textContent=rooms[current][2];counter.textContent=String(current+1).padStart(2,'0');image.alt=rooms[current][1].replace(/<[^>]*>/g,'')+' en El BalcÃ³n de Tera';showcase.classList.remove('is-changing');setTimeout(()=>locked=false,450)},350)}
  const sectionObserver=new IntersectionObserver(entries=>{const ratio=entries[0].intersectionRatio;if(ratio>.72){released=false;showcase.classList.remove('released');sectionActive=true}else if(ratio<.2){sectionActive=false}},{threshold:[0,.2,.72,1]});
  sectionObserver.observe(showcase);
  window.addEventListener('wheel',event=>{if(!sectionActive)return;const direction=event.deltaY>0?1:-1;const canMove=(direction>0&&current<rooms.length-1)||(direction<0&&current>0);if(canMove){event.preventDefault();event.stopPropagation();changeRoom(current+direction)}else{sectionActive=false;released=true;showcase.classList.add('released')}},{passive:false,capture:true});
  showcase.addEventListener('wheel',event=>{const now=Date.now();if(now-lastWheel<650)return;const direction=event.deltaY>0?1:-1;if((direction>0&&current<rooms.length-1)||(direction<0&&current>0)){event.preventDefault();lastWheel=now;changeRoom(current+direction)}},{passive:false});
  let startY=0;showcase.addEventListener('touchstart',e=>startY=e.touches[0].clientY,{passive:true});showcase.addEventListener('touchend',e=>{const delta=startY-e.changedTouches[0].clientY;if(Math.abs(delta)>40)changeRoom(current+(delta>0?1:-1))},{passive:true});
}
