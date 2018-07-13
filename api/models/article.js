var mysql = require("mysql");
var app = require("../server");

var connection = mysql.createConnection(app.get("config").db);

module.exports = {
	/**
	 * Returns all articles that match the specified criterias
	 * @param {String} category
	 * @param {String} searchTerm
	 * @param {Number} limit
	 * @param {Number} offset
	 * @param {Function} done
	 */
	search: function (category, searchTerm, limit, offset, done) {
		var whereClauses = [];
		var whereParams = [];

		var paginationParams = [
			limit,
			offset
		];

		if (category !== "all news") {
			whereClauses.push("AND category.name = ?");
			whereParams.push(category);
		}

		if (searchTerm !== "*") {
			whereClauses.push("AND (content LIKE ? OR title LIKE ?)");
			whereParams.push("%" + searchTerm + "%");
			whereParams.push("%" + searchTerm + "%");
		}

		var query = "SELECT article.id, title, summary, content, image, date, category.name as categoryName FROM article, category WHERE article.categoryId = category.id " + whereClauses.join(" ") + " ORDER BY date DESC LIMIT ? OFFSET ?";
		var params = whereParams.concat(paginationParams);

		connection.query(query, params, done);
	},
	/**
	 * Returns the article that matches the specified article id
	 * @param {Number} id
	 * @param {Function} done
	 */
	getById: function (id, done) {
		var query = "SELECT article.id, authorId, title, summary, content, image, date, views, category.name as categoryName, user.username as authorName, user.avatar as authorAvatar FROM article, category, user WHERE article.categoryId = category.id AND user.id = article.authorId AND article.id = ?";
		connection.query(query, id, function (err, rows) {
			if (err) {
				return done(err);
			}

			var article = rows[0];
			
			if(article){
				//if there is no avatar use the default one
				if(!article.authorAvatar){
					article.authorAvatar = app.get("config").uploads.avatars.defaultAvatar;
				}
			}

			done(null, article || null);
		});
	},
	/**
	 * Returns all articles by the specified author id
	 * @param {Number} authorId
	 * @param {Number} limit
	 * @param {Number} offset
	 * @param {Function} done
	 */
	getByAuthor: function (authorId, limit, offset, done){
		var query = "SELECT article.id, authorId, title, summary, content, image, date, views, category.name as categoryName, user.username as authorName FROM article, category, user WHERE article.categoryId = category.id AND user.id = article.authorId AND authorId = ? ORDER BY date DESC LIMIT ? OFFSET ?";
		var params = [authorId, limit, offset];
		connection.query(query, params, done);
	},
	/**
	 * Increments the article views by one
	 * @param {Number} id
	 * @param {Function} done
	 */
	addArticleView: function (id, done){
		connection.query("UPDATE article SET views = views + 1 WHERE id = ?", id, done);
	}
}; 