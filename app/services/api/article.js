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
	 * @returns {Promise}
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
	},
	/**
	 * Creates a new article
	 * @param {Object} data 
	 * @returns {Promise}
	 */
	create(data){
		return axios.post("/api/article", data);
	},
	/**
	 * Updates an existing article
	 * @param {Number} id 
	 * @param {Object} data 
	 * @returns {Promise}
	 */
	update(id, data){
		return axios.put("/api/article/"+id, data);
	},
	/**
	 * Deletes an existing article
	 * @param {Number} id 
	 */
	delete(id){
		return axios.delete("/api/article/"+id);
	}
}

