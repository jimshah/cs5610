(function(){
	'use strict';

	angular
	.module(app.applicationModuleName)
	.config(AppRoutes)

	function AppRoutes($routeProvider){
		$routeProvider
		.when("/", {
			templateUrl : "/project/modules/home/home.html" 
		})
		.otherwise({
			redirectTo : "/" 
		})
		/*
		.when("/home", {
			templateUrl : "/assignment/home/home.view.html" 
		})
		.when("/login", {
			templateUrl : "/assignment/login/login.view.html" 
		})
		.when("/register", {
			templateUrl : "/assignment/register/register.view.html" 
		})
		.when("/profile", {
			templateUrl : "/assignment/profile/profile.view.html" 
		})
		.when("/form", {
			templateUrl : "/assignment/form/form.view.html" 
		})*/
	};

})();