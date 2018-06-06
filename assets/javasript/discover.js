let queryURL = `https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAnGdvp1OBEf930gje2BEQG98moiLlG37E
`;
let local = "";
let currentDate = new Date();
let formattedDate = currentDate.toISOString();
let dateSubString = formattedDate.substr(0, 19) + "Z";


// Event Listeners
// Place these at the very top
// All AJAX call functions grouped together after
// Helper functions after



$("button").on("click", function(e){
  console.log(e.target);
})

// let currentYear = currentDate.getFullYear();
// let getMonth = currentDate.getMonth() + 1;
// let getDay = currentDate.getDate();
// // let formattedDate = `${currentYear}-0${getMonth}-${getDay}`;
// let readableDate= currentDate.toDateString();
// console.log(readableDate);



// ajax request for users location 
function getLocation(callback) {
    $.ajax({
        url: queryURL,
        method: "POST",
        success: function (response) {
            let lattitude = response.location.lat;
            let longitude = response.location.lng;
            let latlon = (lattitude + "," + longitude);
            callback(latlon);

        },
        error: function (err) {
            console.log(err);
        }
    });
}

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        locationCoordinates.forEach(function(coordinate){
            console.log(coordinate.lat);
            
                var marker = new google.maps.Marker({
                    position: coordinate,
                    map: map,
                    title: eventName
                });
                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });
            
           
        });


    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.

    var markers = locationCoordinates.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });








