(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "profile";

	// Use app's registerModule function to register a new module
	myFormApp.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("ProfileController", ['$scope', '$location', '$rootScope', 'UserService', ProfileController]);
	
	//HeaderController function
	function ProfileController($scope, $location, $rootScope, UserService ){
		$scope.$location = $location;
		$scope.user = $rootScope.user;
		//listen for login/sigin to grab logged in user
		$rootScope.$on("auth", function(event, user){
			$scope.user = $rootScope.user = user;
		});


		//Update button to update user profile
		$scope.update = function(){
			$scope.error = null;
			UserService.updateUser($scope.user.id, $scope.user, function(error, updatedUser){
				if (error){
					$scope.error = error;
				} else {
					$scope.user = updatedUser;
				}
			});
		};
	};

})();