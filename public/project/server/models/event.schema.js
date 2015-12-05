'use strict';

var events = [{
            type: "local",
            id: "4543473b-d068-1048-e846-f68e04ea5c63",
            userId: "4543473b-d068-1048-e846-f68e04ea5c61",

            venue_address: "99 Florence Street",
            city_name: "Malden",
            region_name: "Massachusetts",
            country_name: "USA",

            start_time: "2015-11-03 18:00:00",
            stop_time: "2015-11-03 23:00:00",

            created:"2015-09-17 13:06:17",
            modified: "2015-09-17 13:06:17",
            description: "Since Google first published the seminal paper on Big Table in 2006, other organizations have developed their own scalable databases and offered them open sourced or commercially Cassandra, Accumulo, Voldemort, Dynamo, and HBase are all based on Big Tables scalable infrastructure.   Big Table, itself, was not available until earlier this year, when Google announced that they were offering a hosted version for their cloud infrastructure. Setting up and managing infrastructures has been an enormous time sink for many data scientists.  Many hosted solutions are priced well out of the range of smaller startups (and grad students).  Even with funding, moving data between servers remains a bottleneck. Google offers incredible scalability with a low cost to entry.  Data is distributed to all clusters quickly and easily removing unnecessary delay. Ruth Stern will present on getting up and running on the google stack quickly and affordably, so the focus is on the data science and not the infrastructure or cost.  With step-by-step examples it will provide a tour of the Google Cloud, so participants can go out and build their out own Google stack and start their own experiments. Seattle Data Science is a Meetup group powered by Galvanize Seattle, a modern urban campus located in Pioneer Square that offers educational programming, community workspace, tech-related events, and venture capital. For more information on how you can level up yourself or your company, visit us at galvanize.com. ",
            title: "event title",
            date: "2015-12-17",

            attendees: []
        }];

var mongoose = require('mongoose'),
objectId = mongoose.Schema.Types.ObjectId;

// Define activity schema
module.exports = new mongoose.Schema({
    "id": {
        //type: objectId,
        type: String,
    },
    "title": {
        type: String,
        required: true
    },
    "type": {
        type: String//Eventful api has type field
    },/*
    "typeOf": {
        type: String//Either local or api
    },*/
    "userId": {
        type: objectId,
        ref: "User"
    },    
    "venue_address": {
        type: String
    },
    "city_name": {
        type: String
    },
    "region_name": {
        type: String
    },
    "country_name": {
        type: String
    },
    "verified": {
        type: Boolean,
        default: false
    },
    "start_time": {
        type: Date
    },
    "stop_time": {
        type: Date
    },
    "created": {
        type: Date
    },
    "modified": {
        type: Date
    },
    "date": {
        type: String
    },
    "description": {
        type: String
    },
    "privacy": {
        type: String,
        default: "public"
    },
    "host": {
        type: Boolean
    },
    "guest": {
        type: Boolean,
        default: true
    }
}, {collection: 'cs5610.project.event'});