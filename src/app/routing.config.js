(function (angular) {
  angular.module('Floaters')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('parade', {
          url: '/',
          component: 'parade',
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