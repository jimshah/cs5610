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
			date: "2015-12-17"
		}];

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

		 function createEvent(eventObject, callback){
		 	try {
		 		if (!eventObject || typeof eventObject !== 'object'){
		 			return callback("Please provide a proper event object");
		 		} else {
		 			eventObject.id = guid();
		 			eventObject.created = eventObject.modified = formatDate(new Date());
		 			eventObject.type="local";
		 			events.push(eventObject);
		 			return getUserEventsById(eventObject.userId, callback);
		 		}
		 	} catch(error){
		 		console.log("catched an Exception in 'createUserEvent' method", error);
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
			createEvent: createEvent
		};
		return eventService;		
	};

})();