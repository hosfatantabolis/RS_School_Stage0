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
let isScreenWide = width > 1024 ? true : false;

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
  isScreenWide = false;
}

sideMenuButton.addEventListener('click', addClasses);

sideMenuCloseButton.addEventListener('click', removeClasses);

function resizeWindow() {
  currentPosition = 0;
  height = window.innerHeight;
  width = window.innerWidth;
  sliderWidth = slider.offsetWidth;
  renderSlide(currentPosition);
  initArrows(currentPosition);
  initDots(currentPosition);
  if (width <= 1024) {
    removeClasses(); // убираем бургер-меню
    slides.forEach((slide) => {
      slide.style.width = '';
    });
  }
  if (width > 1024) {
    isScreenWide = true;
    slides.forEach((slide) => {
      slide.style.width = (sliderWidth - 40) / 3 + 'px';
    });
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
const slides = document.querySelectorAll('.about__slider_image');
const slider = document.querySelector('.about__slider');
const sliderInside = document.querySelector('.about__list_slider');
let sliderWidth = slider.offsetWidth;
const dots = document.querySelectorAll('.about__list_slider-dot');
const left_arrow = document.getElementById('about__arrow_left');
const right_arrow = document.getElementById('about__arrow_right');

const initArrows = (position) => {
  if (position === 0) {
    left_arrow.classList.add('about__arrow-inactive');
  } else {
    left_arrow.classList.remove('about__arrow-inactive');
  }

  if (position === slides.length - 1) {
    right_arrow.classList.add('about__arrow-inactive');
  } else {
    right_arrow.classList.remove('about__arrow-inactive');
  }
};

const initDots = (position) => {
  dots.forEach((dot, index) => {
    if (index === position) {
      dot.classList.add('about__list_slider-dot_active');
    } else dot.classList.remove('about__list_slider-dot_active');
  });
};

initDots(currentPosition);
initArrows(currentPosition);

const renderSlide = (currentPosition) => {
  initDots(currentPosition);
  initArrows(currentPosition);
  if (isScreenWide) {
    let value = (currentPosition * sliderWidth) / 3;
    sliderInside.style.transform =
      'translate(-' + (value > 20 ? value : 0) + 'px)';
  } else {
    sliderInside.style.transform =
      'translate(-' + currentPosition * sliderWidth + 'px)';
  }
};

right_arrow.addEventListener('click', () => {
  if (currentPosition < slides.length - 1) {
    currentPosition++;
  }
  renderSlide(currentPosition);
});
left_arrow.addEventListener('click', () => {
  if (currentPosition !== 0) {
    currentPosition--;
  }
  renderSlide(currentPosition);
});
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => renderSlide(index));
});

//----------------Seasons Slider-------------
//---cards---
const winterCards = document.querySelectorAll('.favorites__grid_card-winter');
const springCards = document.querySelectorAll('.favorites__grid_card-spring');
const summerCards = document.querySelectorAll('.favorites__grid_card-summer');
const autumnCards = document.querySelectorAll('.favorites__grid_card-autumn');
const allCards = document.querySelectorAll('.favorites__grid_card');

//---buttons---
const winterRadio = document.getElementById('Winter');
const springRadio = document.getElementById('Spring');
const summerRadio = document.getElementById('Summer');
const autumnRadio = document.getElementById('Autumn');

//---constants---
const WINTER = 'winter';
const SPRING = 'spring';
const SUMMER = 'summer';
const AUTUMN = 'autumn';

const showSeason = (season) => {
  setTimeout(() => {
    allCards.forEach((card) => {
      if (card.classList.contains('favorites__grid_card-' + season)) {
        card.style.display = 'block';
        setTimeout(() => {
          card.classList.remove('favorites__grid_card-hidden');
        }, 500);
      } else {
        card.classList.add('favorites__grid_card-hidden');
        setTimeout(() => {
          card.style.display = 'none';
        }, 500);
      }
    });
  }, 0);
};

showSeason(WINTER);

const hideOtherSeasons = (season) => {
  allCards.forEach((card) => {
    if (!card.classList.contains('favorites__grid_card-' + season)) {
      card.classList.add('favorites__grid_card-hidden');
      setTimeout(() => {
        card.style.display = 'none';
      }, 50);
    }
  });
};

winterRadio.addEventListener('click', () => showSeason(WINTER));
springRadio.addEventListener('click', () => showSeason(SPRING));
summerRadio.addEventListener('click', () => showSeason(SUMMER));
autumnRadio.addEventListener('click', () => showSeason(AUTUMN));