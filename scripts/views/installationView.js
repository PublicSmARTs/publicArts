'use strict';
(function(module) {

  var installationView = {};

  var render = function(installation) {
    var template = Handlebars.compile($('#installation-template').text());
    
  }

  installationView.initNewInstallationPage = function() {

  };


  installationView.create = function() {
    var formInstallation;
    $('#display-installation').empty();
    console.log($('#new-installation'));
    $('#new-installation').on('click', 'button', function(e){
      e.preventDefault();
      console.log('anything');
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
      Installation.insertRecord(formInstallation);
      e.delegateTarget.reset();
      //redirect here
      //loveController.reveal();
      $('#display-installation').append(render(formArticle));

    });

  };

  module.installationView = installationView;
})(window);

installationView.create();
