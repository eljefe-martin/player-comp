'use strict';

controllers.controller('postCommentCtrl', ['$scope', '$rootScope','$http', 'commentService','playerService','dateUtility', 
                                      function($scope, $rootScope, $http, commentService, playerService, dateUtility){
  
                                             
    $scope.getCommentLog = function(){
       commentService.loadCommentLog($scope.playerId)
            .success(function(res){
                commentService.setCommentLog(res);
                
            })
            .error(function(res){
                console.log(res);
            });
    };
                                          
                                          
    $scope.postComment = function(){
        
        //if commentData.playerId is undefined run init
        if(!$scope.commentData.playerId) {
           $scope.commentData.playerId = playerService.getPlayerId();
        };

        commentService.postComment($scope.commentData)
            .success(function(res){
                //return the comment Id to the user
                alert("Comment ID: " + res.commentId);
                $scope.commentData.comment = "";
            })
            .error(function(res){
                alert("error post-comment");
            });
    };
   
    //                                      
    $scope.playerInfo = playerService.getPlayerInfo();
                                              
    //variable to hold commentData
                                          
    $scope.commentData = {
        playerId: playerService.getPlayerId(),
        userName: $rootScope.currentUser
        
    };
    
}]);



