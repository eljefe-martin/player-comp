'use strict';

controllers.controller('playerCtrl', ['$scope', '$http', 'playerService','dateUtility', 
                                      function($scope, $http, playerService, dateUtility){
    var dt = new Date();
    dt.setDate(dt.getDate()-1);

    var _playerId = undefined;                                      
    //set up some event handlers for when data changes
    $( "#player" )
        .change(function() {
                $scope.playerModel.resetPlayerInfo()
        });
                                          
    $( "#days, #start-date, #end-date" )
        .change(function(){
            $scope.playerModel.showPlayerData = false;
            $("#comment-log-tab").hide();
            $("#comment-button").hide();
        });
                                          
    //date dropdown options
    $scope.dateOptions = {
        availableOptions: [
            {id:7},
            {id:30},
            {id:90},
            {id:180},
            {id:365}
        ]
    };
    
     $scope.playerModel = {};
                                          
                                          
    var init = function(){
        //initialization function used to grab state when page reloads
        if(playerService.getPlayerId()){
            $scope.playerModel.playerId = playerService.getPlayerId();
            $scope.playerModel.showPlayerData = true;
            $scope.playerModel.hasData = true;
            $scope.playerInfo = playerService.getPlayerInfo();
            $scope.startDate = playerService.getStartDate();
            $scope.endDate = playerService.getEndDate();
            $scope.dateOptions.selectedOption = {id: dateUtility.dayDiff($scope.startDate, $scope.endDate)+1};
            console.log($scope.dateOptions.selectedOption.id);
        } else {
            $scope.dateOptions.selectedOption = {id:90};
            $scope.playerInfo;
            $scope.playerModel.playerId = undefined;
            $scope.playerModel.showPlayerData = false;
            $scope.playerModel.hasData = true;
            $scope.startDate = dateUtility.addDays(dt, -$scope.dateOptions.selectedOption.id+1);                                  ;
            $scope.endDate = dt;
          
        }
        
    };

    
    //contoller function that maps to the service function                                      
    $scope.getPlayerInfo = function(){
        $scope.updatePressed = true;
        playerService.loadPlayerInfo($scope.playerModel.playerId, $scope.startDate, $scope.endDate)
            .success(function(res){
                //change back to this when using sql server
                //$scope.playerInfo = res[0][0];
                
                $scope.playerInfo = res[0];
                //if no data we display no data
                if(!$scope.playerInfo){
                    $scope.playerModel.hasData = false;
                    $scope.playerModel.showPlayerData = false;
                    $("#comment-log-tab").hide();
                    $("#comment-button").hide();
                } else {
                    //show the comment tab
                    $scope.playerModel.hasData = true;
                    $("#comment-log-tab").show();
                    $("#comment-button").show();
                    playerService.setPlayerInfo($scope.playerInfo);
                    $scope.playerModel.showPlayerData = true;
                } 
                
                //code to run with or without data
                $('#player-update-button').blur();
                $scope.updatePressed = false;
                
            
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
  
                                          
    $scope.playerModel.resetPlayerInfo  = function() {
            $scope.playerModel.showPlayerData = false;
            $scope.dateOptions.selectedOption = {id:90};
            $scope.startDate = dateUtility.addDays(dt, -$scope.dateOptions.selectedOption.id+1);                                  ;
            $scope.endDate = dt;
            $scope.$apply();
            $("#comment-log-tab").hide();
            $("#comment-button").hide();
    
    };                                    
     //call init                                      
    init();                                      

}]);



