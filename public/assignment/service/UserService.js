(function(){
	'use strict';

	// Users service used for communicating with the users REST endpoint
	angular.module(myFormApp.applicationModuleName).factory('UserService', ['$window', '$http', '$q', '$rootScope', UserService]);

	//UserService  function
	function UserService ($window, $http, $q, $rootScope){
		console.log("Hi UserService is here");

		//Local Empty Array of Users
		var users = [];

		//Creating a UserService
		var userService = {
			findUserByUsernameAndPassword: findUserByUsernameAndPassword,
			findAllUsers: findAllUsers,
			createUser: createUser,
			deleteUserById: deleteUserById,
			updateUser: updateUser
		};

		return userService;

		/**
		 * [Finds a user identified by its username and password]
		 * @return {[type]} [description]
		 */
		function findUserByUsernameAndPassword(){

		};

		/**
		 * [Returns a list of all users]
		 * @return {[type]} [description]
		 */
		function findAllUsers(){
			return users;
		};

		//
		function createUser(){
			var newUser = {};
			user.push(newUser);
		};

		function deleteUserById(){

		};

		function updateUser(){

		};
		
	};

})();