angular.module('lutherconstruction').factory('projectDataFactory', projectDataFactory);

function projectDataFactory($http) {
  return {
    projectList: projectList,
    projectDisplay: projectDisplay,
    projectUpdate : projectUpdate
  };

  function projectList() {
    return $http.get('/api/projects/').then(complete).catch(failed);
  }

  function projectDisplay(id) {
    return $http.get('/api/projects/' + id).then(complete).catch(failed);
  }

  function projectUpdate(id, status) {
    return $http.put('api/projects' + id, status).then(complete).catch(failed);
  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}