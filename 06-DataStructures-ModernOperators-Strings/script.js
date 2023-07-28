'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals

  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredients, ...otherIngredients) {
    console.log(mainIngredients);
    console.log(otherIngredients);
  },
};

/* ///////////////////    DESTRUCTURING   //////////////////////////////
// Destructuring : a way of unpacking values from an array or an object into seperated variables. In other words, destructring is to break a complex data structure down into a samller data structure like a variable.

// ###### Destructuring Arrays #####

// without destructring
// let arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// //destructring array
// let [x, y, z] = arr; // copies arr's elements to the x, y, z
// console.log(x, y, z);
// x = 6;
// console.log(x, y, z);
// console.log(arr); // arr is not changed.

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// // Switching variables without destructring.
// // const temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main, secondary);

// // Switching variables by destructring
// [main, secondary] = [secondary, main];
// console.log(main, secondary);

// // Receive 2 return values from a function.
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// // Nested destructuring
// const nested = [2, 4, [5, 6]];
// // const [i, , j] = nested;
// // console.log(i, j);
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // Default values
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);

// ###### Destructuring Objects #####

const { name, categories, openingHours } = restaurant;
console.log(name, openingHours, categories);

//changing the variable names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

// default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
console.log(a, b);

// Nested Objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);


restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});


*/

/*////////////////////   The Spread Operator (...)    //////////////////////////////
// takes all value out of the array

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);
const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Et döner'];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays or more together

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Iterables: arrays, strings, maps, sets. NOT objects
const str = 'Eren';
const letters = [...str, '', 'B.'];
console.log(letters);

// Real-world example
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1 "),
//   prompt('Ingredient 2? '),
//   prompt('Ingredient 3? '),
// ];

// console.log(ingredients);
// restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Beybaba';
console.log(restaurantCopy.name);
console.log(restaurant.name);
*/

/*
/////////// Rest Pattern and Parameters (Opposite of Spread Operator) /////////
// : pack elements into an array

// 1) Destructuring

// SPREAD, because on right side of = sign
const arr = [1, 2, ...[3, 4]];

// REST, because on left side of = sign
const [a, b, ...others] = [1, 2, 3, 4, 5]; // others dizisi oluşturdu ve geri kalan değerleri bu dizinin içine yerleştirdi.
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

//Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2) Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('Mushrooms', 'onion', 'corn', 'pepper');
*/

/*
////////////////////// Short Circuiting ( && and || ) ////////////////////////
console.log('------ OR ------');
// use ANY data type , return ANY data type, short-circuiting
console.log(0 || 'Eren'); // if the first operand is a truthy value, console logs the first operand, if it is a falsy value, console logs the second operand.
console.log('' || 'BALTA');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('------ AND ------'); // the opposite of OR operator.
// if the first operand is a falsy value, console logs the first operand, if it is a truthy value, console logs the second operand.
console.log(0 && 'Eren');
console.log(7 && 'Eren');

console.log('Hello' && 23 && null && 'Eren');

//Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'chicken'); // if the first operand true, than execute the second operand.
*/

/*
////////////   The Nullish Coalescing Operator (??)  ////////
// Nullish : null and undefined (NOT 0 or '')
// if the first operand is nullish value, then execute the second operand.

restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
*/

/*
//////////////////   LOGICAL ASSIGNMENT OPERATORS   ////////////////
const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// Nullish assignment operator
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// OR assignment operator
// rest1.owner = rest1.owner && '<ANONYMUS>';
// rest2.owner = rest2.owner && '<ANONYMUS>';

rest1.owner &&= '<ANONYMUS>';
rest2.owner &&= '<ANONYMUS>';

console.log(rest1);
console.log(rest2);
*/

/*
///////////////////////////////////////////
// CODING CHALLENGE #1

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },

  printGoals: function (...goals) {
    for (let i = 0; i < goals.length; i++) {
      console.log(`${goals[i]} scored !`);
    }
    console.log(`Score : ${goals.length} - 0`);
  },
};

const [players1, players2] = game.players;
// console.log(players1, players2);

const [gk1, ...fieldPlayers] = players1;
// console.log(gk1);
// console.log(fieldPlayers);

const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

const { team1: team1, x: draw, team2: team2 } = game.odds;
// console.log(team1, draw, team2);

game.printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
console.log('---');
game.printGoals(...game.scored);

team1 < team2 && console.log('Team 1 is more likely to win');
team2 < team1 && console.log('Team 2 is more likely to win');
*/

