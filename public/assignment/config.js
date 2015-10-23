(function(){
	//Creating "HelloWorldController" controller -> normally create a separate files for controller
	angular
	.module(myFormApp.applicationModuleName)
	.config(MyAppFunction)

	function MyAppFunction($routeProvider){
		$routeProvider
		.when("/", {
			templateUrl : "/assignment/home/home.view.html" 
		})
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
		})
		.when("/admin", {
			templateUrl : "/assignment/admin/admin.view.html" 
		})
		.otherwise({
			redirectTo : "/" 
		})
	};
})();