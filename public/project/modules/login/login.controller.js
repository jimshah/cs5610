(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "login";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("LoginController", ['$scope', '$rootScope', '$location', '$window', 'UserService', 'EventService', 
		function($scope, $rootScope, $location, $window, UserService, EventService) {
			$scope.success= $scope.error = "";
			$scope.user = {
				email: "",
				password: ""
			};

			//Login Button navigating to #/profile
			$scope.login = function(){
				if ($scope.user.email && $scope.user.password){
					//Scope error make null
					$scope.error = null;
					UserService.findUserByEmail($scope.user.email, function(error, user){
						if (error){
							$scope.error = error;
						} else {
							//update rootscope user 
							$scope.user = $rootScope.user = user;
							//broadcast login auth event for listeners to update loggedin user 
							$rootScope.$broadcast('auth', user);
							//Navigate to profile
							$location.path( "/home" );
							//Retrieve User Events
							EventService.getUserEventsById($scope.user.id, function(error, events){
								if (error || events && events.length === 0){
									console.log(error || "no user events found");
								} else {
									$scope.events = $rootScope.events = events;
									//Braodcast userEvents
									$rootScope.$broadcast('userEvents', events);

									EventService.getUserRegisteredEvents($scope.user.id, function(error, userRegisteredEvents){
										if (error){
											console.log(error);
										} else {
											$scope.registeredEvents = $rootScope.registeredEvents;
											//Braodcast userEvents
											$rootScope.$broadcast('userRegisteredEvents', userRegisteredEvents);
										}
									});
								}
							});
						}
					});
}
};


}
]);

})();