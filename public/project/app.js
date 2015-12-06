(function(){
	'use strict';

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(app.applicationModuleName).requires.push(moduleName);
	};

	//Defining our app configs, cann add some more attributes to it later on as we progress
	var app = {
		applicationModuleName: "JoinUs",
		applicationModuleVendorDependencies: ['ngRoute', 'ngCookies', 'ngSanitize'],//['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils'],
		registerModule: registerModule
	};

	window.app = app;

	//Declaring our root module
	angular.module(app.applicationModuleName,app.applicationModuleVendorDependencies);

	// Setting HTML5 Location Mode
	angular.module(app.applicationModuleName)
	.config(['$locationProvider', '$httpProvider', 
		function($locationProvider, $httpProvider) {
			console.log("hello, hash prefixed");
			//$locationProvider.hashPrefix('!');
		}
		])
	.run(['$http', '$rootScope', '$window', function($http, $rootScope, $window){
		// Track any $http request starts
		$http.defaults.transformRequest.push(function (response) {
			$rootScope.$broadcast('httpStarts');
			return response;
		});
		// Track any $http request ends
		$http.defaults.transformResponse.push(function(response){
			$rootScope.$broadcast('httpEnds');
			return response;
		});
	}]);

	//Then define the init function for starting up the application
	angular.element(document).ready(function() {
		//Then init the app
		angular.bootstrap(document, [app.applicationModuleName]);
	});

})();