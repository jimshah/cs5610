"use strict";

module.exports = function(app, userModel, db){
	app.post("/api/assignment/user", createUser);
	app.get("/api/assignment/user", getUsers);
	app.get("/api/assignment/user/id/:id", getUserById);
	app.get("/api/assignment/user/:username", getUserByUsername);
	app.get("/api/assignment/user/:username/:password", getUserByUsernameAndPassword);
	app.put("/api/assignment/user/:id", updateUser);
	app.delete("/api/assignment/user/:id", deleteUserById);


	function createUser(req, res, next){
		var user = req.body;
		userModel.createUser(user)
		.then(function(newUser){
			res.json(newUser);
		})
		.catch(function(error){
			console.log('create user error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	};

	function updateUser(req, res, next){
		var updatedUser = req.body || {};
		var userId = req.params.id || "";
		userModel.updateUser(userId, updatedUser)
		.then(function(userAfterUpdate){
			res.json(userAfterUpdate);
		})
		.catch(function(error){
			console.log('create user error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function getUsers(req, res, next){
		var query = req.query || {};
		
		userModel.findAllUsers()
		.then(function(users){
			res.json(users);
		})
		.catch(function(error){
			console.log('getUsers error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function getUserByUsernameAndPassword(req, res, next){
		var username = req.params.username, password = req.params.password;
		if (!username){
			res.status(400).send("Please supply a username");
		} else if(!password){
			res.status(400).send("Please supply a password");
		} else {
			var credentials = {
				"username" : username,
				"password" : password
			}
			userModel.findUserByCredentials(credentials)
			.then(function(user){
				res.json(user);
			})
			.catch(function(error){
				console.log('getUserByUsernameAndPassword user error', JSON.stringify(error));
				res.status(400).send(JSON.stringify(error));
			});
		}
	}

	function getUserByUsername(req, res, next){
		var username = req.params.username;
		if (!username){
			res.status(400).send("Please supply a username");
		} else {
			userModel.findUserByUsername(username)
			.then(function(user){
				res.json(user);
			})
			.catch(function(error){
				console.log('getUserByUsername user error', JSON.stringify(error));
				res.status(400).send(JSON.stringify(error));
			});
		}
	}

	function deleteUserById(req, res, next){
		var userId = req.params.id;
		userModel.deleteUserById(userId)
		.then(function(users){
			res.json(users);
		})
		.catch(function(error){
			console.log('delete user error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function getUserById(req, res, next){
		var userId = req.params.id;
		userModel.findUserById(userId)
		.then(function(user){
			res.json(user);
		})
		.catch(function(error){
			console.log('delete user error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}
};