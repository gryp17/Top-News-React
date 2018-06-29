export default {
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

