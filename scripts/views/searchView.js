'use strict';
(function(module){

  var searchView = {};


  searchView.populateFilters = function(){
    var template = Handlebars.compile($('#option-template').text());
    //The if statements here don't appear to be doing anything. Since
    //you put your append logic inside the conditional it's going to
    //evaluate it either way. Which means that it's running the query
    //and appending the results. No matter what the results thereof
    //are.
    Installation.allMediums(function(rows) {
      if ($('#medium-filter').append(rows.map(function(row){
        return template({val: row.medium});
      }))//append rows
    );//if
    }); //installation.allMediums

    Installation.allArtists(function(rows) {
      if ($('#artist-filter').append(rows.map(function(row){
        return template({val: row.artist});
      }))//append rowss
      );//if
    }); //installation.allArtists

    Installation.allTitles(function(rows) {
      if ($('#title-filter').append(rows.map(function(row){
        return template({val: row.title});
      }))//append rows
      );//if
    }); //installation.allTitles
    Installation.allDateRanges(function(rows) {
      if ($('#dateRange-filter').append(rows.map(function(row){
        return template({val: row.dateRange});
      }))//append rows
      );//if
    }); //installation.allTitles
  };//populateFilters

  searchView.handleFilters = function () {
    $('#filters').on('change', 'select', function() {
      // this is a neat way to solve the problem of getting Which
      // filter was interacted with from the element itself. It might
      // be a bit more idiomatic and stable to store the needed
      // information as a data attribute instead of on the id.
      var f = this.id.replace('-filter', '');
      var v = $(this).val();
      Installation.findWhere(f, v, function (filteredArray) {
        console.log('array',filteredArray);
        var pinCoords = findMap.setPinCoords(filteredArray);
        console.log('pinCoords:', pinCoords);
        console.log(installationMap);
        findMap.place_all_Pins(pinCoords, installationMap);
      });
      $('.dropdown').each(function () {
        $('.dropdown').prop('selectedIndex',0);
      }
      );
    });
  };

  //inside callback function - clear the map and redraw it, that function will be passed data
  //two things:
  //when the filters changed, we need to get info about how they changed

  searchView.populateFilters();
  searchView.handleFilters();
  module.searchView = searchView;
})(window);
