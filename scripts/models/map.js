'use strict';
function initMap() { //creates map
  var lat = 45.5315;
  var lng = -122.6668;
  var mapOptions = {
    center: new google.maps.LatLng(lat,lng),
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // create the map and reference the div#map-canvas container
  var map = new google.maps.Map($('#findMap'), mapOptions);
};
initMap();
