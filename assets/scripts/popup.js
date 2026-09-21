import products from './products.json' assert { type: 'json' };
export default scanCards;

const body = document.body;
const popup = document.querySelector('.popup__wrapper');

let listenerElemPopup = [];
let listenerElemsSize = [];
let listenerElemsAdd = [];

let idxsAdditivies = [];
let currentPrice = 0;

scanCards();

function scanCards() {
  const cards = document.querySelectorAll('.menu__card');

  cards.forEach((element, index, arr) => {
    element.addEventListener('click', (event) => {
      if (event.target.closest('.menu__card')) {
        let cardDom = event.target.closest('.menu__card');
        let product = getProduct(cardDom);
        openPopup(product);
      }
    })
  })

  popup.addEventListener('click', e => {
    if (e.target.classList.contains('popup__wrapper') ||
      e.target.closest('.popup__close-btn')) {
      closePopup();
    }
  });
}

function getProduct(DomCard) {
  return DomCard.getAttribute('data-item');
}

function openPopup(index) {
  createPopUp(index);
  popup.classList.add('popup__wrapper-active');
  body.classList.add('scroll-lock-popup');
}

function closePopup() {
  listenerElemPopup.forEach(it => it.item.removeEventListener("click", it.handler));
  listenerElemsSize.forEach(it => it.item.removeEventListener("click", it.handler));
  listenerElemsAdd.forEach(it => it.item.removeEventListener("click", it.handler));
  listenerElemPopup = [];
  listenerElemsSize = [];
  listenerElemsAdd = [];
  idxsAdditivies = [];
  currentPrice = 0;
  popup.classList.remove('popup__wrapper-active');
  body.classList.remove('scroll-lock-popup');
}

function listenerFuncSize (arr, elem, price,currentProduct, currentSizes, index ){
  arr.forEach((item) => item.parentNode.classList.remove('size__btn-active'));
  elem.parentNode.classList.add('size__btn-active');
  const additivesActive = document.querySelectorAll(".additives__btn-active");
  currentPrice = `${(+currentProduct["price"] + +currentSizes[index]["add-price"]).toFixed(2)}`;
  price.innerHTML = `$${(+currentProduct["price"] + 0.50*additivesActive.length + +currentSizes[index]["add-price"]).toFixed(2)}`;
  console.log(currentPrice)
}

function listenerFuncAdd (elem, price, currentProduct, currentSizes, index, idxsAdditivies){
  elem.parentNode.classList.toggle('additives__btn-active');
  const additivesActive = document.querySelectorAll(".additives__btn-active");
    currentPrice = (+currentPrice + 0.50*additivesActive.length);
    console.log(currentPrice)
    price.innerHTML = `$${(+currentProduct["price"] + 0.50*additivesActive.length + +currentSizes[index]["add-price"]).toFixed(2)}`;
  }

function createPopUp(index) {
  const currentProduct = products[index];
  const currentSizes = Object.values(currentProduct.sizes);
  const currentAdditives = Object.values(currentProduct.additives);

  const img = document.querySelector(".popup__img");
  const title = document.querySelector(".popup-title__name");
  const description = document.querySelector(".popup-title__description");
  const price = document.querySelector(".total-price");
  const size = document.querySelectorAll(".size");
  const additives = document.querySelectorAll(".additives");

  img.src = `${currentProduct["image"]}`;
  title.innerHTML = `${currentProduct["name"]}`;
  description.innerHTML = `${currentProduct["description"]}`;
  price.innerHTML = `$${currentProduct["price"]}`;

  size.forEach((item, index, arr) => {
    item.parentNode.classList.remove('size__btn-active');
    item.innerHTML = `${currentSizes[index].size}`

    const func = listenerFuncSize.bind(this, arr, item, price, currentProduct, currentSizes, index);
    item.parentNode.addEventListener('click', func);
    listenerElemsSize.push({
      item : item.parentNode,
      handler: func,
    })
  });

  size[0].parentNode.classList.add('size__btn-active');

  additives.forEach((item, index, arr) => {
    item.parentNode.classList.remove('additives__btn-active');
    item.innerHTML = `${currentAdditives[index].name}`

    const func = listenerFuncAdd.bind(this, item, price, currentProduct, currentSizes, index, idxsAdditivies);
    item.parentNode.addEventListener('click', func);

    listenerElemsAdd.push({
      item : item.parentNode,
      handler: func,
    })
  });
}