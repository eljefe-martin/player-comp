'use strict';

controllers.controller('userSessionCtrl', ['$scope', '$rootScope','$state', 'userSessionService', 'playerService',  
                                      function($scope, $rootScope, $state, userSessionService, playerService){
                                          
    
        
        
        $scope.loginData = {}; 
        $('#logout-button, #player-tab, #comment-log-tab, #comment-button, #currentUser').hide(); 
        playerService.resetPlayerInfo();
        $rootScope.currentUser = undefined;  
        $rootScope.accessLevel = undefined;                                  
                                          
        $scope.login = function() {
            
            userSessionService.login($scope.loginData)
                .success(function(res){
                    //verify access level and valid login
                    if(res.changePassword == 0 && res.accessLevel != 0){
                        $rootScope.currentUser = res.userId;
                        $rootScope.accessLevel = res.accessLevel;
                        $state.go('player');
                        $('#player-tab, #logout-button, #currentUser').show();
                        $('#currentUser a').html('<span class="glyphicon glyphicon-user right-padding"></span>' + res.userId);
                    } else {
                        $scope.loginData.invalidLogin = true;
                        $('#userID').focus();
                    };
                })
                .error(function(res){
                    console.log("Login error");
                    console.log(res);
                });
        }; 

                                    

}]);



