(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "createEvent";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining CreateEventController - for Event create Page
	angular
	.module(moduleName)
	.controller("CreateEventController", ['$scope', '$rootScope', '$location', '$window', 'UserService', 'EventService',  
		function($scope, $rootScope, $location, $window, UserService, EventService) {
			$scope.success= $scope.error = "";

			$scope.user = $rootScope.user;
			$scope.events = $rootScope.events;
			$scope.newEvent = {};


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

			$scope.create = function(){
				$scope.error =$scope.success = "";
				$scope.newEvent.userId = $scope.user.id;
				$scope.newEvent.type = "local";
				if ($scope.newEvent && $scope.newEvent.title && $scope.newEvent.description && $scope.newEvent.date && 
					$scope.newEvent.start_time && $scope.newEvent.venue_address && $scope.newEvent.privacy){
					EventService.createEvent($scope.newEvent)
					.then(function(userEvents){
						$scope.events = $rootScope.events = userEvents;
						//Braodcast userEvents
						$rootScope.$broadcast('userEvents', userEvents);
						$scope.success = "Successfully created new event";
						$location.path( "/profile" );
					})
					.catch(function(error){
						$scope.error = error;
					});
				} else {
					$scope.error = "please fill out all of the details";
				}
			};
		}
		]);

})();