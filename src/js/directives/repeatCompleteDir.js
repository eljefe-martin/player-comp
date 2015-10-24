'use strict';

directives.directive('repeatCompleteDir', [function(){

    return function(scope, element, attrs) {
        if (scope.$last) {
            scope.$emit('repeatComplete');
        }

    };
}]);

