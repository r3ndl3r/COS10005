// /js/register.js

/* 
* COS10005 Assignment 2 - Registration Page
* Author: Rob (103699388)
*/


// display the validation errors in the form error box
function showErrors(errors) {
    var formErrors = document.getElementById("form-errors");

    // clear old error messages before showing new ones
    formErrors.innerHTML = "";

    // hide the error box if there are no errors (if user is re-submitting again)
    if (errors.length == 0) {
        formErrors.style.display = "none";
        return;
    }

    var output = "<ul>";

    // create a list item for each validation error
    for (var i = 0; i < errors.length; i++) {
        output += "<li>" + errors[i] + "</li>";
    }

    output += "</ul>";

    formErrors.innerHTML = output;
    formErrors.style.display = "block"; // show the error box
}


// validate the form fields when the user submits the form
function validateRegisterForm(event) {
    var errors = [];

    // get the form field values
    var username        = document.getElementById("username").value;
    var email           = document.getElementById("email").value;
    var phone           = document.getElementById("phone").value;
    var password        = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    var country         = document.getElementById("country").value;

    // username must be completed, long enough, and only use letters, numbers, and underscores
    if (username == "") {
        errors.push("Username is required.");
    } else if (username.length < 5) {
        errors.push("Username must be at least 5 characters long.");
    } else if (!username.match(/^[A-Za-z0-9_]+$/)) {
        errors.push("Username can only contain letters, numbers, and underscores.");
    }

    // email must be completed and in a valid format
    if (email == "" || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push("A valid email address is required.");
    }

    // phone number must be digits only and between 8 and 15 digits
    if (!phone.match(/^[0-9]{8,15}$/)) {
        errors.push("Phone number must contain digits only and be 8 to 15 digits long.");
    }

    // password must match the assignment password rules
    if (password.length < 10 || !password.match(/[A-Z]/) || !password.match(/[a-z]/) || !password.match(/[0-9]/) || !password.match(/[^A-Za-z0-9]/)) {
        errors.push("Password must be at least 10 characters and include uppercase, lowercase, number, and special character.");
    }

    // confirm password must match the password field
    if (confirmPassword == "" || confirmPassword != password) {
        errors.push("Confirm password must match the password.");
    }

    // gender must be selected
    if (!document.querySelector('input[name="gender"]:checked')) { // use pseudo-selector to check if any gender checkbox is checked
        errors.push("Please select a gender.");
    }

    // dietary preferences must be selected
    if (!document.querySelector('input[name="dietary"]:checked')) { // use pseudo-selector to check if any dietary checkbox is checked
        errors.push("Please select at least one dietary preference.");
    }

    // country/region must be selected
    if (country == "") {
        errors.push("Please select a country/region.");
    }

    showErrors(errors);

    // stop the form from submitting if there are validation errors
    if (errors.length > 0) {
        event.preventDefault(); // big STOP button
    }
}


// add event listeners to the form fields and submit button
function setupRegisterForm() {
    var registerForm = document.getElementById("register-form");

    // validate the form when the user submits it
    registerForm.addEventListener("submit", validateRegisterForm);
}


// run register setup after the page content is loaded
document.addEventListener("DOMContentLoaded", setupRegisterForm);