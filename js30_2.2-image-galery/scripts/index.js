class Api {
    getImages() {
        return fetch('https://api.unsplash.com/photos/?client_id=cklhwIt8ESBWPpXAa2-0AOAVdB1rwv2wBZbNo86p19A')
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
          .then((res) => {
            return res;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    searchImages(query){
        return fetch(`https://api.unsplash.com/search/photos/?client_id=cklhwIt8ESBWPpXAa2-0AOAVdB1rwv2wBZbNo86p19A&query=${query}`)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
          .then((res) => {
            return res.results;
          })
          .catch((err) => {
            console.log(err);
          });
    }
}

const api = new Api;

const cardElements = document.querySelector('.cardList');
const popup = document.getElementById('popup');
const popupImg = popup.querySelector('img');
const headerForm = document.getElementById('headerForm');
const searchField = document.getElementById('headerForm');

const createImgLi = (card) => {
  let li = document.createElement('li');
  li.classList.add('cardList__item');
  let img = document.createElement('img');
  img.src = `${card.urls.regular}`;
  img.alt = `${card.alt_description}`;
  img.classList.add('cardList__image');
  li.append(img);
  li.addEventListener('click', (e) => {
    popup.classList.add('popup__open');
    popupImg.src = e.target.src;
    popup.addEventListener('click', (e) => {
     if(e.target !== popupImg) popup.classList.remove('popup__open')
    })
  })
  cardElements.append(li);
}

api.getImages()
.then(cards => {
    cards.map(card => {
        createImgLi(card);
    })
})

headerForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const inputs = Object.fromEntries(formData);
  if (inputs.searchF!==''){
    api.searchImages(inputs.searchF).then(res => {
      cardElements.replaceChildren([]);
      if(res.length!==0){
        cardElements.classList.remove('cardList_empty');
        res.map(card => {
          createImgLi(card);
      })
      } else {
        cardElements.classList.add('cardList_empty');
        let p = document.createElement('p');
        p.classList.add('cardList__text');
        p.textContent='No images found';
        cardElements.append(p);
      }
    })
  } else {
      api.getImages()
      .then(cards => {
          console.log(cards);
          cardElements.replaceChildren([]);
          cardElements.classList.remove('cardList_empty');
          cards.map(card => {
              createImgLi(card);
          })
      })
    }
})