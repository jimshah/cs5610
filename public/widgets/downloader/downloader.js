(function(){

	'use strict';
	
	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(downloader.applicationModuleName).requires.push(moduleName);
	};

	//Defining our app configs, cann add some more attributes to it later on as we progress
	var downloader = {
		applicationModuleName: "Downloader",
		applicationModuleVendorDependencies: ['ngRoute'],//['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils'],
		registerModule: registerModule
	};

	window.downloader = downloader;

	//Declaring our root module
	angular.module(downloader.applicationModuleName,downloader.applicationModuleVendorDependencies);

	// Setting HTML5 Location Mode - May be later, not now
	angular.module(downloader.applicationModuleName).config(['$locationProvider',
		function($locationProvider) {
			//console.log("hello, hash prefixed");
			//$locationProvider.hashPrefix('!');
		}
		]);

	angular.module(downloader.applicationModuleName).directive('keypressEvents',

		function ($document, $rootScope) {
			return {
				restrict: 'A',
				link: function () {
					$document.bind('keypress', function (e) {
						$rootScope.$broadcast('keypress', e, String.fromCharCode(e.which));
					});
				}
			}
		});

})();