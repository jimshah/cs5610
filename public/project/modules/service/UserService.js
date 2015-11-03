(function(){
	'use strict';

	// Users service used for communicating with the users REST endpoint
	angular.module(app.applicationModuleName).factory('UserService', ['$window', '$http', '$q', '$rootScope', UserService]);

	//UserService  function
	function UserService ($window, $http, $q, $rootScope){

		//Local Empty Array of Users
		var users = [
		{
			id: "4543473b-d068-1048-e846-f68e04ea5c61",
			password: "aa",
			fname: "aa",
			lname: "aa",
			email: "aa@aa.com"
		},
		{
			id: "4543473b-d068-1048-e846-f68e04ea5c62",
			password: "zz",
			fname: "zz",
			lname: "zz",
			email: "zz@zz.com"
		}];

		/**
		 * [Looks up for the user identified by (username,password) ]
		 * @param  {[type]}   username [username]
		 * @param  {[type]}   password [password]
		 * @param  {Function} callback [callback function]
		 * @return {user}            [logged in user object]
		 */
		 function findUserByUsernameAndPassword(username, password, callback){
		 	var currentUser, currentIndex;
		 	try {
		 		users.forEach(function(user, index){
		 			if (user && user.username===username && user.password===password)
		 			{
		 				currentUser = user;
		 				currentIndex = index;
		 			}
		 		});
		 		if (currentUser){
		 			return callback(null, currentUser);
		 		} else {
		 			return callback("No User with (username,password) : ("+username+","+password+") Found", null);
		 		}
		 	} catch (error){
		 		console.log("catched an Exception in 'findUserByUsernameAndPassword' method", error);
		 		return callback(error);
		 	}
		 };

		 /**
		  * [findAllUsers Calls back with array of all existing users]
		  * @param  {Function} callback [a callback function]
		  * @return {[users]}            [array of all users]
		  */
		  function findAllUsers(callback){
		  	try {
		  		return callback(null, users);
		  	} catch(error){
		  		console.log("catched an Exception in 'findAllUsers' method", error);
		  		return callback(error);
		  	}
		  };

		/**
		 * [createUser : Adds new user to local array of users and calls back with new user]
		 * @param  {user}   user     [a to-be-created user object]
		 * @param  {Function} callback [a callback function]
		 * @return {[type]}            [Calls back with newly created user]
		 */
		 function createUser(user, callback){
		 	try {
		 		if (!user || typeof user !== 'object'){
		 			return callback("please provide a valid user object");
		 		} else {
		 			user.id = guid();
		 			users.push(user);
		 			return callback(null, user);
		 		}
		 	} catch(error){
		 		console.log("catched an Exception in 'createUser' method", error);
		 		return callback(error);
		 	}
		 };

		 /**
		  * [deleteUserById : removes a user identified by given userId from the array of current users]
		  * @param  {userId - String}   userId   [userId ]
		  * @param  {Function} callback [a callback function]
		  * @return {[user]}            [array of remaining all users]
		  */
		  function deleteUserById(userId, callback){
		  	try {
		  		if (!userId || typeof userId !== 'string'){
		  			return callback("please provide a valid userId String");
		  		} else {
		  			users.forEach(function(user, index){
		  				if (user.id === userId){
		  					console.log("User succesfully deleted");
		  					users.splice(index, 1);
		  				}
		  			});
		  			return callback(null, users);
		  		}
		  	} catch(error){
		  		console.log("catched an Exception in 'deleteUserById' method", error);
		  		return callback(error);
		  	}
		  };

		  /**
		   * [updateUser : updates the identified user with new user properties]
		   * @param  {String}   userId   [description]
		   * @param  {user}   user     [description]
		   * @param  {Function} callback [a callback function]
		   * @return {[type]}            [an updated user object]
		   */
		   function updateUser(userId, updatedUser, callback){
		   	try {
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
		  			return callback(null, userAfterUpdate);
		  		} else {
		  			return callback("Error finding user with id : "+userId, null);
		  		}
		   	} catch(error){
		   		console.log("catched an Exception in 'updateUser' method", error);
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
		var userService = {
			findUserByUsernameAndPassword: findUserByUsernameAndPassword,
			findAllUsers: findAllUsers,
			createUser: createUser,
			deleteUserById: deleteUserById,
			updateUser: updateUser
		};
		return userService;		
	};

})();