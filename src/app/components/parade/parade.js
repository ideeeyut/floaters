(function () {
  function ParadeController(firebaseService, $firebaseArray, geoLocationService, $scope) {
    var $ctrl = this;

    $ctrl.floats = $firebaseArray(firebaseService.floats);

    $ctrl.findNearest = function () {
      console.log('finding nearest');
      var closest = geoLocationService.getDistanceBetween($ctrl.floats[0].position, $ctrl.coords);
      var closestIdx = 0;

      for (var i = 1; i < $ctrl.floats.length; i++) {
        var dist = geoLocationService.getDistanceBetween($ctrl.floats[i].position, $ctrl.coords);
        console.log(dist, closest, closestIdx);
        if (dist < closest) {
          closest = dist;
          closestIdx = i;
        }
      }

      $scope.active = closestIdx;
    };

    $scope.$watch('active', function (newIdx, oldIdx) {
      if (!angular.isDefined(newIdx) || !angular.isDefined($ctrl.coords)) {
        return;
      }

      $ctrl.distance = geoLocationService.getDistanceBetween($ctrl.floats[newIdx].position, $ctrl.coords);
    });

    geoLocationService.getCurrentPosition().then(function (data) {
      $ctrl.coords = {
        lat: data.coords.latitude,
        long: data.coords.longitude
      };


      $ctrl.distance = geoLocationService.getDistanceBetween($ctrl.floats[$scope.active].position, $ctrl.coords);
    });

  }
  angular.module('Floaters')
    .component('parade', {
      templateUrl: 'views/parade.html',
      controller: ['firebaseService', '$firebaseArray', 'geoLocationService', '$scope', ParadeController],
    });
}());