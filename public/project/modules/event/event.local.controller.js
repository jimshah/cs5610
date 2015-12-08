(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "localEvent";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("LocalEventController", ['$scope', '$http', '$rootScope', '$location', '$routeParams', 'EventService', 
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

			$scope.register = function(){
				$scope.error=$scope.success="";
				if ($scope.user && $scope.user.id && $scope.event) {
					$scope.event.type="local";
					EventService.registerLocalEvent($scope.user.id, $scope.event)
					.then(function(userRegisteredEvents){
						$rootScope.$broadcast('userRegisteredEvents', userRegisteredEvents);
						$scope.success = "Successfully registered for this event";
						$scope.disabled = true;
					})
					.catch(function(error){
						$scope.error = error;
					});
				} else {
					$scope.error = "Please Login to register for this event";
				}
			};

			$scope.hasRegistered = function(){
				$scope.disabled = false;
				if ($scope.user && $scope.user.id  && $scope.event){
					$scope.disabled = false;
					EventService.getUserEventsAsGuest($scope.user.id)
					.then(function(userEvents){
						if (userEvents){
							userEvents.forEach(function(event){
								if (event.id == $scope.event.id){
									$scope.disabled = true;
								}
							});
						}
					})
					.catch(function(error){

					});
				}
			}

			$scope.editEvent = function(){
				$location.path("/event/edit/"+$scope.event.id);
			}

			$scope.initializeEventdetails = function(eventId){
				EventService.getLocalEventById(eventId)
				.then(function(eventObject){
					$scope.event = eventObject;
					$scope.hasRegistered();
				})
				.catch(function(error){
					$scope.error = error;
				});
			};

			$scope.initializeEventdetails($scope.eventId);

		}]);

})();