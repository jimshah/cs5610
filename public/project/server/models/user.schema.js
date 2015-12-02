'use strict';

var mongoose = require('mongoose'),
objectId = mongoose.Schema.Types.ObjectId;

// Define activity schema
module.exports = new mongoose.Schema({
    "id": {
        type: objectId,
    },
    "fname": {
        type: String
    },
    "lname": {
        type: String
    },
    "email": {
        type: String,
        required: true,
        unique: true
    },    
    "password": {
        type: String,
        required: true
    },
    "verified": {
        type: Boolean,
        default: false
    },
    "joined": {
        type: Date
    },
    "lastModified": {
        type: Date,
        default: Date.now()
    },
    "provider": String,
    "providerIdentifierField": String,
    "providerData": {
        "facebook": {
            "id": String,
            "email": String,
            "gender": String,
            "name": String,
            "first_name": String,
            "last_name": String,
            "link": String,
            "locale": String,
            "timezone": Number,
            "updated_time": Date,
            "verified": Boolean
        },
        "google": {
            "id": String,
            "email": String,
            "verified_email": Boolean,
            "name": String,
            "given_name": String,
            "family_name": String,
            "link": String,
            "picture": String,
            "locale": String
        }
    }
}, {collection: 'cs5610.project.user'});