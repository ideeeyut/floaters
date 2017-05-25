(function () {
  function WhateverController(geoLocationService) {
    var self = this;
    geoLocationService.getCurrentPosition().then(function (data) {
      console.log(data);
      self.coords = {
        lat: data.coords.latitude,
        long: data.coords.longitude
      };

      var crd1 = {
        lat: 36.847663,
        long: -76.293295
      };

      var crd2 = {
        lat: 36.844100,
        long: -76.287566
      };

      self.distance = geoLocationService.getDistanceBetween(self.coords, crd2);

    });

  }
  angular.module('Floaters')
    .component('whatever', {
      templateUrl: 'views/whatever.html',
      controller: ['geoLocationService', WhateverController],
    });
}());