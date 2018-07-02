var _ = require("lodash");

module.exports = {
	/**
	 * Validates all request parameters using the provided rules
	 * @param {Array|String} rules
	 * @returns {Function}
	 */
	validate: function (rules){
		var self = this;
		
		return function (req, res, next){
			var data = req.body;
			var errors = {};
			
			//for each field
			_.forOwn(rules, function (fieldRules, field){
				
				//convert the string into array if it's not an array already
				if(fieldRules.constructor !== Array){
					fieldRules = fieldRules.split(",");
				}
				
				//for each rule
				fieldRules.every(function (rule){
					rule = rule.trim();
					
					//"required" rule
					if(rule === "required"){
						if(!self.isSet(data, field)){
							errors[field] = "This field is required";
							return false;
						}
					}
					
					//TODO:
					//more rules
					//..........
					
				});
				
			});
			
			if(Object.keys(errors).length > 0){
				res.json({
					errors: errors
				});
			}else{
				next();
			}
		};
	},
	/**
	 * Helper function that checks if the provided field is set
	 * @param {Object} data
	 * @param {String} field
	 * @returns {Boolean}
	 */
	isSet: function (data, field){
		return data[field] && data[field].trim().length > 0;
	}
};