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
		 	try {
		 		if (!userId || typeof userId !== "string"){
		 			return callback("please provide a valid userid string");
		 		} else if (!form || typeof form !== "object") {
		 			return callback("please provide a valid form object");
		 		} else {
		 			form.id = guid();
		 			form.userid = userId;
		 			forms.push(form);
		 			return callback(null, form);
		 		}
		 	} catch(error){
		 		console.log("catched an Exception in 'createFormForUser' method", error);
		 		return callback(error);
		 	}
		 };

		/**
		 * [findAllFormsForUser finds all the forms for a particular user]
		 * @param {id} [userId] [id of a user]
		 * @param  {Function} callback [a callback function]
		 * @return {[form]} [a list of forms for a particular userId]
		 */
		 function findAllFormsForUser(userId, callback){
		 	try {
		 		if (!userId || typeof userId !== "string"){
		 			return callback("please provide a valid userid string");
		 		} else {
		 			var userForms = [];
		 			forms.forEach(function(form, index){
		 				if (form.userid === userId){
		 					userForms.push(form);
		 				}
		 			});
		 			return callback(null, userForms);
		 		}
		 	} catch(error){
		 		console.log("catched an Exception in 'findAllFormsForUser' method", error);
		 		return callback(error);
		 	}
		 };

		/**
		 * [deleteFormById removes the identified form from the list of forms]
		 * @param  {[type]}   formId   [id of a form]
		 * @param  {Function} callback [a callback function]
		 * @return {[type]}            [list of remaining forms]
		 */
		 function deleteFormById(formId, callback){
		 	try {
		 		if (!formId || typeof formId !== "string"){
		 			return callback("please provide a valid formId string");
		 		} else {
		 			var found = false;
		 			var userId ;
		 			forms.forEach(function(form, index){
		 				if (form && form.id === formId){
		 					found = true;
		 					userId = form.userid;
		 					forms.splice(index, 1);
		 				}
		 			});
		 			if (found){
		 				var remaningForms = [];
		 				forms.forEach(function(form, index){
		 					if (form && form.userid === userId){
		 						remaningForms.push(form);
		 					}
		 				})
		 				return callback(null, remaningForms);
		 			} else {
		 				return callback("No form found with formId : "+formId);
		 			}
		 		}
		 	} catch(error){
		 		console.log("catched an Exception in 'deleteFormById' method", error);
		 		return callback(error);
		 	}
		 };

		/**
		 * [updateFormById description]
		 * @param  {[type]}   formId   [description]
		 * @param  {[type]}   newForm  [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		 function updateFormById(formId, newForm, callback){
		 	try {
		 		var found = false;
		 		var formAfterUpdate;
		 		forms.forEach(function(form){
		 			if (form && form.id===formId){
		 				found = true;
		  				//Updating only newly properties from the input updatedUser object
		  				for(var prop in form){
		  					if (newForm[prop]){
		  						form[prop] = newForm[prop];
		  					}
		  				}
		  				form.id = formId;
		  				formAfterUpdate = form;
		  			}
		  		});
		 		if (found){
		 			return callback(null, formAfterUpdate);
		 		} else {
		 			return callback("Error finding form with id : "+formId, null);
		 		}
		 	} catch(error){
		 		console.log("catched an Exception in 'updateFormById' method", error);
		 		return callback(error);
		 	}
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