"use strict";

var nodemailer = new require("../../../../services/nodemailer.js")();
//console.log("nodemailer", nodemailer;
/*nodemailer.prototype.sendEmail()
.then(function(result){
	console.log("result of nodemailer", result);
});*/

module.exports = function(app, userModel, db){
	app.post("/api/project/user", createUser);
	app.get("/api/project/user", handleGetUserRequets);
	app.put("/api/project/user/:id", updateUser);
	app.delete("/api/project/user/:userId", deleteUserById);
	app.get("/api/user/token/:token", getUserByToken);
	app.get("/api/search/user/:searchTerm", findUserBySearchTerm);
	app.put("/api/user/follow/", addFollower);

	function getUserByToken(req, res, next){
		var token = req.params.token;
		userModel.getUserByToken(token)
		.then(function(user){
			res.json(user);
		})
		.catch(function(error){
			console.log('getUserByToken error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function handleGetUserRequets(req, res, next){
		if (req && req.query && req.query.email && req.query.password){
			return getUserByEmailAndPassword(req,res,next);
		} else if (req && req.query && req.query.email){
			return getUserByEmail(req,res,next);
		} else {
			return findAllUsers(req,res,next);
		}
	}

	function createUser(req, res, next){
		var user = req.body;
		userModel.createUser(user)
		.then(function(newUser){

			//Async sending of registration email
			nodemailer.prototype.sendEmail({"to": newUser.email})
			.then(function(result){
				console.log("result of nodemailer", result);
			});

			res.json(newUser);
		})
		.catch(function(error){
			console.log('create user error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	};

	function findAllUsers(req, res, next){
		
		userModel.findAllUsers()
		.then(function(users){
			res.json(users);
		})
		.catch(function(error){
			console.log('findAllUsers error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

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

	function getUserByEmailAndPassword(req, res, next){
		var email = req.query.email, password = req.query.password;
		if (!email){
			res.status(400).send("Please supply a email");
		} else if(!password){
			res.status(400).send("Please supply a password");
		} else {
			var credentials = {
				"email" : email,
				"password" : password
			}
			userModel.findUserByCredentials(credentials)
			.then(function(user){
				res.json(user);
			})
			.catch(function(error){
				console.log('getUserByEmailAndPassword user error', JSON.stringify(error));
				res.status(400).send(JSON.stringify(error));
			});
		}
	}

	function getUserByEmail(req, res, next){
		//var username = req.params.username;
		var email = req.query.email;
		if (!email){
			res.status(400).send("Please supply a email");
		} else {
			userModel.findUserByEmail(email)
			.then(function(user){
				res.json(user);
			})
			.catch(function(error){
				console.log('getUserByEmail user error', JSON.stringify(error));
				res.status(400).send(JSON.stringify(error));
			});
		}
	}

	function deleteUserById(req, res, next){
		var userId = req.params.userId;
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

	function findUserBySearchTerm(req, res, next){
		var searchTerm = req.params.searchTerm;
		if (searchTerm){
			var options = {};
			var searchTerm = searchTerm.split(" ");
			if (searchTerm.length >= 2) {
				options.fname = { $regex: new RegExp(searchTerm[0], "i") };
				options.lname = { $regex: new RegExp(searchTerm[1], "i") };
			} else {
				options.fname = { $regex: new RegExp(searchTerm[0], "i") };
			}
			userModel.findUserBySearchTerm(options)
			.then(function(user){
				res.json(user);
			})
			.catch(function(error){
				console.log('findUserBySearchTerm error', JSON.stringify(error));
				res.status(400).send(JSON.stringify(error));
			});
		} else {
			res.status(400).send({error: "Please include a search term to search for an user"});
		}
	}

	function addFollower(req, res, next){
		var followObject = req.body;
		userModel.addFollower(followObject)
		.then(function(user){
			res.json(user);
		})
		.catch(function(error){
			console.log('addFollower error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}
};