/*
//////////////////////////////////////////////////////
// for-of loop : it will automatically loop over the entire array. it still allows you to use break or continue.
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

// .entries() =  ana dizideki elemanları teker teker ayrı birer array olarak oluşturur.
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1} : ${el}`);
}
*/
/*
////////////// Optional Chaining ( ?. )/////////////////

// Without
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// With Optional chaining ( ?. )
console.log(restaurant.openingHours.mon?.open); // if mon exists, then open property will be read. if not, them immediately undefined will be returned.
console.log(restaurant.openingHours?.mon?.open);

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Arrays

const users = [{ name: 'Eren', email: 'hello@eren.io' }];
console.log(users[0]?.name ?? 'User array empty');
*/

//LOOPING OBJECTS
/*
// Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days : `;

for (const day of properties) {
  openStr += `${day}, `;
}

console.log(openStr);

// Property Values
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
*/

/*
///////////////////////////////////////////
// CODING CHALLENGE #2

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },

  printGoals: function (...goals) {
    for (let i = 0; i < goals.length; i++) {
      console.log(`${goals[i]} scored !`);
    }
    console.log(`Score : ${goals.length} - 0`);
  },
};

// 1. .entries() hakkında not : game.scored bir array olduğu için .entries() olarak kullanıyoruz
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

// 2. .entries() hakkında not : game.odds bir object olduğu için Object.entries(objectName) olarak kullanıyoruz
const odds = Object.values(game.odds);
let avOdd = 0;
for (const odd of odds) avOdd += odd;
avOdd /= odds.length;
console.log(avOdd);

// 3.
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;

  console.log(`Odd of ${teamStr} ${odd}`);
}
*/

/*
///////////////////////////  SETS   ///////////////////////////////////
// set is an iterable like array, string.
// set can never have any duplicates
// there is no index in sets
// there is no need for getting values out of a set. If you need, use array.
// the main use case of sets is actually to remove duplicate values of arrays.
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);

console.log(new Set('Eren'));

console.log(ordersSet.size); // using .size instead of length.
console.log(ordersSet.has('Pizza')); // using .has instead of .includes
console.log(ordersSet.has('Bread')); // using .has instead of .includes
// adding/deleting elements into set
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
// ordersSet.clear(); // deletes all of the elements
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);

console.log(new Set('erenbalta').size);

*/

///////////////////    MAPS   //////////////////////////////
/*
// Maps: Fundamentals
// the first element is the key, the second element is the value.
// Maps are also iterables. (yinelenebilir) that means, for loop is also  available for maps.
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal')); // .set() method does not only update the map that it's called on, it also returns the map.
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

// .get() to get the values.
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 11;
console.log(rest.get(time >= rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);
// rest.clear(); // remove all the elements from the map
const arr = [1, 2];
rest.set(arr, 'Test');
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);

console.log(rest.get(arr));
*/
/*

//// Maps : Iteration (yinelenebilirlik)
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct ! 🎉'],
  [false, 'Try again :(.'],
]);

console.log(question);

// Converts object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// const answer = Number(prompt('Your answer : '));
const answer = 3;
console.log(answer);
console.log(question.get(answer === question.get('correct')));

// Convert map to array
console.log([...question]);
console.log([question.entries()]);
console.log([...question.keys()]); // all the keys
console.log([...question.values()]); // all the values.
*/

////////////////    WHICH DATA STRUCTURE TO USE  ?  ////////////
/*
Sources of data
1) From the program itself
2) From the UI (data input from the user)
3) From external sources: web API(Application Programming Interface)

We usually always have collections of data that we then need to store somewhere. We use Data Structures to store the data.
There are four built-in data structures in JavaScript. (Arrays, Sets, Object, Maps)

Simple List of Values ? (Sets, Arrays) (values without any description.)

Key/Value pairs ? (Objects or Maps) (Keys allow us to describe values.)

// ARRAYS VS SETS.
Arrays
Use when you need ordered list of values(might contain duplicates.)
Use when you need to manipulate data.

Sets
Use when you need to work with unique values.
Use when high-performance is really important
Use to remove duplicates from arrays (converting array to set)

// OBJECT VS MAPS
Objects

More 'traditional' key/value store
Easier to write and access values with . and []
Use when you need to include functions(methods)
Use when working with JSON(can convert to map)

Maps

Better performance
Keys can have any data type
Easy to iterate
Easy to compute size

Use when you simply need to map key to values.
Use when you need keys that are not strings.
*/

