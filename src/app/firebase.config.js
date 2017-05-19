(function (angular, firebase) {
  const firebaseConn = firebase.initializeApp({
    apiKey: 'AIzaSyAxVfoAzfvSXqNb4IYvVHdRBA1v2HmiJZI',
    authDomain: 'firestarter-c211c.firebaseapp.com',
    databaseURL: 'https://firestarter-c211c.firebaseio.com',
    storageBucket: 'firestarter-c211c.appspot.com',
    messagingSenderId: '37797816176',
  });

  angular.module('Floaters')
    .constant('db', firebaseConn.database())
    .constant('auth', firebase.auth())
    .constant('authProvider', new firebase.auth.GoogleAuthProvider())
    .run(['$rootScope', function ($rootScope) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          $rootScope.user = user; // eslint-disable-line no-param-reassign
          $rootScope.$digest();
        }
      });
    }]);
}(angular, firebase));
