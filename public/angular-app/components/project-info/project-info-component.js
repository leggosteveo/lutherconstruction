angular.module('lutherconstruction').component('projectInfo', {
  templateUrl: 'angular-app/components/project-info/projectInfo.html',
  bindings: {
    data: '=',
    newStatus:'&',
  }
});