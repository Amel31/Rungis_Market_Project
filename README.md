# Rungis_Market_Project

Synopsis

This code simulates the functionning of restaurants (with random opening hours), its supply process and the process of serving its clients. The restaurant can supply itself during the opening hours of the Rungis Market. With the ingredients bought at the market the restaurant is able to make recipes. Each client, when he is hungry, can ask for any (random) recipe, if it is not available he can ask for another one. If there is no recipe available (i.e. no ingredients left), the client can go to another restaurant.

This repository contains the edition of the open-source Node.js program. Node.js is a server-side JavaScript environment that uses an asynchronous event-driven model. This allows Node.js to get excellent performance based on the architectures of many Internet applications.

The homepage of node.js is https://nodejs.org/en/download/.


Code Explanations

Our project contains six files, we are going to explain what we did in each file. 

In app/index.js :
We created functions that initiate and update the context for the market place, the recipes, the restaurants and the random number of clients. We also added a function that displays the scores of the restaurants and a timer.

In app/Client.js :
We provided functions to the clients such as looking for a restaurant, order a random meal in it if it is open or leave and search for another place after a certain delay (delayBeforeNewRest) if it is closed.

In app/MarketPlace.js :
This file contains the orders made by the restaurants to Rungis Market during its opening hours.

In app/Recipe.js :
The recipes file allows us to create recipes, based on their names and their ingredients.

In app/Restaurant.js :
The most consistent file of our project is the one that defines the restaurants, it contains a lot of functions such as initializing the stocks as empty and the supply process by ordering to the Rungis Market. Then, it updates the available recipes based on the new stock of the ingredients and prepare the meals ordered by clients.
There are also two other functions, one for updating the opening hours of the restaurants and the other is for computing the scores of the restaurants.

In app/Util.js :
The util file contains all our utility functions and their exports as well as the random function and the “isInArray” function that checks if a value is in the array.

