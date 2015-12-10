(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "events";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("EventsController", ['$scope', '$http', '$location', '$routeParams', '$window', 'EventService', 
		function($scope, $http, $location, $routeParams, $window, EventService) {
			$scope.categories = [];
			$scope.categoryEvents = [];
			$scope.categorySelected = capitalizeFirstLetter($routeParams.categoryId) + " Events" || "Music Events";
			$scope.selectedCat = $scope.selectedCat || $routeParams.categoryId;

			$scope.gotoEvent = function(event){
				if (event){
					$location.path( "/event/"+event.id );
				}
			}

			$scope.loadCategories = function(cat){
				if (cat && cat.id){
					$location.path( "/events/"+cat.id );
				}
			}

			$scope.initializeCategories = function(){
				if ($window.categories){
					$scope.categories = $window.categories;
				} else {
					EventService.getCategories()
					.then(function(categories){
						$window.categories = categories.category;
						$scope.categories = categories.category;
					});
				}
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
				EventService.categoryEvents(categoryId)
				.then(function(categoryEvents){
					$scope.categoryEvents = categoryEvents.events.event;
				});
			};

			
			$scope.initializeEventsMobile = function(categoryId){
				categoryId = categoryId || $scope.selectedCat || "";
				if (categoryId){
					$location.path( "/events/"+categoryId );
				}
			};

			function capitalizeFirstLetter(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			}

			$scope.initializeEvents($routeParams.categoryId);
			$scope.initializeCategories();

		}]);

})();