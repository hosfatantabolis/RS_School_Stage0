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

// const getImages = () => {
//     api.getImages().then(data => {
//         // images.push(data)
//         // console.log(images)
//         return data
//     });
// }

// let images = getImages();

// console.log(images)
const cardElements = document.querySelector('.cardList');

api.getImages()
.then(cards => {
    console.log(cards);
    cards.map(card => {
        let li = document.createElement('li');
        li.classList.add('cardList__item');
        let img = document.createElement('img');
        img.src = `${card.urls.regular}`;
        img.alt = `${card.alt_description}`;
        img.classList.add('cardList__image');
        li.append(img);
        cardElements.append(li);
    })
})

