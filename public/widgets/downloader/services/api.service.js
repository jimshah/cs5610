"use strict";
var http = require('http'),
Promise = require('bluebird');

var api = {
	config: {
		appKey: "z7m8NNZ7d6SXhtJv"
	}
};

module.exports = function(app, db){
	//app.post("/api/assignment/user", createUser);

	app.route("/downloader/*").get(downloader);
	app.route("/open/*").get(openSource);

	//app.route("/api/categories").get(getCategories);
	
	/*function downloader(req, res, next) {
		try {
			var options = extractUrl(req);
			console.log('options', options);
			if (!options || !options.host){
				res.status(400).send("Please provide a valid url");
			} else {
				//url = 'http://' + url;
				options.method = 'GET';
				var http = require('http');
				var request = http.get(options, function(response) {
					response.pipe(res);
				});
			}
		} catch(error){
			res.status(400).send({error: error});
		}
	}*/

	function downloader(req, res, next) {
		try {			

			//res.setHeader('content-type', 'text/javascript');
			
			var options = extractUrl(req, '/downloader/');

			res.setHeader("Content-Disposition", "attachment;");//" filename=" + "index.txt");


			if (!options || !options.host){
				res.status(400).send("Please provide a valid url");
			} else {
				//url = 'http://' + url;
				options.method = 'GET';
				var https = require('https');
				var request = https.get(options, function(response) {
					response.pipe(res);
				});
			}
		} catch(error){
			res.status(400).send({error: error});
		}
	}

	function openSource(req, res, next) {
		try {			

			//res.setHeader('content-type', 'text/javascript');
			
			var options = extractUrl(req, '/open/');

			//res.setHeader("Content-Disposition", "attachment;");//" filename=" + "index.txt");


			if (!options || !options.host){
				res.status(400).send("Please provide a valid url");
			} else {
				//url = 'http://' + url;
				options.method = 'GET';
				var https = require('https');
				var request = https.get(options, function(response) {
					response.pipe(res);
				});
			}
		} catch(error){
			res.status(400).send({error: error});
		}
	}

	function extractUrl(req, startsWith){
		var url = "";
		var url = decodeURIComponent(req.url);
		startsWith = startsWith || '/downloader/';
		url = url.substring(startsWith.length);

		var host="", path="";
		if (url && url.indexOf('/')>0){
			console.log('url', url);
			console.log('typeof url', typeof url);
			host = url.substring(0, url.indexOf('/'));
			path = url.substring(url.indexOf('/'));
		} else {
			host = url;
		}
		return {
			host: host,
			path: path
		};
	}

	/*var http = require('http');
	var fs = require('fs');

	var file = fs.createWriteStream("file.jpg");
	var request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
		response.pipe(file);
	});*/

	/**
	 * [getCategories description]
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	 function getCategories(req, res, next) {
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

	/**
	 * [getRequest description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
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
	 };

	};