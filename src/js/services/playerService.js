'use strict'

services.factory('playerService', ['$http', function($http){ 
    
    var obj = {};
    
    //private fields used to retain state
    var _playerId, _playerInfo, _startDate, _endDate;
    
    obj.loadPlayerInfo = function(playerId, startDate, endDate){
        
        _playerId = playerId;
        _startDate = startDate;
        _endDate = endDate;
        
        var data =  {playerId: _playerId, startDate: _startDate, endDate: _endDate};
        return $http.post('/api/player/', data);
//          
    };
    
    //getters for the private fields
    obj.getPlayerId = function() {
        return _playerId;
    }
    
    obj.setPlayerInfo = function(value) {
        _playerInfo = value;
    };
    
    obj.getPlayerInfo = function(){
        return _playerInfo;
    };
    
    obj.getStartDate = function() {
        return _startDate;
    };
    
    obj.getEndDate = function() {
        return _endDate;
    };
    
    obj.resetPlayerInfo = function(){
        _playerId = undefined;
        _startDate = undefined;
        _playerInfo = undefined;
        _endDate = undefined;
    };
    
    // return the factory object
    return obj;
    
}]);

