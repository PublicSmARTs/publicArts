'use strict';
(function(module) {
  var findMap = {};

  findMap.placeOne = {
    name : 'Portland',
    lat: 45.5231,
    lng : -122.6765,
    associated : 'Portland data'

  };
  findMap.placeTwo = {
    name : 'Beaverton',
    lat: 45.4871,
    lng : -122.8037,
    associated : 'Beaverton data'

  };
  findMap.placeThree = {
    name : 'Tiagard',
    lat: 45.4312,
    lng : -122.7715,
    associated : 'Tiagrad data'

  };
  findMap.dummyData = [ findMap.placeOne , findMap.placeTwo, findMap.placeThree];

findMap.getLocation = function() {
  var here;
    if (navigator.geolocation) {
      here = navigator.geolocation.getCurrentPosition(findMap.initMap);
    } else {
      console.log( "Geolocation is not supported by this browser.");
      here = 'error';
    }
    return here;
}

findMap.installationsToCoords = function(arrayOFPLaces){
var coordsArray = arrayOFPLaces.map(findMap.getLatLng);
  return coordsArray;
}

findMap.getLatLng = function(place){
  var coordinatPair= [place.lat, place.lng];
  return coordinatPair;
}


findMap.initMap = function(position) { //creates map
  var lat = 1;
  var lng = 1;
  console.log(position);
  lat = position.coords.latitude;
  lng = position.coords.longitude;
  var mapOptions = {
    zoom: 10,
    center: {lat , lng},//new google.maps.LatLng(lat,lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  var map = new google.maps.Map(document.getElementById('findMap'), mapOptions);
  findMap.add_autoComplete(map);
};



/* SOURCED from google tutorial@: http://gmap-tutorial-101.appspot.com/mapsapi101/toc*/
findMap.add_autoComplete = function (map){
  var map= map;
  var acOptions = {
    types: ['address']
  };
  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('ac'),acOptions);

  google.maps.event.addListener(autocomplete, 'place_changed', function() {

    var place = autocomplete.getPlace();
    //console.log(place.geometry.location);
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(10);
    }

    });
  };



module.findMap = findMap;
findMap.getLocation(); // gets location and renders map centered on that point

})(window);
