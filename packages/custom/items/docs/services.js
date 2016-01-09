'use strict';

exports.load = function(swagger, parms) {

  var searchParms = parms.searchableOptions;

  var list = {
    'spec': {
      description: 'Item operations',
      path: '/items',
      method: 'GET',
      summary: 'Get all Items',
      notes: '',
      type: 'Item',
      nickname: 'getItems',
      produces: ['application/json'],
      params: searchParms
    }
  };

  var create = {
    'spec': {
      description: 'Device operations',
      path: '/items',
      method: 'POST',
      summary: 'Create item',
      notes: '',
      type: 'Item',
      nickname: 'createItem',
      produces: ['application/json'],
      parameters: [{
        name: 'body',
        description: 'Item to create.  User will be inferred by the authenticated user.',
        required: true,
        type: 'Item',
        paramType: 'body',
        allowMultiple: false
      }]
    }
  };

  swagger.addGet(list)
    .addPost(create);

};
