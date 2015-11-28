"use strict";

module.exports = function(app, formBuilderDb) {

	//app.route("/api/categories").get(apiController.getCategories);

    var formModel = require("./models/form.model.js")(app, formBuilderDb);
    var userModel = require("./models/user.model.js")(app, formBuilderDb);
    
    require("./services/user.service.js")(app, userModel, formBuilderDb);
    require("./services/form.service.js")(app, formModel, formBuilderDb);
    require("./services/field.service.js")(app, formModel, formBuilderDb);

};