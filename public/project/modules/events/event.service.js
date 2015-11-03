(function(){
	'use strict';

	//Declaring sub module
	var moduleName = "event";

	//TODO : Defining event service
	// Users service used for communicating with the users REST endpoint
	angular.module(moduleName).factory('Event', ['$window', '$http', '$q', '$rootScope',
		function($window, $http, $q, $rootScope) {
			return {
				event: function(eventId) {
					var deferred = $q.defer();
					$http.get('/api/event/'+eventId)
					.success(function (response) {
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