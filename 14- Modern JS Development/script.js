// Importing Module
// ALL MODULES ARE EXECUTED IN STRICT MODE BY DEFAULT
// Imports are not copies of the exports, they are live connection (they point same adress at the memory)

/*
import {
  addToCart,
  totalPrice as price, // renaming
  tq,
} from "./shoppingCart.js"; // importing statements are basically hoisted to the top

addToCart("bread", 5);
console.log(price);
console.log(tq);
*/

// console.log("Importing module");
// console.log(shippingCost);

/*
//// Importing all exported from shoppingCart.js
import * as ShoppingCart from "./shoppingCart.js";
ShoppingCart.addToCart("bread", 5);
console.log(ShoppingCart.totalPrice, ShoppingCart.tq);
*/

//// importing the default export and naming
// import add, {addToCart,totalPrice as price,tq } from "./shoppingCart.js";  // WE CAN MIX THE EXPORTS BUT IT IS NOT ADVICIBLE
// console.log(price);
import add, { cart } from "./shoppingCart.js"; // it doesnt need to use curly braces
add("milk", 2);
add("bread", 3);
add("apples", 7);
console.log(cart);

/*
//// TOP-LEVEL await (it blocks the code)

// console.log("Start Fetching");
// const res = await fetch("https://jsonplaceholder.typicode.com/posts");
// const data = await res.json();
// console.log(data);

// console.log("Something");

// async function always return promise
const getLastPost = async function () {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);
// not very clean
// lastPost.then((last) => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);
*/

/*
///// The Module Pattern

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart("apple", 4);
ShoppingCart2.addToCart("pizza", 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost); // can't access
*/

/*
///// CommonJS Modules (mostly used in NodeJS)
// Export
export.addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
};
  
// Import
const { addToCart } = require('./shoppingCart.js')
*/
//////////////////////////////////////////
// Introduction to NPM

// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
import cloneDeep from "lodash-es";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

// Whenever we change the one of modules, it updates page with the new code without reloading the page
if (module.hot) {
  module.hot.accept();
}
// However, this code should only be used during development and disabled in production environments because it is unnecessary for us to run non-interactive code in users' browsers.

class Person {
  greeting = "hey";
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const eren = new Person("Eren");

console.log("Jonas" ?? null);

console.log(cart.find((el) => el.quantity >= 2));
Promise.resolve("TEST").then((x) => console.log(x));

import "core-js/stable";
// import "core-js/stable/array/find";
// import "core-js/stable/promise";

// Polifilling async functions
import "regenerator-runtime/runtime";
