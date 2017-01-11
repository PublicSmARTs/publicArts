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

  //lmk - move to view?
  installationView.populateFilters = function(){
    console.log('populate filters');
    var template = Handlebars.compile($('#options-template').text());//
    installationView.allMediums(function(rows) {
      if ($('#medium-filter').append(rows.map(function(row){
        return template({val: row.medium});
      }))//append rows
    );//if
    }); //installation.allMediums
    return template(options);
  };//populateFilters

  console.log('go to bed');
  installationView.populateFilters();


  module.installationsController = installationsController;
})(window);
