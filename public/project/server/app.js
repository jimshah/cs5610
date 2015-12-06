"use strict";

/*var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  cookieParser = require("cookie-parser"),
  session = require("express-session");*/

module.exports = function(app, db) {

    var userModel = require("./models/user.model.js")(app, db);
    var eventModel = require("./models/event.model.js")(app, db);
   	
   	/*passport.use(new LocalStrategy(function(email, password, done){
		userModel.findOne({email: email, password: password}, function(err, user){
			if (err){ return done(err);}
			else if (!user){ return done(null, false);}
			else {done(null, user);}
		});
	}));

	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(user, done){
		userModel.findById(user._id, function(err, user){
			done(null, user);
		});
	});*/

    //Including support for api service
    require("./services/api.service.js")(app, userModel, db);
        
    // Including support for user service
    require("./services/user.service.js")(app, userModel, db);

    // Including support for event service
    require("./services/event.service.js")(app, eventModel, db);

};