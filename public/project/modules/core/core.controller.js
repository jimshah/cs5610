(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "core";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("HeaderController", ['$scope', '$anchorScroll', '$location', '$window', 'CoreEvents', 
		function($scope, $anchorScroll, $location, $window, CoreEvents) {
			$scope.isCollapsed = false;
			$scope.headerList = ['Home','Contact'];
			$scope.coreCategories = [];
			$scope.secondaryHeaders = [];

			$scope.initializeCoreCategories = function(){
				CoreEvents.categories()
				.then(function(categories){
					$scope.coreCategories = $window.categories = categories.category;
					if ($scope.coreCategories.length <= 5){
						$scope.secondaryHeaders = $scope.coreCategories;
					} else {
						$scope.secondaryHeaders = $scope.coreCategories.splice(0,5);
					}
				});
			};

			$scope.goto = function(index){
				var destinationRoute = $scope.headerList[index];
				destinationRoute = destinationRoute.toLowerCase();
				//Navigate to profile
				$location.path( "/"+destinationRoute );
			};

			$scope.initializeCoreCategories();
		}
		]);

	angular.module(moduleName).filter('formatHeader', function() {
		return function(input) {
			input = input || "";
			var re = new RegExp("_" , 'g');
			input = input.replace(re, ' ');
			return input.charAt(0).toUpperCase() + input.slice(1);
		};
	});

})();