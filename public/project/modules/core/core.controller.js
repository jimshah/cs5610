(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "core";

	// Use app's registerModule function to register a new module
	app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("HeaderController", ['$scope', '$rootScope', '$location', '$window', 'CoreEvents', 'GlobalService', 'UserService', 'EventService', 
		function($scope, $rootScope, $location, $window, CoreEvents, GlobalService, UserService, EventService) {
			$scope.isCollapsed = false;
			$scope.headerList = ['Home','Contact'];
			$scope.coreCategories = [];
			$scope.secondaryHeaders = [];

			$scope.user = $rootScope.user;

			//listen for login/sigin to grab logged in user
			$rootScope.$on("auth", function(event, user){
				$scope.user = $rootScope.user = user;
			});

			//listen for $http starts and ends for spinning icon
			$rootScope.$on("httpStarts", function(event, result){
				/*setTimeout(function () {
					$scope.loading = true;
				}, 0);*/
			$scope.loading = true;
		});
			$rootScope.$on("httpEnds", function(event, result){
				/*setTimeout(function () {
					$scope.loading = false;
				}, 100);*/
			$scope.loading = false;
		});

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

			$scope.logout = function(){
				$scope.user = $rootScope.user = null;
				$scope.events = $rootScope.events = null;
				GlobalService.setUser();
				//Navigate to home
				$location.path( "/home" );
			};

			$scope.initializeUserOnRefresh = function(){
				var userId;
				if (GlobalService.isAuth()){
					userId = GlobalService.getUser();
					if (userId){
						UserService.getUserByToken(userId)
						.then(function(user){
							$scope.user = $rootScope.user = user;
							//broadcast login auth event for listeners to update loggedin user 
							$rootScope.$broadcast('auth', user);

							//Retrieve User Events - as a host
							EventService.getUserEventsAsHost($scope.user.id)
							.then(function(events){
								$scope.events = $rootScope.events = events;
								//Braodcast userEvents
								$rootScope.$broadcast('userEvents', events);
							})
							.catch(function(error){
								console.log("Error fetching user host events : "+error);
							});

							//Retrieve User Events - as a guest
							EventService.getUserEventsAsGuest($scope.user.id)
								.then(function(userRegisteredEvents){
									$scope.registeredEvents = $rootScope.registeredEvents = userRegisteredEvents;													
									$rootScope.$broadcast('userRegisteredEvents', userRegisteredEvents);
								})
								.catch(function(error){
									console.log("Error fetching user guest events : "+error);
								});
							})
							.catch(function(error){
								console.log("initializeUserOnRefresh error: "+error);
							});
					}
				}
			};
			$scope.initializeUserOnRefresh();
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