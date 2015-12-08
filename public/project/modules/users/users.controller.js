(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "users";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("UsersController", ['$scope', '$location', '$window', 'EventService', '$routeParams', 'UserService', '$rootScope', 
		function($scope, $location, $window, EventService, $routeParams, UserService, $rootScope) {
			$scope.success= $scope.error = "";
			$scope.keywords = $routeParams.keywords;

			//listen for login/sigin to grab logged in user
			$rootScope.$on("auth", function(event, user){
				$scope.error = $scope.success = "";
				$scope.user = $rootScope.user = user;
			});
			//listen for login/sigin to grab logged in user
			$rootScope.$on("userEvents", function(event, events){
				$scope.error = $scope.success = "";
				$scope.events = $rootScope.events = events;
			});

			//listen for login/sigin to grab logged in user
			$rootScope.$on("userRegisteredEvents", function(event, events){
				$scope.error = $scope.success = "";
				$scope.registeredEvents = $rootScope.registeredEvents = events;
			});

			$scope.searchUser = function(searchTerm){
				$scope.error = $scope.success = "";
				if (searchTerm){
					UserService.findUserBySearchTerm(searchTerm)
					.then(function(users){
						if (users && users.length > 0){
							$scope.users = users;
						} else {
							$scope.users = [];
							$scope.error = "no users found";
						}
					})
					.catch(function(error){
						$scope.users = [];
						$scope.error = error;
					})
				}
			}

			$scope.search = function(){
				$scope.success= $scope.error = "";
				EventService.searchEventfulEvent(keywords)
				.then(function(events){
					$scope.events = events.events.event;
				})
				.catch(function(error){
					$scope.error = error;
				});
			}

			$scope.init = function(){
				UserService.findAllUsers()
				.then(function(users){
					$scope.users = users;
				})
				.catch(function(error){

				});
			}

			//$scope.init();
			
		}
		]);

})();