(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "events";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("EventsController", ['$scope', '$http', '$location', 'Events', '$routeParams', 
		function($scope, $http, $location, Events, $routeParams) {
			$scope.categories = [];
			$scope.categoryEvents = [];
			$scope.categorySelected = capitalizeFirstLetter($routeParams.categoryId) + " Events" || "Music Events";


			$scope.initializeCategories = function(){
				Events.categories()
				.then(function(categories){
					$scope.categories = categories.category;
				});
			}

			//Need to clean code - use fn composition
			$scope.initializeEvents = function(categoryId){
				categoryId = categoryId || "";
				if (categoryId) {
					$scope.categorySelected = categoryId + " Events";
					var re = new RegExp("_" , 'g');
					$scope.categorySelected = $scope.categorySelected.replace(re, ' ');
					$scope.categorySelected = capitalizeFirstLetter($scope.categorySelected);
				}
				Events.categoryEvents(categoryId)
				.then(function(categoryEvents){
					$scope.categoryEvents = categoryEvents.events.event;
				});
			};

			function capitalizeFirstLetter(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			}

			$scope.initializeEvents($routeParams.categoryId);
			$scope.initializeCategories();

		}]);

})();