/*
////////////////////////////////////////////////////////////////
// Coding Challenge #3
const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔃 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔃 Substitution'],
  [64, '🟨 Yellow card'],
  [69, '🟥 Red card'],
  [70, '🔃 Substitution'],
  [72, '🔃 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🟨 Yellow card'],
]);

// 1
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2
gameEvents.delete(64);

// 3
const time = [...gameEvents.keys()].pop();
// console.log(time);
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes.`
);

// 4

for (const [key, value] of gameEvents) {
  key < 45
    ? console.log(`[First Half] ${key} : ${value}`)
    : console.log(`[Second half] ${key} : ${value}`);
}
*/

///////////////////    Working With Strings   //////////////////////////////
// ***** PART 1 *****
// strings are immutable.
/*
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);

console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));

// .slice()
console.log(airline.slice(4)); // .slice(i) means that starter index will be i.
console.log(airline.slice(4, 7)); // starter index(included) : 4, last index(not included) : 7

console.log(airline.slice(0, airline.indexOf(' '))); // TAP
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Portugal

console.log(airline.slice(-2)); // .slice(-x) starts counting reverse.
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat 😬');
  else console.log('You got lucky 😎');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');
*/

/*
// ***** Part 2 *****
const airline = 'TAP Air Portugal';

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// example
const nameFixer = function (name) {
  const nameLowerCase = name.toLowerCase();
  const nameFixed = nameLowerCase[0].toUpperCase() + nameLowerCase.slice(1);
  return console.log(nameFixed);
};
nameFixer('eREn');

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '   Hello@Jonas.Io  \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// .replace()
const priceGB = '288,97€';
const priceUS = priceGB.replace('€', '$').replace(',', '.'); // €'yi $ a dönüştürüyor.
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replaceAll('door', 'gate'));

console.log(announcement.replace(/door/g, 'gate')); //    /..../g (global) tüm door'ları gate'ye çevir.

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Air'));

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the NEW Airbus family');
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are not allowed on board');
  } else {
    console.log('Welcome a board!');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

*/
/*
// ***** Part 3 *****
// .split() store the results into elements of new array.
console.log('a+very+nice+string'.split('+')); // everything's split up by (+) divider string.
console.log('Eren BALTA'.split(' '));

const [firstName, lastName] = 'Eren BALTA'.split(' ');

// .join() metodu, bir array veya stringi belirli bir ayraç karakteriyle birleştirerek yeni bir string oluşturur.
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');

console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }

  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('eren balta');

// Padding
const message = 'Go to gate 23!';

console.log(message.padStart(25, '+').padEnd(30, '+'));

// Credit Card view example
const creditCard = function (cardNumber) {
  const str = cardNumber + ''; // converting number to string
  const lastFour = str.slice(-4);
  return lastFour.padStart(str.length, '*');
};

console.log(creditCard(5157557013));
console.log(creditCard(5157557013948765));
console.log(creditCard('51575570139487655645'));

// Repeat

const message2 = 'Bad weather... All departures delayed...';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'🛫'.repeat(n)}`);
};

planesInLine(5);
planesInLine(3);
planesInLine(12);

*/

/*
////////////////////////////////////////////////////////////////////////
// Coding Challenge #4


// underscore_case
//  first_name
// Some_Variable 
//   calculate_AGE
// delayed_departure

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  const tick = '✅';

  let counter = 0;

  for (const row of rows) {
    const [first, second] = row.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    counter++;
    console.log(`${output.padEnd(20, ' ')} ${tick.repeat(counter)}`);
  }
});
*/
/*
// String Methods Practice
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${
    type.startsWith('_Delayed') ? '🔴' : '          '
  } ${type.replaceAll('_', ' ')} from ${getCode(from)} to ${getCode(
    to
  )} (${time.replace(':', 'h')})`.padStart(45, ' ');
  console.log(output);
}
*/
