(function(){

	'use strict';
	
	//Creating "HelloWorldController" controller -> normally create a separate files for controller
	angular
	.module(myFormApp.applicationModuleName)
	.config(MyAppFunction)

	function MyAppFunction($routeProvider){
		$routeProvider
		.when("/", {
			/*templateUrl : "/assignment/home/home.view.html" */
			redirectTo : "/home" 
		})
		.when("/home", {
			templateUrl : "/assignment/client/home/home.view.html" 
		})
		.when("/login", {
			templateUrl : "/assignment/client/login/login.view.html" 
		})
		.when("/register", {
			templateUrl : "/assignment/client/register/register.view.html" 
		})
		.when("/profile", {
			templateUrl : "/assignment/client/profile/profile.view.html" 
		})
		.when("/form", {
			templateUrl : "/assignment/client/form/form.view.html" 
		})
		.when("/admin", {
			templateUrl : "/assignment/client/admin/admin.view.html" 
		})
		.otherwise({
			redirectTo : "/" 
		})
	};
})();