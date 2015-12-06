"use strict";

var q = require("q"),
http = require('http'),
Promise = require('bluebird'),
mongoose = require("mongoose");

var api = {
	config: {
		appKey: "z7m8NNZ7d6SXhtJv"
	}
};

module.exports = function(app, db){

	// Defining UserModel 
	var EventSchema = require('./event.schema.js'),
	EventModel = db.model('Event', EventSchema);

	function getEventfulCategories(){
		try {
			return new Promise(function(resolve, reject){
				var options = {
					host: "api.eventful.com",
					path: "/json/categories/list?app_key="+api.config.appKey,
					method: 'GET'
				};
				return getRequest(options)
				.then(function(responseData){
					return resolve(responseData);
				})
				.catch(function(error){
					return reject({error: error});
				});
			});
		} catch(error){
			return Promise.resolve({error: error});
		}
	}

	function getEventfulCategoryEvents(category){
		try {
			return new Promise(function(resolve, reject){
				var options = {
					host: "api.eventful.com",
					path: "/json/events/search?app_key="+api.config.appKey+"&category="+category,
					method: 'GET'
				};
				return getRequest(options)
				.then(function(responseData){
					return resolve(responseData);
				})
				.catch(function(error){
					return reject({error: error});
				});
			});
		} catch(error){
			return Promise.resolve({error: error});
		}
	}

	function getEventfulEvent(eventId){
		try {
			return new Promise(function(resolve, reject){
				var options = {
					host: "api.eventful.com",
					path: "/json/events/get?app_key="+api.config.appKey+"&id="+eventId,
					method: 'GET'
				};
				return getRequest(options)
				.then(function(responseData){
					return resolve(responseData);
				})
				.catch(function(error){
					return reject({error: error});
				});
			});
		} catch(error){
			return Promise.resolve({error: error});
		}
	}

	function registerEventfulEvent(eventId, userId){
		try {
			return new Promise(function(resolve, reject){
				EventModel.findOne({id: eventId, userId: userId, guest: true}, function(err, event){
					if (err || event){
						return reject(err || "You have already registered for this event");
					} else {
						getEventfulEvent(eventId)
						.then(function(eventfulEvent){
							if (typeof eventfulEvent == "string"){
								eventfulEvent = JSON.parse(eventfulEvent);
							}
							eventfulEvent.type = "eventful";
							eventfulEvent._id = mongoose.Types.ObjectId();
							eventfulEvent.guest = true;
							eventfulEvent.host = false;
							eventfulEvent.modified = new Date();
							eventfulEvent.userId = userId;
							EventModel.create(eventfulEvent, function(err, registeredEvent){
								if (err){
									//console.log("Error while createLocalEvent : ", err);
									return reject({error: err});
								} else {
									//var userEvents;

									getUserEventsAsGuest(registeredEvent.userId)
									.then(function(userEvents){
										return resolve(userEvents);
									})
									/*.then(function(userEventsAsGuest){
										userEvents = userEventsAsGuest;
										var recipients = registeredEvent.guestList; 
										recipients = recipients.split(",");
										console.log("recipients are", recipients);
										return resolve(recipients);
									})
									.map(function(recipient, index, arrlength){
										var message = registeredEvent && registeredEvent.notification ? registeredEvent.notification.message : "Your'e invited to "+registeredEvent.title;
										recipient = recipient.trim();
										return sendEmail(recipient, message);
									})
									.then(function(result){
										return resolve(userEvents);
									})*/
.catch(function(error){
	console.log("error", error);
	return reject({error: error});
});


									// Send email invites to people 
									sendEmail(registeredEvent.guestList, message);
								}
							});
})
.catch(function(error){
	return reject({error: error});
});
}
});
				/*var options = {
					host: "api.eventful.com",
					path: "/json/events/get?app_key="+api.config.appKey+"&id="+eventId,
					method: 'GET'
				};
				return getRequest(options)
				.then(function(responseData){
					return resolve(responseData);
				})
				.catch(function(error){
					return reject({error: error});
				});*/
});
} catch(error){
	return Promise.resolve({error: error});
}
}

function getLocalEvent(eventId){
	try {
		return new Promise(function(resolve, reject){
			EventModel.findOne({_id: eventId}, function(err, event){
				if (err || !event){
					return reject({error : err || "no event found with id:"+eventId});
				} else {
					return resolve(event);
				}
			});
		});
	} catch(error){
		return Promise.resolve({error: error});
	}
}

function getLocalEventsForUser(userId){
	try {
		return new Promise(function(resolve, reject){
			if (!userId){
				return reject({error: "Please supply a userId"});
			} else {
				EventModel.findOne({userId: userId}, function(err, userEvents){
					if (err || !userEvents){
						return reject({error : err || "no events found for userId:"+userId});
					} else {
						return resolve(userEvents);
					}
				});
			}
		});
	} catch(error){
		return Promise.resolve({error: error});
	}
}

function createLocalEvent(eventObject){
	try {
		return new Promise(function(resolve, reject){
			if (!eventObject || typeof eventObject !== 'object'){
				return reject({error : "please provide a valid eventObject"});
			} else {
				eventObject.id = eventObject._id = mongoose.Types.ObjectId();
				eventObject.type = "local";
				eventObject.created = eventObject.modified = new Date();
				eventObject.host = true;
				eventObject.guest = false;

				EventModel.create(eventObject, function(err, newlyCreatedEvent){
					if (err){
							//console.log("Error while createLocalEvent : ", err);
							return reject(err);
						} else {
							var userEvents;
							getUserAsHostEvents(newlyCreatedEvent.userId)
							.then(function(userEventsAsGuest){
								userEvents = userEventsAsGuest;
								var recipients = newlyCreatedEvent.guestList; 
								recipients = recipients.split(",");
								console.log("recipients are", recipients);
								return Promise.resolve(recipients);
							})
							.map(function(recipient, index, arrlength){
								var message = "Hi, \n you are invited to "+eventObject.title+"\n Event Description is as : "+eventObject.description+"\nEventAddress: "+eventObject.venue_address;
								message = newlyCreatedEvent && newlyCreatedEvent.notification && newlyCreatedEvent.notification.message ? newlyCreatedEvent.notification.message : message;
								recipient = recipient.trim();
								return sendEmail(recipient, message);
							})
							.then(function(result){
								return resolve(userEvents);
							})
							/*.then(function(userEvents){
								return resolve(userEvents);
							});*/
			}
		});
}
});
} catch(error){
	return Promise.resolve({error: error});
}
}

function getUserAsHostEvents(userId){
	try {
		return new Promise(function(resolve, reject){
			if (!userId){
				return reject({error: "Please supply a userId"});
			} else {
				EventModel.find({userId: userId, host: true}, function(err, userEvents){
					if (err){
						return reject({error : err});
					} else {
						if (!userEvents){
							userEvents = [];
						}
						return resolve(userEvents);
					}
				});
			}
		});
	} catch(error){
		return Promise.resolve({error: error});
	}
}

function getUserEventsAsGuest(userId){
	try {
		return new Promise(function(resolve, reject){
			if (!userId){
				return reject({error: "Please supply a userId"});
			} else {
				EventModel.find({userId: userId, guest: true}, function(err, userEvents){
					if (err){
						return reject({error : err});
					} else {
						if (!userEvents){
							userEvents = [];
						}
						return resolve(userEvents);
					}
				});
			}
		});
	} catch(error){
		return Promise.resolve({error: error});
	}
}

// HELPER METHODS

function getRequest(options){
	var self = this;
	try {
		return new Promise(function(resolve, reject){
			options = options || {};

			var callback = function(response) {
				var str = '';

				response.on('data', function (chunk) {
					str += chunk;
				});


				response.on('end', function () {
					return resolve(str);
				});

				response.on("error", function(error){
					return reject(error);
				});
			};

			http.request(options, callback).end();
		});
	}catch(error){
		console.log("caught an error in \"getRequest\" function");
		return Promise.reject(error);
	};
}

function sendEmail(recipient, message){
	console.log("Received mailing request for ", recipient);
	return new Promise(function(resolve, reject){
		if (recipient){
			var nodemailer = require("../../../../services/nodemailer.js")();
			if (validateEmail(recipient)){
				var options = {
					to: recipient,
					text: message
				}
				//Async sending of registration email
				nodemailer.prototype.sendEmail(options)
				.then(function(result){
					console.log("invite sent to", recipient);
					return resolve(recipient);
				});
			}
		}
	});
}

function validateEmail(email) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return re.test(email);
}

return {
	"getEventfulCategories": getEventfulCategories,
	"getEventfulCategoryEvents": getEventfulCategoryEvents,
	"getEventfulEvent": getEventfulEvent,
	"getLocalEvent": getLocalEvent,
	"getLocalEventsForUser": getLocalEventsForUser,
	"createLocalEvent": createLocalEvent,
	"getUserAsHostEvents": getUserAsHostEvents,
	"getUserEventsAsGuest": getUserEventsAsGuest,
	"registerEventfulEvent": registerEventfulEvent
	 	/*"createUser": createUser,
	 	"findAllUsers": findAllUsers,
	 	"findUserById": findUserById,
	 	"updateUser": updateUser,
	 	"deleteUserById": deleteUserById,
	 	"findUserByCredentials": findUserByCredentials,
	 	"findUserByEmail": findUserByEmail*/
	 };


	};