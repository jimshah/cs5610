'use strict';

var mongoose = require('mongoose'),
objectId = mongoose.Schema.Types.ObjectId,
FieldSchema = require("./field.schema.js");
//console.log("FieldSchema", FieldSchema);

    /*{
        "id": "000", 
        "title": "Contacts", 
        "userId": 123,
        "fields": []
    }*/

// Define activity schema
module.exports = new mongoose.Schema({
    "title": {
    	type: String
    },
    "userId": {
    	type: String
    },
    "fields": [ FieldSchema ]
}, {collection: 'cs5610.assignment.form'});