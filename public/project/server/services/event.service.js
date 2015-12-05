"use strict";

var nodemailer = new require("../../../../services/nodemailer.js")();
//console.log("nodemailer", nodemailer;
/*nodemailer.prototype.sendEmail()
.then(function(result){
	console.log("result of nodemailer", result);
});*/

module.exports = function(app, eventModel, db){
	
	// eventful api events
	app.get("/api/eventful/category", getEventfulCategories);
	app.get("/api/eventful/category/:category", getEventfulCategoryEvents);
	app.get("/api/eventful/event/:eventId", getEventfulEvent);

	// local events
	app.get("/api/local/event/:eventId", getLocalEvent);
	app.get("/api/local/event/user/:userId", getLocalEventsForUser);
	app.post("/api/local/event", createLocalEvent);
	app.post("/api/local/event/user/:userId/host", getUserAsHostEvents);
	app.post("/api/local/event/user/:userId/guest", getUserEventsAsGuest);

	// app.post("/api/project/user", createUser);
	// app.get("/api/project/user", handleGetUserRequets);
	// app.put("/api/project/user/:id", updateUser);
	// app.delete("/api/project/user/:userId", deleteUserById);
	

	function getEventfulCategories(req, res, next){
		eventModel.getEventfulCategories()
		.then(function(categories){
			res.json(categories);
		})
		.catch(function(error){
			console.log('getEventfulCategories user error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function getEventfulCategoryEvents(req, res, next){
		var category = req.params.category;
		eventModel.getEventfulCategoryEvents(category)
		.then(function(events){
			res.json(events);
		})
		.catch(function(error){
			console.log('getEventfulCategoryEvents user error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function getEventfulEvent(req, res, next){
		var eventId = req.params.eventId;
		eventModel.getEventfulEvent(eventId)
		.then(function(event){
			res.json(event);
		})
		.catch(function(error){
			console.log('getEventfulEvent user error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function getLocalEvent(req, res, next){
		var eventId = req.params.eventId;
		console.log("eventId outer", eventId);
		eventModel.getLocalEvent(eventId)
		.then(function(event){
			res.json(event);
		})
		.catch(function(error){
			console.log('getLocalEvent user error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function getLocalEventsForUser(req, res, next){
		var userId = req.params.userId;
		eventModel.getLocalEventsForUser(userId)
		.then(function(event){
			res.json(event);
		})
		.catch(function(error){
			console.log('getLocalEventsForUser user error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function createLocalEvent(req, res, next){
		if (!req.body){
			res.status(400).send({error: "Please supply an event object"});
		} else {
			var eventObject = req.body || {};
			eventModel.createLocalEvent(eventObject)
			.then(function(userEvents){
				res.json(userEvents);
			})
			.catch(function(error){
				console.log('createLocalEvent user error', JSON.stringify(error));
				res.status(400).send(JSON.stringify(error));
			});
		}
	}

	function getUserAsHostEvents(req, res, next){
		var userId = req.params.userId;
		if (!userId){
			res.status(400).send({error: "Please supply an event object"});
		} else {
			var eventObject = req.body || {};
			eventModel.getUserAsHostEvents(userId)
			.then(function(userEvents){
				res.json(userEvents);
			})
			.catch(function(error){
				console.log('getUserAsHostEvents user error', JSON.stringify(error));
				res.status(400).send(JSON.stringify(error));
			});
		}
	}

	function getUserEventsAsGuest(req, res, next){
		var userId = req.params.userId;
		if (!userId){
			res.status(400).send({error: "Please supply an event object"});
		} else {
			var eventObject = req.body || {};
			eventModel.getUserEventsAsGuest(userId)
			.then(function(userEvents){
				res.json(userEvents);
			})
			.catch(function(error){
				console.log('getUserEventsAsGuest user error', JSON.stringify(error));
				res.status(400).send(JSON.stringify(error));
			});
		}
	}
	
};