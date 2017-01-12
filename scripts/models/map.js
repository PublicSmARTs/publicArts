'use strict';

// function initMap() { //creates map
//   //var lat = 45.5315;
//   //var lng = -122.6668;
//   var mapOptions = {
//     zoom: 7,
//     center: {lat: 45.5231, lng: -122.6765},//new google.maps.LatLng(lat,lng),
//     mapTypeId: google.maps.MapTypeId.ROADMAP,
//     fullscreenControl: true
//   };
//
//   // create the map and reference the div#map-canvas container
//   var map = new google.maps.Map(document.getElementById('findMap'), mapOptions);
// };
initMap();
function initMap () {
  var findMap = new google.maps.Map(document.getElementById('findMap'), {
    zoom: 10,
    center: {lat: 45.5231, lng: -122.6765},
    mapTypeId: 'roadmap',
    fullscreenControl: true
  });
};
