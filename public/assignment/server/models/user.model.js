"use strict";

var q = require("q"),
Promise = require('bluebird');;

module.exports = function(app){

	//Local Empty Array of Users
	var users = require("./user.mock.json").users;

	function createUser(user){
		try {
			return new Promise(function(resolve, reject){
				if (!user || typeof user !== 'object'){
					return reject("please provide a valid user object");
				} else {
					user.id = guid();
					user.role = [];
					users.push(user);
					return resolve(user);
				}
			});
		} catch(error){
			console.log("catched an Exception in 'createUser' method", error);
			return Promise.reject(error);
		}
	}

	function findAllUsers(){
		try {
			return Promise.resolve(users);			
		} catch(error){
			console.log("catched an Exception in 'findAllUsers' method", error);
			return Promise.reject(error);
		}
	}

	function findUserById(instanceId){
		try{
			var currentUser, currentIndex;
			return new Promise(function(resolve, reject){
				if (typeof instanceId === 'undefined'){
					return reject("Please provide valid user id");
				} else {
					users.forEach(function(user, index){
						if (user && user.id==instanceId)
						{
							currentUser = user;
							currentIndex = index;
						}
					});
					if (currentUser){
						return resolve(currentUser);
					} else {
						return reject("no user found with id:"+instanceId);
					}
				}
			});
		} catch(error){
			console.log("catched an Exception in 'findUserById' method", error);
			return Promise.reject(error);
		}
	}

	function updateUser(userId, updatedUser){
		try{
			return new Promise(function(resolve, reject){
				var found = false;
				var userAfterUpdate;
				users.forEach(function(user){
					if (user && user.id===userId){
						found = true;
		  				//Updating only newly properties from the input updatedUser object
		  				for(var prop in user){
		  					if (updatedUser[prop]){
		  						user[prop] = updatedUser[prop];
		  					}
		  				}
		  				user.id = userId;
		  				userAfterUpdate = user;
		  			}
		  		});
				if (found){
					return resolve(userAfterUpdate);
				} else {
					return reject("Error finding user with id : "+userId);
				}
			});
		} catch(error){
			console.log("catched an Exception in 'updateUser' method", error);
			return Promise.reject(error);
		}
	}

	function deleteUserById(userId){
		try {
			return new Promise(function(resolve, reject){
				if (typeof userId==="undefined" || !userId){
					return reject("please provide a valid userId");
				} else {
					users.forEach(function(user, index){
						if (user.id == userId){
							users.splice(index, 1);
							console.log("User with id "+userId+"succesfully deleted");
						}
					});
					return resolve(users);
				}
			});
		} catch(error){
			console.log("catched an Exception in 'removeUser' method", error);
			return Promise.reject(error);
		}
	}

	function findUserByUsername(username){
		try {
			var currentUser, currentIndex;
			return new Promise(function(resolve, reject){
				if (!username){
					return reject("Please provide valid username");
				} else {
					users.forEach(function(user, index){
						if (user && user.username===username)
						{
							currentUser = user;
							currentIndex = index;
						}
					});
					if (currentUser){
						return resolve(currentUser);
					} else {
						return reject("no user found with username:"+username);
					}
				}
			});
		} catch(error){
			console.log("catched an Exception in 'findUserByUsername' method", error);
			return Promise.reject(error);
		}
	}

	function findUserByCredentials(credentials){
		try{
			return new Promise(function(resolve, reject){
				if (!credentials || typeof credentials !== 'object'){
					return reject("Please provide a valid credential object");
				} else if(!credentials.username ) {
					return reject("No username found in the credentials");
				} else if(!credentials.password ) {
					return reject("No password found in the credentials");
				} else {
					var currentUser, currentIndex, username=credentials.username, password=credentials.password;
					users.forEach(function(user, index){
						if (user && user.username===username && user.password===password)
						{
							currentUser = user;
							currentIndex = index;
						}
					});
					if (currentUser){
						return resolve(currentUser);
					} else {
						return reject("No User with (username,password) : ("+username+","+password+") Found");
					}
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
	 	"findUserByUsername": findUserByUsername,
	 	"findUserByCredentials": findUserByCredentials
	 };


	};