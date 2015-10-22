(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "events";

	//TODO : Defining event service
	// Users service used for communicating with the users REST endpoint
	angular.module(moduleName).factory('Events', ['$window', '$http', '$q', '$rootScope',
		function($window, $http, $q, $rootScope) {
			return {
				categories: function() {
					var deferred = $q.defer();
					$http.get('/api/categories?app_key=z7m8NNZ7d6SXhtJv')
					.success(function (response) {
						$window.categories = response;
						deferred.resolve(response);
					})
					.error(function (error) {
						deferred.reject(error);
					});
					return deferred.promise;
				}
			};
		}
		]);

})();