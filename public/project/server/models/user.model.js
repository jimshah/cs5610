"use strict";

var q = require("q"),
Promise = require('bluebird'),
mongoose = require("mongoose");

module.exports = function(app, db){

	// Defining UserModel 
	var UserSchema = require('./user.schema.js'),
	UserModel = db.model('User', UserSchema);

	/**
	 * [createUser description]
	 * @param  {[type]} user [description]
	 * @return {[type]}      [description]
	 */
	function createUser(user){
		try {
			return new Promise(function(resolve, reject){

				if (!user || typeof user !== 'object'){
					return reject("please provide a valid user object");
				} else {
					user.id = user._id = mongoose.Types.ObjectId();
					user.provider = "local";
					user.joined = new Date();

					UserModel.create(user, function(err, newlyCreatedUser){
						if (err){
							console.log("Error while createUser : ", err);
							return reject(err);
						} else {
							return resolve(newlyCreatedUser);
						}
					});
				}

			});
		} catch(error){
			console.log("catched an Exception in 'createUser' method", error);
			return Promise.reject(error);
		}
	}

	/**
	 * [findAllUsers description]
	 * @return {[type]} [description]
	 */
	function findAllUsers(){
		try {
			return new Promise(function(resolve, reject){
				UserModel.find({}, function(err, dbUsers){
					if (err){
						console.log("Error while findAllUsers : ", err);
						return reject(err);
					} else {
						resolve(dbUsers);
					}
				})
			});			
		} catch(error){
			console.log("catched an Exception in 'findAllUsers' method", error);
			return Promise.reject(error);
		}
	}

	/**
	 * [findUserById description]
	 * @param  {[type]} instanceId [description]
	 * @return {[type]}            [description]
	 */
	function findUserById(instanceId){
		try{
			return new Promise(function(resolve, reject){
				UserModel.findOne({id: instanceId}, function(err, user){
					if (err || !user){
						return reject(err || "no user found with id:"+instanceId);
					} else {
						return resolve(user);
					}
				});
			});
		} catch(error){
			console.log("catched an Exception in 'findUserById' method", error);
			return Promise.reject(error);
		}
	}

	function findUserByEmail(email){
		try{
			return new Promise(function(resolve, reject){
				UserModel.findOne({email: email}, function(err, user){
					if (err || !user){
						return reject(err || "no user found with email:"+email);
					} else {
						return resolve(user);
					}
				});
			});
		} catch(error){
			console.log("catched an Exception in 'findUserById' method", error);
			return Promise.reject(error);
		}
	}

	/**
	 * [updateUser description]
	 * @param  {[type]} userId      [description]
	 * @param  {[type]} updatedUser [description]
	 * @return {[type]}             [description]
	 */
	function updateUser(userId, updatedUser){
		try{
			return new Promise(function(resolve, reject){
				UserModel.findOne({id: userId}, function(err, user){
					if (err || !user){
						return reject(err || "no user found for updateUser with id:"+userId);
					} else {
		  				//Updating only newly properties from the input updatedUser object
		  				for(var prop in user){
		  					if (!(typeof updatedUser[prop] == 'undefined')){
		  						user[prop] = updatedUser[prop];
		  					}
		  				}
		  				user.save(function(error){
		  					if (error){
		  						return reject("Error while saving after updating user : "+error);
		  					} else {
		  						return resolve(user);
		  					}
		  				});
		  			}
		  		});
			});
		} catch(error){
			console.log("catched an Exception in 'updateUser' method", error);
			return Promise.reject(error);
		}
	}

	/**
	 * [deleteUserById description]
	 * @param  {[type]} userId [description]
	 * @return {[type]}        [description]
	 */
	function deleteUserById(userId){
		try {
			return new Promise(function(resolve, reject){
				if (typeof userId==="undefined" || !userId){
					return reject("please provide a valid userId");
				} else {
					UserModel.remove({id: userId}, function(err){
						if(err){
							return reject(err || "error deleting user with id:"+userId+" \n error being "+err);
						} else {
							findAllUsers()
							.then(function(dbUsers){
								return resolve(dbUsers);
							})
							.catch(function(error){
								return reject(error);
							});
						}
					});
				}
			});
		} catch(error){
			console.log("catched an Exception in 'removeUser' method", error);
			return Promise.reject(error);
		}
	}

	/**
	 * [findUserByCredentials description]
	 * @param  {[type]} credentials [description]
	 * @return {[type]}             [description]
	 */
	function findUserByCredentials(credentials){
		try{
			return new Promise(function(resolve, reject){
				if (!credentials || typeof credentials !== 'object'){
					return reject("Please provide a valid credential object");
				} else if(!credentials.email ) {
					return reject("No email found in the credentials");
				} else if(!credentials.password ) {
					return reject("No password found in the credentials");
				} else {
					UserModel.findOne({email: credentials.email, password: credentials.password}, function(err, user){
						if (err || !user){
							return reject(err || "no user found while findUserByCredentials : "+credentials.email+","+credentials.password);
						} else {
							return resolve(user);
						}
					});
				}
			});
		} catch(error){
			console.log("catched an Exception in 'findUserByCredentials' method", error);
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
	 	"createUser": createUser,
	 	"findAllUsers": findAllUsers,
	 	"findUserById": findUserById,
	 	"updateUser": updateUser,
	 	"deleteUserById": deleteUserById,
	 	"findUserByCredentials": findUserByCredentials,
	 	"findUserByEmail": findUserByEmail
	 };


	};