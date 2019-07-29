var express = require('express');
var router = express.Router();

var ctrProjects = require('../controllers/projects.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');

// Hotel routes
router
  .route('/projects')
  .get(ctrlHotels.projectsGetAll)
  .post(ctrlHotels.projectsAddOne);

router
  .route('/projects/:projectId')
  .get(ctrlHotels.projectsGetOne)
  .put(ctrlHotels.projectsUpdateOne);



// Authentication
router
  .route('/users/register')
  .post(ctrlUsers.register);

  router
    .route('/users/login')
    .post(ctrlUsers.login);

module.exports = router;