/* 
// ###### VARIABLES AND VALUES ######  (Values are stored in Variables.)
console.log("Eren");
console.log(21);

// declaring a variable ---- let variableName = value

//JS has dynamic typing: you do not have to manually define the data type.
//C# has staticaly typing : you have to manually define the data type.


//Value has type, NOT Variable !

console.log("Jonas");
let firstName = "Eren";
console.log(firstName);

// Assignment 1 

let country = "Turkey";
let continent = "Istanbul";
let population = 21000000;

console.log(country);
console.log(continent);
console.log(population);
*/

// ###### DATA TYPES ###### 

// Number, String, Boolean, Undefined, Null, BigInt, Symbol (not useful for now)
/*
let javascriptIsFun = true;

console.log(javascriptIsFun);

console.log(typeof true)  // typeof operator shows us the data type of value.
console.log(typeof javascriptIsFun);
console.log(typeof 23);
console.log(typeof 'E'); 
console.log(typeof 'EREN');

javascriptIsFun = 'YES'; // we assigned a new value to already existing variable.
console.log(typeof javascriptIsFun);

let year; // undefined variable.
console.log(typeof year)
*/

// ####### LET, CONST AND VAR #######

// let :  you can assigned a new value to it later. (reassigning a value to variable) (MUTABLE : can be changed later)
// let age = 30;
// age = 31;  
// use let when you are really sure that the variabl needs to change later.


// const : cannot be changed later and also you cannot declare empty const variables. (IMMUTABLE : cannot be changed later)
// const birthYear = 1991;
// birthYear = 1990;
// use const by default, and always just use let when you're sure that the value of the variable needs to change at some point in your code.

// var : older version of let.  never use var anymore.

// var job = 'programmer';
// job = 'teacher';

// ####### OPERATORS #######

// MATH Operators  + - * / %  **(power)  

// Assignment Operators = += -= *= /=  ++ --

// Comparison Operators( should be a boolean )  < > <= >=   

//////////////////////////////////////////////////////
// CODING CHALLANGE #1
/*
Mark and John are trying to compare their BMI (Body Mass Index), which is
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg
and height in meter).

Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.

Test data:
☻ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
m tall.
☻ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
m tall.
GOOD LUCK 
*/

// let massMark = 95;
// let heightMark = 1.88;

// let massJohn = 85;
// let heightJohn = 1.76;

// const BMIMark = massMark / (heightMark ** 2); 
// const BMIJohn = massJohn / (heightJohn ** 2); 

// const markHigherBMI = BMIMark > BMIJohn;

// console.log(BMIMark, BMIJohn ,markHigherBMI);

//////////////////////////////////////////////////////

///////////////////////////////
//  ####### STRING AND TEMPLATE LITERALS #######

// const firstName = "Eren";
// const currentJob = "Student";
// const birthYear = 2002;
// const currentYear = 2023;

// const eren = "I'm " + firstName + ', a ' + (currentYear - birthYear) + ' years old ' + currentJob + '!' ;
// console.log(eren);

// // Template Strings
// console.log(`Just a regular string ...`)

// // Older version of creating multiple lines in one string.
// console.log('String with\n\
// multiple\n\
// lines');

// // Modern version of creating multiple lines in one string using backticks.
// console.log(`String with
// multiple
// lines with backticks`);

// const erenNew = `I'm ${firstName}, a ${currentYear - birthYear} years old ${currentJob}!`;   // alt + 96 to back ticks
// console.log(erenNew);

////////////////////////
// #######  IF / ELSE STATEMENTS #######

// const age = 15;

// //Control structure
// if (age >= 18) {
//     console.log('Eren can start driving license 🚗');
// } else {
//     const yearsLeft = 18 - age;
//     console.log(`Eren is too young. Wait another ${yearsLeft} years`);
// }

// const birthYear = 2002;
// let century;
// if (birthYear <= 2000) {
//     century = 20;
// } else {
//     century = 21;
// }

// console.log(century);


