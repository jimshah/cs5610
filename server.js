var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require("morgan");


//  Set the environment variables we need.
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//App usages
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(morgan("dev"));

app.listen(port, ipaddress, function() {
	console.log("EXPRESS server started on port "+port); 
});