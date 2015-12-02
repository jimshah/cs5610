'use strict';
var http = require('http');

module.exports = function(app, db) {
	var apiController = require('../controllers/api.server.controller')(db);
	
	app.route("/api/categories").get(apiController.getCategories);
	app.route("/api/categories/:category").get(apiController.getCategoryEvents);
	app.route("/api/event/:eventId").get(apiController.getEvent);
};