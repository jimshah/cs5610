(function(){
	'use strict';

	// Users service used for communicating with the users REST endpoint
	angular.module(app.applicationModuleName).factory('UserService', ['$window', '$http', '$q', '$rootScope', UserService]);

	//UserService  function
	function UserService ($window, $http, $q, $rootScope){

		/**
		 * [Looks up for the user identified by (email,password) ]
		 * @param  {[type]}   email [email]
		 * @param  {[type]}   password [password]
		 * @param  {Function} callback [callback function]
		 * @return {user}            [logged in user object]
		 */
		 function findUserByEmail(email){
		 	var deferred = $q.defer();

		 	$http.get("/api/project/user?email="+email)
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

		 function findUserByEmailAndPassword(email, password){
		 	var deferred = $q.defer();

		 	$http.get("/api/project/user?email="+email+"&password="+password)
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
		  * [findAllUsers description]
		  * @return {[type]} [description]
		  */
		  function findAllUsers(){
		  	var deferred = $q.defer();

		  	$http.get("/api/project/user")
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
		 * [createUser description]
		 * @param  {[type]} user [description]
		 * @return {[type]}      [description]
		 */
		 function createUser(user){
		 	var deferred = $q.defer();

		 	$http.post("/api/project/user", user)
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
		  * [deleteUserById description]
		  * @param  {[type]} userId [description]
		  * @return {[type]}        [description]
		  */
		  function deleteUserById(userId){
		  	var deferred = $q.defer();

		  	$http.delete("/api/project/user/"+userId)
		  	.success(function(remainingUsers){
		  		deferred.resolve(remainingUsers);
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
		   * a
		   * @param  {[type]} userId      [description]
		   * @param  {[type]} updatedUser [description]
		   * @return {[type]}             [description]
		   */
		   function updateUser(userId, updatedUser){
		   	var deferred = $q.defer();

		   	$http.put("/api/project/user/"+userId, updatedUser)
		   	.success(function(updatedUserObject){
		   		deferred.resolve(updatedUserObject);
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

		   function getUserByToken(token){
		   	var deferred = $q.defer();

		   	$http.get("/api/user/token/"+token)
		   	.success(function(user){
		   		if (typeof user == "string"){
		   			user = JSON.parse(user);
		   		}
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

		//Creating a UserService
		var userService = {
			findUserByEmail: findUserByEmail,
			findAllUsers: findAllUsers,
			createUser: createUser,
			deleteUserById: deleteUserById,
			updateUser: updateUser,
			findUserByEmailAndPassword: findUserByEmailAndPassword,
			getUserByToken: getUserByToken
		};
		return userService;		
	};

})();