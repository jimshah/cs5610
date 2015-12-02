"use strict";
var http = require('http');
module.exports = function(db){
	var apiService = require('../services/api.server.service')(db);
	
	return {
		getCategories: apiService.getCategories,
		getCategoryEvents: apiService.getCategoryEvents,
		getEvent: apiService.getEvent
	}
};

/*module.exports = function(){
	var apiService = require('../services/api.server.service')();
	console.log("apiService", apiService);

	function ApiServerController() {
	}

	ApiServerController.prototype.getCategories = function(req, res, next){
		return apiService.getCategories(req, res, next);
	};
	
	return ApiServerController;
};*/