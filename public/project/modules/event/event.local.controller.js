(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "localEvent";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("LocalEventController", ['$scope', '$http', '$rootScope', '$location', 'Event', '$routeParams', 'EventService', 
		function($scope, $http, $rootScope, $location, Event, $routeParams, EventService) {
			$scope.eventId = $routeParams.eventId;

			//listen for login/sigin to grab logged in user
			$rootScope.$on("auth", function(event, user){
				$scope.error = $scope.success = "";
				$scope.user = $rootScope.user = user;
			});
			//listen for login/sigin to grab logged in user
			$rootScope.$on("userEvents", function(event, events){
				console.log("on auth");
				$scope.error = $scope.success = "";
				$scope.events = $rootScope.events = events;
			});

			$scope.initializeEventdetails = function(eventId){
				EventService.getEventById(eventId, function(error, eventObject){
					if (error){
						$scope.error = error;
					} else {
						$scope.event = eventObject;
					}
				})
			};

			/*$scope.register = function(){
				$scope.error=$scope.success="";
				if ($scope.user && $scope.user.id) {
					$scope.event.type="api";
					EventService.registerEvent($scope.user.id, $scope.event, function(error, registeredEvents){
						if (error){
							console.log(error);
							$scope.error = error;
						} else {
							$scope.success = "Successfully registered for this event";
						}
					});
				} else {
					$scope.error = "Please Login to register for this event";
				}
			};*/

			$scope.initializeEventdetails($scope.eventId);

		}]);

})();