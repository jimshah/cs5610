(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "header";

	// Use app's registerModule function to register a new module
	myFormApp.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("HeaderController", ['$scope', '$location', HeaderController]);
	
	//HeaderController function
	function HeaderController($scope, $location){
		$scope.$location = $location;
		console.log("Hello header here");
	};

})();