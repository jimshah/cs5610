'use strict';

var mongoose = require('mongoose'),
    objectId = mongoose.Schema.Types.ObjectId;

    //{"id": "4543473b-d068-1048-e846-f68e04ea5c62","username": "zz","password": "zz", "firstName": "zz","lastName": "zz","email": "zz@zz.com","role": []}

// Define activity schema
module.exports = new mongoose.Schema({
    "username": {
    	type: String,
        required: true,
        unique: true
    },
    "password": {
    	type: String,
    	required: true
    },
    "firstName": {
    	type: String
    },
    "lastName": {
    	type: String
    },
    "email": {
    	type: String,
    	required: true
    },
    "role": [
    	{
    		type: String
    	}
    ]
}, {collection: 'cs5610.assignment.user'});