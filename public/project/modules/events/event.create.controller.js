(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "createEvent";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
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
				console.log("on auth");
				$scope.error = $scope.success = "";
				$scope.events = $rootScope.events = events;
			});

			$scope.create = function(){
				$scope.error =$scope.success = "";
				$scope.newEvent.userId = $scope.user.id;
				$scope.newEvent.type = "local";
				EventService.createEvent($scope.newEvent, function(error, userEvents){
					if (error){
						$scope.error = error;
					} else {
						$scope.events = $rootScope.events = userEvents;
						$scope.success = "Successfully created new event";
						$location.path( "/profile" );
					}
				});
			};
		}
		]);

})();