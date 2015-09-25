'use strict'

services.factory('commentService', ['$http', function($http){ 
    
    var obj = {};
    
    //private fields used to retain state
    var _playerId, _commentLog, _startDate, _endDate;
    
    obj.loadCommentLog = function(playerId, startDate, endDate){
        
        _playerId = playerId;
        _startDate = startDate;
        _endDate = endDate;
        return $http.get('/api/comments/' + playerId);
//          
    };
    
    //getters and setters
     obj.getPlayerId = function() {
        return _playerId;
    }
    
    obj.setCommentLog = function(value) {
        _commentLog = value;
    };
    
    obj.getCommentLog = function(){
        return _commentLog;
    };
    
    obj.getStartDate = function() {
        return _startDate;
    };
    
    obj.getEndDate = function() {
        return _endDate;
    };
    
    // return the factory object
    return obj;
    
}]);

