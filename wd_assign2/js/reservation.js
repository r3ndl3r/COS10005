// /js/reservation.js

/* 
* COS10005 Assignment 2 - Reservation Page
* Author: Rob (103699388)
*/


// store the restaurant data after it is loaded
var reservationRestaurants = [];

// helper function to get the selected payment method from the form
function getSelectedPaymentMethod() {
    var selected = document.querySelector('input[name="deposit_method"]:checked');  // get the selected payment method radio button to determine which payment method is selected

    return selected ? selected.value : "";                                          // return the value of the selected payment method or an empty string if no payment method is selected
}


// loop through the restaurant data and return the restaurant with the matching ID
function getRestaurantById(restaurantId) {
    for (var i = 0; i < reservationRestaurants.length; i++) {
        if (reservationRestaurants[i].id == restaurantId) {
            return reservationRestaurants[i];
        }
    }

    return null;
}


// add the restaurant options to the dropdown menu based on the loaded restaurant data
function populateRestaurantSelect() {
    var restaurantSelect = document.getElementById("restaurant-select");

    // add each restaurant from the JSON file to the dropdown menu
    for (var i = 0; i < reservationRestaurants.length; i++) {
        var option         = document.createElement("option");
        option.value       = reservationRestaurants[i].id;    // set the option value to the restaurant ID so we can easily find the selected restaurant data later based on the selected option value
        option.textContent = reservationRestaurants[i].name;  // set the option text to the restaurant name to show the restaurant name in the dropdown menu
        restaurantSelect.appendChild(option);
    }
}


// if the page URL contains a restaurant ID, select that restaurant in the dropdown
function prefillRestaurantFromUrl() {
    var restaurantSelect = document.getElementById("restaurant-select");   // get the restaurant select element to update its value
    var params           = new URLSearchParams(window.location.search);    // get the query parameters from the page URL
    var restaurantId     = params.get("restaurant");                       // get the value of the "restaurant" parameter from the URL

    // if the page URL contains a restaurant ID, select that restaurant in the dropdown
    if (restaurantId && getRestaurantById(restaurantId)) {
        restaurantSelect.value = restaurantId;                             // set the dropdown value to the restaurant ID from the URL
    }
}


function updateDepositAmount() {
    var restaurantSelect = document.getElementById("restaurant-select");   // get the restaurant select element to find out which restaurant is selected
    var depositAmount    = document.getElementById("deposit-amount");      // get the deposit amount input element to update its value based on the selected restaurant
    var restaurant       = getRestaurantById(restaurantSelect.value);      // get the restaurant data for the currently selected restaurant

    // show the restaurant deposit amount when a restaurant is selected
    if (restaurant) {
        depositAmount.value = "$" + restaurant.deposit;                    // set the deposit amount input value to the deposit amount for the selected restaurant
    } else {
        depositAmount.value = "";                                          // clear the deposit amount if no restaurant is selected
    }
}


// show the appropriate payment fields based on the selected payment method
function updatePaymentFields() {
    var voucherFields = document.getElementById("voucher-fields");        // get the voucher payment fields container to show or hide it based on the selected payment method
    var cardFields    = document.getElementById("card-fields");           // get the card payment fields container to show or hide it based on the selected payment method
    var paymentMethod = getSelectedPaymentMethod();                       // get the currently selected payment method to determine which payment fields to show

    // show voucher fields for voucher payments, otherwise show card fields
    if (paymentMethod == "Voucher") {
        voucherFields.className = "";                                     // show the voucher payment fields if "Voucher" is selected
        cardFields.className = "hidden";                                  // hide the card payment fields if "Voucher" is selected
    } else {
        voucherFields.className = "hidden";                               // hide the voucher payment fields if "Online payment" is selected
        cardFields.className = "";                                        // show the card payment fields if "Online payment" is selected
    }
}


// copy the main email address into the billing email field if the checkbox is selected
function copyBillingEmail() {
    var sameAsEmail  = document.getElementById("same-as-email");         // get the "same as email" checkbox to check if it is selected
    var email        = document.getElementById("email");                 // get the main email input element to copy its value into the billing email field if the checkbox is selected
    var billingEmail = document.getElementById("billing-email");         // get the billing email input element to update its value based on the main email field if the checkbox is selected

    // copy the main email address into the billing email field if the checkbox is selected
    if (sameAsEmail.checked) {
        billingEmail.value = email.value; // set the billing email field value to the main email field value if the checkbox is checked
    }
}

// display the validation errors in the form error box
function showErrors(errors) {
    var formErrors = document.getElementById("form-errors");
    var output = "<ul>";

    // clear old error messages before showing new ones
    formErrors.innerHTML = "";

    // hide the error box if there are no errors (if user is re-submitting again)
    if (errors.length == 0) {
        formErrors.style.display = "none";
        return;
    }

    // create a list item for each validation error
    for (var i = 0; i < errors.length; i++) {
        output += "<li>" + errors[i] + "</li>";
    }

    output += "</ul>";

    formErrors.innerHTML = output;
    formErrors.style.display = "block";
}


