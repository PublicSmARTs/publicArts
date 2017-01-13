'use strict';
(function(module) {

  Installation.createTable();
  var installationsController = {};

  installationsController.index = function(ctx, next) {
    installationView.index(ctx.installation);
  };

  installationsController.loadByMedium = function(ctx, next) {
    var mediumData = function(installationsInMedium) {
      ctx.installation = installationsInMedium;
      next();
    };
    Installation.findWhere('medium', ctx.params.mediumName.replace('+', ' '), mediumData);
  };

  module.installationsController = installationsController;

})(window);
