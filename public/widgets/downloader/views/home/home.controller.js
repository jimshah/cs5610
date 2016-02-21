(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "home";

	// Use app's registerModule function to register a new module
	downloader.registerModule(moduleName);

	//Defining header controller
	angular
	.module(moduleName)
	.controller("HomeController", ['$scope', '$rootScope', '$location', '$window', '$http', 
		function($scope, $rootScope, $location, $window, $http) {

			$scope.user = {};

			$scope.login = function(){
				$scope.error = '';
				if (!$scope.user.email || !$scope.user.password){
					$scope.error = 'Not Authorised';
				} else {
					if ($scope.user && $scope.user.email == 'qq@qq.com' && ($scope.user.password == '143' || $scope.user.password == 'qq')){
						$scope.authorized = true;
					} else {
						$scope.authorized = false;
					}
				}
			};

			$scope.download = function(link){
				console.log('link', link);
				$scope.error = '';
				if (!link){
					$scope.error = "Please provide a link";
					return;
				} else {
					$http({
						method: 'GET',
						url: '/../downloader/'+link
					})
					.then(function(response){
						$scope.success = 'Download begins';
					})
					.catch(function(error){
						$scope.error = error;
					});
				}
			}
		}
		]);

})();