angular.module('lutherconstruction').controller('RegisterController', RegisterController);

function RegisterController($http, $location) {
  var vm = this;

  vm.register = function() {
    var user = {
      name: vm.name,  
      username: vm.username,
      password: vm.password
    };

    vm.message ='';
    vm.error = '';

    if (!vm.username || !vm.password) {
      vm.error = 'Please add a username and a password.';
    }  
      if (!vm.name) {
        vm.error = 'Please add a name.';
      
    } else {
      if (vm.password !== vm.passwordRepeat) {
        vm.error = 'Please make sure the passwords match.';
      } else {
        $http.post('/api/users/register', user).then(function(response) {
          console.log(response.data);
          vm.message = response.data.message;
          vm.error = response.data.error;
        }).catch(function(error) {
          console.log(error);
        });
      }
    }
  }
};