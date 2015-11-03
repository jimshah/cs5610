'use strict';
var http = require('http');

module.exports = function(app) {
	var apiController = require('../controllers/api.server.controller')();
	
	app.route("/api/categories").get(apiController.getCategories);
	app.route("/api/categories/:category").get(apiController.getCategoryEvents);
	app.route("/api/event/:eventId").get(apiController.getEvent);

	/*app.route("/api/categories").get(function(req, res){


		var options = {
			host: 'api.eventful.com',
			path: '/json/categories/list?app_key=z7m8NNZ7d6SXhtJv',
			method: 'GET'
		};

		var callback = function(response) {
			var str = '';
			//another chunk of data has been recieved, so append it to `str`
			response.on('data', function (chunk) {
				str += chunk;
			});

			//the whole response has been recieved, so we just print it out here
			response.on('end', function () {
				res.send(str);
			});
		}

		http.request(options, callback).end();

	});*/
};