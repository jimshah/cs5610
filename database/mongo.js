'use strict';

var mongoose = require('mongoose');

/**
 * Instantiate a database connection
 * @param mongoConfig
 * @returns {MongoDbDatabase}
 */
module.exports = function (mongoConfig) {
    function MongoDbDatabase() {
        this.host = mongoConfig.host || false;
        this.user = mongoConfig.user || '';
        this.pass = mongoConfig.pass || '';

        // Validate connection info
        if (this.host === false) {
            throw new Error("Missing database connection information!");
        }
    }

    /**
     * Connect to a database
     * @param database
     * @returns {*}
     */
    MongoDbDatabase.prototype.connect = function (database) {
        if (typeof database === 'undefined' || !mongoConfig.databases[database]) {
            throw new Error("Must specify a database to connect to")
        }

        var uri = mongoConfig.url;
            uri += mongoConfig.databases[database];

        console.log("Creating mongoose connection for "+uri);

        var options = {
                user: this.user,
                pass: this.pass
            };

        // Connect to the db
        return mongoose.createConnection(uri, options);
    };

    return new MongoDbDatabase();
};