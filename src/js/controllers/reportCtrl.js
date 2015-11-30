'use strict';

controllers.controller('reportCtrl', ['$state','$scope', '$http', 'playerService', function($state, $scope, $http, playerService){
    
                                              
    //contoller function that maps to the service function                                      
                                  
    $scope.playerInfo = playerService.getPlayerInfo();
    $scope.playerId = playerService.getPlayerId();
    $scope.reportData = undefined;
    
    //Analysis dropdown options
    $scope.reportOptions = [
        { 
            reportId: 1,
            state:'report.player-card-level', 
            label:"Player Card Level Information"
        }, 
        {
            reportId: 2,
            state:'report.player-history-summary', 
            label:"Player History Summary"
        }   
    ];
    
    //default report will be Player Card Level Information"
    $scope.reportMain = {
        selectedReport :  $scope.reportOptions[0],
        showData: false
        
    };
    
                                          
    //function called when hitting the run button
    $scope.runReport = function(){
        //changing the state will open the report template and call the reportData contolrler
        $state.go($scope.reportMain.selectedReport.state);
    };
    
    
    //watch for change of analysis to clear out current report
    $( "#report" )
        .change(function(){
            $scope.reportMain.showData = false;
        });
    
}]);



