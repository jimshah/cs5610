(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "event";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("EventController", ['$scope', '$http', '$location', 'Event', '$routeParams', 
		function($scope, $http, $location, Event, $routeParams) {
			$scope.eventId = $routeParams.eventId;

			$scope.initializeEventdetails = function(eventId){
				Event.event(eventId)
				.then(function(eventObject){
					$scope.event = eventObject;
				});
			};

			$scope.initializeEventdetails($scope.eventId);

		}]);

})();