var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var engine = require('consolidate'); 

// Define the port to run on
app.set('port', (process.env.PORT || 5000));



// Set static directory before defining routes
app.use(express.static(path.join(__dirname, '/public')));


app.set('views', __dirname + '/public');
app.engine('html', engine.mustache);
app.set('view engine', 'html');


app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.sendfile('public/index.html');
});
app.get('/contact', function(req, res){
    res.render('contact', { title: 'Raging Flame Laboratory - Contact', page: 'contact' })
});

app.post('/contact', function (req, res) {
	var mailOpts, smtpTrans;

	//Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    xoauth2: xoauth2.createXOAuth2Generator({
    user: 'stephenjovon@gmail.com',
    pass: 'Bulldogz1'
})
  }
});

  //Mail options
  mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: 'stephenjovon@gmail.com',
      subject: 'Website contact form',
      text: req.body.message
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
          res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
      }
      //Yay!! Email sent
      else {
          res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
      }
  });
});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});