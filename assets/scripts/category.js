import products from './products.json' assert { type: 'json' }
import scanCards from './popup.js';

let currentType = 'coffee';

let currentTypeArr = products.filter((item) =>
  item.category == currentType);

changeType();
function changeType() {
  document.querySelectorAll('.menu-btn__p').forEach((item, index, arr) => {
    if (currentType == item.innerHTML) {
      item.parentNode.classList.add('menu__btn-active');
    }
    item.parentNode.addEventListener('click', () => {
      currentType = item.innerHTML;
      currentTypeArr = products.filter((item) =>
      item.category == currentType);
      arr.forEach((item) => item.parentNode.classList.remove('menu__btn-active'));
      item.parentNode.classList.add('menu__btn-active');
      createCards();
      refresh();
    })
  })
};

refresh();
function refresh() {
  const refreshBtn = document.querySelector('.refresh-btn');
  if (currentTypeArr.length <= 4) {
    refreshBtn.classList.add('refresh-btn-disabled');
  } else {
    refreshBtn.classList.remove('refresh-btn-disabled');
  }
  refreshBtn.addEventListener('click', () => {
    refreshBtn.classList.add('refresh-btn-disabled');
    document.querySelectorAll('.menu__card:nth-child(n+5)').forEach((elem) =>
      elem.style.display = 'flex'
    )
  })
}

createCards();
function createCards() {

  if (document.querySelector('.menu__cards')) {
    document.querySelector('.menu__cards').remove();
  }

  const container = document.createElement('div');
  container.className = 'menu__cards';
  document.querySelector('.menu__btns').after(container);

  currentTypeArr.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'menu__card text-color-dark';
    container.append(card);

    card.dataset.item = `${item.id}`;

    const cardFigure = document.createElement('figure');
    cardFigure.className = 'card__figure';
    card.append(cardFigure);

    const cardImage = document.createElement('img');
    cardImage.className = 'card__img transition';
    cardImage.src = `${item.image}`;
    cardImage.alt = 'card image';
    cardFigure.append(cardImage);

    const cardDescriptionWrapper = document.createElement('div');
    cardDescriptionWrapper.className = 'card__description';
    card.append(cardDescriptionWrapper);

    const cardDescriptionText = document.createElement('div');
    cardDescriptionText.className = 'card-description__text';
    cardDescriptionWrapper.append(cardDescriptionText);

    const cardDescriptionTitle = document.createElement('h3');
    cardDescriptionTitle.className = 'heading-3';
    cardDescriptionTitle.innerHTML = `${item.name}`
    cardDescriptionText.append(cardDescriptionTitle);

    const cardDescription = document.createElement('p');
    cardDescription.className = 'text-medium';
    cardDescription.innerHTML = `${item.description}`
    cardDescriptionText.append(cardDescription);

    const cardDescriptionPrice = document.createElement('h3');
    cardDescriptionPrice.className = 'heading-3';
    cardDescriptionPrice.innerHTML = `$${item.price}`
    cardDescriptionWrapper.append(cardDescriptionPrice);
  })
  scanCards();
}

export {currentTypeArr} ;