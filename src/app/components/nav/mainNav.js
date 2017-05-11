(function () {
  function MainNavController(auth, authProvider) {
    function login() {
      // firebase.config.js sets $rootScope.user async
      auth.signInWithPopup(authProvider);
    }

    this.login = login;
  }
  angular.module('Firestarter')
    .component('mainNav', {
      templateUrl: 'views/mainNav.html',
      controller: ['auth', 'authProvider', MainNavController],
      controllerAs: 'mainNavController',
    });
}());

