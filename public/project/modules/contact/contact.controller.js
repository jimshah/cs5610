(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "contact";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("ContactController", ['$scope', '$anchorScroll', '$location', '$window', 
		function($scope, $anchorScroll, $location, $window) {
			$scope.success= $scope.error = "";
			$scope.contact = {
				fname: "",
				lname: "",
				email: "",
				website: "",
				query: ""
			}

			$scope.submitContactQuery = function(){
				$scope.success="Submitted your query successfully";
				console.log("contact query info is", $scope.contact);
			}
		}
		]);

})();