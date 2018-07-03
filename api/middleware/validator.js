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
			fieldLoop:
			for(var field in rules){				
				var fieldRules = rules[field];
				
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
						if(!self.isSet(data, field)){
							continue fieldLoop;
						}
					}
					
					//"required" rule
					if(rule === "required"){
						if(!self.isSet(data, field)){
							errors[field] = "This field is required";
							continue fieldLoop;
						}
					}
					
					//"boolean" rule
					if(rule === "boolean"){
						if(!self.isBoolean(data[field])){
							errors[field] = "Invalid boolean value";
							continue fieldLoop;
						}
					}
					
					//TODO:
					//more rules
					//..........
				}				
			}
			
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
		var value = data[field];
		
		if(this.isString(value)){
			return value.trim().length > 0;
		}else{
			return typeof value !== "undefined";
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
	}
};