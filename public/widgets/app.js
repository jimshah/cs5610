"use strict";

module.exports = function(app, db) {

    /*var userModel = require("./models/user.model.js")(app, db);
    var eventModel = require("./models/event.model.js")(app, db);*/

    //Including support for downloader api service
    require("./downloader/services/api.service.js")(app, db);

};