#SAMPLE INSTALLATION OBJECT
[
  {
    "location": "", (some type of information from google maps - tbd)
    "medium": "", (architecture, sculpture, mural, painting, stained glass, ceramics, mosaics, tapestry, collections, earthworks, installation)
    "artist": "", (open text field)
    "title": "", (open text field)
    "dateRange": "", (pre-1900, 1900-1920, 1920-40, 1940-1960, 1960-1980, 1980-2000, after 2000)
    "sanctioned": true/false,
    "description": "", (open text field)
    "imageUrl": "", (list of urls)
    "resources": "", (list of urls)
    "comments": "" (list of comments)
  }
]

#FILE STRUCTURE

- DATA:
  - installations.json
- SCRIPTS:
  - CONTROLLERS
    - homeController.js
    - installationsController.js
    - routes.js
  - MODELS
    - installations.js
    - map.js
  - VIEWS
    - installationView.js
    - mapView.js
- STYLES
  - base.css
  - icons.css
  - layout.css
  - modules.css
- VENDOR
  - SCRIPTS (or CDNs)
    - handlebars.js
    - html5sql.js
    - jquery-2.1.4.js
    - page.js
    - webdb.js
    - marked.js
    <!-- ?? highlight.pack.js ?? -->
  - STYLES
    - default.css
    - normalize.css
    - railscasts.css
- index.html
- package.json
- server.js


#PAGE STRUCTURE

- HOME PAGE:
  - want to be able to navigate to different pages
  - user can choose whether to find art or share art
  - want to display images of installations if available

- FIND ART PAGE:
  - still want the user to be able to navigate to different pages
  - we a map to load showing the estimated location of the user with the locations of the installations already stored in the database shown as pins
  - we want the user to find a location be either using the map or typing one in the searchbar
  - when the user is at their desired location on the map, they should be able to hover over a specific pin and see information for that specific installation
  - the user should be able to click on that pin and navigate to the Love Art page for that specific installation
  - the user should be able filter results by object property
  - the properties medium, artist, and date range should all be drop down menus populated from the data for all installation objects
  - the properties 'has title', 'has description', 'is sanctioned', and 'has photo(s)' should be radio buttons
  - each selection from the drop menu or radio button will produce individual results in the map, only displaying installations matching that property
  - images should display on the bottom for installations viewable in the map (based on filtered information)
  - the add new button allows users to navigate to the SHARE ART page

- SHARE ART
  - still want the user to be able to navigate to different pages
  - the user is required to enter a location by dropping a pin on a specific spot on the map, they will be able to search for a location in the search bar but this will not set the specific location information
  - the user is required to select a medium from the drop menu
  - once the location and medium fields are filled in, the 'add new' buttom becomes visible/clickable
  - the user has the option to add additional information for the following fields
    - artist: text
    - title: text
    - date range: drop down
    - sanctioned: checkbox
    - description: text
    - resources: urls
    - image: url (invesigate options)
  - when the 'add new' button is clicked, page should navigate to the LOVE ART page for that specific installation

  - LOVE ART:
    - still want the user to be able to navigate to different pages
    - display information for a single installation that the user either just created, updated, or selected on the map
    - user should see any images associated with the installation
    - all known information should appear in black and all unknown information should be grayed out
    - the user can click the 'update' button to navigate to the SHARE ART page to change or add any information
    - the user should also be able to add a comment to the discussion and view all comments from other users
    - comments should be sorted by most recent



#DEVELOPER SPECS

- DATA:
  - installations.json
    - this file holds all the installation objects representing the database of logged entries
    - the installation objects have the following properties:
      - key fields (required):
        - location (lat/long - api dependent)
        - medium (drop down)
      - optional fields:
        - artist
        - title
        - image url? (need to figure out how to show more than one)
        - date range (drop down)
        - sanctioned (y/n)
        - resources (links - shown as list)
        - description
        - comments (array)
        <!-- - tags/themes - possible stretch goal -->

- SCRIPTS:
  - CONTROLLERS
    - homeController.js
    - installationsController.js
      - responsible for loading appropriate installations based on the filters
      - takes you to share art page
    - shareArtController.js
    - loveArtController.js
    - routes.js
  - MODELS
    - installations.js
      - creating tables in the database (for installations and comments)
      - functionality for editing the tables (insert, delete, update)
      - functionality for fetching the data from the database and processing it
      - functionatity for using the database information to construct installation objects and store them in an array
      - get unique data sets for each of the filters

    - map.js
      - request API data and stores it
