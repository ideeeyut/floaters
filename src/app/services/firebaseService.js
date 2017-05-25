(function (angular) {
  function getUserRef(db, $rootScope, $q) {
    return $q((resolve) => {
      $rootScope.getUser
        .then((user) => {
          resolve(db.ref(user.uid));
        });
    });
  }

  angular.module('Floaters')
    .service('firebaseService', ['db', '$rootScope', '$q', function (db, $rootScope, $q) {
      this.getUserRef = () => getUserRef(db, $rootScope, $q);
      this.rootRef = db.ref();
      this.floats = db.ref('floats');
//      this.accounts = db.ref('accounts');
//      this.requests = db.ref('collaborationRequests');
    }]);
}(angular));