(function(){
	'use strict';

	// Users service used for communicating with the users REST endpoint
	angular.module(app.applicationModuleName).factory('EventService', ['$window', '$http', '$q', '$rootScope', EventService]);

	//UserService  function
	function EventService ($window, $http, $q, $rootScope){

		//Local Empty Array of Events

		var events = [{
			type: "local",
			id: "4543473b-d068-1048-e846-f68e04ea5c63",
			userId: "4543473b-d068-1048-e846-f68e04ea5c61",

			venue_address: "99 Florence Street",
			city_name: "Malden",
			region_name: "Massachusetts",
			country_name: "USA",

			start_time: "2015-11-03 18:00:00",
			stop_time: "2015-11-03 23:00:00",

			created:"2015-09-17 13:06:17",
			modified: "2015-09-17 13:06:17",
			description: "Since Google first published the seminal paper on Big Table in 2006, other organizations have developed their own scalable databases and offered them open sourced or commercially Cassandra, Accumulo, Voldemort, Dynamo, and HBase are all based on Big Tables scalable infrastructure.   Big Table, itself, was not available until earlier this year, when Google announced that they were offering a hosted version for their cloud infrastructure. Setting up and managing infrastructures has been an enormous time sink for many data scientists.  Many hosted solutions are priced well out of the range of smaller startups (and grad students).  Even with funding, moving data between servers remains a bottleneck. Google offers incredible scalability with a low cost to entry.  Data is distributed to all clusters quickly and easily removing unnecessary delay. Ruth Stern will present on getting up and running on the google stack quickly and affordably, so the focus is on the data science and not the infrastructure or cost.  With step-by-step examples it will provide a tour of the Google Cloud, so participants can go out and build their out own Google stack and start their own experiments. Seattle Data Science is a Meetup group powered by Galvanize Seattle, a modern urban campus located in Pioneer Square that offers educational programming, community workspace, tech-related events, and venture capital. For more information on how you can level up yourself or your company, visit us at galvanize.com. ",
			title: "event title",
			date: "2015-12-17",

			attendees: []
		}];

		//////////////// Local Events Starts ////////////////

		function createEvent(eventObject){
			var deferred = $q.defer();

			$http.post("/api/local/event", eventObject)
			.success(function(userEvents){
				deferred.resolve(userEvents);
			})
			.error(function(error){
				if (error && error.message){
					deferred.reject(error.message);	
				} else{
					deferred.reject(error);
				}
			});
			return deferred.promise;
		}

		function getUserEventsAsHost(userId){
			var deferred = $q.defer();

			$http.post("/api/local/event/user/"+userId+"/host")
			.success(function(userEvents){
				deferred.resolve(userEvents);
			})
			.error(function(error){
				if (error && error.message){
					deferred.reject(error.message);	
				} else{
					deferred.reject(error);
				}
			});
			return deferred.promise;
		}

		function getLocalEventById(eventId){
			var deferred = $q.defer();

			$http.get("/api/local/event/"+eventId)
			.success(function(event){
				deferred.resolve(event);
			})
			.error(function(error){
				if (error && error.message){
					deferred.reject(error.message);	
				} else{
					deferred.reject(error);
				}
			});
			return deferred.promise;
		}

		//////////////// Local Events Ends ////////////////

		// Any event [local/eventful] that a user registers, we store it in mongo, 
		// keeping that user as guest for that event
		function getUserEventsAsGuest(userId){
			var deferred = $q.defer();

			$http.post("/api/local/event/user/"+userId+"/guest")
			.success(function(userEvents){
				deferred.resolve(userEvents);
			})
			.error(function(error){
				if (error && error.message){
					deferred.reject(error.message);	
				} else{
					deferred.reject(error);
				}
			});
			return deferred.promise;
		}

		//////////////// Eventful Events Starts ////////////////

		function getCategories(){
			var deferred = $q.defer();
			//$http.get('/api/categories')
			$http.get('/api/eventful/category')
			.success(function (response) {
				if (typeof response == "string"){
					response = JSON.parse(response);
				}
						//$window.categories = response;
						deferred.resolve(response);
					})
			.error(function (error) {
				deferred.reject(error);
			});
			return deferred.promise;
		}

		function categoryEvents(category){
			var deferred = $q.defer();
			//$http.get('/api/categories/'+category)
			$http.get('/api/eventful/category/'+category)
			.success(function (response) {
				if (typeof response == "string"){
					response = JSON.parse(response);
				}
				$window.categoryEvents = response;
				deferred.resolve(response);
			})
			.error(function (error) {
				deferred.reject(error);
			});
			return deferred.promise;
		}

		function getEventfulEvent(eventId){
			var deferred = $q.defer();
			$http.get('/api/eventful/event/'+eventId)
			.success(function (response) {
				if (typeof response == "string"){
					response = JSON.parse(response);
				}
				deferred.resolve(response);
			})
			.error(function (error) {
				deferred.reject(error);
			});
			return deferred.promise;
		}

		//////////////// Eventful Events Ends ////////////////


		/**
		 * [getUserEventsById description]
		 * @param  {[type]}   userId   [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		 function getUserEventsById(userId, callback){
		 	try {
		 		var userEvents = [];
		 		events.forEach(function(event, index){
		 			if (event && event.userId === userId){
		 				userEvents.push(event);
		 			}
		 		});
		 		return callback(null, userEvents);
		 	} catch(error){
		 		console.log("catched an Exception in 'getUserEventsById' method", error);
		 		return callback(error);
		 	}
		 }

		 function getUserRegisteredEvents(userId, callback){
		 	try {
		 		if (!userId){
		 			return callback("Please provide a valid userId");
		 		} else {
		 			var registeredEvents = [];
		 			events.forEach(function(event){
		 				if(event.attendees && event.attendees.indexOf(userId) > -1){
		 					registeredEvents.push(event);
		 				}
		 			});
		 			$rootScope.registeredEvents = registeredEvents;
					//Braodcast userEvents
					$rootScope.$broadcast('userRegisteredEvents', registeredEvents);
					return callback(null, registeredEvents);
				}
			} catch(error){
				console.log("catched an Exception in 'getUserRegisteredEvents' method", error);
				return callback(error);
			}
		}

		function registerEvent(userId, givenEvent){
			var deferred = $q.defer();
			if (!userId){
				deferred.reject("Please supply proper userId");
			} else if (!givenEvent){
				deferred.reject("Please supply proper givenEvent");
			} else {
				var eventId = givenEvent.id;
				$http.get('/api/eventful/event/'+eventId+'/user/'+userId+'/register')
				.success(function (response) {
					if (typeof response == "string"){
						response = JSON.parse(response);
					}
					deferred.resolve(response);
				})
				.error(function (error) {
					deferred.reject(error);
				});

			}
			return deferred.promise;
		}

		function getEventById(eventId, callback){
			try {
				var eventToReturn;
				events.forEach(function(event, index){
					if (event.id === eventId){
						eventToReturn = event;
					}
				});
				if (eventToReturn){
					return callback(null, eventToReturn);
				} else {
					return callback("No event found with eventId "+eventId);
				}
			} catch(error){
				console.log("catched an Exception in 'getEventById' method", error);
				return callback(error);
			}
		}


		/**
		 * [guid generates a unique id]
		 * @return String [a unique id]
		 */
		 function guid() {
		 	function s4() {
		 		return Math.floor((1 + Math.random()) * 0x10000)
		 		.toString(16)
		 		.substring(1);
		 	}
		 	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		 	s4() + '-' + s4() + s4() + s4();
		 }

		 Number.prototype.padLeft = function(base,chr){
		 	var  len = (String(base || 10).length - String(this).length)+1;
		 	return len > 0? new Array(len).join(chr || '0')+this : this;
		 }

		 function formatDate(d){
		 	if (!d){
		 		return
		 	} else {
		 		return [(d.getMonth()+1).padLeft(),
		 		d.getDate().padLeft(),
		 		d.getFullYear()].join('/') +' ' +
		 		[d.getHours().padLeft(),
		 		d.getMinutes().padLeft(),
		 		d.getSeconds().padLeft()].join(':');
		 	}
		 }

		//Creating a UserService
		var eventService = {
			getUserEventsById: getUserEventsById ,
			registerEvent: registerEvent,
			getUserRegisteredEvents: getUserRegisteredEvents,
			getEventById: getEventById,

			"createEvent": createEvent,
			"getUserEventsAsHost": getUserEventsAsHost,
			"getUserEventsAsGuest": getUserEventsAsGuest,
			"getCategories": getCategories,
			"categoryEvents": categoryEvents,
			"getEventfulEvent": getEventfulEvent,
			"getLocalEventById": getLocalEventById
		};
		return eventService;		
	};

})();