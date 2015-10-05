'use strict';

controllers.controller('postCommentCtrl', ['$scope', '$rootScope','$http', 'commentService','playerService','dateUtility', 
                                      function($scope, $rootScope, $http, commentService, playerService, dateUtility){
  
    //main scope object to namespace everything
    $scope.postComment = {};
                                          
                                              
    $scope.postComment.postComment = function(){
        
        //if commentData.playerId is undefined run init
        if(!$scope.commentData.playerId) {
           $scope.commentData.playerId = playerService.getPlayerId();
        };

        commentService.postComment($scope.commentData)
            .success(function(res){
                console.log(res);
                console.log("posted");
                $scope.commentData.comment = "";
            })
            .error(function(res){
                alert("error post-comment");
            });
    };
   
    //                                      
    $scope.postComment.playerInfo = playerService.getPlayerInfo();
                                              
    //variable to hold commentData
                                          
    $scope.commentData = {
        playerId: playerService.getPlayerId(),
        userName: $rootScope.currentUser
        
    };
    
}]);



