"use strict";

module.exports = function(app, db) {

    var userModel = require("./models/user.model.js")(app, db);
    var eventModel = require("./models/event.model.js")(app, db);
    

    //Including support for api service
    require("./services/api.service.js")(app, userModel, db);
        
    // Including support for user service
    require("./services/user.service.js")(app, userModel, db);

    // Including support for event service
    require("./services/event.service.js")(app, eventModel, db);

};