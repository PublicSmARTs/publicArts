'use strict';
(function(module) {

  function Installation(opts){
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  function myTemp(){
  };

  Installation.all = [];

  Installation.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS Installations (' +
        'id INTEGER PRIMARY KEY, ' +
        'location VARCHAR(100), ' +
        'lat FLOAT(10,6), ' +
        'lng FLOAT(10,6), ' +
        'medium VARCHAR(20) NOT NULL, ' +
        'title VARCHAR(50) NOT NULL, ' +
        'artist VARCHAR(50) NOT NULL, ' +
        'artistUrl VARCHAR(255), ' +
        'imageUrl VARCHAR(255), ' +
        'dateRange VARCHAR(10), ' +
        'sanctioned BOOLEAN, ' +
        'description TEXT, ' +
        'comments VARCHAR(255) );',
      callback
    );
  };

  Installation.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO Installations (location, lat, lng, medium, title, artist, artistUrl, imageUrl, dateRange, sanctioned, description, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
          'data': [this.location, this.lat, this.lng, this.medium, this.title, this.artist, this.artistUrl, this.imageUrl, this.dateRange, this.sanctioned, this.description, this.comments],
        }
      ],
      callback
    );
  };


  Installation.loadAll = function(rows) {
    Installation.all = rows.map(function(ele) {
      return new Installation(ele);
    });
  };

  Installation.fetchAll = function(callback) {
    //assume table is loaded and ready to read
    webDB.execute('SELECT * FROM Installations', function(rows){
      if (rows.length) {
        Installation.loadAll(rows);
        callback();
      } else {
        //if table was empty, look for local file to read
        $.getJSON('/data/installations.json', function(rawData) {
          // Cache the json, so we don't need to request it next time:
          rawData.forEach(function(item) {
            var installation = new Installation(item); // Instantiate an Installation based on item from JSON
            installation.insertRecord(myTemp);
          });
          //populated the table now call
          webDB.execute('SELECT * FROM Installations', function(rows){
            if (rows.length) {
              Installation.loadAll(rows);
              callback();
            }
          }); //select from installations
        }); //getJSON
      };//end else
    }); //execute select
  };//fetchAll


  Installation.allMediums = function(callback) {
    webDB.execute('SELECT DISTINCT medium FROM Installations', callback);
  };

  Installation.allArtists = function(callback) {
    webDB.execute('SELECT DISTINCT artist FROM Installations', callback);
  };

  Installation.allTitles = function(callback) {
    webDB.execute('SELECT DISTINCT title FROM Installations', callback);
  };

  Installation.allDateRanges = function(callback) {
    webDB.execute('SELECT DISTINCT dateRange FROM Installations', callback);
  };

  Installation.allBySanction = function(callback) {
    webDB.execute('SELECT DISTINCT sanctioned FROM Installations', callback);
  };

  Installation.findWhere = function(field, value, callback) {
    webDB.execute(
      {
        sql: 'SELECT * FROM installation WHERE ' + field + ' = ?; ',
        data: [value]
      },
    callback
    );
  };

  Installation.createTable(myTemp);
  Installation.fetchAll(myTemp);
  module.Installation = Installation;

})(window);
