(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "register";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("RegisterController", ['$scope', '$rootScope', '$location', '$window', 'UserService', 'EventService', 
		function($scope, $rootScope, $location, $window, UserService, EventService) {
			$scope.success= $scope.error = "";
			$scope.user = {
				fname: "",
				lname: "",
				email: "",
				password: "",
				vpassword: ""
			};

			$scope.register = function(){
				$scope.error = null;
				if ($scope.user.password && $scope.user.vpassword && $scope.user.email && $scope.user.fname && $scope.user.lname){

					UserService.findAllUsers()
					.then(function(users){
						if ($scope.password !== $scope.vpassword){
							$scope.error = "both the password fields should match";
						} else {
							var exists = false;
							users.forEach(function(user, index){
								if (user && user.email === $scope.user.email){
									exists = true;
								} 
							});
							if (exists){
								$scope.error = "User already exists with that email";
							} else {
								var newUserObject = {
									fname: $scope.user.fname,
									lname: $scope.user.lname,
									password: $scope.user.password,
									email: $scope.user.email
								}
								UserService.createUser(newUserObject)
								.then(function(newlyCreatedUser){
									$scope.user = $rootScope.user = newlyCreatedUser;
									$rootScope.$broadcast('auth', newlyCreatedUser);
									$location.path( "/home" );

									EventService.getUserEventsById($scope.user.id, function(error, events){
										if (error || events && events.length === 0){
											console.log(error || "no user events found");
										} else {
											$scope.events = $rootScope.events = events;
											$rootScope.$broadcast('userEvents', events);
											EventService.getUserRegisteredEvents($scope.user.id, function(error, userRegisteredEvents){
												if (error){
													console.log(error);
												} else {
													$scope.registeredEvents = $rootScope.registeredEvents;													
													$rootScope.$broadcast('userRegisteredEvents', userRegisteredEvents);
												}
											});
										}
									});
								})
								.catch(function(error){
									$scope.error = error;
								});
							}
						}
					})
.catch(function(error){
	$scope.error = error;
});
}
}
}
]);

})();