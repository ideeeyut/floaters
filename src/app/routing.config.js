(function (angular) {
  angular.module('Floaters')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('home', {
        url: '/',
        component: 'home',
      })
      .state('whatever', {
        url: '/whatever',
        component: 'whatever',
      })
      .state('floats', {
        url: '/floats',
        component: 'floats',
      });

      $urlRouterProvider.otherwise('/');
    }]);
}(angular));
