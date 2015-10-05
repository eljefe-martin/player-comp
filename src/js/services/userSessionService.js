'use strict';

services.factory('userSessionService', ['$http', function($http){
    
    var obj = {};
    
    //private fields
    var _userId, _accessLevel;
    
    
    //functions to expose
    obj.login = function(data){
        return $http.post('/api/login', data);
    }; 
    
    obj.getUserId = function(){
        return _userId;
    };
    
    obj.setUserId = function(value) {
        _userId = value;
    };
    
    obj.getAccessLevel =  function(){
        return _accessLevel;
    };
    
    obj.setAccessLevel = function(value){
        _accessLevel = value;
    };
    
    //factory returns an object when it first gets called
    return obj;
}]);



