"use strict"; // Strict mode on (Yazdığımız kodların JavaScript standartları dışına çıkmasını önler ve kodun katı kurallar çerçevesi içinde çalıştırılması gerektiğini bildirir)

// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriversLicense = true;
// if (hasDriversLicense) console.log('I can drive');

//const interface = 'Audio';
//const private = 534;

///////////////////////////////////
// ####### FUNCTIONS #######
/* Functions are just another type of value.
function logger() {
    console.log('My name is Eren');
} 

// calling / running / invoking function (they mean same thing)
logger();
logger();
logger();
logger();

function fruitProcessor(appleCounter, orangeCounter) {
    console.log(appleCounter, orangeCounter);
    const juice = `Juice with ${appleCounter} apples and ${orangeCounter} oranges.`;
    return juice;
}

console.log(fruitProcessor(5, 0)) ;
*/

////////////////////////////////////
// ######## Function Declarations vs. Expressions vs. Arrow Function
////////////////////////////////////
// Parameters is the placeholder of function, and the arguement is the actual value we use to fill the placeholder in the parameter.
/*
// Function declaration  Fonksiyonu tanımlamadan önce de çağırabilirsin
console.log(calcAge1(1991));

function calcAge1(birthYear) {
    const currentYear = 2023;
    return currentYear - birthYear;
}

// Function Expression ( also called Anonymous function. ) Fonksiyonu değişkende tanımladıktan sonra kullanabilirsin.
const calcAge2 = function (birthYear) {
    const currentYear = 2023;
    return currentYear - birthYear;
}

const age2 = calcAge2(1991);
console.log(age2);
*/

/* 
// ARROW FUNCTION is simply a special form of function expression in shorter and faster way.

const calcAge3 = (birthYear) => 2023 - birthYear; // do not need to write return in one line arrow function. after the arrow part will be automatically be returned.
console.log(calcAge3(2002));

const yearsUntilRetirement = (firstName, birthYear, currentYear) => {
  const age = currentYear - birthYear;
  const retirement = 65 - age;
  if (retirement <= 0) {
    return `Congrats ${firstName} ! You have retired !`;
  } else {
    return `${firstName} retires in ${retirement} years.`;
  }
  //return statement immediately exit the function
  //return retirement;
};

console.log(yearsUntilRetirement("Eren", 2002, 2023));
*/

//////////////////////////////////////////////////
// ######### Coding Challenge 1 ###########
/*
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const avgDolphins = calcAverage(23, 34, 27);
const avgKoalas = calcAverage(85, 54, 41);

function checkWinner(avgDolphins, avgKoalas) {
  if (avgDolphins >= 2 * avgKoalas) {
    return `Dolphins win! (${avgDolphins} vs. ${avgKoalas}) `;
  } else if (avgKoalas >= 2 * avgDolphins) {
    return `Koalas win! (${avgKoalas} vs. ${avgDolphins}) `;
  } else {
    return "No teams win";
  }
}

console.log(checkWinner(avgDolphins, avgKoalas));
*/

/////////////////////////////////////////
// ####### ARRAYS #######
/*
const friends = ["Eren", "Ömer", "Misto", "Meco", "Emo"];
console.log(friends);

const years = new Array(1991, 2002, 1976, 2020);

console.log(friends[0]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[0] = "nuro";
console.log(friends);

const firstName = "Eren";
const eren = [firstName, "Balta", 2023 - 2002, friends];
console.log(eren);
*/

/* 
// BASIC ARRAY OPERATIONS
const friends = ["Eren", "Ömer", "Misto", "Meco", "Emo"];

// Add Elements
const newLength = friends.push("niro"); // push method : add elements end of the array. En son oluşan element sayısını döndürür.
console.log(friends);
console.log(newLength);

friends.unshift("Şule"); // unshift method : add element beginning of the array.
console.log(friends);

// Remove Elements
friends.pop(); // remove last element
const popped = friends.pop(); // en son sildiği element'i döndürür.
console.log(friends);
console.log(popped);

friends.shift(); // remove first element , en son sildiği element'i döndürür.
console.log(friends);

console.log(friends.indexOf("Misto")); // indexOf() returns the element's index num.
console.log(friends.indexOf("deneme")); // dizide yoksa -1 döndürür

console.log(friends.includes("Meco")); // includes() returns true either false

friends.push(32);
console.log(friends.includes("32"));
console.log(friends.includes(32));
*/

////////////////////////////////////////////
// ###### CODING CHALLENGE 2 ######
/* 
const calcTip = function (billValue) {
  if (billValue <= 300 && billValue >= 50) {
    return (billValue * 15) / 100;
  } else {
    return (billValue * 20) / 100;
  }
};

const bills = [125, 555, 44];
console.log(bills);

const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
console.log(tips);

const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(total);
*/
/////////////////////////////////////

///////////////////////////////////////
//###### INTRODUCTION TO OBJECTS #########
/*
const erenArray = ["Eren", "BALTA", 2023 - 2002, ["Ali", "Veli", "Mete"]];

// defining object
const eren = {
  firstName: "Eren", // property
  lastName: "BALTA", // property
  age: 2023 - 2002, // property
  job: "Lecturer", // property
  friends: ["Ali", "Veli", "Mete"], // property
};

console.log(eren);
console.log(eren.lastName);
console.log(eren["lastName"]);

const nameKey = "Name";
console.log(eren["first" + nameKey]); // you can put any expression inside of square brackets.
console.log(eren["last" + nameKey]);

const interestedIn = prompt(
  "What do you want to know about Eren? Choose betwwen firstName, lastName, age, job, friends"
);


if (eren[interestedIn]) {
  // truthy value
  console.log(eren[interestedIn]);
} else {
  console.log("The Value doesn't exist");
}


eren.location = "Gebze";
eren["github"] = "@erenymo";

console.log(eren);
*/

