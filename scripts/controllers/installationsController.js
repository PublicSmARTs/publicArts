'use strict';
(function(module) {

  Installation.createTable();
  var installationsController = {};

  installationsController.index = function(ctx, next) {
    installationView.index(ctx.installation);
  };
  // this is a great use of middleware. Using it to compose async functionality is
  // one of the things it's best for.
  installationsController.loadByMedium = function(ctx, next) {
    var mediumData = function(installationsInMedium) {
      ctx.installation = installationsInMedium;
      next();
    };
    Installation.findWhere('medium', ctx.params.mediumName.replace('+', ' '), mediumData);
  };

  module.installationsController = installationsController;

})(window);
