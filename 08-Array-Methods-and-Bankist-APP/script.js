'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  // make inside empty the containerMovements to avoid old transactions
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    // .insertAdjacentHTML(position, text) takes two parameters. first parameter is position
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ') // boşlukları array olarak ayırır
      .map(name => name[0]) // ilk harfleri alır
      .join(''); // array'i string'e çevirir
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // if interest below than zero, do not calculate it.
      //console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting.
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  //(?) if currentAccount exists, than it will search for pin.
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // preventDefault() sayfanın yenilenmesini engeller
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // Clear input fields
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername?.value === currentAccount.username &&
    Number(inputClosePin?.value) === currentAccount.pin
  ) {
    // findIndex method returns the index of the first element in the array that satisfies the provided testing function.
    //Finding the index of account we want to delete
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete Account
    // We need the index of account we want to delete
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  // Clear input fields
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
  inputCloseUsername.blur();
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
///////////// Simple Array Methods /////////////
// Methods are simply functions that we can call on objects.

let arr = ['a', 'b', 'c', 'd', 'e'];

////////// .slice method (orjinal array'i değiştirmiyor. Yeni bir kopyasını oluşturup değiştiriyor.)
console.log('Slice Method');
console.log(arr.slice(2));
console.log(arr); // original array
console.log(arr.slice(2, 4));
console.log(arr.slice(-2)); // last two elements
console.log(arr.slice(-1)); // last element
console.log(arr.slice(1, -2)); // 1. index ve sondan 2. index aralığını kapsıyor
console.log(arr.slice()); // array'in kopyasını oluşturur
console.log([...arr]); // array'in kopyasını oluşturur

////////// .splice method (orjinal array'i değiştiriyor.)
// Genel olarak bu methodu diziden eleman silerken kullanıyoruz.
console.log('Splice Method');
console.log(arr.splice(2));
console.log(arr); // original array

// Dizinin son elemanını silmek
arr = ['a', 'b', 'c', 'd', 'e'];
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

////////// .reverse method  (mutate the original array)
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2);
console.log(arr2.reverse());
console.log(arr2);

////////// .concat() method (iki array'i birleştirir, orjinal arrayleri değiştirmez)
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // iki array'i birleştirir. orjinal arrayleri değiştirmez

////////// .join() method (array'in elemanlarını birleştirerek string'e çevirir)
console.log(letters.join(' - '));

////////// .at method (ES6)
const arr = [23, 11, 64];
console.log(arr[0]); // traditional way
console.log(arr.at(0)); // array at position zero

// getting last array element

console.log(arr[arr.length - 1]); // traditional way
console.log(arr.slice(-1)[0]); // traditional way
console.log(arr.at(-1)); // modern way

console.log('Eren'.at(-1)); // also works with strings
*/
/*
///////////// Looping Arrays: forEach

const movementsEx = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movementsEx)
for (const [i, movement] of movementsEx.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('---- FOREACH ----');

// .forEach is an higher-order function which requires a callback function.
// first parameter : the current element,
// second parameter : the current index
// third parameter : alway the entire array
movementsEx.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
*/
/*
//////// forEach with Maps and Sets
// Map
const currenciesEx = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currenciesEx.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'TL']);
// _value (we can use _ (underscore) which in JS means a unnecesary variable)
currenciesUnique.forEach(function (value, _value, map) {
  console.log(`${value}: ${value}`);
});
*/
/*
///////////////////////////////////
// Coding Challenge #1
//Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCopied = dogsJulia.slice(1, dogsJulia.length - 2);
  const arr = dogsJuliaCopied.concat(dogsKate);
  console.log(arr);
  arr.forEach(function (age, i) {
    if (age < 3) {
      console.log(`Dog number ${i + 1} is still a puppy🐩`);
    } else if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old🐶`);
    }
  });
};

checkDogs(dogsJulia, dogsKate);
*/

//////////////// Data Transformations: map, filter, reduce ////////////////
// MAP (returns a new array)
// MAP method is yet another method that we can use to loop over arrays and creates a new array.
// MAP methodu ile orjinal array'in üzerine callback function kullanarak değiştirip yeni bir array oluşturuyoruz.

// FILTER (returns a new array)
// filter for elements in the original array which satisfy certain condition.

// REDUCE
// reduces the original array to one single value

