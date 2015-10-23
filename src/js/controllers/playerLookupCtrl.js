'use strict';

controllers.controller('playerLookkupCtrl', ['$scope', '$http','dateUtility', 
                                      function($scope, $http, dateUtility){
                                          
                        
    $scope.playerLookupResults = false;
    $scope.selectedPlayerId;
                                          
                      
    //FUNCTIONS                                 
    

    //get data from stored proc via api call    
    $scope.playerSearch = function(){
   
        if($scope.firstName || $scope.lastName || $scope.birthdate) {
            var data = {firstName: $scope.firstName, lastName: $scope.lastName, birthdate: $scope.birthdate};
            
            $http.post('/api/player-lookup', data)
                .success( function(res){
                    
                    console.log(res);
                    //need to populate data for table ng-repeat
                    $scope.playerLookupResults = true;
                    $('#playerLookupTable').DataTable(); 
                    $('#playerLookupTable input:checkbox').change( function() {
                        $scope.selectedPlayerId = $(this.parentNode).next().text();
                    });
       
                })
                .error( function(res){
                    console.log("There was an error during the player lookup http request");
                    console.log(res);
                });
            
            
        } else {
            $('#firstName').focus();
        }
    };
    
    //update playerid in player form                                      
    $scope.updatePlayerId = function(){
        if($scope.selectedPlayerId) {
            $scope.playerModel.playerId = $scope.selectedPlayerId;
            $scope.playerModel.showPlayerData = false;
            $scope.playerLookupResults = false;
            $scope.firstName = $scope.lastName = $scope.birthdate = undefined;
            
        }
    };                                      

}]);
