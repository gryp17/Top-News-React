import Utils from "../utils";

export default {
	getArticles(category, searchTerm, limit, offset) {
		return fetch("/api/articles/"+category+"/"+encodeURIComponent(searchTerm)+"/"+limit+"/"+offset)
		.then(Utils.handleResponse);
	},
	getArticleById(id) {
		console.log("getting something");
	}
}

