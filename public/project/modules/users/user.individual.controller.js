(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "users";

	// Use app's registerModule function to register a new module
	//app.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("IndividualUserController", ['$scope', '$location', '$window', 'EventService', '$routeParams', 'UserService', '$rootScope', 
		function($scope, $location, $window, EventService, $routeParams, UserService, $rootScope) {
			$scope.success= $scope.error = "";
			$scope.friendId = $routeParams.friendId;
			$scope.fevents = {
				host: "",
				guest: ""
			}
			
			//listen for login/sigin to grab logged in user
			$rootScope.$on("auth", function(event, user){
				$scope.error = $scope.success = "";
				$scope.user = $rootScope.user = user;
			});

			$scope.init = function(){
				$scope.error = $scope.success = "";
				if ($scope.friendId){
					UserService.getUserByToken($scope.friendId)
					.then(function(friend){
						$scope.friend = friend;
						$scope.isFollowing();

						//Retrieve User Events - as a host
						EventService.getUserEventsAsHost($scope.friend.id)
						.then(function(fevents){
							$scope.fevents.host = fevents;
						})
						.catch(function(error){
							console.log("Error fetching friend host events : "+error);
						});

						//Retrieve User Events - as a guest
						EventService.getUserEventsAsGuest($scope.friend.id)
						.then(function(fevents){
							$scope.fevents.guest = fevents;											
						})
						.catch(function(error){
							console.log("Error fetching friend guest events : "+error);
						});
					})
					.catch(function(error){
						$scope.error = error;
					});
				}
			}

			$scope.gotoEventPage = function(event){
				if (event && event.type==="local"){
					$location.path("/event/local/"+event.id);
				} else {
					$location.path("/event/"+event.id);
				}
			};

			$scope.follow = function(){
				if($scope.friendId && $scope.user && !$scope.following){
					UserService.addFollower($scope.user, $scope.friend)
					.then(function(response){
						$scope.friend = response;
						$scope.isFollowing();
					})
					.catch(function(error){
						$scope.error = error;
					});
				}
			}

			$scope.isFollowing = function(){
				if ($scope.user && $scope.friend && $scope.user._id != $scope.friend._id){
					var followers = $scope.friend.followers || [];
					$scope.following = false;
					followers.forEach(function(follower, index){
						if (follower.followerId == $scope.user._id){
							$scope.following = true;
						}
					});
				} else {
					$scope.following = false
				};
			}

			$scope.init();

		}
		]);

})();