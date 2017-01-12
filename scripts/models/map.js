'use strict';

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log( "Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
  var returning = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    console.log(returning);
}

function initMap() { //creates map
  var lat = 45.5315;
  var lng = -122.6668;
  var mapOptions = {
    zoom: 10,
    center: {lat, lng},//new google.maps.LatLng(lat,lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  var map = new google.maps.Map(document.getElementById('findMap'), mapOptions);
};
initMap();
