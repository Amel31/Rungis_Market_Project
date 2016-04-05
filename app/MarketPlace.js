/**
 * Created by Kim on 21/03/2016.
 */
'use strict';

var util = require ('./Util.js');

function Market(name, open, close) {
  this.name = name;
  this.open = open;
  this.close = close;
  this.pendingOrders = [];
}

Market.prototype.order = function(rest, orderHour, ingredients, quantities) {
  if (this.open <= orderHour && orderHour <= this.close) {
    var deliveryHour = util.randomInt(util.minDelHr, util.maxDelHr) + orderHour;
    //minDelHr = minimum delivery hour & maxDelHr = maximum delivery hour
    var order = new Order(rest, deliveryHour, ingredients, quantities);
    this.pendingOrders.push(order);
  } else {
    console.log('Order has been made outside of opening hours.');
  }
};

Market.prototype.executeDeliveries = function(currentHour) {
  for (var i = this.pendingOrders.length - 1; i >= 0 ; i--) {
    var order = this.pendingOrders[i];
    if (order.deliveryHour <= currentHour) {
      order.restaurant.reStock(order.ingredients, order.quantities);
      this.pendingOrders.splice(i,1);
    }
  }
};


function Order(restaurant, deliveryHour, ingredients, quantities) {
  this.restaurant = restaurant;
  this.deliveryHour = deliveryHour;
  this.ingredients = ingredients;
  this.quantities = quantities;
}

module.exports = Market;