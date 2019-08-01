angular.module('lutherconstruction').controller('ProjectController', ProjectController);

function ProjectController($route, $routeParams, $scope, $window, AuthFactory, projectDataFactory, jwtHelper) {
	var vm = this;
	var id = $routeParams.id;

	projectDataFactory.projectDisplay(id).then(function(response) {
    $scope.project = response.data;
});

    $scope.isLoggedIn = function() {
    	if (AuthFactory.isLoggedIn) {
      		return true;
    	} else {
      		return false;
    	 }
  	};
    
}