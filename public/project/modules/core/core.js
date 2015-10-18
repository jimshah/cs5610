(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "core";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("HeaderController", ['$scope', '$anchorScroll', '$location',
		function($scope, $anchorScroll, $location) {
			$scope.isCollapsed = false;
			$scope.headerList = ['Home','Contact'];

			/*$scope.toggleCollapsibleMenu = function() {
				$scope.isCollapsed = !$scope.isCollapsed;
			};
			// Collapsing the menu after navigation
			$scope.$on('$stateChangeSuccess', function() {
				$scope.isCollapsed = false;
			});

			$scope.gotoBottom = function(index){
				var header = $scope.headerList[index];
				header = header ? header.toLowerCase() : "";
				if (header){
					//$location.hash(header);
      				//$anchorScroll();
      				$location.path('/'+header);
      			}

      			console.log("Hi "+header+", you're being clicked");
      		};*/
      	}
      	]);

})();