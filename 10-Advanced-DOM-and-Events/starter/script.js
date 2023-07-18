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

document.documentElement.style.setProperty('--color-primary', 'orangered');

//////// Attributes
// Attributes -> for ex:  src, alt, class, id are attributes of img element

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// Non-standard
console.log(logo.designer); // this is not standard property that expected to be on img element,
console.log(logo.getAttribute('designer'));
