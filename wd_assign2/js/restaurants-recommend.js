// /js/restaurants-recommend.js

/* 
* COS10005 Assignment 2 - Dynamic Restaurant Recommendation Page
* Author: Rob (103699388)
*/


// store the restaurant data after it is loaded so the filters can reuse it (persistent so only need to query data once)
var allRestaurants = [];


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

    // clear any existing content in the restaurant list container
    restaurantList.innerHTML = "";

    // show a simple message if no restaurants match the selected filters
    if (restaurants.length == 0) {
        restaurantList.textContent = "No restaurants match those filters.";
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


// function to apply the selected filters and update the displayed restaurant cards accordingly
function applyRecommendationFilters() {

    // get the selected values from the filter form
    var dietary = document.getElementById("dietary-filter").value;  // get the dietary requirements filter dropdown element value to filter restaurants based on the user's selected dietary requirement
    var budget  = document.getElementById("budget-filter").value;   // get the budget filter dropdown element value to filter restaurants based on the user's selected budget
    var purpose = document.getElementById("purpose-filter").value;  // get the dining purpose filter dropdown element value to filter restaurants based on the user's selected dining purpose
    var filteredRestaurants = [];

    // loop through all restaurants and check each filter rule
    for (var i = 0; i < allRestaurants.length; i++) {
        var restaurant = allRestaurants[i];

        // start by assuming the restaurant matches each filter
        var dietaryMatch = true;
        var budgetMatch  = true;
        var purposeMatch = true;

        // if the user selected a dietary option, check that the restaurant supports it
        if (dietary != "") {
            dietaryMatch = restaurant.dietary.includes(dietary);
        }

        // if the user selected a budget, check that the restaurant has that budget
        if (budget != "") {
            if (restaurant.budget == budget) {
                budgetMatch = true;
            } else {
                budgetMatch = false;
            }
        }

        // if the user selected a dining purpose, check that the restaurant suits that purpose
        if (purpose != "") {
            purposeMatch = restaurant.purposes.includes(purpose);
        }

        // only add the restaurant if it matches all selected filters
        if (dietaryMatch && budgetMatch && purposeMatch) {
            filteredRestaurants.push(restaurant);
        }
    }

    // display the filtered restaurant cards
    displayRestaurants(filteredRestaurants);
}


// function to set up event listeners for the filter form elements and apply filters when the user changes a filter option
function setupRecommendationFilters() {

    // get the filter form elements from recommend.html
    var dietaryFilter = document.getElementById("dietary-filter");    // get the dietary requirements filter dropdown element to listen for changes and apply filters when the user selects a dietary requirement
    var budgetFilter  = document.getElementById("budget-filter");     // get the budget filter dropdown element to listen for changes and apply filters when the user selects a budget
    var purposeFilter = document.getElementById("purpose-filter");    // get the dining purpose filter dropdown element to listen for changes and apply filters when the user selects a dining purpose
    var filterForm    = document.getElementById("recommend-filter");  // get the filter form element to listen for the reset event and show all restaurants again when the user clicks the reset button

    // run the filter function whenever the user changes a filter option
    dietaryFilter.addEventListener("change", applyRecommendationFilters);
    budgetFilter.addEventListener("change", applyRecommendationFilters);
    purposeFilter.addEventListener("change", applyRecommendationFilters);

    // when the reset button is clicked, wait for the form to clear then show all restaurants again
    filterForm.addEventListener("reset", function() {
        setTimeout(applyRecommendationFilters, 0);
    });
}


// function to load the restaurant data from the JSON file and initialize the recommendation page
function loadRestaurants() {

    // create an XMLHttpRequest object to retrieve the restaurant data from the JSON file
    var xmlhttp = new XMLHttpRequest();

    // define the function to be called when the ready state changes (i.e., when the response is received)
    xmlhttp.onreadystatechange = function() {

        // check if the request completed successfully and the response is ready
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            // parse the JSON response text into a JavaScript object
            var data = JSON.parse(xmlhttp.responseText);

            // store the restaurant data so the filter function can use it
            allRestaurants = data.restaurants;

            // set up the filter dropdowns after the restaurant data has loaded
            setupRecommendationFilters();

            // show all restaurants before the user selects any filters
            displayRestaurants(allRestaurants);
        }
    };

    // prepare the request to retrieve the restaurant data from the JSON file
    xmlhttp.open("GET", "assets/restaurants.json", true);

    // send the request to the server
    xmlhttp.send();
}


// run loadRestaurants function after content is loaded - inject restaurant cards
document.addEventListener("DOMContentLoaded", loadRestaurants);