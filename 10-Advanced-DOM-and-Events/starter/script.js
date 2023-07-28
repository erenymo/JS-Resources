'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const navLink = document.querySelector('.nav__link');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

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

///// Implementing Smooth Scrolling
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

///////////////////////////////////////////////////////////
// Page navigation

// this way creates the event repeatedly (if you have 10000 elements, then it creates 10000 event), so it is not efficient.
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     console.log(id);

//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

// nicer way

// EVENT DELEGATION
// in Event delegation, you only create one event to parent element, and just specify the elements that you want to use the event on it.

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

/////// Tabbed component

// BAD PRACTICE
// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

// BEST PRACTICE (EVENT DELEGATION)

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return; // to ignore the adding class to null

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing 'argument' into handler
// mouseenter doesn't bubble, but mouseover does
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

////////////////////////////
///// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

/////// Sticky navigation : Intersection Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///// Lazy loading images (important about performance)
const imgTargets = document.querySelectorAll('');

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

/*
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
*/
/*
/////////// DOM Traversing
const h1 = document.querySelector('h1');

// Going downwards: selecting child elements.
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards : selecting parent elements
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)'; // It selected the closest header to h1
h1.closest('h1').style.background = 'var(--gradient-primary)'; // It selected itself.

// closest can be think as querySelector => closest is the opposite of querySelector. Queryselector find the children no matter how it deep in dom tree while the closest method find the parents no matter how far up in dom tree

// Going sideways : selecting siblings
console.log(h1.previousElementSibling); //null
console.log(h1.nextElementSibling); //h4 element

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children); // all of siblings and itself.
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
