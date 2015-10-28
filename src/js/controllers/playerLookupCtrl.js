'use strict';

controllers.controller('playerLookkupCtrl', ['$scope', '$http','dateUtility', 
                                      function($scope, $http, dateUtility){
                                          
                        
    $scope.playerLookupResults = false;
    
                                          
    //input events
    $('#firstName, #lastName, #birthdate').change(function(){
        if(this.id == "birthdate") {
            $scope.firstName = undefined;
            $scope.lastName = undefined;
            $scope.$apply();
        } else {
            $scope.birthdate = undefined;
            $scope.$apply();
        } 
        
    });                                      
                      
    //FUNCTIONS                                 
    

    //get data from stored proc via api call    
    $scope.playerSearch = function(){
   
        if($scope.firstName || $scope.lastName || $scope.birthdate) {
            var data = {firstName: $scope.firstName, lastName: $scope.lastName, birthdate: $scope.birthdate};
            
            $http.post('/api/player-lookup', data)
                .success( function(res){
                    
                    $scope.lookupResults = res;
                    $scope.playerLookupResults = true;
                    $scope.formatTable(res);
                   
       
                })
                .error( function(res){
                    console.log("There was an error during the player lookup http request");
                    console.log(res);
                });
            
            
        } else {
            $('#firstName').focus();
        }
    };
    
    $scope.cancelLookup = function() {
        clearTableResults();
    };                         
      
    var clearTableResults = function() {
            $scope.playerLookupResults = false;
            $scope.firstName = $scope.lastName = $scope.birthdate = undefined;
            var t = $('#playerLookupTable').DataTable();
                t.clear();
                t.destroy();                                      
    };                                      
                                          
    $scope.formatTable = function(data) {
        //called from directive so we know table is fully loaded
//        $('#playerLookupTable').dataTable().fnAddData(data); 
      var table = $('#playerLookupTable').DataTable();
        table.clear();
        table.destroy();
        table = $('#playerLookupTable').DataTable({
        scrollX: true,
        data: data,
        columns: [
            { data: 'PlayerID' },
            { data: 'FirstName' },
            { data: 'LastName' },
            { data: 'AgeRange' },
            { data: 'City' },
            { data: 'State' },
            { data: 'RankDesc' },
            { data: 'Birthday', 
              render: function ( data, type, row ) {
                // If display or filter data is requested, format the date
                if ( type === 'display' || type === 'filter' ) {
                    debugger
                    var d = data.substring(0,10);
                    d = d.substring(5,7) + '/' + d.substr(8,10) + '/' + d.substring(0,4)
                    return d;
                }
 
              return data;
              }
            }
        ]
      });
    
    //add handler for selecting a row    
    $('#playerLookupTable tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('row-highlight');
            $scope.playerModel.playerId = parseInt($(this).children()[0].innerHTML);
            $scope.$apply($scope.playerModel.playerId);
            $scope.playerModel.resetPlayerInfo();
            clearTableResults();
            $scope.playerModel.showPlayerData = false;
            $('#player-lookup').modal('hide');
        } );     
     
    };                                      
}]);
