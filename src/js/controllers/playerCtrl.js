'use strict';

controllers.controller('playerCtrl', ['$scope', '$http', 'playerService','dateUtility', 
                                      function($scope, $http, playerService, dateUtility){
    var dt = new Date();
    dt.setDate(dt.getDate()-1);
    
    //date dropdown options
    $scope.dateOptions = {
        availableOptions: [
            {id:7},
            {id:90},
            {id:180},
            {id:365}
        ]
    };
                                          
                                          
    var init = function(){
        //initialization function used to grab state when page reloads
        if(playerService.getPlayerId()){
            $scope.playerId = playerService.getPlayerId();
            $scope.playerInfo = playerService.getPlayerInfo();
            $scope.startDate = playerService.getStartDate();
            $scope.endDate = playerService.getEndDate();
            $scope.dateOptions.selectedOption = {id: dateUtility.dayDiff($scope.startDate, $scope.endDate)+1};
            console.log($scope.dateOptions.selectedOption.id);
        } else {
            $scope.dateOptions.selectedOption = {id:180};
            $scope.playerId;
            $scope.playerInfo;
            $scope.startDate = dateUtility.addDays(dt, $scope.dateOptions.selectedOption.id - 1);                                  ;
            $scope.endDate = dt;
          
        }
        
    };

    //call init                                      
    init();
                                      
    
    //contoller function that maps to the service function                                      
    $scope.getPlayerInfo = function(){
        $scope.updatePressed = true;
        playerService.loadPlayerInfo($scope.playerId, $scope.startDate, $scope.endDate)
            .success(function(res){
                $scope.playerInfo = res[0][0];
                $scope.updatePressed = false;
                playerService.setPlayerInfo($scope.playerInfo);
                
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

}]);



