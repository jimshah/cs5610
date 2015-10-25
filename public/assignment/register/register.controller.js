(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "register";

	// Use app's registerModule function to register a new module
	myFormApp.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("RegisterController", ['$scope', '$location', '$rootScope', 'UserService', RegisterController]);
	
	//HeaderController function
	function RegisterController($scope, $location, $rootScope, UserService ){
		$scope.$location = $location;

		//register function : registering a user
		$scope.register = function(){
			$scope.error = null;
			if ($scope.username && $scope.password && $scope.vpassword && $scope.email){
				UserService.findAllUsers(function(error, users){
					if (error){
						$scope.error = error;
					} else {
						if ($scope.password !== $scope.vpassword){
							$scope.error = "both the password fields should match";
						} else {
							var exists = false;
							var emailExists = false;
							users.forEach(function(user, index){
								if (user && user.username===$scope.username && user.password===$scope.password){
									exists = true;
								}
								if (user && user.email === $scope.email){
									emailExists = true;
								} 
							});
							if (emailExists&&exists){
								$scope.error = "User already exists with that email + username";
							} else if (exists){
								$scope.error = "User already exists with that username";
							} else if (emailExists){
								$scope.error = "User already exists with that email";
							} else {
								var newUserObject = {
									username: $scope.username,
									password: $scope.password,
									email: $scope.email
								}
								UserService.createUser(newUserObject, function(err, newlyCreatedUser){
									console.log("newly created user is ", newlyCreatedUser);
									//update rootscope user 
									$rootScope.user = newlyCreatedUser;
									//broadcast login auth event for listeners to update loggedin user 
									$rootScope.$broadcast('auth', newlyCreatedUser);
									//Navigate to profile
									$location.path( "/profile" );
								});
							}
						}
					}
				});
}
};
};

})();