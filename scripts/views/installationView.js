'use strict';
(function(module) {

  var installationView = {};

  installationView.initNewInstallationPage = function() {

  };


  installationView.create = function() {
    var formInstallation;

    formInstallation = new Installation({
      location: $('#installation-location').val(),
      medium: $('#installation-medium').val(),
      artist: $('#installation-artist').val(),
      title: $('#installation-title').val(),
      dateRange: $('#installation-date-range').val(),
      // sanctioned: $('#installation-sanctioned')
      // description: $('#installation-description')
      // imageUrl: $('#installation-image-url')
    });

    console.log(formInstallation);
  };

  module.installationView = installationView;
})(window);

installationView.create();
