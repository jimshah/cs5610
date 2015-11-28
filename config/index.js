/**
 * Creates app configuration json object
 * @returns {*} - a config object
 */

 module.exports = function() {

    // First load opsworks defaults from the stack
    var config = {
    	"openshift": {
    		"db": {
    			"mongodb": {
    				"host": process.env.OPENSHIFT_MONGODB_DB_HOST,
    				"user": process.env.OPENSHIFT_MONGODB_DB_USERNAME,
    				"pass": process.env.OPENSHIFT_MONGODB_DB_PASSWORD,
    				"port": process.env.OPENSHIFT_MONGODB_DB_PORT,
    				"databases": {
    					"form_builder": "form_builder",
                        "cs5610": "cs5610"
    				},
    				"url": ""
    			}
    		},
    		"port": process.env.OPENSHIFT_NODEJS_PORT,
    		"ipaddress": process.env.OPENSHIFT_NODEJS_IP
    	},
    	"local": {
    		"db": {
    			"mongodb": {
    				"host": "localhost",
    				"user": "",
    				"pass": "",
    				"port": 27017,
    				"databases": {
    					"form_builder": "form_builder",
                        "cs5610": "cs5610"
    				},
    				"url": "mongodb://localhost:27017/form_builder/"
    			}
    		},
    		"port": 3000,
    		"ipaddress": "127.0.0.1"
    	}
    };

    if (process.env.OPENSHIFT_APP_UUID){
    	//config.openshift.db.mongodb.url = "mongodb://"+config.openshift.db.mongodb.host+":"+config.openshift.db.mongodb.port+"/";
        config.openshift.db.mongodb.url = config.openshift.db.mongodb.user + ":" + config.openshift.db.mongodb.pass + "@" + config.openshift.db.mongodb.host + ":" + config.openshift.db.mongodb.port+"/";
    	return config.openshift;
    } else {
    	config.local.db.mongodb.url = "mongodb://"+config.local.db.mongodb.host+":"+config.local.db.mongodb.port+"/";
    	return config.local;
    }
};
