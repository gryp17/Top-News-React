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
	 * @param {Number} authorId
	 * @param {Number} limit
	 * @param {Number} offset
	 * @returns {Promise}
	 */
	getArticlesByAuthor(authorId, limit, offset) {
		return axios.get("/api/article/author/" + authorId + "/" + limit + "/" + offset);
	},
	/**
	 * Returns a list of autocomplete suggestions based on the category and search term
	 * @param {String} category
	 * @param {String} searchTerm
	 * @param {Number} limit
	 */
	getAutocompleteSuggestions(category, searchTerm, limit){
		return axios.get("/api/article/autocomplete/" + category + "/" + encodeURIComponent(searchTerm) + "/" + limit);
	},
	/**
	 * Returns the most popular articles for the specified period
	 * @param {String} period ("today", "this week", "all time")
	 * @param {Number} limit
	 * @returns {Promise}
	 */
	getMostPopular(period, limit){
		return axios.get("/api/article/popular/" + period + "/" + limit);
	}
}

