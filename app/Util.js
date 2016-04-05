/**
 * Created by Kim on 21/03/2016.
 */
'use strict';

function randomInt(low, high) {
  return Math.round(Math.random() * (high - low) + low);
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

var minute = 1;
var hour = 100 * minute;
var day = 24 * hour;

var maxStock = 10;

var openMarket = 5 * hour;

var closeMarket = 14 * hour;

const minDelHr = 1500;

const maxDelHr = 11500;

const minIngredient = 2;

const maxIngredient = 5;

const minRecipes = 10;

const maxRecipes = 25;

const minIntervals = 1;

const maxIntervals = 3;

const minOpenTime = 2 * hour;

const maxHour = day;

const minCloseTime = 2 * hour;

const minPerpTime = 5 * minute;

const maxPrepTime = 50 * minute;

const topServiceTime = 10 * minute;

const excessiveWait = 5 * minute;

const recipeNames = ['Beignets aux épinards', 'Brownie', 'Ceviche Mexicain',
  'Chorba', 'Coleslaw', 'Cranachan', 'Crevettes vietnamiennes', 'Doughnuts',
  'Hash-brown casserole', 'Kebab maison', 'Key lime pie pour Jérémy',
  'Lasagnes Bolognaises', 'Minestrone', 'Naans', 'Nems au poulet', 'Paella',
  'Pavlova', 'Petits biscuits au citron', 'Tortilla de pommes de terre',
  'Pommes de terre aux crevettes', 'Risotto aux petit-pois',
  'Salade Caesar', 'Sauce à la tomate pimentée', 'Tzatziki',
  'Scones de Dublin aux raisins secs', 'Sushis'];

const ingredients = ['tomate', 'oignon','courgette', 'farine', 'riz', 'poulet',
  'fromage', 'pomme de terre', 'carotte', 'choux', 'viande hachée', 'salade',
  'huile', 'raisin sec', 'épice', 'crevette', 'citron', 'pois chiche',
  'petit-pois', 'lait', 'oeuf', 'avocat', 'sel', 'poivre', 'sucre', 'pâte',
  'beurre', 'vinaigre', 'jambon', 'ail', 'sauce tomate', 'ail'];

const restaurantNames = ['A Brisket a Tasket', 'A Day Latte', 'Above Bored',
  'Absalom', 'Acacia Saint', 'Acapulco Gold', 'Achilles', 'Acorn Palace',
  'Aesthetic Bug', 'Affecté', 'Affluential', 'After Giggle', 'Aftertizer',
  'Aglaya', 'Ahui', 'Al Fresco', 'Alcohol & Archery', 'Alephant', 'Alluvia',
  'American Whey', 'Amygdala Lounge', 'Anacho', 'Anavenetro', 'Angel Walk',
  'Anivet', 'Anixang', 'Anocha', 'Antimatter', 'Aquacine', 'Aquafire',
  'Aquasseur', 'Aquazure', 'Aquoavo', 'Arctica', 'Armadillo Debutante',
  'Armadillo Plates', 'Aroma Borealis', 'Aromastotle', 'Arotiaka', 'Artvark',
  'AstroCoffee'];

module.exports = {
  openMarket: openMarket,
  closeMarket: closeMarket,
  minDelHr: minDelHr,
  maxDelHr: maxDelHr,
  recipeNames: recipeNames,
  ingredients: ingredients,
  restaurantNames: restaurantNames,
  minIngredient: minIngredient,
  maxIngredient: maxIngredient,
  maxStock: maxStock,
  randomInt: randomInt,
  isInArray: isInArray,
  minRecipes: minRecipes,
  maxRecipes: maxRecipes,
  minIntervals: minIntervals,
  maxIntervals: maxIntervals,
  minOpenTime: minOpenTime,
  maxHour: maxHour,
  minCloseTime: minCloseTime,
  //second: second,
  minute: minute,
  hour: hour,
  day: day,
  minPerpTime: minPerpTime,
  maxPrepTime: maxPrepTime,
  topServiceTime: topServiceTime,
  excessiveWait: excessiveWait
};