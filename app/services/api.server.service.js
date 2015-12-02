"use strict";
var http = require('http'),
Promise = require('bluebird');
var nodemailer = new require("../../services/nodemailer.js")();
//console.log("nodemailer", nodemailer;
/*nodemailer.prototype.sendEmail()
.then(function(result){
	console.log("result of nodemailer", result);
});*/

function ApiServerService() {
};

var api = {
	config: {
		appKey: "z7m8NNZ7d6SXhtJv"
	}
}


module.exports = function(db){


	ApiServerService.prototype.getCategories = function(req, res, next) {
		try {
			var options = {
				host: "api.eventful.com",
				path: "/json/categories/list?app_key="+api.config.appKey,
				method: 'GET'
			};
			return getRequest(options)
			.then(function(responseData){
				res.status(200).send(responseData);
			})
			.catch(function(error){
				res.status(400).send({error: error});
			})
		} catch(error){
			res.status(400).send({error: error});
		}
	};

	ApiServerService.prototype.getCategoryEvents = function(req, res, next) {
		var self = this, category = req.params.category;
		
		try {
			var options = {
				host: "api.eventful.com",
				path: "/json/events/search?app_key="+api.config.appKey+"&category="+category,
				method: 'GET'
			};
			return getRequest(options)
			.then(function(responseData){
				res.status(200).send(responseData);
			})
			.catch(function(error){
				res.status(400).send({error: error});
			})
		} catch(error){
			res.status(400).send({error: error});	
		}
	};

	ApiServerService.prototype.getEvent = function(req, res, next){
		var self = this, eventId = req.params.eventId;
		console.log("eventId", eventId);
		try {
			var options = {
				host: "api.eventful.com",
				path: "/json/events/get?app_key="+api.config.appKey+"&id="+eventId,
				method: 'GET'
			};
			return getRequest(options)
			.then(function(responseData){
				res.status(200).send(responseData);
			})
			.catch(function(error){
				res.status(400).send({error: error});
			})
		} catch(error){
			res.status(400).send({error: error});
		}
	};


	function getRequest(options){
		var self = this;
		try {
			return new Promise(function(resolve, reject){
				options = options || {};

				var callback = function(response) {
					var str = '';

					response.on('data', function (chunk) {
						str += chunk;
					});


					response.on('end', function () {
						return resolve(str);
					});

					response.on("error", function(error){
						return reject(error);
					});
				};

				http.request(options, callback).end();
			});
		}catch(error){
			console.log("caught an error in \"getRequest\" function");
			return Promise.reject(error);
		};
	}

	return new ApiServerService();
}();