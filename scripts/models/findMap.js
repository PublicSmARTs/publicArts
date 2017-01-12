'use strict';
(function(module) {
  var findMap = {};


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
