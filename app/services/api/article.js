import axios from "axios";

export default {
	getArticles(category, searchTerm, limit, offset) {
		return axios.get("/api/article/" + category + "/" + encodeURIComponent(searchTerm) + "/" + limit + "/" + offset);
	},
	getArticleById(id) {
		return axios.get("/api/article/" + id);
	}
}

