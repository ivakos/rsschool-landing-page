const burgerIcon = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');
const body = document.body;

function openMenu(){
  burgerMenu.classList.toggle('burger-menu-active');
  burgerIcon.classList.toggle('burger-active');
  body.classList.toggle('scroll-lock');
}

function closeMenu(){
  burgerMenu.classList.remove('burger-menu-active');
  burgerIcon.classList.remove('burger-active');
  body.classList.remove('scroll-lock');
}

burgerIcon.addEventListener('click', openMenu);

burgerMenu.querySelectorAll('.li__a').forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  })
})

burgerMenu.querySelector('.header__menu').addEventListener('click', () => closeMenu());