/*
///// MAP METHOD //////
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * eurToUsd);
}
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);
*/
/*
///// FILTER METHOD //////

// Primitive way of filtering
// const depositsFor = [];
// for (const mov of movements) {
//   if (mov > 0) depositsFor.push(mov);
// }
// console.log(depositsFor);


const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/
/*
///// REDUCE METHOD /////
// (Map, foreach etc.) First parameter is the current element of the array, second is current index number, third is the entire array.3
// But in reduce method, the first parameters is accumulator
// accumulator -> snowball

console.log(movements);
const balance = movements.reduce(function (acc, cur) {
  return acc + cur;
}, 0); // second parameter of reduce is the initial value of accumulator
console.log(balance);

// traditional way of reduce method
// let balance2 = 0;
// for (const mov of movements) {
//   balance2 += mov;
// }
// console.log(balance2);

// Maximum value of Movements array
const maxValue = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);
console.log(maxValue);
*/

/*
//////////////////////////////////
//// CODING CHALLENGE #2

// Test data:
// Data 1: [5, 2, 4, 1, 15, 8, 3]
// Data 2: [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(function (age) {
    if (age <= 2) {
      return age * 2;
    } else {
      return 16 + age * 4;
    }
  });
  console.log(humanAge);

  const adultDogs = humanAge.filter(function (age) {
    return age >= 18;
  });
  console.log(adultDogs);

  const averageHumanAge = adultDogs.reduce(function (acc, age, i, arr) {
    return acc + age / arr.length;
  }, 0);

  return averageHumanAge;
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
*/
/*
const eurToUsd = 1.1;
console.log(movements);

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0); // we cannot chain map or filter after reduce because reduce method returns a value, not an array. So we can only chain a method after another one, if the first one returns array.
console.log(totalDepositsUSD);

//Chaining methods version of coding challenge 2

const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce(function (acc, age, i, arr) {
      return acc + age / arr.length;
    }, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

*/
/*
//////// find method
// find method dows not return a new array, it returns the first element that satisfy the condition.
// filter vs find
// filter returns  new array that contains all the elements that match the condition, find returns the first element one.

const firstWithdrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/
/*
///// some Method
// some method returns true if any of the elements in the array match the condition.
// when you heard the 'any' keyword, it is good case to use some method.

console.log(movements);

// EQUALITY
console.log(movements.includes(-130));

// SOME: CONDITION
const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);

///// every Method
// every method returns true if all the elements in the array match the condition.
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;

console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));


///// flat Method
// flat method is used to flatten an array.
// flat method is only goes one level deep when flattening the array.

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // 2 levels deep

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

///// flatmap Method
// flatmap method is used to flatten an array and then map it.
// flatmap method is only goes one level deep and we can't change it.

const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);
*/
/*
/////////////// Sorting Arrays

//// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];

console.log(owners.sort()); // mutates the original array
console.log(owners);

//// Numbers
console.log(movements);

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// // Ascending (small to larger numbers)
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);

console.log(movements);

// // Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);

console.log(movements);
*/

/*
//////// More Ways of Creating and Filling Arrays

//// fill Method
// fill method is used to fill the array with a value.

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array([1, 2, 3, 4, 5, 6, 7]));

// Empty arrays + fill method
const x = new Array(7); // creates an array of 7 empty elements
console.log(x);
console.log(x.map(() => 5));

// x.fill(1); // fills the array with 1

// x.fill(1, 3); // fills the array from index 3 to the end with 1

// x.fill(1, 3, 5); // fills the array from index 3 to index 5 with 1

console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1); // creates an array of 7 elements with 1;
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); // the callback function is exactly like the one in a map() method.
console.log(z);

const dice = Array.from({ length: 100 }, () =>
  Math.floor(Math.random() * 6 + 1)
);
console.log(dice);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  // const movementsUI2 = [
  //   ...document.querySelectorAll('.movements__value'),
  //   el => Number(el.textContent.replace('€', '')),
  // ];
});
*/

///////////////////////////////////////
// Array Methods Practice
/*
// #1 sum of all deposits
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);

console.log(bankDepositSum);
*/
/*
// #2 how many deposits there have been in the bank with at least 1000$

//first way
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

//second way
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

let a = 10;
console.log(a++); // first return the old value and then increase by 1.
console.log(a);
console.log(++a); // first increase by 1 and then return the new value.
*/
/*
// #3 advanced reduce method exercise
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);
*/

/*
// #4
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLocaleLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

/*
////////////////////////////////////
// Coding Challenge #4

// Test DATA
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.

dogs.forEach(dog => {
  dog.recFood = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);

// 2

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);

// 3
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// 4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5
const exactAmount = dogs.some(dog => dog.curFood === dog.recFood);
console.log(exactAmount);

// 6
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
const okayAmount = dogs.some(checkEatingOkay);

console.log(okayAmount);

// 7
console.log(dogs.filter(checkEatingOkay));

// 8

const dogsCopy = dogs.slice().sort((a, b) => a.recFood - b.recFood);

console.log(dogsCopy);
*/
