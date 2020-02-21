var mongoose = require('mongoose');
var User     = mongoose.model('User');
var bcrypt   = require('bcrypt');
var jwt      = require('jsonwebtoken');

module.exports.register = function(req, res) {
  console.log('registering user');

  var username = req.body.username;
  var name = req.body.name || null;
  var password = req.body.password;

  User.findOne({'username': username}, function (err, user) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
        if (user) {
          console.log('User found');
          res.json({"error": 'Username already taken', "message": ''});
        }
        else { 
        var newUser = new User();
        newUser.name = name;
        newUser.username = username;
        newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        newUser.save(function(err, result) {
          if (err) {
          res.status(400).json(err);
          }
          else {
          console.log('User created');  
          res.json({"message": 'User created successfully, please login.', "error": ''});
          }  
        });
      } 
    }
  });
};

module.exports.login = function(req, res) {
  console.log('logging in user');
  var username = req.body.username;
  var password = req.body.password;
  // Find user in db
  User.findOne({
    username: username
  }).exec(function(err, user) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      if (bcrypt.compareSync(password, user.password)) {
      //if (password === user.password) {
        console.log('User found', user);
        var token = jwt.sign({ username: user.username, role : user.role, name : user.name}, 's3cr3t', { expiresIn: 3600 });
        res.status(200).json({success: true, token: token});
      } else {
        res.status(401).json('Unauthorized');
      }
    }
  });
};

module.exports.authenticate = function(req, res, next) {
  var headerExists = req.headers.authorization;
  if (headerExists) {
    var token = req.headers.authorization.split(' ')[1]; //--> Authorization Bearer xxx
    jwt.verify(token, 's3cr3t', function(error, decoded) {
      if (error) {
        console.log(error);
        res.status(401).json('Unauthorized');
      } else {
        req.user = decoded.username;
        next();
      }
    });
  } else {
    res.status(403).json('No token provided');
  }
};