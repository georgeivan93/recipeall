import 'core-js/stable';
import { async, mark } from 'regenerator-runtime';
import 'regenerator-runtime/runtime';
import icons from 'url:../img/icons.svg';
import * as model from './model22.js';
import RecipeView22 from './views/rV2';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took to long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

const controlRecipes = async function (parentEl) {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    await model.loadRecipe(id);

    // Render
    RecipeView22.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
