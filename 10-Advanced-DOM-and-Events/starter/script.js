'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
/*
//// Selecting elements

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header'); // returns the first element matches .header
const allSections = document.querySelectorAll('.section'); // returns the all element matches .section
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button'); // all the elements with the name of button
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));
*/

/*
//// Creating and inserting elements

const message = document.createElement('div'); // we have created element but didn't insert to the page
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button>';

// DOM element is unique, so it can be only exist one place at once.

// header.prepend(message); // adds the element as the first child.
header.append(message); // adds the element as the last child.
// header.append(message.cloneNode(true)); // (true) -> all of child elements will also be copied

// header.before(message); // insert the message before the header element
// header.after(message); // " " " after " " "

//// Delete elements

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message); // traditional way of .remove()
  });

//////// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%'; // set as an inline styles
console.log(message.style.color); // cannot read the property on css
console.log(message.style.width); // style property only works for inline styles

// to read the property of element
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height); // getComputedStyle returns string

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; // use parseFloat to convert String to Number

// setProperty
// document.documentElement.style.setProperty('--color-primary', 'orangered');

//////// Attributes
// Attributes -> for ex:  src, alt, class, id are attributes of img element

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'beautiful minimalist logo';

// Non-standard
console.log(logo.designer); // this is not standard property that expected to be on img element,
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist'); // creates a new attribute with the name of company

console.log(logo.src); // absolute form
console.log(logo.getAttribute('src')); // relative form

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // shows absolute url
console.log(link.getAttribute('href')); // shows relative url

///// Data Attributes
// we use usually when we work with UI especially when we need to store data in the UI
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// dont use!
logo.className = 'jonas'; // this will delete all the classes and replace with 'jonas'
*/

///// Implementing Smooth Scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const navLink = document.querySelector('.nav__link');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); // get the coordinates of the element that we want to scroll to
  console.log(s1coords);
  // getBoundingClientRect() is basically relative to visible viewport.
  console.log(e.target.getBoundingClientRect()); // e.target returns the element that triggered the event (btnScrollTo)
  console.log(
    'Current scroll (X/Y) : ',
    window.pageXOffset,
    window.pageYOffset
  ); // pageYOffSet returns the distance between current position of viewport and top of the page.

  console.log(
    'height/width of viewport : ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // ); // this doesn't work very well because it relative to viewport

  // // Implementing smoothness in old way
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // Much modern way
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

/*
///////// Types of Events and Event handlers

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

// 'mouseenter' is like hover effect in css
// modern way

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// // another way of attaching an event listener to an element (on{event} property)
// // old way
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };
*/
/////////// EVENT PROPAGATION : BUBBLING AND CAPTURING

// Creating Random Color rgb(255,255,255);
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  }
  //true
); // if the third parameters of addEventListener is true, event handler will no longer listen bubbling events, but instead listen capturing events.
