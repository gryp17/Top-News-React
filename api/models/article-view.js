var mysql = require("mysql");
var app = require("../server");

var connection = mysql.createConnection(app.get("config").db);

module.exports = {
	/**
	 * Adds an article view record
	 * @param {Number} id
	 * @param {Number} userId (optional)
	 * @param {Function} done
	 */
	addArticleView: function (id, userId, done){
		var query = "INSERT INTO article_view (articleId, userId, date) VALUES (?, ?, now())";
		connection.query(query, [id, userId], done);
	}
}; 