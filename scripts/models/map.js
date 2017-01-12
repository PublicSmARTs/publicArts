'use strict';
(function(module) {
var findMap ={};

var lat = 45.5315;
var lng = -122.6668;

findMap.getLocation = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log( "Geolocation is not supported by this browser.");
    }
}

findMap.showPosition = function (position) {
  var returning = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    console.log(returning);
}
 findMap.getCenter = function (postion){
  var cntrLat = position.coords.latitude;
  var cntrLng = position.coords.longitude;
  cntrCoordObj = {lat : cntrLat , lng : cntrLng};
  return cntrCoordObj;
}

findMap.setCenter =  function (){
navigator.geolocation.getCurrentPosition(showPosition);
}

findMap.initMap = function () { //creates map
  var mapOptions = {
    zoom: 10,
    center: {lat, lng},//new google.maps.LatLng(lat,lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  var map = new google.maps.Map(document.getElementById('findMap'), mapOptions);
};
findMap.initMap();

module.findMap = findMap;

})(window);
