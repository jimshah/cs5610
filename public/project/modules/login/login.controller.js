(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "login";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("LoginController", ['$scope', '$rootScope', '$location', '$window', 'UserService', 'EventService', 'GlobalService',  
		function($scope, $rootScope, $location, $window, UserService, EventService, GlobalService) {
			$scope.success= $scope.error = "";
			$scope.user = {
				email: "",
				password: ""
			};

			//Login Button navigating to #/profile
			$scope.login = function(){
				if ($scope.user.email && $scope.user.password){
					//Scope error make null
					$scope.success = $scope.error = null;

					UserService.findUserByEmailAndPassword($scope.user.email, $scope.user.password)
					.then(function(user){
						//update rootscope user 
						$scope.user = $rootScope.user = user;
							//broadcast login auth event for listeners to update loggedin user 
							$rootScope.$broadcast('auth', user);
							//Navigate to profile
							$location.path( "/home" );

							GlobalService.setUser(user._id);

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
};


}
]);

})();