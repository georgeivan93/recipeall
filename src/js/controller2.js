import 'core-js/stable';
import { async, mark } from 'regenerator-runtime';
import 'regenerator-runtime/runtime';

import * as model from './model22.js';
import RecipeView22 from './views2/rV2';
import searchView from './views2/searchvi.js';
import resultsView from './views2/resview.js';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    RecipeView22.renderSpinner();

    // Loading recipe
    await model.loadRecipe(id);

    // Render
    RecipeView22.render(model.state.recipe);
  } catch (err) {
    RecipeView22.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render results

    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  RecipeView22.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
