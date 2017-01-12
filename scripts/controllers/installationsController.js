'use strict';
(function(module) {

  Installation.createTable();
  var installationsController = {};

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
  module.installationsController = installationsController;

})(window);
