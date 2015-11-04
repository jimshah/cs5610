(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "profile";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("ProfileController", ['$scope', '$rootScope', '$location', '$window', 'UserService', 'EventService',  
		function($scope, $rootScope, $location, $window, UserService, EventService) {
			$scope.success= $scope.error = "";

			$scope.user = $rootScope.user;
			$scope.events = $rootScope.events;
			$window.profile = $scope;

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

			//Update button to update user profile
			$scope.update = function(){
				$scope.error = null;
				$scope.success = null;
				UserService.updateUser($scope.user.id, $scope.user, function(error, updatedUser){
					if (error){
						$scope.error = error;
					} else {
						$scope.user = updatedUser;
						$scope.success = "Succesfully updated user profile";
					}
				});
			};



		}
		]);

})();