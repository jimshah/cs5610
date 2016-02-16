(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "home";

	// Use app's registerModule function to register a new module
	scramble.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("HomeController", ['$scope', '$rootScope', '$location', '$window', 
		function($scope, $rootScope, $location, $window) {

 			}
 			]);

})();