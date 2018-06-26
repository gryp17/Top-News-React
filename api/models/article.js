var mysql = require("mysql");
var app = require("../server");

var connection = mysql.createConnection(app.get("config").db);

module.exports = {	
	get: function (category, searchTerm, limit, offset, done){
		var whereClauses = [];		
		var whereParams = [];
		
		var paginationParams = [
			limit,
			offset
		];
						
		if(category !== "all news"){
			whereClauses.push("AND category.name = ?");
			whereParams.push(category);
		}
		
		if(searchTerm !== "*"){
			whereClauses.push("AND (content LIKE ? OR title LIKE ?)");
			whereParams.push("%"+searchTerm+"%");
			whereParams.push("%"+searchTerm+"%");
		}
						
		var query = "SELECT article.id, title, summary, content, image, date, category.name as categoryName FROM article, category WHERE article.categoryId = category.id "+whereClauses.join(" ")+" ORDER BY date DESC LIMIT ? OFFSET ?";
		var params = whereParams.concat(paginationParams);

		connection.query(query, params, done);
	}
}; 