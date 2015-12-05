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

	function getLocalEvent(eventId){
		try {
			return new Promise(function(resolve, reject){
				console.log("eventId", eventId);
				EventModel.findOne({id: eventId}, function(err, event){
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
							console.log("created a new event", newlyCreatedEvent);
							getLocalEventsForUser(newlyCreatedEvent.userId)
							.then(function(userEvents){
								return resolve(userEvents);
							});
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
					EventModel.findOne({userId: userId, host: true}, function(err, userEvents){
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
					EventModel.findOne({userId: userId, guest: true}, function(err, userEvents){
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

	return {
		"getEventfulCategories": getEventfulCategories,
		"getEventfulCategoryEvents": getEventfulCategoryEvents,
		"getEventfulEvent": getEventfulEvent,
		"getLocalEvent": getLocalEvent,
		"getLocalEventsForUser": getLocalEventsForUser,
		"createLocalEvent": createLocalEvent,
		"getUserAsHostEvents": getUserAsHostEvents,
		"getUserEventsAsGuest": getUserEventsAsGuest
	 	/*"createUser": createUser,
	 	"findAllUsers": findAllUsers,
	 	"findUserById": findUserById,
	 	"updateUser": updateUser,
	 	"deleteUserById": deleteUserById,
	 	"findUserByCredentials": findUserByCredentials,
	 	"findUserByEmail": findUserByEmail*/
	 };


	};