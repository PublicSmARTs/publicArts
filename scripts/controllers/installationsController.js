'use strict';
(function(module) {

  var installationsController = {};

  //load by all filters
  installationsController.loadByMedium = function(ctx, next) {
    console.log('installationsController');
    var mediumData = function(installationsInMedium) {
      ctx.installation = installationsInMedium;
      next();
    };
    Installation.findWhere('medium', ctx.params.mediumName, mediumData);
  };




  module.installationsController = installationsController;
})(window);
