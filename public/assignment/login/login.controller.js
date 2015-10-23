(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "login";

	// Use app's registerModule function to register a new module
	myFormApp.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("LoginController", ['$scope', '$location', '$rootScope', 'UserService', LoginController]);
	
	//HeaderController function
	function LoginController($scope, $location, $rootScope, UserService ){
		$scope.$location = $location;
		console.log("Hello login here");

		//Login Button navigating to #/profile
		$scope.login = function(){
			if ($scope.username && $scope.password){
				UserService.findAllUsers(function(error, users){
					if (error){console.log(error);}
					else {console.log(users);}
				});
				UserService.findUserByUsernameAndPassword($scope.username, $scope.password, function(error, user){
					if (error){
						$scope.error = error;
					} else {
						$scope.error = "";
						$rootScope.user = user;
						console.log("login called, routing to profile view");
						$location.path( "/profile" );
					}
				});
			}
		};
	};

})();