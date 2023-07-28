"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2023-07-01T14:43:26.374Z",
    "2023-07-08T18:49:59.371Z",
    "2023-07-13T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)); // Milliseconds to days

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, "0");
  // const month = `${date.getMonth() + 1}`.padStart(2, "0");
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 second, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }
    // Decrease 1 sec
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// // FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    // Experimenting API
    const now = new Date();

    //// Internationalizing Dates (INTL)
    // If you do not need hours and minutes, no necessary to create options.
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric", // numeric, long, short, narrow
      year: "numeric", // 2-digit, numeric
      //weekday: "short", // long, short, narrow
    };

    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  // Reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
////////// Converting and Checking Numbers  /////////////////

// Numbers in javascript are always represented floating point numbers

console.log(23 === 23.0); // true

// Base 10 - 0 to 9.  1/10 = 0.1 3/10 = 3.3333333
// Binary base 2 - 0 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // false

// Conversion (string to number)
console.log(Number("23"));
console.log(+"23");

// Parsing (string to number)
console.log(Number.parseInt("30px", 10)); // 10 is the radix
// string should start with a number
console.log(Number.parseInt("e23")); // NaN

console.log(Number.parseInt("    2.5rem    "));
console.log(Number.parseFloat("          2.5rem"));

// isNan()  Check if value is NaN
console.log(Number.isNaN(20)); // number
console.log(Number.isNaN("20")); // string
console.log(Number.isNaN(+"20X")); // NaN
console.log(Number.isNaN(23 / 0)); // Infinity

// isFinite()
// Checking if value is number.
console.log(Number.isFinite(20)); // number;
console.log(Number.isFinite("20")); // string;
console.log(Number.isFinite(+"20X")); // NaN;
console.log(Number.isFinite(23 / 0)); // Infinity;

console.log(Number.isInteger(23)); // integer
console.log(Number.isInteger(23.0)); // .0 Also integer but .2 is not
console.log(Number.isInteger(23 / 0)); // Infinity
*/
/*
////////// Math and Rounding  /////////////////

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

// max and min
console.log(Math.max(5, 18, 23, 11, 2)); // find the max value
console.log(Math.max(5, 18, "23", 11, 2)); // it does type coersion
console.log(Math.max(5, 18, "23px", 11, 2)); // however it does not parsing

console.log(Math.min(5, 18, 23, 11, 2)); // find the min value;

console.log(Math.PI * Number.parseFloat("10px") ** 2);

// random number
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max - min) -(adding min)-> min...max
console.log(randomInt(10, 20));

// Rounding integers
// all of the following do the type coersion
console.log(Math.round(23.3)); // ignores the decimal part
console.log(Math.round(23.9)); // rounds to the nearest integer

console.log(Math.ceil(23.3)); // rounds up to the nearest integer
console.log(Math.ceil(23.9)); // rounds up to the nearest integer

console.log(Math.floor(23.3)); // rounds down to the nearest integer
console.log(Math.floor("23.9")); // rounds down to the nearest integer

// trunc and floor do the same thing in positive numbers but not in negative numbers

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

// Rounding decimals
console.log((2.7).toFixed(0)); // toFixed returns String.
console.log((2.7).toFixed(3)); // virgülden sonra 3 basamak daha yazıyor
console.log((2.3455).toFixed(2)); // virgülden sonra 2 basamak daha yazıyor
console.log(+(2.345).toFixed(2)); // string to number
*/
/*
////////// The Remainder Operator  /////////////////

console.log(5 % 2);
console.log(8 % 3);

// even numbers's remainder is 0, odd's remainder is 1
console.log(6 % 2);
console.log(7 % 2);

const isEven = (n) => n % 2 === 0;
console.log(isEven(22));

labelBalance.addEventListener("click", function () {
  [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
    // 0 2 4 6...
    if (i % 2 === 0) row.style.backgroundColor = "orangered";

    // 0 3 6 9...
    if (i % 3 === 0) row.style.backgroundColor = "blue";
  });
});
*/

