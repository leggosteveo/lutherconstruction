var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var engine = require('consolidate'); 

// Define the port to run on
app.set('port', (process.env.PORT || 5000));


// Set static directory before defining routes
app.use(express.static(path.join(__dirname, '/public')));


app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');


app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
  res.sendfile('public/index.html');
});

app.get('/bodyPaTest', function (req, res) {
	console.log(req.body);
	res.end(req.body)
});

var smtpTrans = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'lutherconstllc@gmail.com',
    pass: 'Bi11tRit3'
    }
  });

app.post('/contact', function (req, res) {
	var mailOpts;

	//Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
 
  //Mail options
  mailOpts = {
      from: req.body.Name + ' &lt;' + req.body.Email+ '&gt;', //grab form data from the request body object
      to: 'stephenjovon@gmail.com',
      subject: 'Website contact form',
      text: req.body.Message
  };
 smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
      	  console.log('Error.');
          res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
      }
      //Yay!! Email sent
      else {
      	  console.log('Message Sent.')
      	  console.log(req.body.Name + req.body.Email)
          res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
      }

  });
});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});