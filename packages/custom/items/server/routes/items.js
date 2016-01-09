'use strict';

// Item authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && !req.item.user._id.equals(req.user._id)) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

var hasPermissions = function(req, res, next) {

    req.body.permissions = req.body.permissions || ['authenticated'];

    for (var i = 0; i < req.body.permissions.length; i++) {
      var permission = req.body.permissions[i];
      if (req.acl.user.allowed.indexOf(permission) === -1) {
            return res.status(401).send('User not allowed to assign ' + permission + ' permission.');
        }
    }

    next();
};

module.exports = function(Items, app, auth) {
  
  var items = require('../controllers/items')(Items);

  app.route('/api/items')
    .get(items.all)
    .post(auth.requiresLogin, hasPermissions, items.create);
  app.route('/api/items/:itemId')
    .get(auth.isMongoId, items.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, items.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, items.destroy);

  // Finish with setting up the itemId param
  app.param('itemId', items.item);
};
