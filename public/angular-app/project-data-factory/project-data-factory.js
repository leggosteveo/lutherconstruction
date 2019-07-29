angular.module('lutherconstruction').factory('projectDataFactory', projectDataFactory);

function projectDataFactory($http) {
  return {
    projectList: projectList,
    projectDisplay: projectDisplay
  };

  function projectList(projectSearch) {
    return $http.get('/api/projects/' + projectSearch ).then(complete).catch(failed);
  }

  function projectDisplay(id) {
    return $http.get('/api/projects/' + id).then(complete).catch(failed);
  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}