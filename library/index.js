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

//----------------Dropdown Menu----------------
let loggedIn = false;
let isDropdownMenuShown = false;

const profileBtn = document.getElementById('profileBtn');
const fullMenu = document.querySelector('.header__dropdown');
const loggedInMenu = document.querySelector('.header__dropdown_list-loggedIn');
const notLoggedInMenu = document.querySelector(
  '.header__dropdown_list-notLoggedIn'
);
const closeBtns = document.querySelectorAll('.popup__close-btn');

const showDropdownMenu = (logged, isDropdownMenuShown) => {
  // console.log(fullMenu)

  fullMenu.style.display = 'block';
  if (logged) {
    loggedInMenu.style.display = 'block';
  } else {
    notLoggedInMenu.style.display = 'block';
  }
};

profileBtn.addEventListener('click', () => {
  showDropdownMenu(loggedIn);
});

//-----Close popups-----
closeBtns.forEach((button) => {
  button.addEventListener('click', (e) => closePopup(e));
});
const closePopup = (e) => {
  e.target.closest('.popup').classList.remove('popup__open');
  document.body.removeEventListener('wheel', preventScroll, { passive: false });
};

const showPopup = (popup) => {
  document.body.addEventListener('wheel', preventScroll, { passive: false });
  popup.classList.add('popup__open');
};

const libraryRegisterBtn = document.getElementById('librarycard__registerBtn');
const libraryLoginBtn = document.getElementById('librarycard__loginBtn');
const logInBtn = document.getElementById('logInBtn');
const registerBtn = document.getElementById('registerBtn');
const popupLoginRegisterBtn = document.getElementById('popupLoginRegisterBtn'); //register button inside login popup
const popupRegisterLoginBtn = document.getElementById('popupRegisterLoginBtn'); //login button inside register popup
const registerPopup = document.getElementById('registerPopup');
const loginPopup = document.getElementById('loginPopup');

const buyBtns = document.querySelectorAll('.card__button');

libraryRegisterBtn.addEventListener('click', () => {
  showPopup(registerPopup);
  removeAllErrors(signUpErrors);
  disableButton(signUpFormBtn);
});

registerBtn.addEventListener('click', () => {
  showPopup(registerPopup);
  removeAllErrors(signUpErrors);
  disableButton(signUpFormBtn);
});

libraryLoginBtn.addEventListener('click', () => {
  showPopup(loginPopup);
  removeAllErrors(loginErrors);
  disableButton(loginFormBtn);
});

logInBtn.addEventListener('click', () => {
  showPopup(loginPopup);
  removeAllErrors(loginErrors);
  disableButton(loginFormBtn);
});

popupLoginRegisterBtn.addEventListener('click', (e) => {
  closePopup(e);
  showPopup(registerPopup);
  removeAllErrors(signUpErrors);
  disableButton(signUpFormBtn);
});

popupRegisterLoginBtn.addEventListener('click', (e) => {
  closePopup(e);
  showPopup(loginPopup);
  removeAllErrors(loginErrors);
  disableButton(loginFormBtn);
});

if (loggedIn === false) {
  buyBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
      document.body.addEventListener('wheel', preventScroll, {
        passive: false,
      });
      showPopup(loginPopup);
    });
  });
}

// ----------------- FORM VALIDATION ----------------
const validationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  errorClass: 'popup__error_visible'
};

const validate = (form, element) => {
  if(!element.validity.valid){
    showError(form, element, element.validationMessage);
  }else{
    hideError(form, element);
  }
}

const removeAllErrors = (errorList) => {
  errorList.forEach(item => {
    item.textContent = '';
    item.classList.remove(this._errorClass);
  });
}

const showError = (form, element, message) => {
  const errorElement = form.querySelector(`#${element.id}-error`);
  errorElement.classList.add(validationSettings.errorClass);
  errorElement.textContent = message;
}

const hideError = (form, element) => {
  const errorElement = form.querySelector(`#${element.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(validationSettings.errorClass);
}

const disableButton = (button) => {
  button.classList.add(validationSettings.inactiveButtonClass);
  button.disabled = true;
}

const changeButtonState = (elements, button) => {
  if(isInputInvalid(elements)){
    disableButton(button);
  }else{
    button.classList.remove(validationSettings.inactiveButtonClass);
    button.disabled = false;
  }
}

const isInputInvalid = (elements) => {
  return elements.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const signUpForm = document.getElementById('signUpForm');
const signUpFormBtn = document.getElementById('signUpFormBtn');
const signUpFormInputList = Array.from(signUpForm.querySelectorAll(validationSettings.inputSelector));
const signUpErrors = Array.from(signUpForm.querySelectorAll(validationSettings.errorClass));

signUpFormInputList.forEach(formElement => {
  formElement.addEventListener('input', ()=> {
    validate(signUpForm, formElement);
    changeButtonState(signUpFormInputList, signUpFormBtn);
    isInputInvalid(signUpFormInputList);
  })
})

signUpForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const formValues = {};
  signUpFormInputList.forEach(item => {
    formValues[(item.id).replace('register-','')] = item.value;
  });
  formValues.loggedIn = true;
  formValues.cardNumber = [...Array(9)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  const usersDB = JSON.parse(localStorage.getItem('usersDB')) || [];
  const hasError = usersDB?.some((user)=>{
    return user.email===formValues.email
  });
  if(hasError){
    alert(`User with email ${formValues.email} is already registered! Try another email!`)
    disableButton(signUpFormBtn);
  } else {
    localStorage.setItem('usersDB', JSON.stringify([...usersDB, formValues]));
    signUpForm.reset();
    closePopup(e);
  }
})

const loginForm = document.getElementById('loginForm');
const loginFormBtn = document.getElementById('loginFormBtn');
const loginFormInputList = Array.from(loginForm.querySelectorAll(validationSettings.inputSelector));
const loginErrors = Array.from(loginForm.querySelectorAll(validationSettings.errorClass));


loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const formValues = {};
  loginFormInputList.forEach(item => {
    formValues[(item.id).replace('login-','')] = item.value;
  });
  const usersDB = JSON.parse(localStorage.getItem('usersDB')) || [];
  usersDB.forEach(user=>{
    if((user.email===formValues.email && user.password===formValues.password) || (user.cardNumber===formValues.email && user.password===formValues.password)){
      alert('User found! Credentials OK!')
    }
  })
})

loginFormInputList.forEach(formElement => {
  formElement.addEventListener('input', ()=> {
    validate(loginForm, formElement);
    changeButtonState(loginFormInputList, loginFormBtn);
    isInputInvalid(loginFormInputList);
  })
})

// ----------------- FORM VALIDATION ----------------