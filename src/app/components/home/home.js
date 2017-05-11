(function () {
  function HomeController() {

  }
  angular.module('Firestarter')
    .component('home', {
      templateUrl: 'views/home.html',
      controller: ['db', 'auth', 'authProvider', HomeController],
    });
}());
