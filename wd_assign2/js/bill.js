// /js/bill.js

/* 
* COS10005 Assignment 2 - Estimated Bill Calculator
* Author: Rob (103699388)
*/


// store the restaurant data after it is loaded
var billRestaurants = [];

// helper function to get a restaurant object by its ID
function getRestaurantById(restaurantId) {
    // loop through the restaurant data and return the matching restaurant
    for (var i = 0; i < billRestaurants.length; i++) {
        if (billRestaurants[i].id == restaurantId) {
            return billRestaurants[i];
        }
    }

    return null;
}


// populate the restaurant dropdown menu with options from the JSON file
function populateRestaurantSelect() {
    var restaurantSelect = document.getElementById("restaurant-select");

    // add each restaurant from the JSON file to the dropdown menu
    for (var i = 0; i < billRestaurants.length; i++) {
        var option         = document.createElement("option");
        option.value       = billRestaurants[i].id;
        option.textContent = billRestaurants[i].name;
        restaurantSelect.appendChild(option);
    }
}


// calculate and update the bill estimate based on the selected restaurant and group size
function updateBillEstimate() {
    var restaurantSelect = document.getElementById("restaurant-select");
    var peopleInput      = document.getElementById("people");
    var restaurant       = getRestaurantById(restaurantSelect.value);
    var people           = peopleInput.value;

    // if the user has not selected a restaurant yet, show placeholder values
    if (!restaurant) {
        document.getElementById("price-range").textContent     = "-";
        document.getElementById("average-price").textContent   = "-";
        document.getElementById("food-total").textContent      = "-";
        document.getElementById("deposit").textContent         = "-";
        document.getElementById("estimated-total").textContent = "-";
        return;
    }

    // make less than 1 input impossible
    if (people < 1 || isNaN(people)) {
        people = 1;
        peopleInput.value = 1;
    }

    // calculate the estimate using average price per person plus reservation deposit
    var foodTotal = restaurant.averagePrice * people;
    var estimatedTotal = foodTotal + restaurant.deposit;

    document.getElementById("price-range").textContent     = restaurant.priceRange;
    document.getElementById("average-price").textContent   = "$" + restaurant.averagePrice;
    document.getElementById("food-total").textContent      = "$" + foodTotal;
    document.getElementById("deposit").textContent         = "$" + restaurant.deposit;
    document.getElementById("estimated-total").textContent = "$" + estimatedTotal;
}


// set up event listeners for the restaurant dropdown and group size input
function setupBillEvents() {
    var restaurantSelect = document.getElementById("restaurant-select");
    var peopleInput      = document.getElementById("people");

    // update the estimate whenever the restaurant or group size changes
    restaurantSelect.addEventListener("change", updateBillEstimate);
    peopleInput.addEventListener("input", updateBillEstimate);
}


// load the restaurant data from the JSON file and initialize the bill calculator
function loadBillRestaurants() {
    // create an XMLHttpRequest object to retrieve the restaurant data from the JSON file
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        // check if the request completed successfully and the response is ready
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);

            // save the restaurant data for the calculator functions to use
            billRestaurants = data.restaurants;

            populateRestaurantSelect();
            setupBillEvents();
            updateBillEstimate();
        }
    };

    xmlhttp.open("GET", "assets/restaurants.json", true);
    xmlhttp.send();
}


// run bill calculator setup after the page content is loaded
document.addEventListener("DOMContentLoaded", loadBillRestaurants);