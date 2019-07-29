angular.module('lutherconstruction').controller('NavController', ['$rootScope', NavController]); 
	
function NavController ($rootScope, AuthFactory, $location, $window) {
	var vm = this;
	vm.isLoggedIn = function() {
    	if (AuthFactory.isLoggedIn) {
      		return true;
    	} 
    	else {
      		return false;
    	}
  };
  
  vm.isActiveTab = function(url) {
    var currentPath = $location.path().split('/')[1];
    return (url === currentPath ? 'active' : '');
  }

  $rootScope.$on("UserLogin",
    function () {
      AuthFactory.isLoggedIn = true;
      vm.isLoggedIn();
    })
}