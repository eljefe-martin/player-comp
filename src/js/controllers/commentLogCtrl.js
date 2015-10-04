'use strict';

controllers.controller('commentLogCtrl', ['$scope', '$http', 'commentService','playerService','dateUtility', 
                                      function($scope, $http, commentService, playerService, dateUtility){
  
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
                                          
                                                                            
    $scope.logComment = function(){
        
        //if commentData.playerId is undefined run init
        if(!$scope.commentData.playerId) {
            init();
        };
        
        commentService.logComment($scope.commentData)
            .success(function(res){
                console.log(res);
                $scope.commentData.comment = "";
                $scope.getCommentLog();
                alert("success log-comment");
            
            })
            .error(function(res){
                alert("error log-comment");
            
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



