'use strict';

angular.module('mean.home').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('home example page', {
      url: '/home/example',
      templateUrl: 'home/views/index.html'
    });
  }
]);
