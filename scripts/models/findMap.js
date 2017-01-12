'use strict';
(function(module) {

;
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

findMap.initMap = function () { //creates map
  var lat = 45.5315;
  var lng = -122.6668
  var mapOptions = {
    zoom: 10,
    center: {lat , lng},//new google.maps.LatLng(lat,lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  var map = new google.maps.Map(document.getElementById('findMap'), mapOptions);
  add_autoComplete(map);
};
findMap.initMap();


/* SOURCED from google tutorial@: http://gmap-tutorial-101.appspot.com/mapsapi101/toc*/
function add_autoComplete(map){
  var acOptions = {
    types: ['address']
  };
  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('ac'),acOptions);
  autocomplete.bindTo('bounds',map);
  var infoWindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map
  });
  console.log('yo');
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infoWindow.close();
    var place = autocomplete.getPlace();
    console.log(place.geometry.location);
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setPosition(place.geometry.location);

    infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
    infoWindow.open(map, marker);


    google.maps.event.addListener(marker,'click',function(e){

      infoWindow.open(map, marker);

    });
  });

}

module.findMap = findMap;

})(window);
