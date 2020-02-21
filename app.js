require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./api/routes');
var nodemailer = require('nodemailer');
var engine = require('consolidate');
var Mailgun = require('mailgun-js'); 

// Define the port to run on
app.set('port', (process.env.PORT || 4000));


// Set static directory before defining routes
app.use(express.static(path.join(__dirname, '/public')));


app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');


app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Add some routing
app.use('/api', routes);

//Your api key, from Mailgun’s Control Panel
var api_key = 'pubkey-f58715c2d0a5c00d833343f058b223f7';

//Your domain, from the Mailgun Control Panel
var domain = 'lutherconstllc.herokuapp.com';

//Your sending email address
var from_who = 'jluther@lutherconstllc.com';



app.get('/', function(req, res) {
  res.sendfile('public/index.html');
});

app.get('/bodyPaTest', function (req, res) {
	console.log(req.body);
	res.end(req.body)
});

var smtpTrans = nodemailer.createTransport({
  service: 'Mailgun', 
  auth: {
    user: 'postmaster@sandbox5c61e388593e4440bf0d3e030189e951.mailgun.org',
    pass: '4502e1f18713ccbf499a6e4c3a23c23d'
    }
  });

app.post('/contact', function (req, res) {

  var mailOpts;

	//Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
 
  //Mail options
  mailOpts = {
      from: req.body.Email, //grab form data from the request body object
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
      	  console.log(req.body.Name + " " + req.body.Email)
          res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
      }

  });
  /*
      //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});

    var data = {
    //Specify email data
      from: from_who,
    //The email to contact
      to: 'stephenjovon@gmail.com',
    //Subject and text data  
      subject: 'Hello from Mailgun',
      text: req.params.Message
    }

    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            res.render('error', { error : err});
            console.log("got an error: ", err);
        }
        //Else we can greet    and leave
        else {
            //Here "submitted.jade" is the view file for this landing page 
            //We pass the variable "email" from the url parameter in an object rendered by Jade
            res.render('submitted', { email : req.params.mail });
            console.log(body);
        }
    });
*/

});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});