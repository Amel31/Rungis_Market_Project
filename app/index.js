'use strict';

var Util = require('./Util.js');
var EventEmitter = require('events').EventEmitter;
var Market = require('./MarketPlace.js');
var Restaurant = require('./Restaurant.js');
var Client = require('./Client.js');
var Recipe = require('./Recipe.js');


var rungis = null;
var recipes = [];
var restaurants = [];
var clients = [];


function initRungis() {
  rungis = new Market('Rungis', Util.openMarket , Util.closeMarket);
}

function initRecipes() {
  var recipeAmount = Util.recipeNames.length;
  for (var i = 0; i < recipeAmount; i++) {
    var ingAmount = Util.randomInt(Util.minIngredient, Util.maxIngredient);
    var ingList = [];
    for (var j = 0; j < ingAmount; j++) {
      var ing = Util.ingredients[Util.randomInt(0,Util.ingredients.length - 1)];
      if (Util.isInArray(ing, ingList)) {
        j--;
      } else {
        ingList.push(ing);
      }
    }
    var recipe = new Recipe(Util.recipeNames[i], ingList);
    recipes.push(recipe);
  }
}

function initRestaurants() {
  var restaurantAmount = Util.restaurantNames.length;
  for (var i = 0; i < restaurantAmount; i++) {
    var recipeAmount = Util.randomInt(Util.minRecipes, Util.maxRecipes);
    var recipeList = [];
    for (var j = 0; j < recipeAmount; j++) {
      var recipe = recipes[Util.randomInt(0,recipes.length - 1)];
      if (Util.isInArray(recipe, recipeList)) {
        j--;
      } else {
        recipeList.push(recipe);
      }
    }
    var openingIntervals = Util.randomInt(Util.minIntervals, Util.maxIntervals);
    var openingHours = [];
    var lastHour = 0;
    for (var k = 0; k < openingIntervals; k++) {
      if (lastHour > Util.maxHour - Util.minOpenTime) {
        break;
      }
      var open = Util.randomInt(lastHour, Util.maxHour - Util.minOpenTime);
      var close = Util.randomInt(open + Util.minOpenTime, Util.maxHour);
      openingHours.push(open);
      openingHours.push(close);
      lastHour = close + Util.minCloseTime;
    }
    var restName = Util.restaurantNames[i];
    var restaurant = new Restaurant(restName, openingHours, recipeList, rungis);
    restaurants.push(restaurant);
  }
}

function initContext() {
  initRungis();
  initRecipes();
  initRestaurants();
}


function createClients(hour) {
  var nbClientsToCreate = Math.max(0,Util.randomInt(-10,5));
  for (var i = 0; i < nbClientsToCreate; i++) {
    var restIndex = Util.randomInt(0,restaurants.length - 1);
    var restaurant = restaurants[restIndex];
    var client = new Client(restaurant, hour);
    clients.push(client);
  }
}

function updateClients(hour) {
  for (var i = 0; i < clients.length; i++) {
    clients[i].updateClient(hour);
    if (clients[i].needNewRest) {
      var newRestIndex = Util.randomInt(0,restaurants.length - 1);
      clients[i].chooseRest(restaurants[newRestIndex],hour);
    }
  }
}

function updateRestaurants(hour) {
  for (var i = 0; i < restaurants.length; i++) {
    restaurants[i].update(hour);
  }
}

function showRestaurantScores(timeInDay, day) {
  if (timeInDay === 0) {
    for (var i = 0; i < restaurants.length; i++) {
      console.log('Score of: ', restaurants[i].name, ', day ', day,
        ', score factor :', restaurants[i].scoreFactor,
        ', score :', restaurants[i].score);
      //Sorry it's not really clean but it did not fit in the 80 characters
    }
  }
}

function updateContext(time) {
  var timeInDay = time % Util.day;
  var day = (time - timeInDay) / Util.day;
  createClients(timeInDay);
  updateClients(timeInDay);
  updateRestaurants(timeInDay);
  rungis.executeDeliveries(timeInDay);
  showRestaurantScores(timeInDay, day);
}


function runContext() {
  const ev = new EventEmitter();
  const intervMin = setInterval(() => ev.emit('minute', ++m % Util.minute), 1);
  let m = 0;
  ev.on('minute', () => updateContext(m));
  setTimeout(() => clearInterval(intervMin), 2 * Util.day);
}



initContext();
runContext();

