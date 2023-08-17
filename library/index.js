console.log(
  'Самопроверка, часть 1:\nВёрстка валидная +10\nВёрстка семантическая +16\nВёрстка соответствует макету +54\nОбщие требования к верстке +20'
);
console.log('---------------');
console.log(
  'Самопроверка, часть 2:\nВёрстка соответствует макету. Ширина экрана 768px +26\nНи на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\nНа ширине экрана 768рх реализовано адаптивное меню +12'
);

//----------------- Side menu -----------------
let height = window.innerHeight;
let width = window.innerWidth;

const sideMenu = document.getElementById('header-menu');
const sideMenuButton = document.getElementById('header-menu-button');
const sideMenuCloseButton = document.getElementById('header-menu-close-button');
let links = sideMenu.querySelectorAll('a');

links.forEach((link) => {
  link.addEventListener('click', removeClasses);
});

window.addEventListener('resize', resizeWindow, true);
function eventHandler(e) {
  if (!sideMenu.contains(e.target) && e.target !== sideMenuButton) {
    removeClasses();
  }
}

function addClasses() {
  sideMenuButton.classList.add('header__burger-icon_hidden');
  sideMenuCloseButton.classList.add('header__burger-close_visible');
  sideMenu.classList.add('header__navigation-visible');
  document.body.addEventListener('wheel', preventScroll, { passive: false });
  document.addEventListener('click', eventHandler);
}
function removeClasses() {
  sideMenu.classList.remove('header__navigation-visible');
  sideMenuButton.classList.remove('header__burger-icon_hidden');
  sideMenuCloseButton.classList.remove('header__burger-close_visible');
  document.body.removeEventListener('wheel', preventScroll, { passive: false });
  document.removeEventListener('click', eventHandler);
}

sideMenuButton.addEventListener('click', addClasses);

sideMenuCloseButton.addEventListener('click', removeClasses);

function resizeWindow() {
  height = window.innerHeight;
  width = window.innerWidth;
  if (width <= 1024) {
    removeClasses();
  }
}

function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

//----------------- Slider -----------------
let currentPosition = 0;
const NEXT = 'next';
const PREV = 'prev';
const DOT = 'dot';
const slides = document.querySelectorAll(".about__list_slider-item");
const dots = document.querySelectorAll(".about__list_slider-dot");
const left_arrow = document.getElementById('about__arrow_left');
const right_arrow = document.getElementById('about__arrow_right');


const renderSlide = (action, index) => {
  if((index === slides.length-1 && action === NEXT) || (index === 0 && action === PREV)) {
    alert("OI!")
  } else {
    if(action===NEXT){
      slides[index].classList.add("about__list_slider-item-hidden")
      slides[index+1].classList.remove("about__list_slider-item-hidden")
      dots[index].classList.remove("about__list_slider-dot_active")
      dots[index+1].classList.add("about__list_slider-dot_active")
      currentPosition++
      
    }
    if(action===PREV){
      slides[index].classList.add("about__list_slider-item-hidden")
      slides[index-1].classList.remove("about__list_slider-item-hidden")
      dots[index].classList.remove("about__list_slider-dot_active")
      dots[index-1].classList.add("about__list_slider-dot_active")
      currentPosition--
    }
    if(action===DOT){
      slides[currentPosition].classList.add("about__list_slider-item-hidden")
      slides[index].classList.remove("about__list_slider-item-hidden")
      dots[currentPosition].classList.remove("about__list_slider-dot_active")
      dots[index].classList.add("about__list_slider-dot_active")
      currentPosition=index;
    }
  }
  
  console.log(currentPosition)
}

right_arrow.addEventListener('click', ()=> renderSlide(NEXT, currentPosition));
left_arrow.addEventListener('click',()=>  renderSlide(PREV, currentPosition));

dots.forEach((dot,index)=>{
  dot.addEventListener('click', ()=>renderSlide(DOT, index))
})


console.log(slides)