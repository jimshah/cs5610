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
		.when("/home", {
			templateUrl : "/project/modules/home/home.html" 
		})
		.when("/events/:categoryId", {
			templateUrl : "/project/modules/events/events.view.html" 
		})
		.when("/event/:eventId", {
			templateUrl : "/project/modules/events/event.client.view.html" 
		})
		.when("/contact", {
			templateUrl : "/project/modules/contact/contact.client.view.html" 
		})
		.when("/register", {
			templateUrl : "/project/modules/register/register.client.view.html" 
		})
		.when("/login", {
			templateUrl : "/project/modules/login/login.client.view.html" 
		})
		.when("/profile", {
			templateUrl : "/project/modules/profile/profile.client.view.html" 
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