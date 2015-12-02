"use strict";
var nodemailer = require("nodemailer");
module.exports = function(mailConfig){

	if (!mailConfig){
		mailConfig = {};
		mailConfig.user = "jsnowisback@gmail.com";
		mailConfig.pass = "filmbazi";
	}

	

	function NodeMailerService() {
		var self = this;
		//self.transporter = transporter;
	}

	/**
	 * [getConnection description]
	 * @return {[type]} [description]
	 */
	 NodeMailerService.prototype.sendEmail = function(options){
	 	var self = this;
	 	try {
	 		options = options || {};
	 		var mailOptions = {
			    from: mailConfig.user, // sender address 
			    to: options.to || "shah.jain@husky.neu.edu", // list of receivers 
			    subject: "Welcome. to JoinUs", // Subject line 
			    text: 'We are sending this email to confirm your registration to JoinUs.' // plaintext body 
			    //html: '<b>Hello world ✔</b>' // html body 
			};
			return new Promise(function(resolve, reject){
				// create reusable transporter object using SMTP transport 
				var transporter = nodemailer.createTransport({
					service: 'Gmail',
					auth: {
						user: mailConfig.user,
						pass: mailConfig.pass
					}
				});
				transporter.sendMail(mailOptions, function(error, info){
					console.log("okie");
					if(error){
						console.log("Error sending emails", error);
						return reject(error);
					} else {
						console.log('Message sent: ' + info.response);
						return resolve(info);
					}
				});
			});
		} catch(error){
			console.log("Error creating a connection", error);
		}
	}

	return NodeMailerService;

};