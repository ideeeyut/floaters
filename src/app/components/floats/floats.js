(function () {
  function FloatsController(firebaseService, $firebaseArray, $uibModal, $log, $document) {
    var $ctrl = this;

    $ctrl.newFloat = {
      name: 'BOgus NaME',
      description: '',
      imageUrl: '',
      position: null
    };

    $ctrl.floats = $firebaseArray(firebaseService.floats);

    $ctrl.openEditFloat = function (float) {
      var modalInstance = $uibModal.open({
        animation: true,
        component: 'modalComponent',
        resolve: {
          float: function () {
            return float;
          }
        }
      });

      modalInstance.result.then(function (newFloat) {
        $ctrl.saveFloat(newFloat);
      }, function () {
        $log.info('modal-component dismissed at: ' + new Date());
      });
    }

    $ctrl.saveFloat = (float) => {
      const save = (float.$id) ? $ctrl.floats.$save : $ctrl.floats.$add;

      float.position.lat = parseFloat(float.position.lat);
      float.position.long = parseFloat(float.position.long);

      save(float)
        .then((newRef) => {
          float.$id = newRef.key;
          // tagService.applySelectedTags(event, types.event);
          $ctrl.newFloat = {};
        });
    };
  }

  angular.module('Floaters')
    .component('floats', {
      templateUrl: 'views/floats.html',
      controller: ['firebaseService', '$firebaseArray', '$uibModal', '$log', '$document', FloatsController],
    });

  angular.module('Floaters').component('modalComponent', {
    templateUrl: 'addFloat.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: function () {
      var $ctrl = this;

      $ctrl.$onInit = function () {
        $ctrl.float = $ctrl.resolve.float;
      };

      $ctrl.ok = function () {
        $ctrl.close({
          $value: $ctrl.float
        });
      };

      $ctrl.cancel = function () {
        $ctrl.dismiss({
          $value: 'cancel'
        });
      };
    }
  });
}());