/*
////////// Numeric Separators  /////////////////

// 287,460,000,000
const diameter = 287_460_000_000; // increasing the readability
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00; // 15 dollar
const transferFee2 = 1_500; // 1500 dollar

const PI = 3.1415;
console.log(PI);

console.log(Number("230_000")); // NaN
console.log(parseInt("230_000")); // 230
*/
/*
//////////  Working with BigInt  /////////////////

console.log(2 ** 53 - 1); // the biggest number that javascript can safely represent
console.log(Number.MAX_SAFE_INTEGER); // exact same number.
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(456489325432465894655342347498456465468n); // this n basically transforms regular number into big int number.

console.log(BigInt(456489325432465894655342347498456465468));

///// Operations

console.log(10000n + 10000n);
console.log(3628637263726372637623726372637263726n * 10000000n);
// console.log(Math.sqrt(16n)); // Cannot use Math operators with BigInt
// Cannot mix BigInt and other types
const huge = 34516734573456432543264537346n;
const num = 23;
console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 15); // true (does type coercion)
console.log(20n === 20); // false
console.log(20n == 20); // true
console.log(typeof 20n); // bigint
console.log(typeof 20); // number

// String Concat
console.log(huge + " is REALLY big!!!");

//Divisions
console.log(10n / 3n); // returns the closest big int (cuts the decimal part)
console.log(10 / 3);
*/

//////////  Creating Dates  /////////////////
/*
const now = new Date();
console.log(now);

console.log(new Date("Fri Jul 14 2023 15:06:48"));
console.log(new Date("December 24, 2015"));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5));
// months are zero based in Javascript.  0 -> Jan .... 11 -> Dec
console.log(new Date(2037, 10, 31)); // nov 31 -> dec 1

console.log(new Date(0)); // beginning of UNIX time (January 1st 1970)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days later (days * hours * minutes * seconds * milliseconds) (converting days to milliseconds)

// Working with dates

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // !!! never use getYear(), use getFullYear() !!!
console.log(future.getMonth()); // Months are zero based.
console.log(future.getDate()); // Date : day of the month
console.log(future.getDay()); // Day : day of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // ISO 8601 standard
console.log(future.getTime()); // returns the number of milliseconds since January 1st 1970;
console.log(new Date(2142246180000));

console.log(Date.now()); // returns the number of milliseconds since January 1st 1970;

future.setFullYear(2040); // set the year
console.log(future);
*/
/*
//////////  Operations with Dates   /////////////////

const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); // Milliseconds to days
const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));

console.log(days1);
*/
/*
////////////// Internationalizing Numbers (INTL) ////////////////

const num = 3884764.23;

// for much more informations about properties, check on mdn documents
const options = {
  style: "currency", // for ex. unit, percentage
  unit: "mile-per-hour", // much more you can use. for ex: celsius
  currency: "EUR",
  // useGrouping: false,
};

console.log("US:", new Intl.NumberFormat("en-US", options).format(num));
console.log("Germany:", new Intl.NumberFormat("de-DE", options).format(num));
console.log("Syria:", new Intl.NumberFormat("ar-SY", options).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);
*/

//////////  setTimeout and setInterval  ////////////
// to execute some code at some point in the future
/*
// setTimeoutt() takes 2 arguments: a function and a time in ms (and also can take more arguments).
const ingredients = ["olives", "spinach"];

const pizzaTimer = setTimeout(
  (ing1, ing2) =>
    console.log(`Here is your pizza with ${ing1} and ${ing2}! 🍕`),
  3000, // after 3 secs, it logs.
  ...ingredients // spread operator
);
// js doesn't wait to complete the code before executing the code after 3 secs.
console.log("Waiting...");

if (ingredients.includes("spinach")) {
  clearTimeout(pizzaTimer); // to cancel the setTimeout
}

// setInterval
// setInterval do the same thing as setTimeout, but it repeats the code after a given time.
// setInterval takes 2 arguments: a function and a time in ms.
// setInterval returns a timer id, which can be used to cancel the setInterval.

setInterval(function () {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  console.log(`${hours}:${minutes}:${seconds}`);
}, 1000);
*/
