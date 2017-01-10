'use strict';
(function(module) {

  var installationView = {};

  var render = function(installation) {
    var template = Handlebars.compile($('#installation-template').text());
    return template(installation);
  };

  installationView.initNewInstallationPage = function() {

  };


  installationView.create = function() {
    $('#new-installation').on('click', 'button', function(e){
      var formInstallation;
      e.preventDefault();
      formInstallation = new Installation({
        location: $('#installation-location').val(),
        medium: $('#installation-medium').val(),
        artist: $('#installation-artist').val() || 'UNKNOWN',
        title: $('#installation-title').val() || 'UNKNOWN',
        dateRange: $('#installation-date-range').val() || 'UNKNOWN',
        // sanctioned: $('#installation-sanctioned')
        // description: $('#installation-description')
        // imageUrl: $('#installation-image-url')
      });
      //formInstallation.insertRecord();
      e.delegateTarget.reset();
      //redirect here --TEMP SOLUTION
      loveController.reveal();
      $('#display-installation').empty();
      $('#display-installation').append(render(formInstallation));
    });
  };

  module.installationView = installationView;
})(window);

installationView.create();
