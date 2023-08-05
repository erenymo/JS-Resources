'use strict';
/*
//////////////////////////////////////////////////
///// Constructor Functions and the new operator

// -Constructor functions always start Capitalized letter
// -only difference between constructor function and regular function is: we call constructor using 'new' keyword
// -Arrow function does not work in constructor func.

const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // !!! Never create a method inside constructor function (because of performance issues)
  //   this.calcAge = function () {
  //     console.log(2023 - this.birthYear);
  //   };
};

const eren = new Person('Eren', 2002);

console.log(eren);

///// Steps of new keyword
// 1. New {} (empty object) is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const mustafa = new Person('Mustafa', 2003);
const nuris = new Person('Nuris', 2001);
console.log(mustafa, nuris);
console.log(eren instanceof Person);

// const jay = 'Jay';
// console.log(jay instanceof Person);

////// Prototypes
console.log(Person.prototype);

// Every object that created by certain constructor function will get access to all the methods and properties that we define on the constructors prototype property
Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};
// this is not prototype of Person, instead, it is prototype of the object that created by Person.

eren.calcAge();
mustafa.calcAge();
nuris.calcAge();

console.log(eren.__proto__);
console.log(eren.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(eren)); // true
console.log(Person.prototype.isPrototypeOf(mustafa)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

Person.prototype.species = 'Homo Sapiens';
console.log(eren.species, nuris.species); // species property is not directly in the object. So, it's not its own property. Own properties are directly declared on the object itself.

console.log(eren.hasOwnProperty('firstName')); // true (it is directly declared in the object)
console.log(eren.hasOwnProperty('species')); // false. (it is not directly in the object (not own property))

// prototype chain
console.log(eren.__proto__);
console.log(eren.__proto__.__proto__); // prototype property of object (top of the prototype chain)
console.log(eren.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor); // we get the function itself

const arr = [3, 4, 4, 4, 1, 1, 3]; // new Array === [] (Array constructor)
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // true

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);
console.dir(x => x + 1);

*/

/*
////////////////////////////////////////////////
// Coding Challenge #1

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
  console.log(`${this.make} going at ${this.speed} km/h at the beginning`);
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

Car.prototype.break = function () {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

// test

const BMW = new Car('BMW', 120);
const Mercedes = new Car('Mercedes', 95);

BMW.accelerate();
BMW.break();

Mercedes.accelerate();
Mercedes.break();
*/

////////////////////////////
//// ES6 Classes

// Cl stands for class

// Class expression
// const PersonCl = class {};

// Class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Outside of constructor will be on the prototype of the objects, not on the objects themself.
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2023 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

const sule = new PersonCl('Sulenur', 2003);
console.log(sule);
sule.calcAge();

console.log(sule.__proto__ === PersonCl.prototype); // true

sule.greet();

////// NOTES
// 1. Classes are NOT hoisted.
// 2. Class are first-class citizes
// 3. Classes are executed in strict mode
