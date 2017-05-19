(function () {
  function FloatsController(db, auth, authProvider) {
    this.countries = ['Albania','Belgium','Bulgaria','Canada','Croatia','Czech Republic','Denmark','Estonia','France','Germany','Greece','Hungary','Iceland','Italy','Latvia','Lithuania','Luxembourg','Netherland','Norway','Poland','Portugal','Romania','Slovakia','Slovenia','Spain','Turkey','United Kingdom','United States'];

      // db.ref('parade').set({
      //   countries: this.countries
      // });

      function success(pos) {
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
      };

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };

      window.navigator.geolocation.getCurrentPosition(success, error);
  }

  angular.module('Floaters')
    .component('floats', {
      templateUrl: 'views/floats.html',
      controller: ['db', 'auth', 'authProvider', FloatsController],
    });
}());
