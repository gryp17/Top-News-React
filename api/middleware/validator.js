var path = require("path");
var async = require("async");
var _ = require("lodash");

var app = require("../server");

var UserModel = require("../models/user");

var MIN_PASSWORD_LENGTH = 6;

module.exports = {
	/**
	 * Validates all request parameters using the provided rules
	 * @param {Array|String} rules
	 * @returns {Function}
	 */
	validate: function (rules){
		var self = this;
		
		return function (req, res, next){
			var config = app.get("config");
			var data = req.body;
			var files = req.files;
			var asyncRules = ["unique"]; //list of async rules
			var asyncValidations = {};
			var errors = {};
			
			//for each field
			fieldLoop:
			for(var field in rules){
				var fieldRules = rules[field];
				var fieldValue = data[field];
				
				//convert the string into array if it's not an array already
				if(fieldRules.constructor !== Array){
					fieldRules = fieldRules.split(",");
				}
								
				//for each rule
				for(var i = 0; i < fieldRules.length; i++){
					var rule = fieldRules[i].trim();
					
					//"optional" rule (used together with other rules. if the field is not set all other rules will be skipped. however if the field is set the rest of the validations will be run)
					//example: ["optional", "boolean"]
					if(rule === "optional"){
						if(!self.isSet(data, files, field)){
							continue fieldLoop;
						}
					}
					
					//"required" rule
					if(rule === "required"){
						if(!self.isSet(data, files, field)){
							errors[field] = "This field is required";
							continue fieldLoop;
						}
					}
					
					//"boolean" rule
					if(rule === "boolean"){
						if(!self.isBoolean(fieldValue)){
							errors[field] = "Invalid boolean value";
							continue fieldLoop;
						}
					}
					
					//"email" rule
					if(rule === "email"){
						if(!self.isEmail(fieldValue)){
							errors[field] = "Invalid email";
							continue fieldLoop;
						}
					}
					
					//"strong-password" rule
					if(rule === "strong-password"){
						if(!self.isStrongPassword(fieldValue)){
							errors[field] = "Must contain at least "+MIN_PASSWORD_LENGTH+" characters, a digit and a letter";
							continue fieldLoop;
						}
					}
					
					//"valid-avatar" rule
					if(rule === "valid-avatar"){
						var file = files[field];
						var extension = path.extname(file.originalFilename).replace(".", "").toLowerCase();
						var maxSize = config.uploads.avatars.maxSize;
						var validExtensions = config.uploads.avatars.validExtensions;
						
						//max file size
						if (file.size > maxSize) {
							errors[field] = "The avatar is bigger than "+(maxSize / 1000000)+"MB";
							continue fieldLoop;
						}

						//valid extensions
						if (validExtensions.indexOf(extension) === -1) {
							errors[field] = "Invalid file. (Valid extensions: "+validExtensions.join(", ")+")";
							continue fieldLoop;
						}
					}
					
					//min-\d+ rule
					//examples: min-5, min-10, min-50
					var matches = rule.match(/min-(\d+)/);
					if(matches && matches[1]){
						var limit = matches[1];
						
						if(fieldValue.trim().length < limit){
							errors[field] = "Must be at least "+limit+" chracters";
							continue fieldLoop;
						}
					}
					
					//max-\d+ rule
					//examples: max-5, max-10, max-50
					var matches = rule.match(/max-(\d+)/);
					if(matches && matches[1]){
						var limit = matches[1];
						
						if(fieldValue.trim().length > limit){
							errors[field] = "Must not exceed "+limit+" chracters";
							continue fieldLoop;
						}
					}
										
					//matches(...) rule
					//examples: matches(password)
					var matches = rule.match(/matches\((.+?)\)/);
					if(matches && matches[1]){
						var matchField = matches[1];
						
						if(fieldValue !== data[matchField]){
							errors[field] = "The fields don't match";
							continue fieldLoop;
						}
					}
										
					//async rules
					//since those rules are async we add them to a queue that is executed only if all sync validations for this field have passed
					if(asyncRules.indexOf(rule) !== -1){
						if(!asyncValidations[field]){
							asyncValidations[field] = [];
						}
						
						asyncValidations[field].push({
							rule: rule,
							field: field,
							fieldValue: fieldValue
						});
					}
					
				}
			}
					
			//run all async tasks (if there are any)
			async.parallel(self.generateAsyncTasks(asyncValidations), function (err, validationErrors){
				if(err){
					return next(err);
				}
				
				//check if there are any async validation errors
				validationErrors.forEach(function (validationError){
					if(validationError){
						errors[validationError.field] = validationError.error;
					}
				});
								
				if(Object.keys(errors).length > 0){
					res.json({
						errors: errors
					});
				}else{
					next();
				}
				
			});
			
		};
	},
	/**
	 * Generates the async validation tasks
	 * @param {Object} asyncValidations
	 * @returns {Array}
	 */
	generateAsyncTasks: function (asyncValidations) {
		var asyncTasks = [];
		
		_.forOwn(asyncValidations, function (validations, field) {

			validations.forEach(function (validation) {
				
				//"unique" rule
				if(validation.rule === "unique"){
					
					//unique username
					if (validation.field === "username") {
						asyncTasks.push(function (done) {
							UserModel.getByUsername(validation.fieldValue.trim(), function (err, user) {
								if (err) {
									return done(err);
								}

								if (user) {
									done(null, {
										field: field,
										error: field.charAt(0).toUpperCase() + field.slice(1) + " already in use"
									});
								}else{
									done(null);
								}
							});
						});
					} 
					
					//unique email
					if (validation.field === "email") {
						asyncTasks.push(function (done) {
							UserModel.getByEmail(validation.fieldValue.trim(), function (err, user) {
								if (err) {
									return done(err);
								}

								if (user) {
									done(null, {
										field: field,
										error: field.charAt(0).toUpperCase() + field.slice(1) + " already in use"
									});
								}else{
									done(null);
								}
							});
						});
					}
				}
			});
		});
		
		return asyncTasks;
	},
	/**
	 * Helper function that checks if the provided field is set
	 * @param {Object} data
	 * @param {Array} files
	 * @param {String} field
	 * @returns {Boolean}
	 */
	isSet: function (data, files, field){
		var value = data[field];
		
		if(this.isString(value)){
			return value.trim().length > 0;
		}else{
			if(files && files[field]){
				var file = files[field];
				return file.originalFilename.length !== 0;
			}else{
				return typeof value !== "undefined";
			}
		}
	},
	/**
	 * Helper function that checks if the provided field is a string
	 * @param {String} value
	 * @returns {Boolean}
	 */
	isString: function (value){
		return typeof value === "string";
	},
	/**
	 * Helper function that checks if the provided field is a boolean
	 * @param {Boolean} value
	 * @returns {Boolean}
	 */
	isBoolean: function (value){
		return typeof value === "boolean";
	},
	/**
	 * Helper function that checks if the provided field is a valid email
	 * @param {String} value
	 * @returns {Boolean}
	 */
	isEmail: function (value){
		var pattern = /^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i;
		return pattern.test(value);
	},
	/**
	 * Helper function that checks if the provided field is a valid/strong password
	 * @param {String} value
	 * @returns {Boolean}
	 */
	isStrongPassword: function (value){
		return value.length >= MIN_PASSWORD_LENGTH && /\d+/.test(value) && /[a-z]+/i.test(value);
	}
};