////////////////////////
// #######  TYPE CONVERSATION and TYPE COERCION #######

// type conversation
// let inputYear = '1991';
// inputYear = Number(inputYear); // String to Number
// console.log(inputYear + 18);

// console.log(Number('Eren'));
// console.log(typeof NaN) // NaN is still a number.

// console.log(String(23), 23);

// // type coercion
// console.log('I am ' + 23 + ' years old.');
// console.log('23' - '10' - 3); // String to Number
// console.log('23' + '10' + 3); // Number to String
// console.log('23' * '10'); // String to Number

// ###### TRUTHY AND FALSY VALUES #######
// falsy values will be converted to false when we attempt to convert them to boolean.
// 5 falsy values : 0, '', undefined, null, NaN
// except these 5 values, the others are truthy values.

// console.log(Boolean(0))
// console.log(Boolean('Eren'))
// console.log(Boolean(undefined))
// console.log(Boolean({}))

// const money = 0;
// if(money) {
//     console.log("dont spend it all")
// } else {
//     console.log("you should get a job")
// }

// ###### EQUALITY OPERATORS #######

// const age = 18;
// // ( === : strict equality operator ) it does not perform type coercion, only returns true when both values are exactly the same String 18 is not equal number 18. always use strict equality operator
// if (age === 18) console.log('You just became an adult :D')

// // ( == : loose equality operator ) it performs type coercion. String 18 is equal number 18; avoid to use loose equality operator as much as you can
// if (age == '18') console.log('18 is equal 18')

// const favourite = Number(prompt("What's your favourite number ? : "));

// console.log(typeof favourite) 

// if (favourite === 23) {
//     console.log ('Cool! 23 is an amazing number!')
// } else if ( favourite === 7) {
//     console.log ('7 is also cool number')
// } else {
//     console.log(`${favourite} is not cool number`);
// }

// // DIFFERENT OPERATOR : !== (strict version)   != (loose version)
// if ( favourite !== 23) console.log("Why not 23");

//////////////////////////////////////////////////
// CODING CHALLENGE #3


// const scoreDolphins = (97 + 112+101) / 3;
// const scoreKoalas = (109+95+106) / 3;

// console.log(scoreDolphins)
// console.log(scoreKoalas)

// if (scoreDolphins > scoreKoalas && scoreDolphins > 100) {
//     console.log("Team Dolphins won the trophy ! ");
// } else if (scoreDolphins < scoreKoalas && scoreKoalas > 100) {
//     console.log("Team Koalas won the trophy ! ");
// } else if (scoreDolphins === scoreKoalas && scoreDolphins >= 100 && scoreKoalas >= 100){
//     console.log("DRAW !");
// } else {
//     console.log("Both teams have under 100 points. No team wins the trophy !");
// }


// ####### THE SWITCH STATEMENT #######
// const day = 'sunday';

// switch(day) {
//     case 'monday': // day === 'monday'
//         console.log('Today is a monday');
//         console.log('Go to coding meetup');
//         break;
//     case 'tuesday':
//         console.log('Today is a tuesday');
//         break;
//     case 'wednesday':
//     case 'thursday':
//         console.log('write code examples');
//         break;
//     case 'friday':
//         console.log('study js');
//         break;
//     case 'saturday':
//     case 'sunday':
//         console.log('enjoy the weekend');
//         break;
//     default:
//         console.log('not a valid day!')
    
// }

// Expressions return value, statements don't return value. 

// Ternary Operator

// const age = 23;

// //age >= 18 ? console.log('I like to drink wine 🍷') : console.log('I like to drink water 💧')

// const drink = age >= 18 ? 'wine 🍷' : 'water 💧';

// console.log(drink);

////////////////////////////////////////
// CODING CHALLENGE #4
// const bill = 430;
// const tip = (bill <= 300 && bill >= 50) ? bill * 15/100 : bill * 20/100;
// const total = bill + tip

// console.log(`The bill was ${bill}, the tip was ${tip}, and the total price is ${total}`)