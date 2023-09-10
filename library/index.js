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
  closeDropdown();
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

winterRadio.addEventListener('click', () => showSeason(WINTER));
springRadio.addEventListener('click', () => showSeason(SPRING));
summerRadio.addEventListener('click', () => showSeason(SUMMER));
autumnRadio.addEventListener('click', () => showSeason(AUTUMN));

//----------------Dropdown Menu----------------
let user;
let isDropdownMenuShown = false;

const profileBtn = document.getElementById('profileBtn');
const dropdownTitle = document.getElementById('dropdownTitle');
const notLoggedInProfileBtn = profileBtn.querySelector('.header__icon_type-image');
const loggedInProfileBtn = profileBtn.querySelector('.header__icon_type-userFLN');
const fullMenu = document.querySelector('.header__dropdown');
const loggedInMenu = document.querySelector('.header__dropdown_list-loggedIn');
const notLoggedInMenu = document.querySelector(
  '.header__dropdown_list-notLoggedIn'
);
const closeBtns = document.querySelectorAll('.popup__close-btn');

const toggleDropdownMenu = () => {
  user = getUserData();
  removeClasses()
  isDropdownMenuShown = !isDropdownMenuShown;
  isDropdownMenuShown ? openDropdown() : closeDropdown();
};

const closeDropdown = (e) => {
  fullMenu.style.display='';
  document.removeEventListener('click', addEL, false);
}

function addEL(e){
    if(!e.target.closest('.header__dropdown')) {
      toggleDropdownMenu();
      document.removeEventListener('click', addEL, false);
    }
}

const openDropdown = () => {
  document.addEventListener('click', addEL, false);
  fullMenu.style.display = 'block';
  if (user.email) {
    loggedInMenu.style.display = 'block';
    notLoggedInMenu.style.display = 'none';
    dropdownTitle.textContent = user.cardNumber;
    dropdownTitle.style.fontSize = '12px';
  } else {
    loggedInMenu.style.display = 'none';
    notLoggedInMenu.style.display = 'block';
    dropdownTitle.textContent = 'Profile';
    dropdownTitle.style.fontSize = '15px';
  }
  checkLogin(user);
}

const addButtonListeners = (e) => {
  let user = getUserData();
  if(user.email && user.subscription==false) {
    showPopup(buyPopup);
  } else if(user.subscription==true){
    const bookName = e.target.closest('.favorites__grid_card ').querySelector('.card__title').textContent;
    const bookAuthor = e.target.closest('.favorites__grid_card ').querySelector('.card__author').textContent.replace('By ', '');
    const bookId = e.target.getAttribute('id');
    let check = user.books.some((item)=>{
      return (item.book===bookName && item.author===bookAuthor)? true : false
    })
    if(!check) user.books = [...user.books, {author: bookAuthor, book: bookName, id: bookId}];
    updateUserData(user);
    setButtons();
  }else {
    showPopup(loginPopup);
  }
  
}

const setButtons = () => {
  let user = getUserData();
  if(user.email) {
    const bookIds = Array.from(user.books.map(book=> book.id));
    buyBtns.forEach(button=>{
      if(bookIds.includes(button.getAttribute('id'))) {
        button.classList.add('card__button-own');
        button.disabled = "disabled";
        button.textContent = 'Own';
      };
    })
  } else {
    buyBtns.forEach(button=>{
      button.classList.remove('card__button-own');
        button.disabled = "";
        button.textContent = 'Buy';
    })
  }
}

const checkLogin = (user) => {
  if(user.email){
    loggedInProfileBtn.style.display = 'block';
    loggedInProfileBtn.setAttribute("title", `${user.firstName} ${user.lastName}`);
    loggedInProfileBtn.textContent = `${user.firstName[0]}${user.lastName[0]}`;
    notLoggedInProfileBtn.style.display = 'none';
    setStats(user);
    setButtons();
    hideLibraryColumn();
    profilePopupPic.textContent = `${user.firstName[0]}${user.lastName[0]}`;
    profilePopupFullName.textContent = `${user.firstName} ${user.lastName}`;
    profilePopupVisits.textContent = user.visits;
    profilePopupBonuses.textContent = user.bonuses;
    profilePopupBooks.textContent = user.books.length;
    profilePopupCardNumber.textContent = user.cardNumber;
    
    profilePopupCopyBtn.addEventListener('click', ()=>{
      navigator.clipboard.writeText(profilePopupCardNumber.textContent);
    })

    
  } else {
    loggedInProfileBtn.style.display = 'none';
    notLoggedInProfileBtn.style.display = 'block';
    loggedInProfileBtn.removeAttribute("title");
    showLibraryColumn();
  }

  buyBtns.forEach((button) => {
    button.addEventListener('click', addButtonListeners);
    disableButton(buyFormBtn);
    removeAllErrors(buyFormErrors);
  })
}

