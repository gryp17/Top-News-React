import Utils from "../utils";

export default {
	getArticles(category, searchTerm, limit, offset) {
		return fetch("/api/article/" + category + "/" + encodeURIComponent(searchTerm) + "/" + limit + "/" + offset)
		.then(Utils.handleResponse);
	},
	getArticleById(id) {
		return fetch("/api/article/" + id)
		.then(Utils.handleResponse);
	}
}

