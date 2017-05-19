(function () {
  function WhateverController(geoLocationService) {
    var self = this;
    geoLocationService.getCurrentPosition().then(function(data) {
      console.log(data);
      self.coords = {
        lat: data.coords.latitude,
        long: data.coords.longitude
      };
    });
  }
  angular.module('Floaters') 
    .component('whatever', {
      templateUrl: 'views/whatever.html',
      controller: ['geoLocationService', WhateverController],
    });
}());
