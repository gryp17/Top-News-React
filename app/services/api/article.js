import axios from "axios";

export default {
	/**
	 * Returns all articles that match the specified criterias
	 * @param {String} category
	 * @param {String} searchTerm
	 * @param {Number} limit
	 * @param {Number} offset
	 * @returns {Promise}
	 */
	getArticles(category, searchTerm, limit, offset) {
		return axios.get("/api/article/category/" + category + "/" + encodeURIComponent(searchTerm) + "/" + limit + "/" + offset);
	},
	/**
	 * Returns the article that matches the specified article id
	 * @param {Number} id
	 * @returns {Promise}
	 */
	getArticleById(id) {
		return axios.get("/api/article/" + id);
	},
	/**
	 * Returns all articles that match the specified criterias
	 * @param {type} authorId
	 * @param {type} limit
	 * @param {type} offset
	 * @returns {unresolved}
	 */
	getArticlesByAuthor(authorId, limit, offset) {
		return axios.get("/api/article/author/" + authorId + "/" + limit + "/" + offset);
	}
}

