"use strict";
var http = require('http'),
Promise = require('bluebird'),
youtubedl = require('youtube-dl'),
fs = require('fs');

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

			//res.setHeader("Content-Disposition", "attachment;");//" filename=" + "index.txt");


			if (!options || !options.host){
				res.status(400).send("Please provide a valid url");
			} else {
				
				var url = options.host + options.path;
				console.log('Starting to Stream %s',url);
				var video = youtubedl(url,['--format=18', '--no-check-certificate']);

				video.on('info', function(info) {
				  console.log('Download started');
				  console.log('filename: ' + info.filename);
				  console.log('size: ' + info.size);
				});

				video.on('error', function(error) {
				  console.log('error', error);
				  res.status(400).send({error: error});
				});

				video.pipe(res);
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