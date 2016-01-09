'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Items = new Module('items');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Items.register(function(app, auth, database, circles, swagger) {

  //We enable routing. By default the Package Object is passed to the routes
  Items.routes(app, auth, database);

  Items.aggregateAsset('css', 'items.css');

  
  //We are adding a link to the main menu for all authenticated users
  Items.menus.add({
    'roles': ['anonymous, authenticated'],
    'title': 'Items',
    'link': 'all items'
  });
  Items.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Item',
    'link': 'create item'
  });

  Items.events.defaultData({
    type: 'post',
    subtype: 'item'
  });


  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Items.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Items.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Items.settings(function (err, settings) {
      //you now have the settings object
    });
    */

  // Only use swagger.add if /docs and the corresponding files exists
  swagger.add(__dirname);
	
  return Items;
});
