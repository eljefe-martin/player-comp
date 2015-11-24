'use strict';

var app = angular.module('app',['app.controllers','app.services', 'app.directives','ui.router']);


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
            "post-comment" : {
                templateUrl: 'views/post-comment.html',
                controller: 'postCommentCtrl'
            },
            "player-lookup@player" : {
                parent: 'player',
                templateUrl: 'views/player-lookup.html',
                controller: 'playerLookkupCtrl'
            }
        }
      })
      .state('comment', {
        url: '/comment',
        views: {
            "" : {
                templateUrl: 'views/comment.html',
                controller: 'commentCtrl'
            },
            "post-comment" : {
                templateUrl: 'views/post-comment.html',
                controller: 'postCommentCtrl'
            }
        }
      })  
      .state('report', {
        url: '/report',
        views: {
            "" : {
                templateUrl: 'views/report.html',
                controller: 'reportCtrl'
            },
            "post-comment" : {
                templateUrl: 'views/post-comment.html',
                controller: 'postCommentCtrl'
            }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'userSessionCtrl'
      });
    $urlRouterProvider.otherwise('login');
  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      // redirect to login page if not logged in
      if (toState.name !== 'login' && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('login');
      }
    });
  }]);
