(function () {
  function HomeController() {

  }
  angular.module('Floaters')
    .component('home', {
      templateUrl: 'views/home.html',
      controller: ['db', 'auth', 'authProvider', HomeController],
    });
}());
