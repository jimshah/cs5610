(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "admin";

	// Use app's registerModule function to register a new module
	myFormApp.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("AdminController", ['$scope', '$location', '$rootScope', 'UserService', AdminController]);
	
	//HeaderController function
	function AdminController($scope, $location, $rootScope, UserService){
		$scope.$location = $location;
		$scope.user = $rootScope.user;

		//listen for login/sigin to grab logged in user
		$rootScope.$on("auth", function(event, user){
			$scope.user = $rootScope.user = user;
		});

		var init = function(){
			$scope.error = null;
			if ($scope.user){
				/*UserService.findAllUsers(function(error, allUsers){
					$scope.allUsers = allUsers;
				});*/
				UserService.findAllUsers()
				.then(function(allUsers){
					$scope.allUsers = allUsers;
				})
				.catch(function(error){
					$scope.error = error;
				})
			} else {
				$scope.error = "please login to view this content";
			}
		};
		init();
		
	};

})();