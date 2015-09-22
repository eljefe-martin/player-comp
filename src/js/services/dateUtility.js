'use strict'

services.factory('dateUtility', [function(){ 
    
    var obj = {};
    
    
    //function to add days to a given date
    obj.addDays = function(dt, numDays){
        
        var _dt = new Date(dt);
        
        return new Date(_dt.setDate(_dt.getDate()+numDays));
    };
    
    //function to return the number of days between 2 dates
    obj.dayDiff = function(startDate, endDate) {
        
        return parseInt((endDate-startDate)/(24*3600*1000));
    
    };
    
    return obj;
    
}]);

