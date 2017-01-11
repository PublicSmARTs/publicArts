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
      }))//append rows
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

    Installation.allBySanction(function(rows) {
      if ($('#sanctioned-filter').append(rows.map(function(row){
        return template({val: row.sanctioned});
      }))
    );//if
    }); //installation.allBySanction

//////

  };//populateFilters

  searchView.populateFilters();
  module.searchView = searchView;
})(window);