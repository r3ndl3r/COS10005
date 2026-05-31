// /js/content.js

/* 
* COS10005 Assignment 2 - Content Loader
* Author: Rob (103699388)
*/


// the header and footer HTML content for injection
var header = `<img src="images/logo.svg" alt="Rob's Table logo" height="50">
              <nav id="navbar"></nav>`;

var footer = `<p>&copy; 2026 Rob (103699388). Multi-page website created for COS10005 Assignment 2.</p>
              <a href="https://validator.w3.org/nu/?doc=${encodeURIComponent(window.location.href)}">
                <img class="validator-badge" src="images/html5-validator-badge-blue.png" alt="HTML5 validator badge">
              </a>`;


// function to load the header, footer, and navigation links from the JSON file
function loadContent() {
    // update the header and footer elements with their content
    document.getElementById("header-container").innerHTML = header;
    document.getElementById("footer-container").innerHTML = footer;
    
    // create XMLHttpRequest object
    var xmlhttp = new XMLHttpRequest();

    // define what happens after the response is received
    xmlhttp.onreadystatechange = function() {

        // check if the request completed successfully
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            // convert JSON text into JavaScript data
            var data = JSON.parse(xmlhttp.responseText);

            // create navigation list
            var output = "<ul>";
            var currentPage = window.location.pathname.split("/").pop(); // get the current page filename

            if (currentPage == "") {
                currentPage = "index.html"; // default to index.html if no specific page is in the URL
            }

            // loop through each key in the links object
            for (var key in data.links) { 
                if (data.links[key] == currentPage) {
                    // if the link matches the current page, add the "active" class to the link
                    output += '<li class="nav-item"><a class="nav-link active" href="' + data.links[key] + '">' + key + "</a></li>";
                } else {
                    // otherwise, add a normal link
                    output += '<li class="nav-item"><a class="nav-link" href="' + data.links[key] + '">' + key + "</a></li>";
                }
            }

            output += "</ul>";

            // insert the navigation list into the navbar element
            document.getElementById("navbar").innerHTML = output;
        }
    };

    // prepare request to retrieve teams.json
    xmlhttp.open("GET", "assets/links.json", true);

    // send request
    xmlhttp.send();
}

// run loadContent function after page loads - inject content
document.addEventListener("DOMContentLoaded", loadContent);