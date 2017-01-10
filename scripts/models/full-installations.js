/* code copied from google maps doc site....
function searchLocations() {
  var address = document.getElementById("addressInput").value;
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({address: address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      searchLocationsNear(results[0].geometry.location);
    } else {
      alert(address + ' not found');
    }
  });
}
*/
(function(module) {
  function Installation (opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  Installation.all = [];

  Installation.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS Installations (' +
        'id INTEGER PRIMARY KEY, ' +
        'lat FLOAT(10, 6) NOT NULL INDEX' +
        'lng FLOAT(10, 6) NOT NULL INDEX' +
        'medium VARCHAR(20) NOT NULL INDEX, ' +
        'title VARCHAR(50) NOT NULL, ' +
        'artist VARCHAR(50) NOT NULL, ' +
        'artistUrl VARCHAR(255), ' +
        'imageUrl VARCHAR(255), ' +
        'dateRange VARCHAR(10), ' +
        'sanctioned BOOLEAN, ' +
        'description TEXT );',
      callback
    );
  };

  Installation.truncateTable = function(callback) {
    webDB.execute(
      'DELETE FROM Installations;',
      callback
    );
  };

  Installation.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO Installations (lat, lng, medium, title, artist, artistUrl, imageUrl, dateRange, sanctioned, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
          'data': [this.lat, this.lng, this.medium, this.title, this.artist, this.artistUrl, this.imageUrl, this.dateRange, this.sanctioned, this.description],
        }
      ],
      callback
    );
  };

  Installation.prototype.deleteRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM Installations WHERE id = ?;',
          'data': [this.id]
        }
      ],
      callback
    );
  };

  Installation.prototype.updateRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'UPDATE Installations SET lat= ?, lng = ?, medium = ?, title = ?, artist = ?, artistUrl = ?, imageUrl = ?, dateRange = ?, sanctioned = ?, description = ?, WHERE id = ?;',
          'data': [this.lat, this.lng, this.medium, this.title, this.artist, this.artistUrl, this.imageUrl, this.dateRange, this.sanctioned, this.description]
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
    webDB.execute('SELECT * FROM Installations', function(rows) {
      if (rows.length) {
        Installation.loadAll(rows);
        callback();
      } else {
        $.getJSON('/data/installations.json', function(rawData) {
          // Cache the json, so we don't need to request it next time:
          rawData.forEach(function(item) {
            var Installation = new Installation(item); // Instantiate an Installation based on item from JSON
            Installation.insertRecord(); // Cache the Installation in DB
          });
          webDB.execute('SELECT * FROM Installations', function(rows) {
            Installation.loadAll(rows);
            callback();
          });
        });
      }
    });
  };

  Installation.findWhere = function(field, value, callback) {
    webDB.execute(
      [
        {
          sql: 'SELECT * FROM Installations WHERE ' + field + ' = ?;',
          data: [value]
        }
      ],
      callback
    );
  };

  // DONE: Example of synchronous, FP approach to getting unique data
  Installation.allArtists = function() {
    return Installation.all.map(function(Installation) {
      return Installation.artist;
    })
    .reduce(function(names, name) {
      if (names.indexOf(name) === -1) {
        names.push(name);
      }
      return names;
    }, []);
  };

  // DONE: Example of async, SQL-based approach to getting unique data
  Installation.medium = function(callback) {
    webDB.execute('SELECT DISTINCT medium FROM Installations;', callback);
  };

  module.Installation = Installation;
})(window);
