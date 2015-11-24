'use strict';

controllers.controller('reportCtrl', ['$scope', '$http', 'playerService', function($scope, $http, playerService){
    
                                              
    //contoller function that maps to the service function                                      
                                  
    $scope.playerInfo = playerService.getPlayerInfo();
    $scope.playerId = playerService.getPlayerId();
    $scope.getCommentLog();
    
    
     $scope.getReportData = function(reportId){
        
              
        $http.get('/api/report/' + reportId + '/' + $scope.playerId)
            .success(function(res){
                //do something
                console.log(res);
            })
            .error(function(res){
                console.log(res);
            });
//          
     };
    
    //Analysis dropdown options
    $scope.reportOptions = {
        availableOptions: [
            {id:1, label:"Player Card Level Information"},
            {id:2, lable:"Player History Summary"}
        ]
    };

                                          

}]);



