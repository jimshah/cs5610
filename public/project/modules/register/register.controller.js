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

									//Retrieve User Events - as a host
									EventService.getUserEventsAsHost($scope.user.id)
									.then(function(events){
										$scope.events = $rootScope.events = events;
										//Braodcast userEvents
										$rootScope.$broadcast('userEvents', events);
									})
									.catch(function(error){
										console.log("Error fetching user host events : "+error);
									});

									//Retrieve User Events - as a guest
									EventService.getUserEventsAsGuest($scope.user.id)
									.then(function(userRegisteredEvents){
										$scope.registeredEvents = $rootScope.registeredEvents = userRegisteredEvents;													
										$rootScope.$broadcast('userRegisteredEvents', userRegisteredEvents);
									})
									.catch(function(error){
										console.log("Error fetching user guest events : "+error);
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