window.addEventListener('load', function() {
  user = getUserData();
  checkLogin(user);
})

profileBtn.addEventListener('click', (e) => {
  toggleDropdownMenu();
  e.stopPropagation();
});

//-----Close popups-----
closeBtns.forEach((button) => {
  button.addEventListener('click', (e) => closePopup(e));
});
const closePopup = (e) => {
  e.target.closest('.popup').classList.remove('popup__open');
  document.removeEventListener('wheel', preventScroll, { passive: false });
};

const showPopup = (popup) => {
  console.log("here")
  document.addEventListener('wheel', preventScroll, { passive: false });
  popup.addEventListener('click', (e)=>{
   if(!e.target.closest('.popup__container')){
    closePopup(e);
   };
  });
  popup.classList.add('popup__open');
};

const libraryRegisterBtn = document.getElementById('librarycard__registerBtn');
const libraryLoginBtn = document.getElementById('librarycard__loginBtn');
const logInBtn = document.getElementById('logInBtn');
const logOutBtn = document.getElementById('logOutBtn');
const myProfileBtn = document.getElementById('myProfileBtn');
const registerBtn = document.getElementById('registerBtn');
const popupLoginRegisterBtn = document.getElementById('popupLoginRegisterBtn'); //register button inside login popup
const popupRegisterLoginBtn = document.getElementById('popupRegisterLoginBtn'); //login button inside register popup
const registerPopup = document.getElementById('registerPopup');
const loginPopup = document.getElementById('loginPopup');
const profilePopup = document.getElementById('profilePopup');
const buyPopup = document.getElementById('buyPopup');

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
  toggleDropdownMenu();
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
  toggleDropdownMenu();
});

