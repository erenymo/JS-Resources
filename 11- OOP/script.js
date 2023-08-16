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

//// static method
// it is not in prototype, so it cannot be read by instances
Person.hey = function () {
  console.log('Hey there 👋');
  console.log(this); // entire constructor function
};

Person.hey();
// eren.hey(); // cannot use hey function because it is not in prototype.

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
/*
////////////////////////////
//// ES6 Classes

// Cl stands for class

// Class expression
// const PersonCl = class {};

// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //// Instance methods
  // Outside of constructor will be on the prototype of the objects, not on the objects themself.
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2023 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2023 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  //// Static method
  static hey() {
    console.log('Hey There 👋');
    console.log(this);
  }
}
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

const sule = new PersonCl('Sulenur Durgut', 2003);
console.log(sule);
sule.calcAge();
console.log(sule.age);

console.log(sule.__proto__ === PersonCl.prototype); // true

sule.greet();

PersonCl.hey();

////// NOTES
// 1. Classes are NOT hoisted.
// 2. Class are first-class citizes
// 3. Classes are executed in strict mode

//////////// Setters and Getters

// they are basically a function that gets or sets a value

const walter = new PersonCl('Walter White', 1965);

const account = {
  owner: 'eren',
  movements: [200, 530, 120, 500],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  // any setter method needs to have exactly one parameter
  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest);

account.latest = 50;
console.log(account.movements);
*/
/*
///////// Object.create

const PersonProto = {
  calcAge() {
    console.log(2023 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); // steven's prototype is now PersonProto
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto); // True

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();
*/
/*
/////////////////////////////////////////////
// Coding Challenge #2

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
    console.log(`${this.make} going at ${this.speedUS} mi/h`);
  }

  break() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
    console.log(`${this.make} going at ${this.speedUS} mi/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6; // mph to kmh
    return this.speed;
  }
}

const ford = new CarCl('Ford', 120);
ford.accelerate();
ford.speedUS = 120;
ford.accelerate();
ford.break();
ford.accelerate();
console.log(ford.speedUS);
*/

/*
/////////////////////////////////////////
// Inheritance between 'Classes': Constructor functions

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName}, I study ${this.course}`);
};

const eren = new Student('Eren', 2002, 'Management Information Systems');
eren.introduce();
eren.calcAge();

console.log(eren.__proto__);
console.log(eren.__proto__.__proto__);

console.log(eren instanceof Student); // true
console.log(eren instanceof Person); // true because we linked the prototypes

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
*/

/*
/////////////////////////////////////////////
// Coding Challenge #3

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;

  console.log(
    `'${this.make}' going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`'${this.make}' going at ${this.speed} km/h`);
};

Car.prototype.break = function () {
  this.speed -= 5;
  console.log(`'${this.make}' going at ${this.speed} km/h`);
};

// Linking prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`${this.make} is charged to ${chargeTo}%`);
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;

  console.log(
    `'${this.make}' going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 50);
tesla.accelerate();
tesla.chargeBattery(90);
tesla.accelerate();
tesla.break();
*/

/*
///////////////////////////////////////////////
// Inheritance Between "Classes" : ES6 Classes

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //// Instance methods
  // Outside of constructor will be on the prototype of the objects, not on the objects themself.
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2023 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2023 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  //// Static method
  static hey() {
    console.log('Hey There 👋');
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2023 - this.birthYear
      } years old, but as a student I feel more like ${
        2023 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');

console.log(martha);
martha.introduce();
martha.calcAge();
*/

/*
//////////////////////////////////////////////
//  Inheritance Between "Classes": Object.create

const PersonProto = {
  calcAge() {
    console.log(2023 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2001, 'Computer Science');
jay.introduce();
console.log(jay);
*/

/*
// 1- Public fields : field as a property that will be on all instances
// 2- Private fields : properties that not accesible from outside
// 3- Private methods
// 4- Public methods
// (there is also the static version)
class Account {
  // 1- Public Fields (instances)
  locale = navigator.language;

  // 2- Private Fields (# makes property private)
  #movements = [];
  #pin; // pin is needed on constructor

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protected property
    this.#pin = pin;
    // this._movements = []; // this property is same at the beginning of every object
    // this.local = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3- Public Methods
  // Public Interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  // Static methods : will not be available on the instances, but only on the class
  static helper() {
    console.log('Helper');
  }

  // 4- Private Methods
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Eren', 'TRY', 1111);

// acc1._movements.push(250);
// acc1._movements.push(-140);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);
Account.helper();

// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(100));

// Chaining
acc1.deposit(300).deposit(500).withdraw(350).requestLoan(25000).withdraw(4000);
console.log(acc1);
*/

/////////////////////////////////////
// Coding Challenge #4

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  break() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
    return this;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
    console.log(
      `${this.make} going at ${this.speed} km/h, with charge of ${
        this.#charge
      }%`
    );
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed} km/h, with charge of ${
        this.#charge
      }%`
    );
    return this;
  }

  chargeBattery(val) {
    this.#charge = val;
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);

rivian.accelerate().break().accelerate().chargeBattery(70).accelerate();