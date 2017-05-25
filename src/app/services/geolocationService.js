 (function (angular) {
     angular.module('Floaters')
         .service('geoLocationService', ['$q', '$window', function ($q, $window) {
             this.getCurrentPosition = function () {
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
             };

             this.getDistanceBetween = function (crd1, crd2) {
                 console.log(crd1, crd2);
                 var R = 6371; // Radius of the earth in km
                 var dLat = deg2rad(crd2.lat - crd1.lat); // deg2rad below
                 var dLon = deg2rad(crd2.long - crd1.long);
                 var a =
                     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                     Math.cos(deg2rad(crd1.lat)) * Math.cos(deg2rad(crd2.lat)) *
                     Math.sin(dLon / 2) * Math.sin(dLon / 2);
                 var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                 var d = R * c; // Distance in km
                 return d;
             }

             function deg2rad(deg) {
                 return deg * (Math.PI / 180)
             }
         }]);
 }(angular));