///////////////////////////////////
// Challenge

// Eren has 3 friends and his best is called Meco.
/**
const sentence = {
  personName: "Eren",
  friends: ["Meco", "Emo", "Must"],
};

console.log(
  `${sentence.personName} has ${sentence.friends.length} friends, and his best friend is called ${sentence.friends[0]}`
);

// assignment
const myCountry = {
  countryName: "Turkey",
  capital: "Ankara",
  language: "Turkish",
  population: 81,
  neighbours: [
    "İran",
    "Suriye",
    "Irak",
    "Yunanistan",
    "Bulgaristan",
    "Ermenistan",
    "Gürcistan",
    "Azerbaycan",
  ],
};

console.log(
  `${myCountry.countryName} has ${myCountry.population} million Turkish-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`
);

myCountry.population += 2;

myCountry["population"] -= 2;

console.log(myCountry.population);
*/

// Declaring function inside of object

/*

const eren = {
  firstName: "Eren", // property
  lastName: "BALTA", // property
  birthYear: 2002, // property
  job: "Lecturer", // property
  friends: ["Ali", "Veli", "Mete"], // property
  hasDriversLicense: true,

  // function expression
  // calcAge: function (birthYear) {
  //   return 2037 - birthYear;
  // },

  // calcAge: function () {
  //   // console.log(this);
  //   return 2037 - this.birthYear;
  // },

  calcAge: function () {
    this.age = 2037 - this.birthYear;
    return this.age;
  },

  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-years old ${
      this.job
    }, and he has ${this.hasDriversLicense ? "a" : "no"} driver's license.`;
  },
};

console.log(eren.getSummary());

// console.log(eren.calcAge());

// console.log(eren.age);
// console.log(eren.age);
// console.log(eren.age);
*/

/*
//////////////////////////////////////////
// ###### Challenge 3 #######
const mark = {
  fullName: "Mark Millet",
  mass: 78,
  height: 1.69,

  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

const john = {
  fullName: "John Smith",
  mass: 92,
  height: 1.95,

  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

mark.calcBMI();
john.calcBMI();

if (mark.BMI > john.BMI) {
  console.log(`Mark's BMI (${mark.BMI}) is higher than John's (${john.BMI})`);
} else {
  console.log(`John's BMI (${john.BMI}) is higher than Mark's (${mark.BMI})`);
}
*/
//////////////////////////////////////
// ####### The FOR loop #######

/* 
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep}`);
}
*/

/*
const eren = [
  "Eren",
  "BALTA",
  2037 - 2002,
  "Junior Full Stack Developer",
  ["Meco", "Eren", "Emo"],
];

const types = [];

for (let i = 0; i < eren.length; i++) {
  // Reading from eren array
  console.log(eren[i], typeof eren[i]);

  // filling types array
  //types[i] = typeof eren[i];

  types.push(typeof eren[i]);
}
console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];
const currentYear = 2023;

for (let i = 0; i < years.length; i++) {
  ages.push(currentYear - years[i]);
}

console.log(ages);

// continue and break
// continue : bulunduğu döngüyü bitirip bir sonraki döngüye geçer.
// break : döngüden tamamen çıkar.

console.log("---- ONLY STRINGS ----");
for (let i = 0; i < eren.length; i++) {
  if (typeof eren[i] !== "string") continue;

  console.log(eren[i], typeof eren[i]);
}

console.log("---- BREAK WITH NUMBER ----");
for (let i = 0; i < eren.length; i++) {
  if (typeof eren[i] === "number") break;

  console.log(eren[i], typeof eren[i]);
}
*/
/*
const eren = [
  "Eren",
  "BALTA",
  2037 - 2002,
  "Junior Full Stack Developer",
  ["Meco", "Eren", "Emo"],
  true,
];

// Looping Backwards
for (let i = eren.length - 1; i >= 0; i--) {
  console.log(eren[i]);
}

// Loop inside of a loop
for (let i = 1; i <= 3; i++) {
  console.log(`-------- SET ${i} is Starting ---------`);
  for (let y = 1; y <= 15; y++) {
    console.log(`Set ${i}, Rep ${y}`);
  }
}
*/

///////////////////////////////
// ##### While Loop #####

// console.log("----- For Loop -----");
// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weights repetition ${rep}`);
// }
/*
console.log("----- While Loop -----");
let rep = 1;

while (rep <= 10) {
  console.log(`Lifting weights repetition ${rep}`);
  rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
}
console.log(dice);
*/

//////////////////////////////////////////
// CODING CHALLENGE 4
/*
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

const calcTips = function (bills) {
  if (bills <= 300 && bills >= 50) {
    return (bills * 15) / 100;
  } else {
    return (bills * 20) / 100;
  }
};

for (let i = 0; i < bills.length; i++) {
  tips.push(calcTips(bills[i]));
  totals.push(tips[i] + bills[i]);
}

console.log("-- Bonus --");
console.log(bills);

console.log("-- Tips --");
console.log(tips);

console.log("-- Totals --");
console.log(totals);

console.log("-- Average --");
const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  sum = sum / arr.length;

  return sum;
};

console.log(calcAverage(totals));
*/
