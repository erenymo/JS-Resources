'use strict';

/*
////////////// Default Parameters ///////////
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //   traditional version of declaring default values before ES6
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2);
createBooking('LH123', 3);
createBooking('LH123', 5, 800);
createBooking('LH123', undefined, 1000); // leaving the numPassengers part default.
*/
/*
////////// How Passing arguments works: value vs. reference //////////

// Passing a primitive type to a funciton is really just the same as creating a new copy, outside of the function. So, the value is simply copied.
// When we pass an object to a function, it is really just like copying an object. So, whatever we change in a copy, will also happen in the original.

const flight = 'LH234'; // primitive
const eren = {
  // object
  name: 'eren balta',
  passport: 4451465465,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 4451465465) {
    alert('Checked In');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, eren);
console.log(flight);
console.log(eren);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(eren);
console.log(eren);
checkIn(flight, eren);
*/
/*
//////////// First-Class VS. Higher-Order Functions ////////////////
// FIRST-CLASS FUNCTIONS
// Javascript treats functions as first-class citizens. This means that functions are simply values. Functions are just another "type" of object.
// 1)Store functions in variables or properties.
// 2)Pass functions as arguments to OTHER functions.
// 3)Return functions FROM functions.
// 4)Call methods on functions.

// HIGHER-ORDER FUNCTIONS
// A function that receives another function as an argument, that returns a new function, or both. ( for ex: .addEvenetListener('click', function(){}))
// This is only possible because of first-class functions.
// 1) Function that receives another function
// 2) Function that returns new function

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...other] = str.split(' ');
  return [first.toUpperCase(), ...other].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`); // .name property gives us the name of the function.
};

transformer('Javascript is the best!', upperFirstWord); // fonksiyonu argüman olarak girerken () koymamıza gerek yok.
console.log('');
transformer('Javascript is the best!', oneWord); // oneWord is the callback function, transformer is the higher-order function.

// JS uses callbacks all the time
const high5 = function () {
  console.log('🖐');
};

document.body.addEventListener('click', high5); // high5 is the callback function, addEventListener is the higher-order function.

['Eren', 'Ömer', 'Meco'].forEach(high5);
*/

/*
/////////// Functions returning functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey!');
greeterHey('Eren');
greeterHey('Şule');

greet('Hello')('Eren!');

// Challenge (rewriting the function in arrow form)
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hi')('Eren');
*/
/*
///////////////// CALL, APPLY AND BIND METHODS //////////////////////////
// this keywordunu gördüğünde aklına bu methodlar gelsin.
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],

  // Enhanced object literal syntax
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode} ${flightNum} `
    );
    this.bookings.push({ flight: `${this.iataCode} ${flightNum}` }, name);
  },
  //book: function () {}, (traditional way to declare a function in object)
};

lufthansa.book(239, 'Eren BALTA');
lufthansa.book(635, 'Şulenur BALTA');
console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; // lufthansa objesindeki book fonksiyonunu referans aldık. artık book u çağırdığımızda lutfhansa objesinin içindeki book fonksiyonuna erişebiliriz.

// DOES NOT WORK
// book(23, 'Eren BALTA');

//// .call() Method
// .call() allows us to manually set this keyword for any function call.
book.call(eurowings, 23, 'Eren BALTA');
console.log(eurowings);

book.call(lufthansa, 247, 'Şulenur');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 746, 'Mehmet Özbil');
console.log(swiss);

//// .apply() Method

// (call ve apply) İki method da bir fonksiyonu çağırmak için kullanılırken, argümanları farklı şekillerde kabul ederler.
//.call() methodu, bir fonksiyonu çağırmak için kullanılan birinci argümanı belirlerken, diğer argümanları sıralı bir şekilde alır,.
//.apply() methodu ise birinci argümanı belirlerken, diğer argümanları bir dizi şeklinde alır.
const flightData = [583, 'George Cooper'];

book.apply(swiss, flightData);
console.log(swiss);

// apply kullanmak yerine rest pattern ile beraber call fonksiyonunu kullanmayı tercih ederiz. Yani eğer bir diziden argüman geçirilecekse spread operator ile beraber call methodu kullanılır.
book.call(swiss, ...flightData);
console.log(swiss);

//// .bind Method
// bind also allows us to manually set this keyword for any function call. The difference is that bind method does not call the function immediately. Instead it returns a new function where this keyword is bound.
//.bind() methodu, bir fonksiyonu çağırmadan, o fonksiyonun kopyasını oluşturur ve belirli bir bağlamı (this değeri) ve/veya başlangıç argümanlarını bu fonksiyona sabitleyerek geri döndürür.

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(43, 'Steven Williams');
bookLH(741, 'Ömer Mutlu');
bookLX(468, 'Meco Yilar');

// setting certain arguments
const bookEW23 = book.bind(eurowings, 23); // flight'ı 23e sabitledik.
bookEW23('Martha Cooper'); //flight'ı sabit değer verdiğimiz için sadece name parametresini girmemiz yeterli
bookEW23('Ayşegül Saral');

// With Event Listeners

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

//lufthansa.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application (we can preset parameters)
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23
console.log(addVAT(100));

// Coding exercise (yukarıdakinin bind'siz hali)
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const VAT = addTaxRate(0.23);
console.log(VAT(200));
*/

/*
///////////////////////////////////////////////
// Coding Challenge #1

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0), // This generates [0, 0, 0, 0].

  registerNewAnswer() {
    // Get Answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);

    // Register answer
    typeof answer === 'number' &&
      answer < this.options.length &&
      answer >= 0 &&
      this.answers[answer]++;
    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll)); // this keyword will always point to the element.

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 9, 5, 7, 5, 2, 3] }, 'string');
*/
/*
//////////// Immediately Invoked Function Expressions (IIFE) //////
// (function(){}) ();

const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();
// console.log(isPrivate);

(() => console.log('This will ALSO never run again'))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);
*/
/*
//////////////  Closures ///////////////

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

console.dir(booker);

// we don't need to return a function from another function in order to create a closure
//Example 1

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();

// Re-assigning f function
h();
f();
console.dir(f);
*/
