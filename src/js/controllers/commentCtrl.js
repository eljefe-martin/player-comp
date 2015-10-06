'use strict';

controllers.controller('commentCtrl', ['$scope', '$http', 'commentService','playerService','dateUtility', 
                                      function($scope, $http, commentService, playerService, dateUtility){
                                          
                                          
    //contoller function that maps to the service function                                      
    $scope.getCommentLog = function(){
       commentService.loadCommentLog($scope.playerId)
            .success(function(res){
                $scope.commentLog = res;
                commentService.setCommentLog(res);
                
            })
            .error(function(res){
                console.log(res);
            });
    };
                                
    $scope.playerInfo = playerService.getPlayerInfo();
    $scope.playerId = playerService.getPlayerId();
    $scope.getCommentLog();

}]);



