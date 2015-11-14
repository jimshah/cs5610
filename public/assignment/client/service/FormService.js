(function(){
	'use strict';

	// Users service used for communicating with the users REST endpoint
	angular.module(myFormApp.applicationModuleName).factory('FormService', ['$window', '$http', '$q', '$rootScope', FormService]);

	//UserService  function
	function FormService ($window, $http, $q, $rootScope){

		//Local Empty Array of Users
		var forms = [];

		/**
		 * [createFormForUser creates a new form for the user]
		 * @param {id} [userId] [id of a user]
		 * @param {formObject} [form] [a form object]
		 * @param  {Function} callback [a callback function]
		 * @return {[type]} [newly created form]
		 */
		 function createFormForUser(userId, form, callback){
		 	var deferred = $q.defer();

		 	$http.post("/api/assignment/user/"+userId+"/form",form)
		 	.success(function(newForm){
		 		deferred.resolve(newForm);
		 	})
		 	.error(function(error){
		 		if (error && error.message){
		 			deferred.reject(error.message);	
		 		} else{
		 			deferred.reject(error);
		 		}
		 	});
		 	return deferred.promise;
		 };

		/**
		 * [findAllFormsForUser finds all the forms for a particular user]
		 * @param {id} [userId] [id of a user]
		 * @param  {Function} callback [a callback function]
		 * @return {[form]} [a list of forms for a particular userId]
		 */
		 function findAllFormsForUser(userId, callback){
		 	var deferred = $q.defer();

		 	$http.get("/api/assignment/form/user/"+userId)
		 	.success(function(userForms){
		 		deferred.resolve(userForms);
		 	})
		 	.error(function(error){
		 		if (error && error.message){
		 			deferred.reject(error.message);	
		 		} else{
		 			deferred.reject(error);
		 		}
		 	});
		 	return deferred.promise;
		 };

		/**
		 * [deleteFormById removes the identified form from the list of forms]
		 * @param  {[type]}   formId   [id of a form]
		 * @param  {Function} callback [a callback function]
		 * @return {[type]}            [list of remaining forms]
		 */
		 function deleteFormById(formId, callback){
		 	var deferred = $q.defer();

		 	$http.delete("/api/assignment/form/"+formId)
		 	.success(function(userForms){
		 		deferred.resolve(userForms);
		 	})
		 	.error(function(error){
		 		if (error && error.message){
		 			deferred.reject(error.message);	
		 		} else{
		 			deferred.reject(error);
		 		}
		 	});
		 	return deferred.promise;
		 };

		/**
		 * [updateFormById description]
		 * @param  {[type]}   formId   [description]
		 * @param  {[type]}   newForm  [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		 function updateFormById(formId, newForm, callback){
		 	var deferred = $q.defer();

		 	$http.put("/api/assignment/form/"+formId)
		 	.success(function(formAfterUpdate){
		 		deferred.resolve(formAfterUpdate);
		 	})
		 	.error(function(error){
		 		if (error && error.message){
		 			deferred.reject(error.message);	
		 		} else{
		 			deferred.reject(error);
		 		}
		 	});
		 	return deferred.promise;
		 };

		/**
		 * [guid generates a unique id]
		 * @return String [a unique id]
		 */
		 function guid() {
		 	function s4() {
		 		return Math.floor((1 + Math.random()) * 0x10000)
		 		.toString(16)
		 		.substring(1);
		 	}
		 	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		 	s4() + '-' + s4() + s4() + s4();
		 }

		//Creating a UserService
		var formService = {
			createFormForUser: createFormForUser,
			findAllFormsForUser: findAllFormsForUser,
			deleteFormById: deleteFormById,
			updateFormById: updateFormById
		};

		return formService;
		
	};

})();