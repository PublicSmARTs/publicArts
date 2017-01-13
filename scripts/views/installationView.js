'use strict';
(function(module) {

  var installationView = {};

  var render = function(installation) {
    var template = Handlebars.compile($('#installation-template').text());
    return template(installation);
  };


  $('#home-buttons').on('click', 'button', function(e) {
    e.preventDefault();

    var page = $(this).val();
    if (page === 'shareart') {
      shareController.reveal();
    } else if (page === 'findart') {
      findController.reveal();
    };
  });

  installationView.create = function() {
    console.log($('#new-installation'));

    $('#new-installation').on('click', 'button', function(e){
      var formInstallation;
      //e.preventDefault();
      //e.delegateTarget.checkValidity();
      console.dir(e);

      var resultLocation = e.delegateTarget['art-location'].checkValidity();
      var resultMedium = e.delegateTarget['art-medium'].checkValidity();

      if(resultLocation === true && resultMedium === true) {
        formInstallation = new Installation({
          location: $('#hidden-location').val(),
          lat: $('#hidden-lat').val(),
          lng: $('#hidden-lng').val(),
          medium: $('#installation-medium').val(),
          artist: $('#installation-artist').val().toUpperCase() || 'UNKNOWN',
          title: $('#installation-title').val().toUpperCase() || 'UNKNOWN',
          dateRange: $('#installation-date-range').val() || 'UNKNOWN',
          sanctioned: $('#installation-sanctioned').val() || 'UNKNOWN',
          description: $('#installation-description').val() || 'UNKNOWN',
          imageUrl: $('#installation-image-url').val()
        });
        formInstallation.insertRecord();
        console.log(formInstallation);
        e.delegateTarget.reset();
        //redirect here --TEMP SOLUTION
        loveController.reveal();
        $('#display-installation').empty();
        $('#display-installation').append(render(formInstallation));
      };
    });
  };

  installationView.findObject = function(ctx, next) {
    var installationData = function (installation) {
      ctx.installation = installation[0];
      next();
    };
    Installation.findWhere('id', ctx.params.id, installationData);
  };

  installationView.index = function(ctx) {
    $('.tab-content').hide();
    $('#loveart').show();

    function render(ctx) {
      var template = Handlebars.compile($('#installation-template').text());
      return template(ctx);
    }
    $('#display-installation').empty();
    $('#display-installation').append(render(ctx));
  };

  module.installationView = installationView;
})(window);

installationView.create();
