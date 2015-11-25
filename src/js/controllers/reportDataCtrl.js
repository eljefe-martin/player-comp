'use strict';

controllers.controller('reportDataCtrl', ['$scope', '$http', 'playerService', function( $scope, $http, playerService){
    
                                              
    //contoller function that maps to the service function                                      
                                  
    $scope.reportData = undefined;
    
     $scope.getReportData = function(reportId){
        
        $http.get('/api/report/' + reportId + '/' + playerService.getPlayerId())
            .success(function(res){
                //do something
                console.log(res);
                $scope.reportData = res;
            })
            .error(function(res){
                console.log(res);
            });
     };
    
    //when a report loads the contoller is called so we grab the data using 
    //the player info and the selected report from the parent scope reportMain
    //object
    
    $scope.getReportData($scope.reportMain.selectedReport.reportId);    
}]);



