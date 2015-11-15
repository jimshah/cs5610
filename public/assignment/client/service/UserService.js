(function(){
	'use strict';

	// Users service used for communicating with the users REST endpoint
	angular.module(myFormApp.applicationModuleName).factory('UserService', ['$window', '$http', '$q', '$rootScope', UserService]);

	//UserService  function
	function UserService ($window, $http, $q, $rootScope){

		/**
		 * [Looks up for the user identified by (username,password) ]
		 * @param  {[type]}   username [username]
		 * @param  {[type]}   password [password]
		 * @param  {Function} callback [callback function]
		 * @return {user}            [logged in user object]
		 */
		 function findUserByUsernameAndPassword(username, password){
		 	var deferred = $q.defer();

		 	$http.get("/api/assignment/user/?username="+username+"&password="+password)
		 	.success(function(user){
		 		deferred.resolve(user);
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
		  * [findAllUsers Calls back with array of all existing users]
		  * @param  {Function} callback [a callback function]
		  * @return {[users]}            [array of all users]
		  */
		  function findAllUsers(){
		  	var deferred = $q.defer();

		  	$http.get("/api/assignment/user")
		  	.success(function(users){
		  		deferred.resolve(users);
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
		 * [createUser : Adds new user to local array of users and calls back with new user]
		 * @param  {user}   user     [a to-be-created user object]
		 * @param  {Function} callback [a callback function]
		 * @return {[type]}            [Calls back with newly created user]
		 */
		 function createUser(user){
		 	var deferred = $q.defer();

		 	$http.post("/api/assignment/user", user)
		 	.success(function(newUser){
		 		deferred.resolve(newUser);
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
		  * [deleteUserById : removes a user identified by given userId from the array of current users]
		  * @param  {userId - String}   userId   [userId ]
		  * @param  {Function} callback [a callback function]
		  * @return {[user]}            [array of remaining all users]
		  */
		  function deleteUserById(userId, callback){
		  	var deferred = $q.defer();

		  	$http.put("/api/assignment/user/"+userId, updatedUser)
		  	.success(function(newUser){
		  		deferred.resolve(newUser);
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
		   * [updateUser : updates the identified user with new user properties]
		   * @param  {String}   userId   [description]
		   * @param  {user}   user     [description]
		   * @param  {Function} callback [a callback function]
		   * @return {[type]}            [an updated user object]
		   */
		   function updateUser(userId, updatedUser){
		   	var deferred = $q.defer();

		   	$http.put("/api/assignment/user/"+userId, updatedUser)
		   	.success(function(newUser){
		   		deferred.resolve(newUser);
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