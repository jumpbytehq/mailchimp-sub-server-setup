var http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request');

var app = express();

app.use(bodyParser.urlencoded({ extended: false })); // su
app.use(bodyParser.json()); 

var MAILCHIMP_API_KEY = "put your key here";

// routes will go here
var registerWithMailchimp = function(email, cb){
	var options = {
		uri: 'https://us13.api.mailchimp.com/3.0/lists/your list number/members',
	    method: 'POST',
	    headers: {
	        accept: 'application/json',
	        'Authorization': 'anystring ' + MAILCHIMP_API_KEY
	    },
	    body: JSON.stringify({
	    	email_address: email,
	    	status: 'subscribed'
	    }),
	};
	
	request(options,function(error, response, body){	    
		if (error) {
		  return console.error('request failed:', error);
		}
		console.log('Request successful!  Server responded with:', body);
	});
}

app.post('/subscribe', function(req, res) {
	console.log(req.body);
	if(!req.body){
		console.log("no request body found");
		res.sendStatus(400);
		return;
	}

    var email = req.body.email;
    registerWithMailchimp(email, function(){
    	console.log("subscription done");
    });
    res.sendStatus(200);    
});

// start the server
var port = process.env.PORT || 8080;
var server = http.createServer(app);
server.listen(port, function() {
  console.log('Server running on port ' + port);
});