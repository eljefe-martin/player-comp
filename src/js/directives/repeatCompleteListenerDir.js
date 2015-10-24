'use strict';

directives.directive('repeatCompleteListenerDir', [ function(){
    
    return function(scope, element, attrs) {
        scope.$on('repeatComplete', function(){
            scope.formatTable();
        });
    };


}]);