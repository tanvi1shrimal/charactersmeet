$(document).ready(function () {
    angular.bootstrap(document, ['App']);
});

//var app = angular.module('App', ['ui.bootstrap']);

var app = angular.module('App', ['localytics.directives','ui.bootstrap']).config([
    '$parseProvider', function($parseProvider) {
      return $parseProvider.unwrapPromises(true);
    }
]);
  
/*
* Controller(s)
*/
app.run(function ($rootScope, $location) {
    $rootScope.location = $location;
});
app.directive('repeatDone', function() { 
    return function(scope, element, attrs) {
        if (scope.$last) { // all are rendered
            scope.$eval(attrs.repeatDone);
        }
    }
});


