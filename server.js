var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require("morgan");
/*var  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  cookieParser = require("cookie-parser"),
  session = require("express-session");*/

// Load app configs
var config          = require('./config')();            // load configuration
//console.log("Config is ", config);

var db = (require('./database/mongo.js')(config.db.mongodb)).connect("cs5610");
//console.log("db", db);

//  Set the environment variables we need.
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//App usages
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));

/*app.use(session({secret: "J0inU5"}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());*/

//JSONIFY ERROR
require("./helpers/jsonify-error.js");

//Load Routes
//require("./app/routes")(app, db);


//Load Assignment Server App
require("./public/assignment/server/app.js")(app, db);

//Load Project Server App
require("./public/project/server/app.js")(app, db);

// Handle 404
/*app.use(function(req, res) {
	res.redirect(302, '/not-found.html');
	//res.send('404: Page not Found', 404);
});*/

  // Handle 500
  app.use(function(error, req, res, next) {
  	res.send('500: Internal Server Error', 500);
  });

  app.listen(port, ipaddress, function() {
  	console.log("EXPRESS server started on port "+port); 
  });