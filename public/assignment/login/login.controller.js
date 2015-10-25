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

		//Login Button navigating to #/profile
		$scope.login = function(){
			if ($scope.username && $scope.password){
				//Scope error make null
				$scope.error = null;
				UserService.findUserByUsernameAndPassword($scope.username, $scope.password, function(error, user){
					if (error){
						$scope.error = error;
					} else {
						//update rootscope user 
						$rootScope.user = user;
						//broadcast login auth event for listeners to update loggedin user 
						$rootScope.$broadcast('auth', user);
						//Navigate to profile
						$location.path( "/profile" );
					}
				});
			}
		};
	};

})();