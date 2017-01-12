'use strict';
(function(module) {
  var artMap = {}; //abject to attach methods
  
  var artMapOptions = { // object to contain rlevant map options data
    center : new google.maps.LatLng(cntLat,cntrLng),
    zoom : 8, // default zoom
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var lat;
  var lng;
  var coordPair = [lat, lng];
  var cntLat;
  var cntrLng;
  var clientCoord = ['lat', 'lng'];
  var coordObj = {};

  artMap.locateCLient = function (){
    function getLocation() {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        cntLat = position.coords.latitude;
        cntrLng = position.coords.longitude;
        clientCoord = [cntLat, cntrLng];
        return clientCoord;
      } else {
        alert( 'Geolocation is not supported by this browser.');
      }
    }

    function showPosition(position) {
      var clientPosition = 'Latitude: ' + position.coords.latitude +
        '<br>Longitude: ' + position.coords.longitude;
      console.log(clientPosition);
    }
  };
  artMap.render = function (){
    var clientCoords = artMap.locateCLient;
    artMapOptions.center = new google.maps.LatLng(clientCoords[0],clientCoords[1]);

    initMap(artMapOptions);
  };

  artMap.getLatLng = function(place){ //built to go through an array of objects each with a lat and lng property
    var coordinatArray = [place.lat, place.lng];
    return coordinatArray;
  };

  initMap = function(mapConfig){

    var clientCoords = artMap.locateCLient;
    map = new google.maps.Map($('.map-placeholder'),{  // maye add an ID and use $('#map') ??
      center: {clientCoords[0],clientCoords[1]}, // The linter is throwing an error on this line, when I changed "center:{lat = 45.5315, lng = -122.6668}" to refference vars instead, thusly : "center = {lat, lng}" I dont see the difference and the script still works the same.
      zoom: 8
    }));
  };

  module.artMap = artMap;
})(window);
