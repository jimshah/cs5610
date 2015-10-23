(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "sidebar";

	// Use app's registerModule function to register a new module
	myFormApp.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("SidebarController", ['$scope', '$location', SidebarController]);
	
	//HeaderController function
	function SidebarController($scope, $location){
		$scope.$location = $location;
		console.log("Hello sidebar here");
	};

})();