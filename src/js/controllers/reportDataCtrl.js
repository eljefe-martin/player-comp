'use strict';

controllers.controller('reportDataCtrl', ['$scope', '$http', 'playerService', function( $scope, $http, playerService){
    
                                              
    //contoller function that maps to the service function                                      
                                  
    $scope.reportData = undefined;
    
     $scope.getReportData = function(reportId){
        
        $http.get('/api/report/' + reportId + '/' + playerService.getPlayerId())
            .success(function(res){
                //do something
                $scope.reportData = res;
            
                //for now this is the only grid report
                if(reportId == 2) {
                    $scope.formatTablePlayerHistory($scope.reportData);
                }
            
                //if everything is successful show data
                $scope.reportMain.showData = true;
            })
            .error(function(res){
                console.log(res);
            });
     };
    
    //when a report loads the contoller is called so we grab the data using 
    //the player info and the selected report from the parent scope reportMain
    //object
    
    $scope.getReportData($scope.reportMain.selectedReport.reportId);    
    
    //function for formatting the grid report will need similar procedure for each grid report
    $scope.formatTablePlayerHistory = function(data) {
        //get the table
        var table = $('#playerHistorySummary').DataTable();
        table.clear();
        table.destroy();
        table = $('#playerHistorySummary').DataTable({
        scrollX: true,
        data: data,
        columns: [
            { data: 'PeriodID',
              render: function ( data, type, row ) {
                // If display or filter data is requested, format the date
                if ( type === 'display' || type === 'filter' ) {
                    var d = data.substring(0,10);
                    d = d.substring(5,7) + '/' + d.substr(8,10) + '/' + d.substring(0,4)
                    return d;
                }
 
              return data;
              }
                                                     
            },
            { data: 'SlotTier' },
            { data: 'TableTier' },
            { data: 'Gaming_Visit' },
            { data: 'SlotCI' },
            { data: 'SlotWin'},
            { data: 'SlotTheo' },
            { data: 'SlotFreePlay'},
            { data: 'TableWin' },
            { data: 'TableTheo'},    
            { data: 'ADT' },
            { data: 'ADA'}
        ]
      });
    
    };
    
    
}]);



