angular.module('lutherconstruction').controller('ProfileController', ProfileController);

function ProfileController($route, $routeParams, $scope, $window, projectDataFactory, jwtHelper, Statuses) {
	var vm = this;
	var token = jwtHelper.decodeToken($window.sessionStorage.token);
	var name = token.name;
    var username = token.username;
	var role = token.role; 

	
	vm.role = role;
	vm.name = name;
	vm.user = username;
	var projectSearch = {};

	if(vm.role != 'admin')  {
	var projectSearch = {role : vm.role, user: vm.user};
	}
	console.log(projectSearch);
	projectDataFactory.projectList(projectSearch).then(function(response) {
		$scope.projects = response.data;
	});

	console.log(projectSearch);
	$scope.setStatus = function(id, status) {
		projectDataFactory.projectUpdate(id, status).then(function(response) {
		if (response.status === 200) {
			$route.reload();
			}
		}).catch(function(error) {
			console.log(error);
		});
	};
	$scope.statuses = Statuses;
	$scope.username = username;
}