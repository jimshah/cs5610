(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "core";

	//TODO : Defining event service
	// Users service used for communicating with the users REST endpoint
	angular.module(moduleName).factory('CoreEvents', ['$window', '$http', '$q', '$rootScope',
		function($window, $http, $q, $rootScope) {
			return {
				categories: function() {
					var deferred = $q.defer();
					$http.get('/api/categories')
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