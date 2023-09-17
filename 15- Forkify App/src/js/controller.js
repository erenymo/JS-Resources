import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // takes the hash part of url
    // console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) loading recipe
    await model.loadRecipe(id); // async function returns promise

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
