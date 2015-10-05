'use strict'

services.factory('commentService', ['$http', function($http){ 
    
    var obj = {};
    
    //private fields used to retain state
    var _playerId, _commentLog;
    
    obj.loadCommentLog = function(playerId){
        
        _playerId = playerId;
      
        return $http.get('/api/comments/' + playerId);
//          
    };
    
    
    obj.postComment = function(data) {
        return $http.post('/api/post-comment',data);
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
    
       
    // return the factory object
    return obj;
    
}]);