// validate the reservation form before it submits and show any validation errors
function validateReservationForm(event) {
    var errors          = [];
    var fullName        = document.getElementById("full-name").value;         // get the full name input value to check if it is not empty as part of the required field validation
    var email           = document.getElementById("email").value;             // get the email input value to check if it is a valid email address as part of the required field validation
    var phone           = document.getElementById("phone").value;             // get the phone number input value to check if it contains digits only and is at least 10 digits long as part of the required field validation
    var restaurant      = document.getElementById("restaurant-select").value; // get the selected restaurant value to check if a restaurant is selected as part of the required field validation
    var reservationDate = document.getElementById("reservation-date").value;  // get the reservation date input value to check if it is not empty and not in the past as part of the required field validation
    var people          = document.getElementById("people").value;            // get the number of people input value to check if it is greater than 0 as part of the required field validation
    var billingEmail    = document.getElementById("billing-email").value;     // get the billing email input value to check if it is a valid email address as part of the required field validation
    var paymentMethod   = getSelectedPaymentMethod();                         // get the selected payment method to determine which additional fields to validate based on the payment method
    var cardType        = document.getElementById("card-type").value;         // get the selected card type value to check if a card type is selected when online payment is selected as part of the required field validation for online payments
    var cardNumber      = document.getElementById("card-number").value;       // get the card number input value to check if it contains digits only and has the correct length based on the selected card type when online payment is selected as part of the required field validation for online payments

    // required field checks
    if (fullName == "") {
        errors.push("Full name is required.");
    }

    if (email == "" || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push("A valid email address is required.");
    }

    if (phone == "" || !phone.match(/^[0-9]+$/) || phone.length < 10) {
        errors.push("Phone number must contain digits only and be at least 10 digits long.");
    }

    if (restaurant == "") {
        errors.push("Please select a restaurant.");
    }

    if (reservationDate == "") {
        errors.push("Reservation date and time is required.");
    } else if (new Date(reservationDate) < new Date()) {
        errors.push("Reservation date and time must not be in the past.");
    }

    if (people == "" || Number(people) <= 0) {
        errors.push("Number of people must be greater than 0.");
    }

    if (billingEmail == "" || !billingEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push("A valid billing email address is required.");
    }

    // card validation only applies when online payment is selected
    if (paymentMethod == "Online payment") {
        if (cardType == "") {
            errors.push("Please select a card type.");
        }

        if (cardNumber == "" || !cardNumber.match(/^[0-9]+$/)) {
            errors.push("Card number must contain digits only.");
        } else if ((cardType == "Visa" || cardType == "Mastercard") && cardNumber.length != 16) {
            errors.push("Visa and Mastercard numbers must be 16 digits.");
        } else if (cardType == "Amex" && cardNumber.length != 15) {
            errors.push("Amex numbers must be 15 digits.");
        }
    }

    if (paymentMethod == "Voucher") {
        var voucherCode = document.getElementById("voucher-code").value;
        if (voucherCode == "" || !voucherCode.match(/^[0-9]{12}$/)) {
            errors.push("Voucher code must be exactly 12 digits.");
        }
    }

    showErrors(errors);

    // stop the form from submitting if there are validation errors
    if (errors.length > 0) {
        event.preventDefault(); // big STOP button
    }
}


// set up event listeners for the reservation form fields to update the page dynamically based on user input
function setupReservationEvents() {
    var restaurantSelect = document.getElementById("restaurant-select");
    var sameAsEmail      = document.getElementById("same-as-email");
    var email            = document.getElementById("email");
    var reservationForm  = document.getElementById("reservation-form");
    var paymentMethods   = document.getElementsByName("deposit_method");
    
    // update payment fields when the user changes payment method
    for (var i = 0; i < paymentMethods.length; i++) {
        paymentMethods[i].addEventListener("change", updatePaymentFields);
    }

    // copy the email into the billing email field when requested
    if (sameAsEmail && email) {
        sameAsEmail.addEventListener("change", copyBillingEmail);
        email.addEventListener("input", copyBillingEmail);
    }

    restaurantSelect.addEventListener("change", updateDepositAmount);     // update the deposit amount when the selected restaurant changes
    reservationForm.addEventListener("submit", validateReservationForm);  // validate the form before it submits
}


// load the restaurant data from the JSON file and set up the reservation page
function loadReservationRestaurants() {
    
    // create an XMLHttpRequest object to retrieve the restaurant data from the JSON file
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        // check if the request completed successfully and the response is ready
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);

            // save the restaurant data for the other functions to use
            reservationRestaurants = data.restaurants;

            populateRestaurantSelect();
            prefillRestaurantFromUrl();
            updateDepositAmount();
            updatePaymentFields();
            setupReservationEvents();
        }
    };

    xmlhttp.open("GET", "assets/restaurants.json", true);
    xmlhttp.send();
}


// run reservation setup after the page content is loaded
document.addEventListener("DOMContentLoaded", loadReservationRestaurants);