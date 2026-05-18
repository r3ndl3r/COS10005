function loadJSON() {

    // create XMLHttpRequest object
    var xmlhttp = new XMLHttpRequest();


    // define what happens after the response is received
    xmlhttp.onreadystatechange = function() {

        // check if the request completed successfully
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            // convert JSON text into JavaScript data
            var data = JSON.parse(xmlhttp.responseText);

            // create table
            var output = "<table id='teamTable'>";

            output += "<tr>";
            output += "<th>Team Name</th>";
            output += "<th>Location</th>";
            output += "<th>Star Player</th>";
            output += "</tr>";

            for (var i = 0; i < data.length; i++) {
                output += "<tr>";
                output += "<td>" + data[i].teamName + "</td>";
                output += "<td>" + data[i].location + "</td>";
                output += "<td>" + data[i].starPlayer + "</td>";

                output += "</tr>";
            }

            output += "</table>";

            // display table on the webpage
            document.getElementById("result").innerHTML = output;

            // apply table styling
            $("#teamTable").css("border-collapse", "collapse");
            $("th").css("border", "1px solid black");
            $("td").css("border", "1px solid black");
            $("th").css("padding", "8px");
            $("td").css("padding", "8px");
        }
    };

    // prepare request to retrieve teams.json
    xmlhttp.open("GET", "teams.json", true);

    // send request
    xmlhttp.send();
}

function init() {

    // connect button click event to loadJSON function
    $("#btnLoad").click(loadJSON);
}

// run init function after page loads
window.onload = init;