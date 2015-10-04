'use strict';

controllers.controller('commentCtrl', ['$scope', '$http', 'commentService','playerService','dateUtility', 
                                      function($scope, $http, commentService, playerService, dateUtility){
                                          
                                          
    //base contoller scope object to organize things
    $scope.comment = {};                                      
  
    //contoller function that maps to the service function                                      
    $scope.getCommentLog = function(){
       commentService.loadCommentLog($scope.playerId)
            .success(function(res){
                $scope.comment.commentLog = res;
                commentService.setCommentLog($scope.commentLog);
                
            })
            .error(function(res){
                console.log(res);
            });
    };
                                          
   
                                          
    $scope.playerInfo = playerService.getPlayerInfo();
                                              
    //variable to hold commentData
                                          
    $scope.commentData = {};
                                           
    var init = function(){
        //initialization function used to grab state when page reloads
        if(commentService.getPlayerId() == playerService.getPlayerId()){
            $scope.playerId = commentService.getPlayerId();
            $scope.comment.commentLog = commentService.getCommentLog();
           
      
        } else {
            $scope.playerId = playerService.getPlayerId();
            $scope.getCommentLog();
    
            
        }
        //set the commentData playerId
         $scope.commentData.playerId = $scope.playerId;
        
    };
                                          
    //call init                                      
    init();
                                          
   
                                          

}]);



