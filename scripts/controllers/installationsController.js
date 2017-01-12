'use strict';
(function(module) {

  Installation.createTable();
  var installationsController = {};

  installationsController.index = function(ctx, next) {
    searchView.index(ctx.installation);
  };

  //load by all filters
  installationsController.loadByMedium = function(ctx, next) {
    console.log('installationsController');
    var mediumData = function(installationsInMedium) {
      ctx.installation = installationsInMedium;
      next();
    };
    Installation.findWhere('medium', ctx.params.mediumName.replace('+', ' '), mediumData);
      console.log('mediumData ', mediumData);
  };

  //MOCK MIDDLEWARE TO BE DELETED

  searchView.index = function(installations) {
    $('#findArt').show().siblings().hide();

    //$('').remove(); will need to clear out past map render when we know how

    // installations.forEach(function(art) {
    //   $('#findArt').append(render(art));
    // }); need function to add pin to map here

    searchView.populateFilters();
    //searchView.handleFilters();

  };

  module.installationsController = installationsController;

})(window);
