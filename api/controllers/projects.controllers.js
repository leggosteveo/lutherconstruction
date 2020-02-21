var mongoose = require('mongoose');
var Project = mongoose.model('Project');

module.exports.projectsGetAll = function(req, res) {
  console.log('Requested by: ' + req.user);
  console.log('GET the projects');
  console.log(req.query);
  console.log(req.body);

  var offset = 0;
  var count = 5;
  var maxCount = 50;
  var userRole = req.body.role;
  var user = req.body.user;
  var projectSearch = ({[userRole]:user} || null);
  console.log(userRole);
  console.log(user);
  console.log(projectSearch);

  Project
  .find(projectSearch)
  .skip(offset)
  .limit(count)
  .exec(function(err, projects) {
    console.log(err);
    console.log(projects);
    if (err) {
      console.log("Error finding projects");
      res
      .status(500)
      .json(err);
    } 
    else {
      console.log("Found projects", projects.length);
      res
      .json(projects);
    }
  });

};

module.exports.projectsGetOne = function(req, res) {
  var id = req.params.projectId;

  console.log('GET projectId', id);

  Project
  .findById(id)
  .exec(function(err, doc) {
    var response = {
      status : 200,
      message : doc
  };
  if (err) {
      console.log("Error finding project");
      response.status = 500;
      response.message = err;
  } 
  else if(!doc) {
    console.log("ProjectId not found in database", id);
    response.status = 404;
    response.message = {
        "message" : "Project ID not found " + id
    };
  }
    res
    .status(response.status)
    .json(response.message);
  });

};

var _splitArray = function(input) {
  var output;
  if (input && input.length > 0) {
    output = input.split(";");
  } else {
    output = [];
  }
  return output;
};

module.exports.projectsAddOne = function(req, res) {
  console.log("POST new project");

  Project
    .create({
      projectName : req.body.customerName + ' - ' + req.body.typeofProject,
      customerName : req.body.customerName,
      typeofProject: req.body.typeofProject,
      projectTimeFrame : req.body.projectTimeFrame,
      projectBudget: req.body.projectBudget,
      photos : _splitArray(req.body.photos),
      location : {
        address : req.body.address,
        coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      }
    }, function(err, project) {
      if (err) {
        console.log("Error creating project");
        res
          .status(400)
          .json(err);
      } else {
        console.log("project created!", project);
        res
          .status(201)
          .json(project);
      }
    });

};


module.exports.projectsUpdateOne = function(req, res) {
  var projectId = req.params.projectId;

  console.log('GET projectId', projectId);

  Project
    .findById(projectId)
    .select()
    .exec(function(err, project) {
      if (err) {
        console.log("Error finding project");
        res
          .status(500)
          .json(err);
          return;
      } else if(!project) {
        console.log("Project Id not found in database", projectId);
        res
          .status(404)
          .json({
            "message" : "Project ID not found " + projectId
          });
          return;
      }

      project.projectStatus = req.body.projectStatus;

      project
        .save(function(err, projectUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });


    });

};