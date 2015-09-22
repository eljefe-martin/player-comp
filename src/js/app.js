'use strict';

var app = angular.module('app',['app.controllers','app.services','ui.router']);


//states
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
        //any state that needs the log-comments just follows this pattern
        .state('player', {
        url: '/player',
        views: {
            "" : {
                templateUrl: 'views/player.html',
                controller: 'playerCtrl'
            },
            "log-comment" : {
                templateUrl: 'views/log-comment.html',
                controller: 'playerCtrl'
            }
        }
      })
      .state('comment', {
        url: '/comment',
        views: {
            "" : {
                templateUrl: 'views/comment.html',
                controller: 'playerCtrl'
            },
            "log-comment" : {
                templateUrl: 'views/log-comment.html',
                controller: 'playerCtrl'
            }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html'
      });
    $urlRouterProvider.otherwise('login');
  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('forbidden');
      }
    });
  }]);
