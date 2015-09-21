'use strict';

services.factory('userSessionService', ['$http', function($http){
    return {
        userId: "",
        login: function(data){
                    $http.post('/login/', data).then(function(res){
                    
                    });
        },
        authorizationLevel:0
    }
}]);



