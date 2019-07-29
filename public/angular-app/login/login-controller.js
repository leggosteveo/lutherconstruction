angular.module('lutherconstruction').controller('LoginController',['$rootScope', '$scope', '$http', '$location', '$window', 'AuthFactory', 
'jwtHelper', LoginController]);

function LoginController($rootScope, $scope, $http, $location, $window, AuthFactory, jwtHelper) {
	

  var vm = this;

  $scope.$on("UserLogin", function () {
    $scope.isLoggedIn();
  })

  $scope.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  

    $scope.isActiveTab = function(url) {
    var currentPath = $location.path().split('/')[1];
    return (url === currentPath ? 'active' : '');
  }

  $scope.login = function() {
    if (vm.username && vm.password) {
      var user = {
        username: vm.username,
        password: vm.password
      };

      $http.post('/api/users/login', user).then(function(response) {
        if (response.data.success) {
          $window.sessionStorage.token = response.data.token;
          AuthFactory.isLoggedIn = true;
          var token = $window.sessionStorage.token;
          var decodedToken = jwtHelper.decodeToken(token);
          $rootScope.$broadcast("UserLogin");
          $location.path('/profile');
        }
      }).catch(function(error) {
        console.log(error);
      })

    }
  }

  $scope.logout = function() {
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    $location.path('/');
  }

}