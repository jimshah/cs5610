(function(){
	'use strict';

	// Users service used for communicating with the users REST endpoint
	angular.module(myFormApp.applicationModuleName).factory('FormService', ['$window', '$http', '$q', '$rootScope', FormService]);

	//UserService  function
	function FormService ($window, $http, $q, $rootScope){
		console.log("Hi FormService is here");

		//Local Empty Array of Users
		var users = [];

		//Creating a UserService
		var formService = {
			createFormForUser: createFormForUser,
			findAllFormsForUser: findAllFormsForUser,
			deleteFormById: deleteFormById,
			updateFormById: updateFormById
		};

		return formService;

		/**
		 * [createFormForUser description]
		 * @return {[type]} [description]
		 */
		function createFormForUser(){

		};

		/**
		 * [findAllFormsForUser description]
		 * @return {[type]} [description]
		 */
		function findAllFormsForUser(){
			return users;
		};

		/**
		 * [deleteFormById description]
		 * @return {[type]} [description]
		 */
		function deleteFormById(){
			var newUser = {};
			user.push(newUser);
		};

		/**
		 * [updateFormById description]
		 * @return {[type]} [description]
		 */
		function updateFormById(){

		};
		
	};

})();