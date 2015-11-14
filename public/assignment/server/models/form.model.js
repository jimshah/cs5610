"use strict";

var q = require("q"),
Promise = require('bluebird');

module.exports = function(app){

	var forms = require("./form.mock.json").forms;

	//TODO: Add form title duplication check, mebbe later on 
	function createForm(userId, form){
		try {
			return new Promise(function(resolve, reject){
				if (!userId || typeof userId === "undefined"){
					return callback("please provide a valid userid");
				} else if (!form || typeof form !== "object") {
					return reject("please provide a valid form object");
				} else {
					form.id = guid();
					form.userId = userId;
					forms.push(form);
					return resolve(form);
				}
			});
		} catch(error){
			console.log("catched an Exception in 'createForm' method", error);
			return Promise.reject(error);
		}
	}

	function findAllForms(){
		try {
			return Promise.resolve(forms);
		} catch(error){
			console.log("catched an Exception in 'findAllForms' method", error);
			return Promise.reject(error);
		}
	}

	function findAllFormsForUser(userId){
		try {
			return new Promise(function(resolve, reject){
				if (!userId || typeof userId === "undefined"){
					return reject("please provide a valid userId");
				} else {
					var userForms = [];
					forms.forEach(function(form, index){
						if (form.userId === userId){
							userForms.push(form);
						}
					});
					return resolve(userForms);
				}
			});
		} catch(error){
			console.log("catched an Exception in 'findAllFormsForUser' method", error);
			return Promise.reject(error);
		}
	}

	function findFormById(formId){
		try {
			return new Promise(function(resolve, reject){
				if (!formId || typeof formId === "undefined"){
					return reject("please provide a formId");
				} else {
					var requestedForm;
					forms.forEach(function(form, index){
						if (form.id == formId){
							requestedForm = form;
						}
					});
					if (requestedForm){
						return resolve(requestedForm);
					} else {
						return reject("no form found with formId:"+formId);
					}
				}
			});
		} catch(error){
			console.log("catched an Exception in 'findFormById' method", error);
			return Promise.reject(error);
		}
	}

	function findFormByTitle(title){
		try {
			return new Promise(function(resolve, reject){
				if (!title || typeof title === "undefined"){
					return reject("Please provide a valid form title");
				} else {
					var requiredForm;
					forms.forEach(function(form, index){
						if (form && from.title == title){
							requiredForm = form;
						}
					});
					return resolve(requiredForm);
				}
			});
		} catch(error){
			console.log("catched an Exception in 'findFormByTitle' method", error);
			return Promise.reject(error);
		}
	}

	function updateForm(formId, newForm){
		try {
			return new Promise(function(resolve, reject){
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
					return resolve(formAfterUpdate);
				} else {
					return reject("Error finding form with id : "+formId);
				}
			});
		} catch(error){
			console.log("catched an Exception in 'updateForm' method", error);
			return Promise.reject(error);
		}
	}

	function deleteFormById(formId){
		try {
			return new Promise(function(resolve, reject){
				if (!formId || typeof formId === "undefined"){
					return callback("please provide a valid formId");
				} else {
					var found = false;
					var userId ;
					forms.forEach(function(form, index){
						if (form && form.id == formId){
							found = true;
							userId = form.userId;
							forms.splice(index, 1);
						}
					});
					if (found){
						var remaningForms = [];
						forms.forEach(function(form, index){
							if (form && form.userId === userId){
								remaningForms.push(form);
							}
						})
						return resolve(remaningForms);
					} else {
						return reject("No form found with formId : "+formId);
					}
				}
			});
		} catch(error){
			console.log("catched an Exception in 'deleteFormById' method", error);
			return Promise.reject(error);
		}
	}


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

	 return {
	 	"createForm": createForm,
	 	"findAllForms": findAllForms,
	 	"findAllFormsForUser": findAllFormsForUser,
	 	"findFormById": findFormById,
	 	"findFormByTitle": findFormByTitle,
	 	"updateForm": updateForm,
	 	"deleteFormById": deleteFormById
	 };
	};