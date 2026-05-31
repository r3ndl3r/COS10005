// /js/restaurants-list.js

/* 
* COS10005 Assignment 2 - Dynamic Restaurant List Page
* Author: Rob (103699388)
*/


// function to create the HTML for a restaurant card based on the restaurant data
function createRestaurantCard(restaurant) {

    // loop through the signature dishes and create a list item for each dish
    var dishesHTML = "";
    for (var i = 0; i < restaurant.signatureDishes.length; i++) {
        dishesHTML += "<li>" + restaurant.signatureDishes[i].name + " - $" + restaurant.signatureDishes[i].price + "</li>";
    }

    // set class names and content for the elements (styled via /css/restaurants-list.css)
    return '<div class="restaurant-card">' +
                '<img src="' + restaurant.image + '" alt="' + restaurant.alt + '">' +
                '<h3>' + restaurant.name + '</h3>' +
                '<p><span class="card-label">Cuisine: </span>' + restaurant.cuisine + '</p>' +
                '<p>' + restaurant.description + '</p>' +
                '<h4>Signature Dishes</h4>' +
                '<ul>' + dishesHTML + '</ul>' +
                '<p><span class="card-label">Price Range: </span>' + restaurant.priceRange + '</p>' +
                '<p><span class="card-label">Deposit: </span>$' + restaurant.deposit + '</p>' +
                '<a href="reservation.html?restaurant=' + restaurant.id + '" class="button-link">Reserve a Table</a>' +
           '</div>';
}


// function to display the restaurant cards on the page
function displayRestaurants(restaurants) {

    // get the restaurant list container element from the DOM
    var restaurantList = document.getElementById("restaurant-list");

    // check if the restaurant list container exists before trying to populate it with restaurant cards
    if (!restaurantList) {
        console.error("Restaurant list container not found");
        return;
    }

    // loop through the restaurant data and create a restaurant card for each restaurant
    var fullHTML = "";
    for (var i = 0; i < restaurants.length; i++) {
        fullHTML += createRestaurantCard(restaurants[i]);
    }

    // clear any existing content in the restaurant list container
    restaurantList.innerHTML = fullHTML;
}


// function to load the restaurant data from the JSON file and display the restaurant cards on the page
function loadRestaurants() {
    
    // create an XMLHttpRequest object to retrieve the restaurant data from the JSON file
    var xmlhttp = new XMLHttpRequest();

    // define the function to be called when the ready state changes (i.e., when the response is received)
    xmlhttp.onreadystatechange = function() {

        // check if the request completed successfully and the response is ready
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            // parse the JSON response text into a JavaScript object
            var data = JSON.parse(xmlhttp.responseText);

            // call the displayRestaurants function to create and display restaurant cards
            displayRestaurants(data.restaurants);
        }
    };

    // prepare the request to retrieve the restaurant data from the JSON file
    xmlhttp.open("GET", "assets/restaurants.json", true);

    // send the request to the server
    xmlhttp.send();
}


// run loadRestaurants function after content is loaded - inject restaurant cards
document.addEventListener("DOMContentLoaded", loadRestaurants);