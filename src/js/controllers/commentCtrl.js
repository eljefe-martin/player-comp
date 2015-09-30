'use strict';

controllers.controller('commentCtrl', ['$scope', '$http', 'commentService','playerService','dateUtility', 
                                      function($scope, $http, commentService, playerService, dateUtility){
  
    //contoller function that maps to the service function                                      
    $scope.getCommentLog = function(){
       commentService.loadCommentLog($scope.playerId)
            .success(function(res){
                $scope.commentLog = res;
                commentService.setCommentLog($scope.commentLog);
                
            })
            .error(function(res){
                console.log(res);
            });
    };
                                          
                                           
    var init = function(){
        //initialization function used to grab state when page reloads
        if(commentService.getPlayerId()){
            $scope.playerId = commentService.getPlayerId();
            $scope.commentLog = commentService.getCommentLog();
      
        } else {
            $scope.playerId = playerService.getPlayerId();
            $scope.getCommentLog();
    
            
        }
        
    };
                                          
    //call init                                      
    init();
    $scope.myFunction = function(){alert(playerService.getPlayerId())};
    $scope.playerInfo = playerService.getPlayerInfo();
                  

}]);



