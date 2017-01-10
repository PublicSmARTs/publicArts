
(function(module) {

  function Installation(opts){
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  function myTemp(){
    console.log('just in the callback dummy');
  };

  Installation.all = [];

  Installation.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS Installations (' +
        'id INTEGER PRIMARY KEY, ' +
        'location VARCHAR(100), ' +
        'medium VARCHAR(20) NOT NULL, ' +
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

  Installation.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO Installations (location, medium, title, artist, artistUrl, imageUrl, dateRange, sanctioned, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
          'data': [this.location, this.medium, this.title, this.artist, this.artistUrl, this.imageUrl, this.dateRange, this.sanctioned, this.description],
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
    console.log('in fetch all');
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
          webDb.execute('SELECT * FROM Installations', function(rows){
            if (rows.length) {
              Installation.loadAll(rows);
              callback();
            }
          }); //select from installations
        }); //getJSON
      };//end else
    }); //execute select
  };//fetchAll

  Installation.createTable(myTemp);
  Installation.fetchAll(myTemp);
  module.Installation = Installation;
})(window);
