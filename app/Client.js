/**
 * Created by Kim on 21/03/2016.
 */
'use strict';

var util = require ('./Util.js');

function Client(rest, hour) {
  this.delayBeforeNewRest = 10 * util.minute;
  this.waitResistance = util.randomInt(10 * util.minute,40 * util.minute);
  this.rest = null;
  this.waitOpen = null;
  this.meal = null;
  this.needNewRest = null;
  this.leavingHour = null;
  this.chooseRest(rest,hour);
}

Client.prototype.updateClient = function(hour) {
  if (this.waitOpen) {
    if (this.rest.isOpen) {
      this.waitOpen = false;
      this.orderMeal(this.rest, hour);
    }
  }
  if (this.waitOpen && this.leavingHour < hour) {
    this.needNewRest = true;
    this.waitOpen = false;
    console.log('A client is looking for a new restaurant.');
  }
};

Client.prototype.chooseRest = function(rest, currentHour) {
  this.rest = rest;
  if (rest.isOpen) {
    this.waitOpen = false;
    this.orderMeal(this.rest, currentHour);
  } else {
    this.waitOpen = true;
    this.leavingHour = currentHour + this.delayBeforeNewRest;
    console.log('A client is waiting for :', rest.name, 'to open.');
  }
  this.needNewRest = false;
};

Client.prototype.orderMeal = function(rest, hour) {
  var recipeIndex = util.randomInt(0, rest.availableRecipes.length - 1);
  var recipe = rest.availableRecipes[recipeIndex];
  var deliveryHour = hour + util.randomInt(util.minPerpTime, util.maxPrepTime);
  this.rest.prepareMeal(recipe, deliveryHour);
  this.meal = new Meal(hour, deliveryHour, recipe);
  console.log('A client ordered : ', recipe, 'at :', hour, 'in :', rest.name);
  if (deliveryHour > hour + this.waitResistance + util.excessiveWait) {
    console.log('This meal took too long.', rest.name, 'gets no point.');
  } else if (deliveryHour < hour + this.waitResistance - util.topServiceTime) {
    rest.score = rest.score + 2 * rest.scoreFactor;
  } else {
    rest.score = rest.score + rest.scoreFactor;
  }
};

function Meal(orderHour, deliveryHour, recipe) {
  this.OrderHour = orderHour;
  this.deliveryHour = deliveryHour;
  this.recipe = recipe;
}

module.exports = Client;