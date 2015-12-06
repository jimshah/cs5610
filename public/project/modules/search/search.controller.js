(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "search";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("SearchController", ['$scope', '$location', '$window', 'EventService', '$routeParams', 
		function($scope, $location, $window, EventService, $routeParams) {
			$scope.success= $scope.error = "";
			$scope.keywords = $routeParams.keywords;

			$scope.search = function(){
				var keywords = $scope.keywords;
				$scope.success= $scope.error = "";
				EventService.searchEventfulEvent(keywords)
				.then(function(events){
					$scope.events = events.events.event;
				})
				.catch(function(error){
					$scope.error = error;
				});
			}

			$scope.search();
			
		}
		]);

})();