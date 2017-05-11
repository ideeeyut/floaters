 (function (angular) {
   angular.module('Firestarter')
     .service('geoLocationService', ['$q', '$window', function ($q, $window) {
         this.getCurrentPosition = function() {
            var deferred = $q.defer();

            if (!$window.navigator.geolocation) {
                deferred.reject('Geolocation not supported.');
            } else {
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        deferred.resolve(position);
                    },
                    function (err) {
                        deferred.reject(err);
                    });
            }

            return deferred.promise;            
         }
     }]);
 }(angular));