'use strict';

//add data
  // function location (opts) {
  //   Object.keys(opts).forEach(function(e, index, keys) {
  //     this[e] = opts[e];
  //   }, this);

var placeOne = {
  name : 'Portland',
  lat: 45.5231,
  lng : -122.6765,
  associated : 'Portland data'

};
var placeTwo = {
  name : 'Beaverton',
  lat: 45.4871,
  lng : -122.8037,
  associated : 'Beaverton data'

};
var placeThree = {
  name : 'Tiagard',
  lat: 45.4312,
  lng : -122.7715,
  associated : 'Tiagrad data'

};
var dummyData = [ placeOne , placeTwo, placeThree];
var map;

function getLatLng (place){
  var coordinatArray = [place.lat, place.lng];
  return coordinatArray;
}

var locationsCoord = dummyData.map(getLatLng);



function initMap() { //creates map and populates with existing data ~~~asynchronous
var lat = 45.5315;
var lng= -122.6668;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat, lng}, // The linter is throwing an error on this line, when I changed "center:{lat = 45.5315, lng = -122.6668}" to refference vars instead, thusly : "center = {lat, lng}" I dont see the difference and the script still works the same.
    zoom: 8
  });

  add_autoComplete();// call here indside asynchronous so we have access to the google api stuff
  make_all_Pins(locationsCoord);
    // geocoder = new google.maps.Geocoder();
    // var testing = getCoordinates('4315 ne 75th ave portland')
    // return testing;
}

/* SOURCED from google tutorial@: http://gmap-tutorial-101.appspot.com/mapsapi101/toc*/
function add_autoComplete(){
  var acOptions = {
    types: ['address']
  };
  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('ac'),acOptions);
  autocomplete.bindTo('bounds',map);
  var infoWindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map
  });

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

function make_all_Pins (locationData){ //takes a 2d array of coords
  var opts = {};
  var allPins = [];
  locationData.forEach(function(coordPair){
    opts = {}; //clear out opts obj
    opts.position = new google.maps.LatLng(coordPair[0], coordPair[1]); //grabs coordinants from each object and sets the config for each pin

    var marker = new google.maps.Marker(opts); // creats a new pin at coord currently in opt.position
     // adds each marker obj to an array for access

    marker.setMap(map); // places new pin on map
    allPins.push(marker);
  });

  return allPins; // returns array of objs, each obj is a representation of a pin now on the map
}
//var address = { address : '4315 ne 75 ave portland Oregon' };//test addy
//
// geocoder = new google.maps.geocoder();
// function getCoordinates (address, callback){
//   var coordinants;
//
//   geocoder.geocode({address: address}, function (results, status){
//     coord_obj = results[0].geometry.location;
//     coordinants = [coord_obj.nb, coord_obj.ob];
//     callback(coordinants);
//   })
// }


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
