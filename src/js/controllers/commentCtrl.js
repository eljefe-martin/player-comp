'use strict';

controllers.controller('commentCtrl', ['$scope', '$http', 'commentService','playerService','dateUtility', 
                                      function($scope, $http, commentService, playerService, dateUtility){
  
    //contoller function that maps to the service function                                      
    $scope.getCommentLog = function(){
        $scope.updatePressed = true;
        commentService.loadCommentLog($scope.playerId, $scope.startDate, $scope.endDate)
            .success(function(res){
                $scope.commentLog = res;
                $scope.updatePressed = false;
                commentService.setCommentLog($scope.commentLog);
                
            })
            .error(function(res){
                console.log(res);
            });
    };
                                          
    //update date when users selects from the select box
    $scope.updateDates = function() {
        
        $scope.startDate = dateUtility.addDays(dt, -$scope.dateOptions.selectedOption.id+1);
        
        $scope.endDate = dt;
        
    };
                                          
    var init = function(){
        //initialization function used to grab state when page reloads
        if(commentService.getCommentLog()){
            $scope.playerId = commentService.getPlayerId();
            $scope.commentLog = commentService.getCommentLog();
            $scope.startDate = commentService.getStartDate();
            $scope.endDate = commentService.getEndDate();
            $scope.dateOptions.selectedOption = {id: dateUtility.dayDiff($scope.startDate, $scope.endDate)+1};
            console.log($scope.dateOptions.selectedOption.id);
        } else {
            $scope.playerId = playerService.getPlayerId();
            $scope.startDate = playerService.getStartDate();
            $scope.endDate = playerService.getEndDate();
            
            $scope.getCommentLog();
            
        }
        
    };
                                          
    //call init                                      
    init();
                                      
                  

}]);



