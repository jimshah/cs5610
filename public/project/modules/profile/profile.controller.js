(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "profile";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("ProfileController", ['$scope', '$rootScope', '$location', '$window', 'UserService', 
		function($scope, $rootScope, $location, $window, UserService) {
			$scope.success= $scope.error = "";

			$scope.user = $rootScope.user;

			//listen for login/sigin to grab logged in user
			$rootScope.$on("auth", function(event, user){
				$scope.user = $rootScope.user = user;
			});

		}
		]);

})();