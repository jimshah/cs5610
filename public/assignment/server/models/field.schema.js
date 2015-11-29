'use strict';

var mongoose = require('mongoose'),
    objectId = mongoose.Schema.Types.ObjectId;

    //{"id": "888", "label": "Description", "type": "TEXTAREA", "placeholder": "Title"},

var OptionSchema = mongoose.Schema({
            "label" : String,
            "value" : String
    });

// Define activity schema
module.exports = new mongoose.Schema({
    "id": {
        type: objectId,
    },
    "label": {
    	type: String
    },
    "fieldType": {
    	type: String
    },
    "options": [OptionSchema],
    "placeholder": {
    	type: String
    }
});