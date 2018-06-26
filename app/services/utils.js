export default {
	/**
	 * Parses the response and returns the data as json or throws an error
	 * @param {Object} response
	 * @returns {Object}
	 */
	handleResponse (response){
		if(response.ok){
			return response.json();
		}else{
			var error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
	},
	/**
	 * Limits the text string to X characters
	 * @param {String} text
	 * @param {Number} limit
	 * @returns {String}
	 */
	limitTo(text, limit){
		if(text.length > limit){
			text = text.substr(0, limit - 3) + "...";
		}
		
		return text;
	}
}

