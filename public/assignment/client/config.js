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
			templateUrl : "/assignment/client/views/home/home.view.html" 
		})
		.when("/login", {
			templateUrl : "/assignment/client/views/login/login.view.html" 
		})
		.when("/register", {
			templateUrl : "/assignment/client/views/register/register.view.html" 
		})
		.when("/profile", {
			templateUrl : "/assignment/client/views/profile/profile.view.html" 
		})
		.when("/form", {
			templateUrl : "/assignment/client/views/form/form.view.html" 
		})
		.when("/admin", {
			templateUrl : "/assignment/client/views/admin/admin.view.html" 
		})
		.when("/user", {
			templateUrl : "/assignment/client/views/field/field.view.html" 
		})
		.otherwise({
			redirectTo : "/" 
		})
	};
})();