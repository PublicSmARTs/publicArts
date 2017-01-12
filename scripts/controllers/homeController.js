'use strict';

//THIS IS JUST TEST CODE TO BE REPLACED LATER

var homeController = {};

homeController.reveal = function() {
  $('.tab-content').hide();
  $('#home').show();
};

var findController = {};

findController.reveal = function() {
  $('.tab-content').hide();
  $('#findart').show();
};

var shareController = {};

shareController.reveal = function() {
  $('.tab-content').hide();
  $('#shareart').show();
};

var loveController = {};

loveController.reveal = function() {
  $('.tab-content').hide();
  $('#loveart').show();
};

//END OF TEST ROUTES