logOutBtn.addEventListener('click', () => {
  localStorage.removeItem('activeUser');
  user={};
  checkLogin(user);
  toggleDropdownMenu();
  showLibraryColumn();
  setButtons();
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



// ----------------- FORM VALIDATION, REGISTER AND LOGIN ----------------
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
  formValues.cardNumber = [...Array(9)].map(() => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
  const usersDB = JSON.parse(localStorage.getItem('usersDB')) || [];
  const hasError = usersDB?.some((user)=>{
    return user.email===formValues.email
  });
  if(hasError){
    alert(`User with email ${formValues.email} is already registered! Try another email!`)
    disableButton(signUpFormBtn);
  } else {
    formValues.books = [], formValues.visits = 0, formValues.bonuses = 0, formValues.subscription = false;
    localStorage.setItem('usersDB', JSON.stringify([...usersDB, formValues]));
    login(formValues);
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
      login(user);
      updateUserData(user);
      loginForm.reset();
      closePopup(e);
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

const login = (user) => {
  user.visits += 1;
  localStorage.setItem('activeUser', JSON.stringify(user));
  checkLogin(user);
}

const getUserData = () =>{
 return JSON.parse(localStorage.getItem('activeUser')) || {};
}

const updateUserData = (user) => {
  let db = JSON.parse(localStorage.getItem('usersDB'));
  const updatedDB = db.map(item => {
    if(user.cardNumber === item.cardNumber) {
      return user;
    }
    return item;
  });
  localStorage.setItem('usersDB', JSON.stringify(updatedDB));
  localStorage.setItem('activeUser', JSON.stringify(user));
}
// ----------------- FORM VALIDATION, REGISTER AND LOGIN ----------------


//------------------ Profile Popup ----------------
// Buttons
const profilePopupPic = document.getElementById('profilePopupPic');
const profilePopupFullName = document.getElementById('profilePopupFullName');
const profilePopupCopyBtn = document.getElementById('profilePopupCopyBtn');

//Text elements
const profilePopupCardNumber = document.getElementById('profilePopupCardNumber');
const profilePopupVisits = document.getElementById('profilePopupVisits');
const profilePopupBonuses = document.getElementById('profilePopupBonuses');;
const profilePopupBooks = document.getElementById('profilePopupBooks');
const profileBooksList = document.getElementById('profileBooksList');

myProfileBtn.addEventListener('click', ()=>{
  showPopup(profilePopup);
  toggleDropdownMenu();
})

const libraryCardBtn = document.getElementById('libraryCardBtn');
const librarycardForm = document.getElementById('librarycardForm');
const librarycardStats = document.getElementById('librarycardStats');
const librarycardInputFields = Array.from(librarycardForm.querySelectorAll('.librarycard__form_input'));
const librarycardVisits = document.getElementById('librarycardVisits');
const librarycardBonuses = document.getElementById('librarycardBonuses');
const librarycardBooks = document.getElementById('librarycardBooks');
const libraryColumnTitle = document.getElementById('libraryColumnTitle');
const librarycardFormTitle = document.getElementById('librarycardFormTitle');
const libraryColumnText = document.getElementById('libraryColumnText');
const librarycardProfileBtn = document.getElementById('librarycardProfileBtn');

librarycardProfileBtn.addEventListener('click', () => showPopup(profilePopup))

const setStats = (user) => {
  librarycardVisits.textContent = user.visits;
  librarycardBonuses.textContent = user.bonuses;
  librarycardBooks.textContent = user.books.length;
  librarycardInputFields[0].value = `${user.firstName} ${user.lastName}`;
  librarycardInputFields[1].value = `${user.cardNumber}`;
  libraryCardBtn.classList.add('librarycard__form_button_hidden');
  librarycardStats.classList.remove('librarycard__stats_hidden');
  profileBooksList.innerHTML = '';
  user.books.forEach((book)=>{
    profileBooksList.innerHTML += `<li class="profile__list_item">${book.book}, ${book.author}</li>`;
  })
}

const hideLibraryColumn = () => {
  librarycardFormTitle.textContent = 'Your Library card';
  libraryRegisterBtn.style.display='none';
  libraryLoginBtn.style.display='none';
  libraryColumnTitle.textContent = 'Visit your profile';
  libraryColumnText.textContent = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
  librarycardProfileBtn.classList.remove('librarycard__button_hidden');
}

const showLibraryColumn = () => {
  librarycardFormTitle.textContent = 'Find your Library card';
  libraryRegisterBtn.style.display='';
  libraryLoginBtn.style.display='';
  libraryColumnTitle.textContent = 'Get a reader card';
  libraryColumnText.textContent = 'You will be able to see a reader card after logging into account or you can register a new account';
  librarycardProfileBtn.classList.add('librarycard__button_hidden');

}

librarycardForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  let formValues = {};
  user = getUserData();
  librarycardInputFields.forEach(item => {
    formValues[(item.id).replace('card-','')] = item.value;
  });
   console.log(formValues)
  let db = JSON.parse(localStorage.getItem('usersDB'));
  if(!user.email) {
    console.log('check')
    let nameForCheck = formValues.name.split(' ');
    db.forEach(user=>{
      if(user.firstName===nameForCheck[0] && user.lastName===nameForCheck[1] && user.cardNumber === formValues.number){
        setStats(user);
        setTimeout(()=>{
          librarycardStats.classList.add('librarycard__stats_hidden');
          libraryCardBtn.classList.remove('librarycard__form_button_hidden');
          librarycardForm.reset();
        },5000)
      }
    })
  } else {
    setStats(user);
    hideLibraryColumn();
  }
})

const buyForm = document.getElementById('buyForm');
const buyFormInputList = Array.from(buyForm.querySelectorAll(validationSettings.inputSelector));
const buyFormErrors = Array.from(buyForm.querySelectorAll(validationSettings.errorClass));
const buyFormBtn = document.getElementById('buyFormBtn');
buyForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  user = getUserData();
  user.subscription = true;
  updateUserData(user);
  closePopup(e);
  buyForm.reset();
});

buyFormInputList.forEach(formElement => {
  formElement.addEventListener('input', ()=> {
    validate(buyForm, formElement);
    changeButtonState(buyFormInputList, buyFormBtn);
    isInputInvalid(buyFormInputList);
  })
})