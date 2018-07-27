var mysql = require("mysql");
var app = require("../server");

var connection = mysql.createConnection(app.get("config").db);

module.exports = {
	/**
	 * Returns all article comments for the specified article id
	 * @param {Number} articleId
	 * @param {Number} limit
	 * @param {Number} offset
	 * @param {Function} done
	 */
	getComments: function (articleId, limit, offset, done) {
		var query = "SELECT article_comment.id, article_comment.content, article_comment.date, user.id as authorId, user.username, user.avatar FROM article_comment, user "
		+"WHERE article_comment.authorId = user.id AND article_comment.articleId = ? ORDER BY date DESC LIMIT ? OFFSET ?";
		
		connection.query(query, [articleId, limit, offset], function (err, rows){
			if(err){
				return done(err);
			}
			
			if (!rows.length) {
				done(null, []);
			} else {
				
				rows.forEach(function (comment){
					//if there is no avatar use the default one
					if(!comment.avatar){
						comment.avatar = app.get("config").uploads.avatars.defaultAvatar;
					}
				});
						
				done(null, rows);
			}
		});
	},
	/**
	 * Returns the total number of comments for the specified article id
	 * @param {Number} articleId
	 * @param {Function} done
	 */
	getTotalComments: function (articleId, done){
		var query = "SELECT count(id) AS count FROM article_comment WHERE article_comment.articleId = ?";
		
		connection.query(query, articleId, function (err, rows){
			if(err){
				return done(err);
			}
			
			done(null, rows[0].count);
		});
	}
}; 