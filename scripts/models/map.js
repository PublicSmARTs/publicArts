'use strict';

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
