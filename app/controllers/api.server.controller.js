"use strict";
var http = require('http');
module.exports = function(req, res){
	var apiService = require('../services/api.server.service');
	
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