(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "eventEdit";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("EventEditController", ['$scope', '$http', '$rootScope', '$location', '$routeParams', 'EventService', 
		function($scope, $http, $rootScope, $location, $routeParams, EventService) {
			$scope.eventId = $routeParams.eventId;

			//listen for login/sigin to grab logged in user
			$rootScope.$on("auth", function(event, user){
				$scope.error = $scope.success = "";
				$scope.user = $rootScope.user = user;
			});
			//listen for login/sigin to grab logged in user
			$rootScope.$on("userEvents", function(event, events){
				$scope.error = $scope.success = "";
				$scope.events = $rootScope.events = events;
			});

			$scope.update = function(){
				EventService.updateEvent($scope.event)
				.then(function(updatedEvent){
					$scope.event = updatedEvent;
					$scope.event.date = new Date($scope.event.date);
					$scope.event.start_time = new Date($scope.event.start_time);
					$scope.event.stop_time = new Date($scope.event.stop_time);
					$scope.success = "Successfully updated event";
				})
				.catch(function(error){
					$scope.error = error;
				});
			}

			$scope.initializeEventEdit = function(eventId){
				EventService.getLocalEventById(eventId)
				.then(function(eventObject){
					$scope.event = eventObject;
					$scope.event.date = new Date($scope.event.date);
					$scope.event.start_time = new Date($scope.event.start_time);
					$scope.event.stop_time = new Date($scope.event.stop_time);
				})
				.catch(function(error){
					$scope.error = error;
				});
			}

			$scope.initializeEventEdit($scope.eventId);

		}]);

})();