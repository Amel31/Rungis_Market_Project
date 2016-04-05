/**
 * Created by Kim on 21/03/2016.
 */
'use strict';

var util = require('./Util.js');

function Restaurant(name, openingHours, recipes, market) {
  this.name = name;
  //openingHours is 2n length table containing integers between 0 and 240000
  //odd indexes are opening hours for a period and the next even index is the
  //closing hour for the period
  this.openingHours = openingHours;
  this.recipes = recipes;
  this.ingredients = [];
  this.stocks = [];
  this.availableRecipes = [];
  this.market = market;
  this.nextOrderHour = util.randomInt(this.market.open, this.market.close);
  this.isOpen = false;
  this.initializeStocksAndIngredients();
  this.score = 0;
  this.scoreFactor = 0;
  this.calculateScoreFactor();
}

Restaurant.prototype.update = function(hour) {
  this.updateOpenStatus(hour);
  this.orderFromMarketPlace(hour);
};

Restaurant.prototype.initializeStocksAndIngredients = function() {
  for (var i = 0; i < this.recipes.length; i++) {
    for (var j = 0; j < this.recipes[i].ingredients.length; j++) {
      var addIngredient = true;
      for (var k = 0; k < this.stocks.length; k++) {
        if (this.stocks[k].ingredient == this.recipes[i].ingredients[j]) {
          addIngredient = false;
          break;
        }
      }
      if (addIngredient === true) {
        this.ingredients.push(this.recipes[i].ingredients[j]);
        var toAddStock = new Stock(this.recipes[i].ingredients[j], 0);
        this.stocks.push(toAddStock);
      }
    }
  }
  this.updateAvailableRecipes();
};

Restaurant.prototype.reStock = function(ingredients, quantities) {
  for (var i = 0; i < ingredients.length; i++) {
    for (var j = 0; j < this.stocks.length; j++) {
      if (this.stocks[j].ingredient == ingredients[i]) {
        this.stocks[j].quantity = this.stocks[j].quantity + quantities[i];
        break;
      }
    }
  }
  this.updateAvailableRecipes();
};


Restaurant.prototype.orderFromMarketPlace = function(hour) {
  if (this.nextOrderHour == hour) {
    var quantities = [];
    for (var i = 0 ; i < this.ingredients.length ; i++) {
      var quantity = util.randomInt(0, util.maxStock);
      quantities.push(quantity);
    }
    this.market.order(this, this.nextOrderHour, this.ingredients, quantities);
    console.log(this.name, 'has requested new stocks at :', this.nextOrderHour);
    this.nextOrderHour = util.randomInt(this.market.open, this.market.close);
  }
};


Restaurant.prototype.updateOpenStatus = function(hour) {
  for (var i = 0 ; i < this.openingHours.length ; i++) {
    if (this.openingHours[i] < hour && hour < this.openingHours[i + 1]) {
      this.isOpen = true;
      break;
    }
    this.isOpen = false;
    i++;
  }
  if (this.availableRecipes.length === 0) {
    this.isOpen = false;
  }
};


Restaurant.prototype.prepareMeal = function(recipe) {
  for (var i = 0 ; i <= recipe.ingredients.length - 1 ; i++) {
    for (var j = 0 ; j <= this.ingredients.length - 1 ; j++) {
      if (recipe.ingredients[i] == this.ingredients[j]) {
        this.stocks[j] = this.stocks[j] - 1;
        break;
      }
    }
  }
  this.updateAvailableRecipes();
};


Restaurant.prototype.updateAvailableRecipes = function() {
  var notAvailableIngredients = [];
  for (var i = 0 ; i <= this.stocks.length - 1 ; i++) {
    if (this.stocks[i] === 0) {
      notAvailableIngredients.push(this.ingredients[i]);
    }
  }
  for (var l = 0 ; l <= this.recipes.length - 1 ; l++) {
    var recipe = this.recipes[l];
    var availableRecipe = true;
    for (var j = 0 ; j <= recipe.ingredients.length - 1 ;j++) {
      for (var k = 0 ; k <= notAvailableIngredients.length - 1 ; k++) {
        if (recipe.ingredients[j] == notAvailableIngredients[k]) {
          availableRecipe = false;
          break;
        }
      }
      if (availableRecipe === false) {
        break;
      }
    }
    if (availableRecipe === true) {
      this.availableRecipes.push(recipe);
    }
  }
};


Restaurant.prototype.calculateScoreFactor = function() {
  var openTime = 0;
  for (var i = 0 ; i < this.openingHours.length; i++) {
    openTime = openTime + this.openingHours[i + 1] - this.openingHours[i];
    i++;
  }
  this.scoreFactor = (util.day - openTime) / util.hour;
};


function Stock(ingredient, quantity) {
  this.ingredient = ingredient;
  this.quantity = quantity;
}

module.exports = Restaurant;

