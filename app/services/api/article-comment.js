import axios from "axios";

export default {
	/**
	 * Returns all article comments
	 * @param {Number} articleId
	 * @param {Number} limit
	 * @param {Number} offset
	 * @returns {Promise}
	 */
	getComments(articleId, limit, offset) {
		return axios.get("/api/article-comment/article/" + articleId + "/" + limit + "/" + offset);
	}
}

