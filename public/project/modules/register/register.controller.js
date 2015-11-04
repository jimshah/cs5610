(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "register";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("RegisterController", ['$scope', '$rootScope', '$location', '$window', 'UserService', 
		function($scope, $rootScope, $location, $window, UserService) {
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
										fname: $scope.user.fname,
										lname: $scope.user.lname,
										password: $scope.user.password,
										email: $scope.user.email
									}
									UserService.createUser(newUserObject, function(err, newlyCreatedUser){
									//update rootscope user 
									$rootScope.user = newlyCreatedUser;
									//broadcast login auth event for listeners to update loggedin user 
									$rootScope.$broadcast('auth', newlyCreatedUser);
									//Navigate to profile
									$location.path( "/home" );
								});
								}
							}
						}
					});
}
}
}
]);

})();