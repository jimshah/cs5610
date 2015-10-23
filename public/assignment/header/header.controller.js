(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "header";

	// Use app's registerModule function to register a new module
	myFormApp.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("HeaderController", ['$scope', '$location', '$rootScope', HeaderController]);
	
	//HeaderController function
	function HeaderController($scope, $location, $rootScope){
		$scope.$location = $location;
		$scope.user = $rootScope.user;
		console.log("Hello header here");

		//listen for login/sigin to grab logged in user
		$rootScope.$on("auth", function(event, user){
			$scope.user = $rootScope.user = user;
		});
		
	};

})();