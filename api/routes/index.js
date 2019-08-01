var express = require('express');
var router = express.Router();

var ctrlProjects = require('../controllers/projects.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');

// Project routes
router
  .route('/projects/')
  .get(ctrlProjects.projectsGetAll)
  .post(ctrlProjects.projectsAddOne);

router
  .route('/projects/:projectId')
  .get(ctrlProjects.projectsGetOne)
  .put(ctrlProjects.projectsUpdateOne);



// Authentication
router
  .route('/users/register')
  .post(ctrlUsers.register);

  router
    .route('/users/login')
    .post(ctrlUsers.login);

module.exports = router;