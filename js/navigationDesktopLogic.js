const navBtn = document.querySelector('.hb__container');
const navLine = document.querySelectorAll('.hb__line');
const navDesk = document.querySelector('.navdesk');
const navdeskProductsContainer = document.querySelector('.navdesk__products');
const navdeskMenuContainer = document.querySelector('.navdesk__menu');
const navCloser = document.querySelectorAll('.navCloser');

//Open Navigation when clickin the navBtn
navBtn.addEventListener('click', menuEventHandler);

//Closing the Navigation when clicking on any link in the navigation
navCloser.forEach((link) => {
  link.addEventListener('click', menuEventHandler);
});

function menuEventHandler() {
  navLine.forEach((line) => {
    line.classList.toggle('open');
  });
  navdeskProductsContainer.classList.toggle('show');
  navdeskMenuContainer.classList.toggle('show');
  navDesk.classList.toggle('show');
}
