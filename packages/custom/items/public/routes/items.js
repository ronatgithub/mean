'use strict';

//Setting up route
angular.module('mean.items').config(['$stateProvider',
  function($stateProvider) {

    // states for my app
    $stateProvider
      .state('all items', {
        url: '/items',
        templateUrl: '/items/views/list.html',
        requiredCircles : {
          circles: ['authenticated'],
          denyState: 'auth.login'
        }
      })
      .state('create item', {
        url: '/items/create',
        templateUrl: '/items/views/create.html',
        requiredCircles : {
          circles: ['can create content']
        }
      })
      .state('edit item', {
        url: '/items/:itemId/edit',
        templateUrl: '/items/views/edit.html',
        requiredCircles : {
          circles: ['can edit content']
        }
      })
      .state('item by id', {
        url: '/items/:itemId',
        templateUrl: '/items/views/view.html',
        requiredCircles : {
          circles: ['authenticated'],
          denyState: 'auth.login'
        }
      });
  }
]);
