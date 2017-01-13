'use strict';
(function(module){

  var searchView = {};


  searchView.populateFilters = function(){
    var template = Handlebars.compile($('#option-template').text());

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
    $('#filters').one('change', 'select', function() {
      var f = this.id.replace('-filter', '');
      var v = $(this).val();
      Installation.findWhere(f, v, findMap.setPinCoords);
    });
  };

  //inside callback function - clear the map and redraw it, that function will be passed data
  //two things:
  //when the filters changed, we need to get info about how they changed

  searchView.populateFilters();
  //searchView.handleFilters();
  module.searchView = searchView;
})(window);
